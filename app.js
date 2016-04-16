var hue = require('node-hue-api'),
    // Converter = require('./converter'),
    HueApi = hue.HueApi,
    lightState = hue.lightState,
    bridgeIP, username;

var argCount = process.argv.length;
for (var i = 0; i < argCount; i++) {
  var arg = process.argv[i];
  if (arg === '-b' && i + 1 < argCount) {
    bridgeIP = process.argv[i + 1];
  } else if (arg === '-u' && i + 1 < argCount) {
    username = process.argv[i + 1];
  }
}
if (typeof bridgeIP === 'undefined') {
  console.error('Provide a Hue bridge IP address with -b flag.');
  console.log('Example: node app.js -b 192.168.1.100');
  process.exit(1);
}
if (typeof username === 'undefined') {
  console.error('Provide a Hue bridge user with -u flag.');
  console.log('Example: node app.js -u 123abc');
  process.exit(1);
}
console.log('Connecting to bridge ' + bridgeIP + ' as user ' + username);

var api = new HueApi(bridgeIP, username);

var displayError = function(err) {
  console.error(err);
};
var displayLight = function(light) {
  var state = light.state;
  console.log("\t" + light.name + ' model ' + light.modelid);
  if (state.on) {
    var x = state.xy[0];
    var y = state.xy[1];
    console.log("\tx: " + x + ', y: ' + y + ', brightness: ' + state.bri);
    var rgb = Converter.CIE1931ToRGB(x, y, state.bri);
    console.log("\trgb(" + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')');
    var hex = Converter.CIE1931ToHex(x, y, state.bri);
    console.log("\t#" + hex);
  } else {
    console.log('\toff');
  }
};
var getLightStatus = function(lightID) {
  api.lightStatus(lightID).
      then(function(result) {
        console.log("\nLight #" + lightID);
        displayLight(result);
      }).fail(displayError).done();
};
var displayGroup = function(group) {
  console.log("\t# lights: " + group.lights.length);
  for (var i = 0; i < group.lights.length; i++) {
    getLightStatus(group.lights[i]);
  }
};
var displayBridge = function(bridge) {
  console.log('Bridge "' + bridge.name + '"');
  console.log("\tTime: " + bridge.localtime);
  console.log("\tAPI version: " + bridge.apiversion);
  api.getGroup('0').then(displayGroup).done();
};
api.config().then(displayBridge).done();

// // var redX = 0.6417, redY = 0.304;
// // var blueX = 0.168, blueY = 0.041;
// // // var state = lightState.create().on().xy(redX, redY);
// // var state = lightState.create().on().effect('none');

// // api.setLightState(lightID, state).
// //     then(displayLightState).fail(displayError).done();
