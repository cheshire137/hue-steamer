var XYPoint = require('./xyPoint');

// Thanks to
// https://github.com/benknight/hue-python-rgb-converter/blob/master/rgb_cie.py
var ColorHelper = function() {
};

// See http://www.developers.meethue.com/documentation/color-conversions-rgb-xy
ColorHelper.Red = new XYPoint(0.675, 0.322);
ColorHelper.Lime = new XYPoint(0.4091, 0.518);
ColorHelper.Blue = new XYPoint(0.167, 0.04);

ColorHelper.hexToRed = function(hex) {
  return parseInt(hex.slice(0, 2), 16);
};

ColorHelper.hexToGreen = function(hex) {
  return parseInt(hex.slice(2, 4), 16);
};

ColorHelper.hexToBlue = function(hex) {
  return parseInt(hex.slice(4, 6), 16);
};

ColorHelper.hexToRgb = function(hex) {
  return [this.hexToRed(hex), this.hexToGreen(hex), this.hexToBlue(hex)];
};

ColorHelper.rgbToHex = function(r, g, b) {
  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

ColorHelper.randomRgbValue = function() {
  return Math.floor(Math.random() * 256);
};

ColorHelper.crossProduct = function(p1, p2) {
  return p1.x * p2.y - p1.y * p2.x;
};

ColorHelper.checkPointInLampsReach = function(p) {
  var v1 = new XYPoint(this.Lime.x - this.Red.x, this.Lime.y - this.Red.y);
  var v2 = new XYPoint(this.Blue.x - this.Red.x, this.Blue.y - this.Red.y);
  var q = new XYPoint(p.x - this.Red.x, p.y - this.Red.y);
  var s = this.crossProduct(q, v2) / this.crossProduct(v1, v2);
  var t = this.crossProduct(v1, q) / this.crossProduct(v1, v2);
  return (s >= 0.0) && (t >= 0.0) && (s + t <= 1.0);
};

ColorHelper.getClosestPointToLine = function(A, B, P) {
  var AP = new XYPoint(P.x - A.x, P.y - A.y);
  var AB = new XYPoint(B.x - A.x, B.y - A.y);
  var ab2 = AB.x * AB.x + AB.y * AB.y;
  var apAb = AP.x * AB.x + AP.y * AB.y;
  var t = apAb / ab2;
  if (t < 0.0) {
    t = 0.0;
  } else if (t > 1.0) {
    t = 1.0;
  }
  return new XYPoint(A.x + AB.x * t, A.y + AB.y * t);
};

ColorHelper.getClosestPointToPoint = function(xyPoint) {
  var pAB = this.getClosestPointToLine(this.Red, this.Lime, xyPoint);
  var pAC = this.getClosestPointToLine(this.Blue, this.Red, xyPoint);
  var pBC = this.getClosestPointToLine(this.Lime, this.Blue, xyPoint);
  var dAB = this.getDistanceBetweenTwoPoints(xyPoint, pAB);
  var dAC = this.getDistanceBetweenTwoPoints(xyPoint, pAC);
  var dBC = this.getDistanceBetweenTwoPoints(xyPoint, pBC);
  var lowest = dAB;
  var closestPoint = pAB;
  if (dAC < lowest) {
    lowest = dAC;
    closestPoint = pAC;
  }
  if (dBC < lowest) {
    lowest = dBC;
    closestPoint = pBC;
  }
  return new XYPoint(closestPoint.x, closestPoint.y);
};

ColorHelper.getDistanceBetweenTwoPoints = function(one, two) {
  var dx = one.x - two.x;
  var dy = one.y - two.y;
  return Math.sqrt(dx * dx + dy * dy);
};

ColorHelper.getXYPointFromRGB = function(red, green, blue) {
  var r, g, b;
  if (red > 0.04045) {
    r = Math.pow((red + 0.055) / (1.0 + 0.055), 2.4);
  } else {
    r = (red / 12.92);
  }
  if (green > 0.04045) {
    g = Math.pow((green + 0.055) / (1.0 + 0.055), 2.4);
  } else {
    g = (green / 12.92);
  }
  if (blue > 0.04045) {
    b = Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4);
  } else {
    b = (blue / 12.92);
  }

  var X = r * 0.4360747 + g * 0.3850649 + b * 0.0930804;
  var Y = r * 0.2225045 + g * 0.7168786 + b * 0.0406169;
  var Z = r * 0.0139322 + g * 0.0971045 + b * 0.7141733;

  var cx, cy;
  if (X + Y + Z === 0) {
    cx = 0;
    cy = 0;
  } else {
    cx = X / (X + Y + Z);
    cy = Y / (X + Y + Z);
  }

  var xyPoint = new XYPoint(cx, cy);
  var inReachOfLamps = this.checkPointInLampsReach(xyPoint);
  if (!inReachOfLamps) {
    xyPoint = this.getClosestPointToPoint(xyPoint);
  }
  return xyPoint;
}

ColorHelper.getRGBFromXYAndBrightness = function(x, y, bri) {
  if (typeof bri === 'undefined') {
    bri = 1;
  }
  var xyPoint = new XYPoint(x, y);
  if (!this.checkPointInLampsReach(xyPoint)) {
    xyPoint = this.getClosestPointToPoint(xyPoint);
  }
  var Y = bri;
  var X = (Y / xyPoint.y) * xyPoint.x;
  var Z = (Y / xyPoint.y) * (1 - xyPoint.x - xyPoint.y);
  var r =  X * 1.612 - Y * 0.203 - Z * 0.302;
  var g = -X * 0.509 + Y * 1.412 + Z * 0.066;
  var b =  X * 0.026 - Y * 0.072 + Z * 0.962;
  var reverseGammaCorrect = function(value) {
    if (value <= 0.0031308) {
      return (12.92 * value);
    }
    return ((1.0 + 0.055) * Math.pow(value, (1.0 / 2.4)) - 0.055);
  };
  r = reverseGammaCorrect(r);
  g = reverseGammaCorrect(g);
  b = reverseGammaCorrect(b);
  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);
  var max_component = Math.max(r, g, b);
  if (max_component > 1) {
    r = r / max_component;
    g = g / max_component;
    b = b / max_component;
  }
  r = r * 255;
  g = g * 255;
  b = b * 255;
  return [r, g, b];
};

module.exports = ColorHelper;
