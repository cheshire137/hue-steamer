var ColorHelper = require('./colorHelper');

// Thanks to
// https://github.com/benknight/hue-python-rgb-converter/blob/master/rgb_cie.py
var Converter = function() {
};

// Converts hexadecimal colors represented as a String to approximate CIE 1931
// coordinates. May not produce accurate values.
Converter.hexToCIE1931 = function(h) {
  var rgb = ColorHelper.hexToRGB(h);
  return this.rgbToCIE1931(rgb[0], rgb[1], rgb[2]);
};

// Converts red, green and blue integer values to approximate CIE 1931 x and y
// coordinates. Algorithm from:
// http://www.easyrgb.com/index.php?X=MATH&H=02#text2.
// May not produce accurate values.
Converter.rgbToCIE1931 = function(red, green, blue) {
  var point = ColorHelper.getXYPointFromRGB(red, green, blue);
  return [point.x, point.y];
};

// Returns the approximate CIE 1931 x, y coordinates represented by the
// supplied hexColor parameter, or of a random color if the parameter is not
// passed. Let people set a lamp's color to any random color.
Converter.getCIEColor = function(hexColor) {
  var xy = [];
  if (typeof hexColor === 'undefined') {
    var r = ColorHelper.randomRGBValue();
    var g = ColorHelper.randomRGBValue();
    var b = ColorHelper.randomRGBValue();
    xy = this.rgbToCIE1931(r, g, b);
  } else {
    xy = this.hexToCIE1931(hexColor);
  }
  return xy;
};

// Converts CIE 1931 x and y coordinates and brightness value from 0 to 1 to a
// CSS hex color.
Converter.CIE1931ToHex = function(x, y, bri) {
  if (typeof bri === 'undefined') {
    bri = 1;
  }
  var rgb = ColorHelper.getRGBFromXYAndBrightness(x, y, bri);
  return ColorHelper.rgbToHex(rgb[0], rgb[1], rgb[2]);
};

module.exports = Converter;
