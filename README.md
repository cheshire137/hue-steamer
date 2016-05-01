# Hue Steamer

This is a web application you run locally to manipulate your Philips Hue lights.

![Screenshot of lights tab](https://raw.githubusercontent.com/cheshire137/hue-steamer/master/screenshot1.png)

![Screenshot of groups tab](https://raw.githubusercontent.com/cheshire137/hue-steamer/master/screenshot2.png)

If you just want a JavaScript library for converting hex and RGB color codes to
the Philips Hue CIE 1931 color space, or vice versa, look at
[converter.js](src/models/converter.js). See also its
[Python implementation](https://github.com/benknight/hue-python-rgb-converter/blob/master/rgb_cie.py)
or another
[JavaScript implementation](https://github.com/bjohnso5/hue-hacking/blob/master/src/colors.js).

## How to Run the Web App

    npm install
    npm start

[localhost:3000](http://localhost:3000/) should open in your browser.

## How to Run the Script (Deprecated)

    npm install
    node app.js -b YOUR_HUE_BRIDGE_IP -u YOUR_HUE_USER

## Thanks

- [proto.io](https://proto.io/freebies/onoff/) for the snazzy on/off toggle switches.
- [node-hue-api](https://github.com/peter-murray/node-hue-api) for the API to interact with Philips Hue lights.
- [hue-python-rgb-converter](https://github.com/benknight/hue-python-rgb-converter) for the basis for the color converting JavaScript to go between the Hue color space and hex.
