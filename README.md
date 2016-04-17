# Hue Steamer

This is a web application you run locally to manipulate your Philips Hue lights.

![Screenshot](https://raw.githubusercontent.com/cheshire137/hue-steamer/master/screenshot1.png)

If you just want a JavaScript library for converting hex and RGB color codes to
the Philips Hue CIE 1931 color space, or vice versa, look at
[converter.js](converter.js). See also its
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
