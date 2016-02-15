var ColorHelper = require('./colorHelper');

// Thanks to https://github.com/benknight/hue-python-rgb-converter/blob/master/rgb_cie.py
var Converter = function() {
  this.color = new ColorHelper();
};

// Converts hexadecimal colors represented as a String to approximate CIE 1931
// coordinates. May not produce accurate values.
Converter.hexToCIE1931 = function(h) {
  var rgb = this.color.hexToRGB(h);
  return this.rgbToCIE1931(rgb[0], rgb[1], rgb[2]);
};

module.exports = Converter;
