import XYPoint from './xyPoint';

// Thanks to
// https://github.com/benknight/hue-python-rgb-converter/blob/master/rgb_cie.py
class ColorHelper {
  // See http://www.developers.meethue.com/documentation/color-conversions-rgb-xy
  static red() {
    return new XYPoint(0.675, 0.322);
  }

  // See http://www.developers.meethue.com/documentation/color-conversions-rgb-xy
  static lime() {
    return new XYPoint(0.4091, 0.518);
  }

  // See http://www.developers.meethue.com/documentation/color-conversions-rgb-xy
  static blue() {
    return new XYPoint(0.167, 0.04);
  }

  // Parses a valid hex color string and returns the Red RGB integer value.
  static hexToRed(hex) {
    return parseInt(hex.slice(0, 2), 16);
  }

  // Parses a valid hex color string and returns the Green RGB integer value.
  static hexToGreen(hex) {
    return parseInt(hex.slice(2, 4), 16);
  }

  // Parses a valid hex color string and returns the Blue RGB integer value.
  static hexToBlue(hex) {
    return parseInt(hex.slice(4, 6), 16);
  }

  // Converts a valid hex color string to an RGB array.
  static hexToRgb(hex) {
    return [this.hexToRed(hex), this.hexToGreen(hex), this.hexToBlue(hex)];
  }

  // Converts RGB to hex.
  static rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  // Return a random Integer in the range of 0 to 255, representing an RGB color
  // value.
  static randomRgbValue() {
    return Math.floor(Math.random() * 256);
  }

  // Returns the cross product of two XYPoints.
  static crossProduct(p1, p2) {
    return p1.x * p2.y - p1.y * p2.x;
  }

  // Check if the provided XYPoint can be recreated by a Hue lamp.
  static checkPointInLampsReach(p) {
    const lime = this.lime();
    const red = this.red();
    const blue = this.blue();
    const v1 = new XYPoint(lime.x - red.x, lime.y - red.y);
    const v2 = new XYPoint(blue.x - red.x, blue.y - red.y);
    const q = new XYPoint(p.x - red.x, p.y - red.y);
    const s = this.crossProduct(q, v2) / this.crossProduct(v1, v2);
    const t = this.crossProduct(v1, q) / this.crossProduct(v1, v2);
    return (s >= 0.0) && (t >= 0.0) && (s + t <= 1.0);
  }

  // Find the closest point on a line. This point will be reproducible by a Hue
  // lamp.
  static getClosestPointToLine(A, B, P) {
    const AP = new XYPoint(P.x - A.x, P.y - A.y);
    const AB = new XYPoint(B.x - A.x, B.y - A.y);
    const ab2 = AB.x * AB.x + AB.y * AB.y;
    const apAb = AP.x * AB.x + AP.y * AB.y;
    let t = apAb / ab2;
    if (t < 0.0) {
      t = 0.0;
    } else if (t > 1.0) {
      t = 1.0;
    }
    return new XYPoint(A.x + AB.x * t, A.y + AB.y * t);
  }

  static getClosestPointToPoint(xyPoint) {
    const lime = this.lime();
    const red = this.red();
    const blue = this.blue();

    // Color is unreproducible, find the closest point on each line in the CIE
    // 1931 'triangle'.
    const pAB = this.getClosestPointToLine(red, lime, xyPoint);
    const pAC = this.getClosestPointToLine(blue, red, xyPoint);
    const pBC = this.getClosestPointToLine(lime, blue, xyPoint);

    // Get the distances per point and see which point is closer to our Point.
    const dAB = this.getDistanceBetweenTwoPoints(xyPoint, pAB);
    const dAC = this.getDistanceBetweenTwoPoints(xyPoint, pAC);
    const dBC = this.getDistanceBetweenTwoPoints(xyPoint, pBC);

    let lowest = dAB;
    let closestPoint = pAB;
    if (dAC < lowest) {
      lowest = dAC;
      closestPoint = pAC;
    }
    if (dBC < lowest) {
      lowest = dBC;
      closestPoint = pBC;
    }

    // Change the xy value to a value which is within the reach of the lamp.
    return new XYPoint(closestPoint.x, closestPoint.y);
  }

  // Returns the distance between two XYPoints.
  static getDistanceBetweenTwoPoints(one, two) {
    const dx = one.x - two.x;
    const dy = one.y - two.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Returns an XYPoint object containing the closest available CIE 1931
  // coordinates based on the RGB input values.
  static getXYPointFromRGB(red, green, blue) {
    let r;
    let g;
    let b;
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

    const X = r * 0.4360747 + g * 0.3850649 + b * 0.0930804;
    const Y = r * 0.2225045 + g * 0.7168786 + b * 0.0406169;
    const Z = r * 0.0139322 + g * 0.0971045 + b * 0.7141733;

    let cx;
    let cy;
    if (X + Y + Z === 0) {
      cx = 0;
      cy = 0;
    } else {
      cx = X / (X + Y + Z);
      cy = Y / (X + Y + Z);
    }

    // Check if the given XY value is within the color reach of our lamps.
    let xyPoint = new XYPoint(cx, cy);
    const inReachOfLamps = this.checkPointInLampsReach(xyPoint);
    if (!inReachOfLamps) {
      xyPoint = this.getClosestPointToPoint(xyPoint);
    }
    return xyPoint;
  }

  // Returns a rgb tuplet for given x, y values.  Not actually an inverse of
  // getXYPointFromRGB.
  static getRGBFromXYAndBrightness(x, y, optionalBri) {
    let bri;
    if (typeof optionalBri === 'undefined') {
      bri = 1;
    } else {
      bri = optionalBri;
    }
    let xyPoint = new XYPoint(x, y);
    if (!this.checkPointInLampsReach(xyPoint)) {
      xyPoint = this.getClosestPointToPoint(xyPoint);
    }
    const Y = bri;
    const X = (Y / xyPoint.y) * xyPoint.x;
    const Z = (Y / xyPoint.y) * (1 - xyPoint.x - xyPoint.y);
    let r = X * 1.612 - Y * 0.203 - Z * 0.302;
    let g = -X * 0.509 + Y * 1.412 + Z * 0.066;
    let b = X * 0.026 - Y * 0.072 + Z * 0.962;
    const reverseGammaCorrect = (value) => {
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
    const maxComponent = Math.max(r, g, b);
    if (maxComponent > 1) {
      r = r / maxComponent;
      g = g / maxComponent;
      b = b / maxComponent;
    }
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    return [r, g, b];
  }
}

export default ColorHelper;
