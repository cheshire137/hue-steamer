var XYPoint = require('./xyPoint');

// Thanks to https://github.com/benknight/hue-python-rgb-converter/blob/master/rgb_cie.py
var ColorHelper = function() {
};

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
}

module.exports = ColorHelper;
