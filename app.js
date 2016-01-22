var hue = require('node-hue-api'),
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

// var api = new HueApi(hostname, username);

// var displayBridge = function(result) {
//     console.log("Bridge info:\n" +
//                 JSON.stringify(result, null, 2));
// };
// api.config().then(displayBridge).done();

// var displayGroup = function(result) {
//   console.log("Group:\n" + JSON.stringify(result, null, 2));
// };

// var displayGroups = function(result) {
//   console.log("Groups:\n" +
//               JSON.stringify(result, null, 2));
//   for (var i = 0; i < result.length; i++) {
//     var group = result[i];
//     api.getGroup(group.id).then(displayGroup).done();
//   }
// };

// // api.groups().then(displayGroups).done();

// var lightID = 11;

// var displayLightState = function(result) {
//   console.log(result);
// };
// var displayError = function(err) {
//   console.error(err);
// };
// var displayStatus = function(status) {
//     console.log("Light status:\n" +
//                 JSON.stringify(status, null, 2));
// };
// api.lightStatus(lightID).then(displayStatus).done();

// // var redX = 0.6417, redY = 0.304;
// // var blueX = 0.168, blueY = 0.041;
// // // var state = lightState.create().on().xy(redX, redY);
// // var state = lightState.create().on().effect('none');

// // api.setLightState(lightID, state).
// //     then(displayLightState).fail(displayError).done();
