import ColorHelper from './colorHelper';

// Thanks to
// https://github.com/benknight/hue-python-rgb-converter/blob/master/rgb_cie.py
class Converter {
  // Converts hexadecimal colors represented as a String to approximate CIE 1931
  // coordinates. May not produce accurate values.
  static hexToCIE1931(h) {
    const rgb = ColorHelper.hexToRgb(h);
    return this.rgbToCIE1931(rgb[0], rgb[1], rgb[2]);
  }

  // Converts red, green and blue integer values to approximate CIE 1931 x and y
  // coordinates. Algorithm from:
  // http://www.easyrgb.com/index.php?X=MATH&H=02#text2.
  // May not produce accurate values.
  static rgbToCIE1931(red, green, blue) {
    const point = ColorHelper.getXYPointFromRGB(red, green, blue);
    return [point.x, point.y];
  }

  // Returns the approximate CIE 1931 x, y coordinates represented by the
  // supplied hexColor parameter, or of a random color if the parameter is not
  // passed. Let people set a lamp's color to any random color.
  static getCIEColor(hexColor) {
    let xy = [];
    if (typeof hexColor === 'undefined') {
      const r = ColorHelper.randomRGBValue();
      const g = ColorHelper.randomRGBValue();
      const b = ColorHelper.randomRGBValue();
      xy = this.rgbToCIE1931(r, g, b);
    } else {
      xy = this.hexToCIE1931(hexColor);
    }
    return xy;
  }

  // Converts CIE 1931 x and y coordinates and brightness value from 0 to 1 to an
  // RGB color.
  static cie1931ToRGB(x, y, optionalBri) {
    let bri;
    if (typeof optionalBri === 'undefined') {
      bri = 1;
    } else {
      bri = optionalBri;
    }
    return ColorHelper.getRGBFromXYAndBrightness(x, y, bri);
  }

  // Converts CIE 1931 x and y coordinates and brightness value from 0 to 1 to a
  // CSS hex color.
  static cie1931ToHex(x, y, bri) {
    const rgb = this.cie1931ToRGB(x, y, bri);
    return ColorHelper.rgbToHex(rgb[0], rgb[1], rgb[2]);
  }
}

export default Converter;
