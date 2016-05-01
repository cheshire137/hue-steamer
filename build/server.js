require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  __webpack_require__(1);
  
  var _path = __webpack_require__(2);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(3);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDomServer = __webpack_require__(5);
  
  var _reactDomServer2 = _interopRequireDefault(_reactDomServer);
  
  var _routes = __webpack_require__(6);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _componentsHtml = __webpack_require__(83);
  
  var _componentsHtml2 = _interopRequireDefault(_componentsHtml);
  
  var _assets = __webpack_require__(84);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(14);
  
  var _configJson = __webpack_require__(49);
  
  var _configJson2 = _interopRequireDefault(_configJson);
  
  var _sqlite = __webpack_require__(85);
  
  var _sqlite2 = _interopRequireDefault(_sqlite);
  
  var hue = __webpack_require__(86);
  var server = global.server = (0, _express2['default'])();
  
  function getBridge(id) {
    return regeneratorRuntime.async(function getBridge$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          if (!(typeof id === 'undefined')) {
            context$1$0.next = 4;
            break;
          }
  
          context$1$0.next = 3;
          return regeneratorRuntime.awrap(_sqlite2['default'].get('SELECT * FROM bridges ' + 'ORDER BY id DESC LIMIT 1'));
  
        case 3:
          return context$1$0.abrupt('return', context$1$0.sent);
  
        case 4:
          context$1$0.next = 6;
          return regeneratorRuntime.awrap(_sqlite2['default'].get('SELECT * FROM bridges WHERE id = ?', id));
  
        case 6:
          return context$1$0.abrupt('return', context$1$0.sent);
  
        case 7:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }
  
  function getHueApi(id) {
    var connection;
    return regeneratorRuntime.async(function getHueApi$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(getBridge(id));
  
        case 2:
          connection = context$1$0.sent;
          return context$1$0.abrupt('return', new hue.HueApi(connection.ip, connection.user));
  
        case 4:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }
  
  function sendBridgeDetails(connection, res) {
    var api = new hue.HueApi(connection.ip, connection.user);
    api.config().then(function (bridge) {
      res.json({ connection: connection, bridge: bridge });
    }).fail(function (err) {
      res.status(400).json({ error: err, connection: connection });
    }).done();
  }
  
  function setLightState(api, id, state, res) {
    api.setLightState(id, state).then(function (result) {
      res.json(result);
    }).fail(function (err) {
      res.status(400).json(err);
    }).done();
  }
  
  function setGroupLightState(api, id, state, res) {
    api.setGroupLightState(id, state).then(function (result) {
      res.json(result);
    }).fail(function (err) {
      res.status(400).json(err);
    }).done();
  }
  
  function saveBridge(ip, user) {
    var bridge;
    return regeneratorRuntime.async(function saveBridge$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(_sqlite2['default'].get('SELECT * FROM bridges ' + 'WHERE ip = ? AND user = ?', ip, user));
  
        case 2:
          bridge = context$1$0.sent;
  
          if (!(typeof bridge === 'object')) {
            context$1$0.next = 11;
            break;
          }
  
          context$1$0.next = 6;
          return regeneratorRuntime.awrap(_sqlite2['default'].run('UPDATE bridges SET user = ? WHERE ip = ?', user, ip));
  
        case 6:
          context$1$0.next = 8;
          return regeneratorRuntime.awrap(getBridge(bridge.id));
  
        case 8:
          bridge = context$1$0.sent;
          context$1$0.next = 16;
          break;
  
        case 11:
          context$1$0.next = 13;
          return regeneratorRuntime.awrap(_sqlite2['default'].run('INSERT INTO bridges (user, ip) VALUES (?, ?)', user, ip));
  
        case 13:
          context$1$0.next = 15;
          return regeneratorRuntime.awrap(getBridge());
  
        case 15:
          bridge = context$1$0.sent;
  
        case 16:
          return context$1$0.abrupt('return', bridge);
  
        case 17:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  server.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));
  
  server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', _configJson2['default'][("development")].clientUri);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
  });
  
  server.get('/bridge', function callee$0$0(req, res) {
    var result, connection;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(_sqlite2['default'].get('SELECT COUNT(*) AS count FROM bridges'));
  
        case 2:
          result = context$1$0.sent;
  
          if (!(result.count < 1)) {
            context$1$0.next = 6;
            break;
          }
  
          res.status(400).json({ error: 'There are no bridges.' });
          return context$1$0.abrupt('return');
  
        case 6:
          context$1$0.next = 8;
          return regeneratorRuntime.awrap(getBridge());
  
        case 8:
          connection = context$1$0.sent;
  
          sendBridgeDetails(connection, res);
  
        case 10:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.get('/bridges/discover', function callee$0$0(req, res) {
    var timeout;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          timeout = 2000;
          // 2 seconds
          hue.nupnpSearch(timeout).then(function (bridges) {
            res.json(bridges);
          }).fail(function (err) {
            res.status(400).json(err);
          }).done();
  
        case 2:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.get('/bridges/:id', function callee$0$0(req, res) {
    var connection;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(getBridge(req.params.id));
  
        case 2:
          connection = context$1$0.sent;
  
          sendBridgeDetails(connection, res);
  
        case 4:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.post('/bridges', function callee$0$0(req, res) {
    var ip, user, bridge;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          ip = req.query.ip;
  
          if (!(typeof ip !== 'string' || ip.length < 1)) {
            context$1$0.next = 4;
            break;
          }
  
          res.status(400).json({ error: 'Must provide Hue Bridge IP address in ip param' });
          return context$1$0.abrupt('return');
  
        case 4:
          user = req.query.user;
  
          if (!(typeof user !== 'string' || user.length < 1)) {
            context$1$0.next = 8;
            break;
          }
  
          res.status(400).json({ error: 'Must provide Hue Bridge user in user param' });
          return context$1$0.abrupt('return');
  
        case 8:
          context$1$0.next = 10;
          return regeneratorRuntime.awrap(saveBridge(ip, user));
  
        case 10:
          bridge = context$1$0.sent;
  
          sendBridgeDetails(bridge, res);
  
        case 12:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.post('/users', function callee$0$0(req, res) {
    var ip, userDescription, api;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          ip = req.query.ip;
  
          if (!(typeof ip !== 'string' || ip.length < 1)) {
            context$1$0.next = 4;
            break;
          }
  
          res.status(400).json({ error: 'Must provide Hue Bridge IP address in ip param' });
          return context$1$0.abrupt('return');
  
        case 4:
          userDescription = req.query.user;
  
          if (!(typeof userDescription !== 'string' || userDescription.length < 1)) {
            context$1$0.next = 8;
            break;
          }
  
          res.status(400).json({
            error: 'Must provide Hue Bridge user description in user param'
          });
          return context$1$0.abrupt('return');
  
        case 8:
          api = new hue.HueApi();
  
          api.registerUser(ip, userDescription).then(function (user) {
            var bridge = saveBridge(ip, user);
            sendBridgeDetails(bridge, res);
          }).fail(function (err) {
            res.status(400).json({ error: err.message });
          }).done();
  
        case 10:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.get('/schedules', function callee$0$0(req, res) {
    var api;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(getHueApi(req.query.connectionID));
  
        case 2:
          api = context$1$0.sent;
  
          api.schedules().then(function (result) {
            res.json(result);
          }).fail(function (err) {
            res.status(400).json(err);
          }).done();
  
        case 4:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.get('/scenes', function callee$0$0(req, res) {
    var api;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(getHueApi(req.query.connectionID));
  
        case 2:
          api = context$1$0.sent;
  
          api.scenes().then(function (result) {
            res.json(result);
          }).fail(function (err) {
            res.status(400).json(err);
          }).done();
  
        case 4:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.get('/scene/:id', function callee$0$0(req, res) {
    var api;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(getHueApi(req.query.connectionID));
  
        case 2:
          api = context$1$0.sent;
  
          api.scene(req.params.id).then(function (result) {
            res.json(result);
          }).fail(function (err) {
            res.status(400).json(err);
          }).done();
  
        case 4:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.get('/groups', function callee$0$0(req, res) {
    var api;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(getHueApi(req.query.connectionID));
  
        case 2:
          api = context$1$0.sent;
  
          api.groups().then(function (result) {
            res.json(result);
          }).fail(function (err) {
            res.status(400).json(err);
          }).done();
  
        case 4:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.post('/groups', function callee$0$0(req, res) {
    var name, lightIDs, api;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          name = req.query.name;
  
          if (!(typeof name !== 'string')) {
            context$1$0.next = 4;
            break;
          }
  
          res.status(400).json({ error: 'Must pass group name in name param' });
          return context$1$0.abrupt('return');
  
        case 4:
          name = name.trim();
  
          if (!(name.length < 1)) {
            context$1$0.next = 8;
            break;
          }
  
          res.status(400).json({
            error: 'Must pass group name at least 1 character long'
          });
          return context$1$0.abrupt('return');
  
        case 8:
          lightIDs = req.query.ids;
  
          if (!(typeof lightIDs !== 'string')) {
            context$1$0.next = 12;
            break;
          }
  
          res.status(400).json({
            error: 'Must pass comma-separated list of light IDs in ids param'
          });
          return context$1$0.abrupt('return');
  
        case 12:
          lightIDs = lightIDs.split(',');
          context$1$0.next = 15;
          return regeneratorRuntime.awrap(getHueApi(req.query.connectionID));
  
        case 15:
          api = context$1$0.sent;
  
          api.createGroup(name, lightIDs).then(function (result) {
            res.json(result);
          }).fail(function (err) {
            res.status(400).json(err);
          }).done();
  
        case 17:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.get('/group/:id', function callee$0$0(req, res) {
    var api;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(getHueApi(req.query.connectionID));
  
        case 2:
          api = context$1$0.sent;
  
          api.getGroup(req.params.id).then(function (group) {
            res.json(group);
          }).fail(function (err) {
            res.status(400).json(err);
          }).done();
  
        case 4:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.put('/group/:id', function callee$0$0(req, res) {
    var name, lightIDs, api;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          name = req.query.name;
  
          if (!(typeof name !== 'string')) {
            context$1$0.next = 4;
            break;
          }
  
          res.status(400).json({ error: 'Must pass group name in name param' });
          return context$1$0.abrupt('return');
  
        case 4:
          name = name.trim();
  
          if (!(name.length < 1)) {
            context$1$0.next = 8;
            break;
          }
  
          res.status(400).json({
            error: 'Must pass group name at least 1 character long'
          });
          return context$1$0.abrupt('return');
  
        case 8:
          lightIDs = req.query.ids;
  
          if (!(typeof lightIDs !== 'string')) {
            context$1$0.next = 12;
            break;
          }
  
          res.status(400).json({
            error: 'Must pass comma-separated list of light IDs in ids param'
          });
          return context$1$0.abrupt('return');
  
        case 12:
          lightIDs = lightIDs.split(',');
          context$1$0.next = 15;
          return regeneratorRuntime.awrap(getHueApi(req.query.connectionID));
  
        case 15:
          api = context$1$0.sent;
  
          api.updateGroup(req.params.id, name, lightIDs).then(function (result) {
            res.json(result);
          }).fail(function (err) {
            res.status(400).json(err);
          }).done();
  
        case 17:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.get('/light/:id', function callee$0$0(req, res) {
    var api;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(getHueApi(req.query.connectionID));
  
        case 2:
          api = context$1$0.sent;
  
          api.lightStatus(req.params.id).then(function (result) {
            res.json(result);
          }).fail(function (err) {
            res.status(400).json(err);
          }).done();
  
        case 4:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.post('/light/:id/on', function callee$0$0(req, res) {
    var api, state;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(getHueApi(req.query.connectionID));
  
        case 2:
          api = context$1$0.sent;
          state = hue.lightState.create().on();
  
          setLightState(api, req.params.id, state, res);
  
        case 5:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.post('/light/:id/off', function callee$0$0(req, res) {
    var api, state;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(getHueApi(req.query.connectionID));
  
        case 2:
          api = context$1$0.sent;
          state = hue.lightState.create().off();
  
          setLightState(api, req.params.id, state, res);
  
        case 5:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.post('/group/:id/on', function callee$0$0(req, res) {
    var api, state;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(getHueApi(req.query.connectionID));
  
        case 2:
          api = context$1$0.sent;
          state = hue.lightState.create().on();
  
          setGroupLightState(api, req.params.id, state, res);
  
        case 5:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.post('/group/:id/off', function callee$0$0(req, res) {
    var api, state;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(getHueApi(req.query.connectionID));
  
        case 2:
          api = context$1$0.sent;
          state = hue.lightState.create().off();
  
          setGroupLightState(api, req.params.id, state, res);
  
        case 5:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.post('/light/:id/color', function callee$0$0(req, res) {
    var x, y, api, state;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          x = req.query.x;
          y = req.query.y;
  
          if (!(typeof x !== 'string')) {
            context$1$0.next = 5;
            break;
          }
  
          res.status(400).send('{"error": "Must provide x color in x param"}');
          return context$1$0.abrupt('return');
  
        case 5:
          if (!(typeof y !== 'string')) {
            context$1$0.next = 8;
            break;
          }
  
          res.status(400).send('{"error": "Must provide y color in y param"}');
          return context$1$0.abrupt('return');
  
        case 8:
          context$1$0.next = 10;
          return regeneratorRuntime.awrap(getHueApi(req.query.connectionID));
  
        case 10:
          api = context$1$0.sent;
          state = hue.lightState.create().on().xy(x, y);
  
          setLightState(api, req.params.id, state, res);
  
        case 13:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.post('/group/:id/color', function callee$0$0(req, res) {
    var x, y, api, state;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          x = req.query.x;
          y = req.query.y;
  
          if (!(typeof x !== 'string')) {
            context$1$0.next = 5;
            break;
          }
  
          res.status(400).send('{"error": "Must provide x color in x param"}');
          return context$1$0.abrupt('return');
  
        case 5:
          if (!(typeof y !== 'string')) {
            context$1$0.next = 8;
            break;
          }
  
          res.status(400).send('{"error": "Must provide y color in y param"}');
          return context$1$0.abrupt('return');
  
        case 8:
          context$1$0.next = 10;
          return regeneratorRuntime.awrap(getHueApi(req.query.connectionID));
  
        case 10:
          api = context$1$0.sent;
          state = hue.lightState.create().on().xy(x, y);
  
          setGroupLightState(api, req.params.id, state, res);
  
        case 13:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  server.get('*', function callee$0$0(req, res, next) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      var _this2 = this;
  
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return regeneratorRuntime.awrap((function callee$1$0() {
            var statusCode, data, css, context, html;
            return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  statusCode = 200;
                  data = { title: '', description: '', css: '', body: '', entry: _assets2['default'].main.js };
                  css = [];
                  context = {
                    insertCss: function insertCss(styles) {
                      return css.push(styles._getCss());
                    },
                    onSetTitle: function onSetTitle(value) {
                      return data.title = value;
                    },
                    onSetMeta: function onSetMeta(key, value) {
                      return data[key] = value;
                    },
                    onPageNotFound: function onPageNotFound() {
                      return statusCode = 404;
                    }
                  };
                  context$2$0.next = 6;
                  return regeneratorRuntime.awrap(_routes2['default'].dispatch({ path: req.path, query: req.query, context: context }, function (state, component) {
                    data.body = _reactDomServer2['default'].renderToString(component);
                    data.css = css.join('');
                  }));
  
                case 6:
                  html = _reactDomServer2['default'].renderToStaticMarkup(_react2['default'].createElement(_componentsHtml2['default'], data));
  
                  res.status(statusCode).send('<!doctype html>\n' + html);
  
                case 8:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, _this2);
          })());
  
        case 3:
          context$1$0.next = 8;
          break;
  
        case 5:
          context$1$0.prev = 5;
          context$1$0.t0 = context$1$0['catch'](0);
  
          next(context$1$0.t0);
  
        case 8:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this, [[0, 5]]);
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  var dbName = _configJson2['default'][("development")].database || ':memory:';
  console.log('Working with database ' + dbName);
  _sqlite2['default'].open(dbName, { verbose: true }).then(function () {
    server.listen(_config.port, function () {
      /* eslint-disable no-console */
      console.log('The server is running at http://localhost:' + _config.port + '/');
    });
  })['catch'](function (err) {
    return console.error(err);
  });

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-core/polyfill");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRoutingSrcRouter = __webpack_require__(7);
  
  var _reactRoutingSrcRouter2 = _interopRequireDefault(_reactRoutingSrcRouter);
  
  var _componentsApp = __webpack_require__(15);
  
  var _componentsApp2 = _interopRequireDefault(_componentsApp);
  
  var _componentsNotFoundPage = __webpack_require__(38);
  
  var _componentsNotFoundPage2 = _interopRequireDefault(_componentsNotFoundPage);
  
  var _componentsErrorPage = __webpack_require__(41);
  
  var _componentsErrorPage2 = _interopRequireDefault(_componentsErrorPage);
  
  var _componentsHomePage = __webpack_require__(44);
  
  var _componentsHomePage2 = _interopRequireDefault(_componentsHomePage);
  
  var _componentsSettingsPage = __webpack_require__(78);
  
  var _componentsSettingsPage2 = _interopRequireDefault(_componentsSettingsPage);
  
  var router = new _reactRoutingSrcRouter2['default'](function (on) {
    on('*', function callee$1$0(state, next) {
      var component;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(next());
  
          case 2:
            component = context$2$0.sent;
            return context$2$0.abrupt('return', component && _react2['default'].createElement(
              _componentsApp2['default'],
              { context: state.context },
              component
            ));
  
          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('/', function callee$1$0() {
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsHomePage2['default'], null));
  
          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('/settings', function callee$1$0() {
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsSettingsPage2['default'], null));
  
          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('error', function (state, error) {
      return state.statusCode === 404 ? _react2['default'].createElement(
        _componentsApp2['default'],
        { context: state.context, error: error },
        _react2['default'].createElement(_componentsNotFoundPage2['default'], null)
      ) : _react2['default'].createElement(
        _componentsApp2['default'],
        { context: state.context, error: error },
        _react2['default'].createElement(_componentsErrorPage2['default'], null)
      );
    });
  });
  
  exports['default'] = router;
  module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _Route = __webpack_require__(8);
  
  var _Route2 = _interopRequireDefault(_Route);
  
  var emptyFunction = function emptyFunction() {};
  
  var Router = (function () {
  
    /**
     * Creates a new instance of the `Router` class.
     */
  
    function Router(initialize) {
      _classCallCheck(this, Router);
  
      this.routes = [];
      this.events = Object.create(null);
  
      if (typeof initialize === 'function') {
        initialize(this.on.bind(this));
      }
    }
  
    /**
     * Adds a new route to the routing table or registers an event listener.
     *
     * @param {String} path A string in the Express format, an array of strings, or a regular expression.
     * @param {Function|Array} handlers Asynchronous route handler function(s).
     */
  
    _createClass(Router, [{
      key: 'on',
      value: function on(path) {
        for (var _len = arguments.length, handlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          handlers[_key - 1] = arguments[_key];
        }
  
        if (path === 'error') {
          this.events[path] = handlers[0];
        } else {
          this.routes.push(new _Route2['default'](path, handlers));
        }
      }
    }, {
      key: 'dispatch',
      value: function dispatch(state, cb) {
        var routes, handlers, value, result, done, next;
        return regeneratorRuntime.async(function dispatch$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              next = function next() {
                var _handlers$next;
  
                var _value, _value2, match, handler;
  
                return regeneratorRuntime.async(function next$(context$3$0) {
                  while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                      if (!((_handlers$next = handlers.next(), value = _handlers$next.value, done = _handlers$next.done, _handlers$next) && !done)) {
                        context$3$0.next = 16;
                        break;
                      }
  
                      _value = value;
                      _value2 = _slicedToArray(_value, 2);
                      match = _value2[0];
                      handler = _value2[1];
  
                      state.params = match.params;
  
                      if (!(handler.length > 1)) {
                        context$3$0.next = 12;
                        break;
                      }
  
                      context$3$0.next = 9;
                      return regeneratorRuntime.awrap(handler(state, next));
  
                    case 9:
                      context$3$0.t0 = context$3$0.sent;
                      context$3$0.next = 15;
                      break;
  
                    case 12:
                      context$3$0.next = 14;
                      return regeneratorRuntime.awrap(handler(state));
  
                    case 14:
                      context$3$0.t0 = context$3$0.sent;
  
                    case 15:
                      return context$3$0.abrupt('return', context$3$0.t0);
  
                    case 16:
                    case 'end':
                      return context$3$0.stop();
                  }
                }, null, this);
              };
  
              if (typeof state === 'string' || state instanceof String) {
                state = { path: state };
              }
              cb = cb || emptyFunction;
              routes = this.routes;
              handlers = regeneratorRuntime.mark(function callee$2$0() {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, route, match, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, handler;
  
                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                  while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      context$3$0.prev = 3;
                      _iterator = routes[Symbol.iterator]();
  
                    case 5:
                      if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        context$3$0.next = 38;
                        break;
                      }
  
                      route = _step.value;
                      match = route.match(state.path);
  
                      if (!match) {
                        context$3$0.next = 35;
                        break;
                      }
  
                      _iteratorNormalCompletion2 = true;
                      _didIteratorError2 = false;
                      _iteratorError2 = undefined;
                      context$3$0.prev = 12;
                      _iterator2 = match.route.handlers[Symbol.iterator]();
  
                    case 14:
                      if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        context$3$0.next = 21;
                        break;
                      }
  
                      handler = _step2.value;
                      context$3$0.next = 18;
                      return [match, handler];
  
                    case 18:
                      _iteratorNormalCompletion2 = true;
                      context$3$0.next = 14;
                      break;
  
                    case 21:
                      context$3$0.next = 27;
                      break;
  
                    case 23:
                      context$3$0.prev = 23;
                      context$3$0.t0 = context$3$0['catch'](12);
                      _didIteratorError2 = true;
                      _iteratorError2 = context$3$0.t0;
  
                    case 27:
                      context$3$0.prev = 27;
                      context$3$0.prev = 28;
  
                      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                      }
  
                    case 30:
                      context$3$0.prev = 30;
  
                      if (!_didIteratorError2) {
                        context$3$0.next = 33;
                        break;
                      }
  
                      throw _iteratorError2;
  
                    case 33:
                      return context$3$0.finish(30);
  
                    case 34:
                      return context$3$0.finish(27);
  
                    case 35:
                      _iteratorNormalCompletion = true;
                      context$3$0.next = 5;
                      break;
  
                    case 38:
                      context$3$0.next = 44;
                      break;
  
                    case 40:
                      context$3$0.prev = 40;
                      context$3$0.t1 = context$3$0['catch'](3);
                      _didIteratorError = true;
                      _iteratorError = context$3$0.t1;
  
                    case 44:
                      context$3$0.prev = 44;
                      context$3$0.prev = 45;
  
                      if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                      }
  
                    case 47:
                      context$3$0.prev = 47;
  
                      if (!_didIteratorError) {
                        context$3$0.next = 50;
                        break;
                      }
  
                      throw _iteratorError;
  
                    case 50:
                      return context$3$0.finish(47);
  
                    case 51:
                      return context$3$0.finish(44);
  
                    case 52:
                    case 'end':
                      return context$3$0.stop();
                  }
                }, callee$2$0, this, [[3, 40, 44, 52], [12, 23, 27, 35], [28,, 30, 34], [45,, 47, 51]]);
              })();
              value = undefined, result = undefined, done = false;
  
            case 6:
              if (done) {
                context$2$0.next = 16;
                break;
              }
  
              context$2$0.next = 9;
              return regeneratorRuntime.awrap(next());
  
            case 9:
              result = context$2$0.sent;
  
              if (!result) {
                context$2$0.next = 14;
                break;
              }
  
              state.statusCode = 200;
              cb(state, result);
              return context$2$0.abrupt('return');
  
            case 14:
              context$2$0.next = 6;
              break;
  
            case 16:
              if (!this.events.error) {
                context$2$0.next = 32;
                break;
              }
  
              context$2$0.prev = 17;
  
              state.statusCode = 404;
              context$2$0.next = 21;
              return regeneratorRuntime.awrap(this.events.error(state, new Error('Cannot found a route matching \'' + state.path + '\'.')));
  
            case 21:
              result = context$2$0.sent;
  
              cb(state, result);
              context$2$0.next = 32;
              break;
  
            case 25:
              context$2$0.prev = 25;
              context$2$0.t0 = context$2$0['catch'](17);
  
              state.statusCode = 500;
              context$2$0.next = 30;
              return regeneratorRuntime.awrap(this.events.error(state, context$2$0.t0));
  
            case 30:
              result = context$2$0.sent;
  
              cb(state, result);
  
            case 32:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this, [[17, 25]]);
      }
    }]);
  
    return Router;
  })();
  
  exports['default'] = Router;
  module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _pathToRegexp = __webpack_require__(9);
  
  var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);
  
  var _Match = __webpack_require__(11);
  
  var _Match2 = _interopRequireDefault(_Match);
  
  var Route = (function () {
    function Route(path, handlers) {
      _classCallCheck(this, Route);
  
      this.path = path;
      this.handlers = handlers;
      this.regExp = (0, _pathToRegexp2['default'])(path, this.keys = []);
    }
  
    _createClass(Route, [{
      key: 'match',
      value: function match(path) {
        var m = this.regExp.exec(path);
        return m ? new _Match2['default'](this, path, this.keys, m) : null;
      }
    }]);
  
    return Route;
  })();
  
  exports['default'] = Route;
  module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  var isarray = __webpack_require__(10)
  
  /**
   * Expose `pathToRegexp`.
   */
  module.exports = pathToRegexp
  module.exports.parse = parse
  module.exports.compile = compile
  module.exports.tokensToFunction = tokensToFunction
  module.exports.tokensToRegExp = tokensToRegExp
  
  /**
   * The main path matching regexp utility.
   *
   * @type {RegExp}
   */
  var PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    '(\\\\.)',
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
    // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
    '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
  ].join('|'), 'g')
  
  /**
   * Parse a string for the raw tokens.
   *
   * @param  {String} str
   * @return {Array}
   */
  function parse (str) {
    var tokens = []
    var key = 0
    var index = 0
    var path = ''
    var res
  
    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0]
      var escaped = res[1]
      var offset = res.index
      path += str.slice(index, offset)
      index = offset + m.length
  
      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1]
        continue
      }
  
      // Push the current path onto the tokens.
      if (path) {
        tokens.push(path)
        path = ''
      }
  
      var prefix = res[2]
      var name = res[3]
      var capture = res[4]
      var group = res[5]
      var suffix = res[6]
      var asterisk = res[7]
  
      var repeat = suffix === '+' || suffix === '*'
      var optional = suffix === '?' || suffix === '*'
      var delimiter = prefix || '/'
      var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')
  
      tokens.push({
        name: name || key++,
        prefix: prefix || '',
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        pattern: escapeGroup(pattern)
      })
    }
  
    // Match any characters still remaining.
    if (index < str.length) {
      path += str.substr(index)
    }
  
    // If the path exists, push it onto the end.
    if (path) {
      tokens.push(path)
    }
  
    return tokens
  }
  
  /**
   * Compile a string to a template function for the path.
   *
   * @param  {String}   str
   * @return {Function}
   */
  function compile (str) {
    return tokensToFunction(parse(str))
  }
  
  /**
   * Expose a method for transforming tokens into the path function.
   */
  function tokensToFunction (tokens) {
    // Compile all the tokens into regexps.
    var matches = new Array(tokens.length)
  
    // Compile all the patterns before compilation.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === 'object') {
        matches[i] = new RegExp('^' + tokens[i].pattern + '$')
      }
    }
  
    return function (obj) {
      var path = ''
      var data = obj || {}
  
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i]
  
        if (typeof token === 'string') {
          path += token
  
          continue
        }
  
        var value = data[token.name]
        var segment
  
        if (value == null) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined')
          }
        }
  
        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
          }
  
          if (value.length === 0) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty')
            }
          }
  
          for (var j = 0; j < value.length; j++) {
            segment = encodeURIComponent(value[j])
  
            if (!matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
            }
  
            path += (j === 0 ? token.prefix : token.delimiter) + segment
          }
  
          continue
        }
  
        segment = encodeURIComponent(value)
  
        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
        }
  
        path += token.prefix + segment
      }
  
      return path
    }
  }
  
  /**
   * Escape a regular expression string.
   *
   * @param  {String} str
   * @return {String}
   */
  function escapeString (str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
  }
  
  /**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {String} group
   * @return {String}
   */
  function escapeGroup (group) {
    return group.replace(/([=!:$\/()])/g, '\\$1')
  }
  
  /**
   * Attach the keys as a property of the regexp.
   *
   * @param  {RegExp} re
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function attachKeys (re, keys) {
    re.keys = keys
    return re
  }
  
  /**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {String}
   */
  function flags (options) {
    return options.sensitive ? '' : 'i'
  }
  
  /**
   * Pull out keys from a regexp.
   *
   * @param  {RegExp} path
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function regexpToRegexp (path, keys) {
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g)
  
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          pattern: null
        })
      }
    }
  
    return attachKeys(path, keys)
  }
  
  /**
   * Transform an array into a regexp.
   *
   * @param  {Array}  path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function arrayToRegexp (path, keys, options) {
    var parts = []
  
    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source)
    }
  
    var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))
  
    return attachKeys(regexp, keys)
  }
  
  /**
   * Create a path regexp from string input.
   *
   * @param  {String} path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function stringToRegexp (path, keys, options) {
    var tokens = parse(path)
    var re = tokensToRegExp(tokens, options)
  
    // Attach keys back to the regexp.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] !== 'string') {
        keys.push(tokens[i])
      }
    }
  
    return attachKeys(re, keys)
  }
  
  /**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {Array}  tokens
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function tokensToRegExp (tokens, options) {
    options = options || {}
  
    var strict = options.strict
    var end = options.end !== false
    var route = ''
    var lastToken = tokens[tokens.length - 1]
    var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)
  
    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]
  
      if (typeof token === 'string') {
        route += escapeString(token)
      } else {
        var prefix = escapeString(token.prefix)
        var capture = token.pattern
  
        if (token.repeat) {
          capture += '(?:' + prefix + capture + ')*'
        }
  
        if (token.optional) {
          if (prefix) {
            capture = '(?:' + prefix + '(' + capture + '))?'
          } else {
            capture = '(' + capture + ')?'
          }
        } else {
          capture = prefix + '(' + capture + ')'
        }
  
        route += capture
      }
    }
  
    // In non-strict mode we allow a slash at the end of match. If the path to
    // match already ends with a slash, we remove it for consistency. The slash
    // is valid at the end of a path match, not in the middle. This is important
    // in non-ending mode, where "/test/" shouldn't match "/test//route".
    if (!strict) {
      route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
    }
  
    if (end) {
      route += '$'
    } else {
      // In non-ending mode, we need the capturing groups to match as much as
      // possible by using a positive lookahead to the end or next path segment.
      route += strict && endsWithSlash ? '' : '(?=\\/|$)'
    }
  
    return new RegExp('^' + route, flags(options))
  }
  
  /**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(String|RegExp|Array)} path
   * @param  {Array}                 [keys]
   * @param  {Object}                [options]
   * @return {RegExp}
   */
  function pathToRegexp (path, keys, options) {
    keys = keys || []
  
    if (!isarray(keys)) {
      options = keys
      keys = []
    } else if (!options) {
      options = {}
    }
  
    if (path instanceof RegExp) {
      return regexpToRegexp(path, keys, options)
    }
  
    if (isarray(path)) {
      return arrayToRegexp(path, keys, options)
    }
  
    return stringToRegexp(path, keys, options)
  }


/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
  };


/***/ },
/* 11 */
/***/ function(module, exports) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var Match = function Match(route, path, keys, match) {
    _classCallCheck(this, Match);
  
    this.route = route;
    this.path = path;
    this.params = Object.create(null);
    for (var i = 1; i < match.length; i++) {
      this.params[keys[i - 1].name] = decodeParam(match[i]);
    }
  };
  
  function decodeParam(val) {
    if (!(typeof val === 'string' || val instanceof String)) {
      return val;
    }
  
    try {
      return decodeURIComponent(val);
    } catch (e) {
      var err = new TypeError('Failed to decode param \'' + val + '\'');
      err.status = 400;
      throw err;
    }
  }
  
  exports['default'] = Match;
  module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _nodeFetch = __webpack_require__(13);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(14);
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2['default'])(localUrl(url), options);
  }
  
  exports['default'] = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 14 */
/***/ function(module, exports) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var port = process.env.PORT || 5000;
  exports.port = port;
  var host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  exports.host = host;
  var googleAnalyticsId = 'UA-XXXXX-X';
  exports.googleAnalyticsId = googleAnalyticsId;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fbjsLibEmptyFunction = __webpack_require__(16);
  
  var _fbjsLibEmptyFunction2 = _interopRequireDefault(_fbjsLibEmptyFunction);
  
  var _AppScss = __webpack_require__(17);
  
  var _AppScss2 = _interopRequireDefault(_AppScss);
  
  var _Header = __webpack_require__(21);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Footer = __webpack_require__(32);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _modelsDaytime = __webpack_require__(105);
  
  var _modelsDaytime2 = _interopRequireDefault(_modelsDaytime);
  
  var App = (function (_Component) {
    _inherits(App, _Component);
  
    function App() {
      _classCallCheck(this, App);
  
      _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _fbjsLibEmptyFunction2['default'],
          onSetTitle: context.onSetTitle || _fbjsLibEmptyFunction2['default'],
          onSetMeta: context.onSetMeta || _fbjsLibEmptyFunction2['default'],
          onPageNotFound: context.onPageNotFound || _fbjsLibEmptyFunction2['default']
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.removeCss = this.props.context.insertCss(_AppScss2['default']);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'render',
      value: function render() {
        var className = _modelsDaytime2['default'].isNight() ? _AppScss2['default'].containerNight : _AppScss2['default'].containerDay;
        return !this.props.error ? _react2['default'].createElement(
          'div',
          { className: className },
          _react2['default'].createElement(
            'div',
            { className: _AppScss2['default'].container },
            _react2['default'].createElement(_Header2['default'], null),
            _react2['default'].createElement(
              'main',
              { className: _AppScss2['default'].pageMain },
              this.props.children
            ),
            _react2['default'].createElement(_Footer2['default'], null)
          )
        ) : this.props.children;
      }
    }], [{
      key: 'propTypes',
      value: {
        context: _react.PropTypes.shape({
          insertCss: _react.PropTypes.func,
          onSetTitle: _react.PropTypes.func,
          onSetMeta: _react.PropTypes.func,
          onPageNotFound: _react.PropTypes.func
        }),
        children: _react.PropTypes.element.isRequired,
        error: _react.PropTypes.object
      },
      enumerable: true
    }, {
      key: 'childContextTypes',
      value: {
        insertCss: _react.PropTypes.func.isRequired,
        onSetTitle: _react.PropTypes.func.isRequired,
        onSetMeta: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    return App;
  })(_react.Component);
  
  exports['default'] = App;
  module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(18);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./App.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./App.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio, canvas, progress, video {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n\n[hidden], template {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\n\na:active, a:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb, strong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub, sup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode, kbd, pre, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton, input, optgroup, select, textarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton, select {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton, html input[type=\"button\"], input[type=\"reset\"], input[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled], html input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner, input::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"], input[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button, input[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box; /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button, input[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd, th {\n  padding: 0;\n} /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n\r\n* {\r\n  -webkit-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n}\r\n\r\na, a:link, a:visited, a:active {\r\n  color: #E16C51;\r\n}\r\n\r\na:hover, a:focus {\r\n  color: #97918A;\r\n}\r\n\r\nhtml {\r\n  color: #222;\r\n  font-weight: 100;\r\n  font-size: 1em;\r\n  font-family: 'Segoe UI','HelveticaNeue-Light',sans-serif;\r\n  line-height: 1.375;\r\n}\r\n\r\nbody {\r\n  background-color: #fff;\r\n}\r\n\r\nbody, .App_containerDay_ZPM, .App_containerNight_xEF, .App_container_3x2 {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  min-height: 100vh;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n  -webkit-flex-direction: column;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n}\r\n\r\n.App_containerNight_xEF {\r\n  background-color: #101010;\r\n  color: #97918A;\r\n}\r\n\r\nmain {\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1 0 auto;\r\n      -ms-flex: 1 0 auto;\r\n          flex: 1 0 auto;\r\n}\r\n\r\n.App_container_3x2 {\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\n\r\n::-moz-selection {\r\n  background: #b3d4fc;\r\n  text-shadow: none;\r\n}\r\n\r\n::selection {\r\n  background: #b3d4fc;\r\n  text-shadow: none;\r\n}\r\n\r\nhr {\r\n  display: block;\r\n  height: 1px;\r\n  border: 0;\r\n  border-top: 1px solid #ccc;\r\n  margin: 1em 0;\r\n  padding: 0;\r\n}\r\n\r\naudio, canvas, iframe, img, svg, video {\r\n  vertical-align: middle;\r\n}\r\n\r\nfieldset {\r\n  border: 0;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\ntextarea {\r\n  resize: vertical;\r\n}\r\n\r\ninput[type=\"text\"], input[type=\"search\"], select {\r\n  -webkit-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n  display: block;\r\n  width: 100%;\r\n  padding: 6px;\r\n  font-size: 14px;\r\n  line-height: 1.42857143;\r\n  color: #555;\r\n  background-color: #fff;\r\n  background-image: none;\r\n  border: 1px solid #ccc;\r\n  border-radius: 2px;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);\r\n  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;\r\n  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\r\n  transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;\r\n  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\r\n  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s\r\n}\r\n\r\ninput[type=\"text\"]:focus, input[type=\"search\"]:focus, select:focus {\n  border-color: #E16C51;\n  outline: 0;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(225,108,81,.6);\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(225,108,81,.6);\n}\r\n\r\nselect {\r\n  height: 34px;\r\n}\r\n\r\ninput[type=\"search\"]::-webkit-search-cancel-button {\r\n  -webkit-appearance: searchfield-cancel-button;\r\n}\r\n\r\nbutton, input, select, textarea {\r\n  font: inherit;\r\n}\r\n\r\nbutton {\r\n  display: inline-block;\r\n  padding: 6px 12px;\r\n  margin-bottom: 0;\r\n  font-size: 14px;\r\n  font-weight: 700;\r\n  line-height: 1.42857143;\r\n  text-align: center;\r\n  white-space: nowrap;\r\n  vertical-align: middle;\r\n  -ms-touch-action: manipulation;\r\n  touch-action: manipulation;\r\n  cursor: pointer;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n  background-image: none;\r\n  border: 1px solid #ccc;\r\n  color: #333;\r\n  background-color: #fff;\r\n  border-radius: 4px\r\n}\r\n\r\nbutton:focus, button:hover {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\r\n\r\nbutton:disabled {\n  color: #777;\n  background-color: #f1f1f1;\n}\r\n\r\nbutton:disabled:focus, button:disabled:hover {\n  color: #777;\n  background-color: #f1f1f1;\n  border-color: #ccc;\n}\r\n\r\n@media print {\r\n  *, *:before, *:after {\r\n    background: transparent !important;\r\n    color: #000 !important;\r\n    -webkit-box-shadow: none !important;\r\n            box-shadow: none !important;\r\n    text-shadow: none !important;\r\n  }\r\n\r\n  a, a:visited {\r\n    text-decoration: underline;\r\n  }\r\n\r\n  a[href]:after {\r\n    content: \" (\" attr(href) \")\";\r\n  }\r\n\r\n  abbr[title]:after {\r\n    content: \" (\" attr(title) \")\";\r\n  }\r\n\r\n  a[href^=\"#\"]:after, a[href^=\"javascript:\"]:after {\r\n    content: \"\";\r\n  }\r\n\r\n  pre, blockquote {\r\n    border: 1px solid #999;\r\n    page-break-inside: avoid;\r\n  }\r\n\r\n  thead {\r\n    display: table-header-group;\r\n  }\r\n\r\n  tr, img {\r\n    page-break-inside: avoid;\r\n  }\r\n\r\n  img {\r\n    max-width: 100% !important;\r\n  }\r\n\r\n  p, h2, h3 {\r\n    orphans: 3;\r\n    widows: 3;\r\n  }\r\n\r\n  h2, h3 {\r\n    page-break-after: avoid;\r\n  }\r\n}\r\n\r\n@media (min-width: 992px) {\r\n  .App_container_3x2 {\r\n    width: 700px;\r\n  }\r\n}\r\n", "", {"version":3,"sources":["/./node_modules/normalize.css/normalize.css","/./src/components/variables.scss","/./src/components/App/App.scss"],"names":[],"mappings":"AAAA,4EAA4E;;AAE5E;;;;GAIG;;AAEH;EACE,wBAAwB,CAAC,OAAO;EAChC,2BAA2B,CAAC,OAAO;EACnC,+BAA+B,CAAC,OAAO;CACxC;;AAED;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;gFACgF;;AAEhF;;;;;GAKG;;AAEH;EAaE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;EAIE,sBAAsB,CAAC,OAAO;EAC9B,yBAAyB,CAAC,OAAO;CAClC;;AAED;;;GAGG;;AAEH;EACE,cAAc;EACd,UAAU;CACX;;AAED;;;GAGG;;AAEH;EAEE,cAAc;CACf;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,8BAA8B;CAC/B;;AAED;;;GAGG;;AAEH;EAEE,WAAW;CACZ;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,0BAA0B;CAC3B;;AAED;;GAEG;;AAEH;EAEE,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;;GAGG;;AAEH;EACE,eAAe;EACf,iBAAiB;CAClB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;EACjB,YAAY;CACb;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;GAEG;;AAEH;EAEE,eAAe;EACf,eAAe;EACf,mBAAmB;EACnB,yBAAyB;CAC1B;;AAED;EACE,YAAY;CACb;;AAED;EACE,gBAAgB;CACjB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;GAEG;;AAEH;EACE,gCAAwB;UAAxB,wBAAwB;EACxB,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;GAEG;;AAEH;EAIE,kCAAkC;EAClC,eAAe;CAChB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;;GAKG;;AAEH;EAKE,eAAe,CAAC,OAAO;EACvB,cAAc,CAAC,OAAO;EACtB,UAAU,CAAC,OAAO;CACnB;;AAED;;GAEG;;AAEH;EACE,kBAAkB;CACnB;;AAED;;;;;GAKG;;AAEH;EAEE,qBAAqB;CACtB;;AAED;;;;;;GAMG;;AAEH;EAIE,2BAA2B,CAAC,OAAO;EACnC,gBAAgB,CAAC,OAAO;CACzB;;AAED;;GAEG;;AAEH;EAEE,gBAAgB;CACjB;;AAED;;GAEG;;AAEH;EAEE,UAAU;EACV,WAAW;CACZ;;AAED;;;GAGG;;AAEH;EACE,oBAAoB;CACrB;;AAED;;;;;;GAMG;;AAEH;EAEE,+BAAuB;UAAvB,uBAAuB,CAAC,OAAO;EAC/B,WAAW,CAAC,OAAO;CACpB;;AAED;;;;GAIG;;AAEH;EAEE,aAAa;CACd;;AAED;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,gCAAwB;UAAxB,wBAAwB,CAAC,OAAO;CACjC;;AAED;;;;GAIG;;AAEH;EAEE,yBAAyB;CAC1B;;AAED;;GAEG;;AAEH;EACE,0BAA0B;EAC1B,cAAc;EACd,+BAA+B;CAChC;;AAED;;;GAGG;;AAEH;EACE,UAAU,CAAC,OAAO;EAClB,WAAW,CAAC,OAAO;CACpB;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;EACE,kBAAkB;CACnB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,0BAA0B;EAC1B,kBAAkB;CACnB;;AAED;EAEE,WAAW;CACZ,CCtauD,UAAU,GACV,aAAa,CACb,UAAU,CACV,UAAU,CACV,UAAU,EASlC,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;;ACbjE;EACE,+BAA+B;EAE/B,uBAAuB;CACxB;;AAED;EACE,eAAmB;CACpB;;AAED;EACE,eAAyB;CAC1B;;AAED;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;EACf,yDAA+B;EAC/B,mBAAmB;CACpB;;AAED;EACE,uBAAuB;CACxB;;AAED;EACE,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,kBAAkB;EAClB,6BAAuB;EAAvB,8BAAuB;EAAvB,+BAAuB;MAAvB,2BAAuB;UAAvB,uBAAuB;CACxB;;AAED;EACE,0BAA0B;EAC1B,eAAe;CAChB;;AAED;EACE,oBAAe;EAAf,uBAAe;MAAf,mBAAe;UAAf,eAAe;CAChB;;AAED;EACE,kBAAkB;EAClB,mBAAmB;CACpB;;AAED;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;EACE,eAAe;EACf,YAAY;EACZ,UAAU;EACV,2BAA2B;EAC3B,cAAc;EACd,WAAW;CACZ;;AAED;EAME,uBAAuB;CACxB;;AAED;EACE,UAAU;EACV,UAAU;EACV,WAAW;CACZ;;AAED;EACE,iBAAiB;CAClB;;AAED;EAGE,+BAA+B;EAC/B,uBAAuB;EACvB,eAAe;EACf,YAAY;EACZ,aAAa;EACb,gBAAgB;EAChB,wBAAwB;EACxB,YAAY;EACZ,uBAAuB;EACvB,uBAAuB;EACvB,uBAAuB;EACvB,mBAAmB;EACnB,qDAAqD;EACrD,6CAA6C;EAC7C,sFAAsF;EACtF,yEAAyE;EACzE,8EAAsE;EAAtE,sEAAsE;EAAtE,yGAAsE;CAQvE;;AANC;EACE,sBAAsB;EACtB,WAAW;EACX,iFAAiF;EACjF,yEAAyE;CAC1E;;AAGH;EACE,aAAa;CACd;;AAED;EACE,8CAA8C;CAC/C;;AAED;EACE,cAAc;CACf;;AAED;EACE,sBAAsB;EACtB,kBAAkB;EAClB,iBAAiB;EACjB,gBAAgB;EAChB,iBAAiB;EACjB,wBAAwB;EACxB,mBAAmB;EACnB,oBAAoB;EACpB,uBAAuB;EACvB,+BAA+B;EAC/B,2BAA2B;EAC3B,gBAAgB;EAChB,0BAA0B;EAC1B,uBAAuB;EACvB,sBAAsB;EACtB,kBAAkB;EAClB,uBAAuB;EACvB,uBAAuB;EACvB,YAAY;EACZ,uBAAuB;EACvB,kBAAmB;CAkBpB;;AAhBC;EACE,YAAY;EACZ,0BAA0B;EAC1B,sBAAsB;CACvB;;AAED;EACE,YAAY;EACZ,0BAA0B;CAO3B;;AALC;EACE,YAAY;EACZ,0BAA0B;EAC1B,mBAAmB;CACpB;;AAIL;EACE;IAGE,mCAAmC;IACnC,uBAAuB;IACvB,oCAA4B;YAA5B,4BAA4B;IAC5B,6BAA6B;GAC9B;;EAED;IAEE,2BAA2B;GAC5B;;EAED;IACE,6BAA6B;GAC9B;;EAED;IACE,8BAA8B;GAC/B;;EAED;IAEE,YAAY;GACb;;EAED;IAEE,uBAAuB;IACvB,yBAAyB;GAC1B;;EAED;IACE,4BAA4B;GAC7B;;EAED;IAEE,yBAAyB;GAC1B;;EAED;IACE,2BAA2B;GAC5B;;EAED;IAGE,WAAW;IACX,UAAU;GACX;;EAED;IAEE,wBAAwB;GACzB;CACF;;AAED;EACE;IACE,aAAa;GACd;CACF","file":"App.scss","sourcesContent":["/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  box-sizing: content-box; /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n","$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n$link-color: #E16C51;\r\n$link-hover-color: #97918A;\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n$max-content-width:     1000px;\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n","@import '../../../node_modules/normalize.css/normalize.css';\r\n\r\n@import '../variables.scss';\r\n\r\n* {\r\n  -webkit-box-sizing: border-box;\r\n  -moz-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n}\r\n\r\na, a:link, a:visited, a:active {\r\n  color: $link-color;\r\n}\r\n\r\na:hover, a:focus {\r\n  color: $link-hover-color;\r\n}\r\n\r\nhtml {\r\n  color: #222;\r\n  font-weight: 100;\r\n  font-size: 1em;\r\n  font-family: $font-family-base;\r\n  line-height: 1.375;\r\n}\r\n\r\nbody {\r\n  background-color: #fff;\r\n}\r\n\r\nbody, .containerDay, .containerNight, .container {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  flex-direction: column;\r\n}\r\n\r\n.containerNight {\r\n  background-color: #101010;\r\n  color: #97918A;\r\n}\r\n\r\nmain {\r\n  flex: 1 0 auto;\r\n}\r\n\r\n.container {\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\n\r\n::-moz-selection {\r\n  background: #b3d4fc;\r\n  text-shadow: none;\r\n}\r\n\r\n::selection {\r\n  background: #b3d4fc;\r\n  text-shadow: none;\r\n}\r\n\r\nhr {\r\n  display: block;\r\n  height: 1px;\r\n  border: 0;\r\n  border-top: 1px solid #ccc;\r\n  margin: 1em 0;\r\n  padding: 0;\r\n}\r\n\r\naudio,\r\ncanvas,\r\niframe,\r\nimg,\r\nsvg,\r\nvideo {\r\n  vertical-align: middle;\r\n}\r\n\r\nfieldset {\r\n  border: 0;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\ntextarea {\r\n  resize: vertical;\r\n}\r\n\r\ninput[type=\"text\"],\r\ninput[type=\"search\"],\r\nselect {\r\n  -webkit-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n  display: block;\r\n  width: 100%;\r\n  padding: 6px;\r\n  font-size: 14px;\r\n  line-height: 1.42857143;\r\n  color: #555;\r\n  background-color: #fff;\r\n  background-image: none;\r\n  border: 1px solid #ccc;\r\n  border-radius: 2px;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);\r\n  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;\r\n  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\r\n  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\r\n\r\n  &:focus {\r\n    border-color: #E16C51;\r\n    outline: 0;\r\n    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(225,108,81,.6);\r\n    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(225,108,81,.6);\r\n  }\r\n}\r\n\r\nselect {\r\n  height: 34px;\r\n}\r\n\r\ninput[type=\"search\"]::-webkit-search-cancel-button {\r\n  -webkit-appearance: searchfield-cancel-button;\r\n}\r\n\r\nbutton, input, select, textarea {\r\n  font: inherit;\r\n}\r\n\r\nbutton {\r\n  display: inline-block;\r\n  padding: 6px 12px;\r\n  margin-bottom: 0;\r\n  font-size: 14px;\r\n  font-weight: 700;\r\n  line-height: 1.42857143;\r\n  text-align: center;\r\n  white-space: nowrap;\r\n  vertical-align: middle;\r\n  -ms-touch-action: manipulation;\r\n  touch-action: manipulation;\r\n  cursor: pointer;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n  background-image: none;\r\n  border: 1px solid #ccc;\r\n  color: #333;\r\n  background-color: #fff;\r\n  border-radius: 4px;\r\n\r\n  &:focus, &:hover {\r\n    color: #333;\r\n    background-color: #e6e6e6;\r\n    border-color: #adadad;\r\n  }\r\n\r\n  &:disabled {\r\n    color: #777;\r\n    background-color: #f1f1f1;\r\n\r\n    &:focus, &:hover {\r\n      color: #777;\r\n      background-color: #f1f1f1;\r\n      border-color: #ccc;\r\n    }\r\n  }\r\n}\r\n\r\n@media print {\r\n  *,\r\n  *:before,\r\n  *:after {\r\n    background: transparent !important;\r\n    color: #000 !important;\r\n    box-shadow: none !important;\r\n    text-shadow: none !important;\r\n  }\r\n\r\n  a,\r\n  a:visited {\r\n    text-decoration: underline;\r\n  }\r\n\r\n  a[href]:after {\r\n    content: \" (\" attr(href) \")\";\r\n  }\r\n\r\n  abbr[title]:after {\r\n    content: \" (\" attr(title) \")\";\r\n  }\r\n\r\n  a[href^=\"#\"]:after,\r\n  a[href^=\"javascript:\"]:after {\r\n    content: \"\";\r\n  }\r\n\r\n  pre,\r\n  blockquote {\r\n    border: 1px solid #999;\r\n    page-break-inside: avoid;\r\n  }\r\n\r\n  thead {\r\n    display: table-header-group;\r\n  }\r\n\r\n  tr,\r\n  img {\r\n    page-break-inside: avoid;\r\n  }\r\n\r\n  img {\r\n    max-width: 100% !important;\r\n  }\r\n\r\n  p,\r\n  h2,\r\n  h3 {\r\n    orphans: 3;\r\n    widows: 3;\r\n  }\r\n\r\n  h2,\r\n  h3 {\r\n    page-break-after: avoid;\r\n  }\r\n}\r\n\r\n@media (min-width: $screen-md-min) {\r\n  .container {\r\n    width: 700px;\r\n  }\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"containerDay": "App_containerDay_ZPM",
  	"containerNight": "App_containerNight_xEF",
  	"container": "App_container_3x2"
  };

/***/ },
/* 19 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 20 */
/***/ function(module, exports) {

  'use strict';
  
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  var canUseURL = typeof URL === 'function' && typeof URL.createObjectURL === 'function' && typeof URL.revokeObjectURL === 'function' && typeof Blob === 'function' && typeof btoa === 'function';
  
  /**
   * Remove style/link elements for specified Module IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = ids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] === 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
            if (canUseURL && elem.tagName === 'STYLE' && elem.href) {
              URL.revokeObjectURL(elem.href);
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
    var _Object$assign = Object.assign({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;
  
    try {
  
      for (var _iterator2 = styles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 4);
  
        var id = _step2$value[0];
        var css = _step2$value[1];
        var media = _step2$value[2];
        var sourceMap = _step2$value[3];
  
        if (inserted[id]) {
          if (!replace) {
            inserted[id]++;
            continue;
          }
        }
  
        inserted[id] = 1;
  
        var elem = document.getElementById(prefix + id);
        var create = false;
  
        if (!elem) {
          create = true;
  
          if (sourceMap && canUseURL) {
            elem = document.createElement('link');
            elem.setAttribute('rel', 'stylesheet');
          } else {
            elem = document.createElement('style');
            elem.setAttribute('type', 'text/css');
          }
  
          elem.id = prefix + id;
  
          if (media) {
            elem.setAttribute('media', media);
          }
        }
  
        if (elem.tagName === 'STYLE') {
          if ('textContent' in elem) {
            elem.textContent = css;
          } else {
            elem.styleSheet.cssText = css;
          }
        } else {
          var blob = new Blob([css + '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'], { type: 'text/css' });
  
          var href = elem.href;
          elem.href = URL.createObjectURL(blob);
  
          if (href) {
            URL.revokeObjectURL(href);
          }
        }
  
        if (create) {
          if (prepend) {
            document.head.insertBefore(elem, document.head.childNodes[0]);
          } else {
            document.head.appendChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  
    return removeCss.bind(null, styles.map(function (x) {
      return x[0];
    }));
  }
  
  module.exports = insertCss;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeaderScss = __webpack_require__(22);
  
  var _HeaderScss2 = _interopRequireDefault(_HeaderScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Link = __webpack_require__(25);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var Header = (function (_Component) {
    _inherits(Header, _Component);
  
    function Header() {
      _classCallCheck(this, _Header);
  
      _get(Object.getPrototypeOf(_Header.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Header, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'header',
          { className: _HeaderScss2['default'].pageHeader },
          _react2['default'].createElement(
            'h1',
            { className: _HeaderScss2['default'].pageTitle },
            _react2['default'].createElement(
              'a',
              { href: '/' },
              'Hue Steamer'
            )
          ),
          _react2['default'].createElement(
            'nav',
            { className: _HeaderScss2['default'].mainNav },
            _react2['default'].createElement(
              'ul',
              null,
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _HeaderScss2['default'].brand, to: '/settings' },
                  'Settings'
                )
              ),
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _HeaderScss2['default'].brand, to: '/' },
                  'Home'
                )
              )
            )
          )
        );
      }
    }]);
  
    var _Header = Header;
    Header = (0, _decoratorsWithStyles2['default'])(_HeaderScss2['default'])(Header) || Header;
    return Header;
  })(_react.Component);
  
  exports['default'] = Header;
  module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(23);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Header.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Header.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n\r\n.Header_pageHeader_2ZM {\r\n  display: table;\r\n  width: 100%;\r\n}\r\n\r\n.Header_pageTitle_3Dz {\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n}\r\n\r\n.Header_pageTitle_3Dz a {\r\n  text-decoration: none;\r\n}\r\n\r\n.Header_mainNav_2qu {\r\n  text-align: right;\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n}\r\n\r\n.Header_mainNav_2qu ul {\r\n  list-style: none;\r\n  padding-left: 0;\r\n}\r\n\r\n.Header_mainNav_2qu ul li {\r\n  display: inline-block;\r\n}\r\n\r\n.Header_mainNav_2qu ul li + li {\r\n  margin-left: 1em;\r\n}\r\n\r\n.Header_mainNav_2qu ul li a {\r\n  text-decoration: none;\r\n}\r\n", "", {"version":3,"sources":["/./src/components/variables.scss","/./src/components/Header/Header.scss"],"names":[],"mappings":"AACwD,UAAU,GACV,aAAa,CACb,UAAU,CACV,UAAU,CACV,UAAU,EASlC,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;;ACfjE;EACE,eAAe;EACf,YAAY;CACb;;AAED;EACE,oBAAoB;EACpB,uBAAuB;CAKxB;;AAHC;EACE,sBAAsB;CACvB;;AAGH;EACE,kBAAkB;EAClB,oBAAoB;EACpB,uBAAuB;CAkBxB;;AAhBC;EACE,iBAAiB;EACjB,gBAAgB;CAajB;;AAXC;EACE,sBAAsB;CASvB;;AAPC;EACE,iBAAiB;CAClB;;AAED;EACE,sBAAsB;CACvB","file":"Header.scss","sourcesContent":["$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n$link-color: #E16C51;\r\n$link-hover-color: #97918A;\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n$max-content-width:     1000px;\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n","@import '../variables.scss';\r\n\r\n.pageHeader {\r\n  display: table;\r\n  width: 100%;\r\n}\r\n\r\n.pageTitle {\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n\r\n  a {\r\n    text-decoration: none;\r\n  }\r\n}\r\n\r\n.mainNav {\r\n  text-align: right;\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n\r\n  ul {\r\n    list-style: none;\r\n    padding-left: 0;\r\n\r\n    li {\r\n      display: inline-block;\r\n\r\n      + li {\r\n        margin-left: 1em;\r\n      }\r\n\r\n      a {\r\n        text-decoration: none;\r\n      }\r\n    }\r\n  }\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"pageHeader": "Header_pageHeader_2ZM",
  	"pageTitle": "Header_pageTitle_3Dz",
  	"mainNav": "Header_mainNav_2qu"
  };

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  function withStyles() {
    for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }
  
    return function (BaseComponent) {
      return (function (_Component) {
        _inherits(StyledComponent, _Component);
  
        function StyledComponent() {
          _classCallCheck(this, StyledComponent);
  
          _get(Object.getPrototypeOf(StyledComponent.prototype), 'constructor', this).apply(this, arguments);
        }
  
        _createClass(StyledComponent, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            this.removeCss = this.context.insertCss.apply(undefined, styles);
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            this.removeCss();
          }
        }, {
          key: 'render',
          value: function render() {
            return _react2['default'].createElement(BaseComponent, this.props);
          }
        }], [{
          key: 'contextTypes',
          value: {
            insertCss: _react.PropTypes.func.isRequired
          },
          enumerable: true
        }]);
  
        return StyledComponent;
      })(_react.Component);
    };
  }
  
  exports['default'] = withStyles;
  module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _historyLibParsePath = __webpack_require__(26);
  
  var _historyLibParsePath2 = _interopRequireDefault(_historyLibParsePath);
  
  var _coreLocation = __webpack_require__(27);
  
  var _coreLocation2 = _interopRequireDefault(_coreLocation);
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = (function (_Component) {
    _inherits(Link, _Component);
  
    function Link() {
      _classCallCheck(this, Link);
  
      _get(Object.getPrototypeOf(Link.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var to = _props.to;
        var query = _props.query;
  
        var props = _objectWithoutProperties(_props, ['to', 'query']);
  
        return _react2['default'].createElement('a', _extends({ href: _coreLocation2['default'].createHref(to, query), onClick: Link.handleClick.bind(this) }, props));
      }
    }], [{
      key: 'propTypes',
      value: {
        to: _react.PropTypes.string.isRequired,
        query: _react.PropTypes.object,
        state: _react.PropTypes.object,
        onClick: _react.PropTypes.func
      },
      enumerable: true
    }, {
      key: 'handleClick',
      value: function value(event) {
        var allowTransition = true;
        var clickResult = undefined;
  
        if (_this.props && _this.props.onClick) {
          clickResult = _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (clickResult === false || event.defaultPrevented === true) {
          allowTransition = false;
        }
  
        event.preventDefault();
  
        if (allowTransition) {
          var link = event.currentTarget;
          if (_this.props && _this.props.to) {
            _coreLocation2['default'].push(_extends({}, (0, _historyLibParsePath2['default'])(_this.props.to), {
              state: _this.props && _this.props.state || null
            }));
          } else {
            _coreLocation2['default'].push({
              pathname: link.pathname,
              search: link.search,
              state: _this.props && _this.props.state || null
            });
          }
        }
      },
      enumerable: true
    }]);
  
    return Link;
  })(_react.Component);
  
  exports['default'] = Link;
  module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports) {

  module.exports = require("history/lib/parsePath");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _fbjsLibExecutionEnvironment = __webpack_require__(28);
  
  var _historyLibCreateBrowserHistory = __webpack_require__(29);
  
  var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);
  
  var _historyLibCreateMemoryHistory = __webpack_require__(30);
  
  var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);
  
  var _historyLibUseQueries = __webpack_require__(31);
  
  var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);
  
  var location = (0, _historyLibUseQueries2['default'])(_fbjsLibExecutionEnvironment.canUseDOM ? _historyLibCreateBrowserHistory2['default'] : _historyLibCreateMemoryHistory2['default'])();
  
  exports['default'] = location;
  module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/ExecutionEnvironment");

/***/ },
/* 29 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 30 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 31 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FooterScss = __webpack_require__(33);
  
  var _FooterScss2 = _interopRequireDefault(_FooterScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var Footer = (function (_Component) {
    _inherits(Footer, _Component);
  
    function Footer() {
      _classCallCheck(this, _Footer);
  
      _get(Object.getPrototypeOf(_Footer.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Footer, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'footer',
          { className: _FooterScss2['default'].pageFooter },
          '© 2016 Sarah Vessels'
        );
      }
    }]);
  
    var _Footer = Footer;
    Footer = (0, _decoratorsWithStyles2['default'])(_FooterScss2['default'])(Footer) || Footer;
    return Footer;
  })(_react.Component);
  
  exports['default'] = Footer;
  module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(34);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Footer.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Footer.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n\r\n.Footer_pageFooter_3Fc {\r\n  padding: 20px 0 40px 0;\r\n}\r\n", "", {"version":3,"sources":["/./src/components/variables.scss","/./src/components/Footer/Footer.scss"],"names":[],"mappings":"AACwD,UAAU,GACV,aAAa,CACb,UAAU,CACV,UAAU,CACV,UAAU,EASlC,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;;ACfjE;EACE,uBAAuB;CACxB","file":"Footer.scss","sourcesContent":["$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n$link-color: #E16C51;\r\n$link-hover-color: #97918A;\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n$max-content-width:     1000px;\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n","@import '../variables.scss';\r\n\r\n.pageFooter {\r\n  padding: 20px 0 40px 0;\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"pageFooter": "Footer_pageFooter_3Fc"
  };

/***/ },
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _NotFoundPageScss = __webpack_require__(39);
  
  var _NotFoundPageScss2 = _interopRequireDefault(_NotFoundPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var title = 'Page Not Found';
  
  var NotFoundPage = (function (_Component) {
    _inherits(NotFoundPage, _Component);
  
    function NotFoundPage() {
      _classCallCheck(this, _NotFoundPage);
  
      _get(Object.getPrototypeOf(_NotFoundPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(NotFoundPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
        this.context.onPageNotFound();
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h1',
            null,
            title
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Sorry, but the page you were trying to view does not exist.'
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _NotFoundPage = NotFoundPage;
    NotFoundPage = (0, _decoratorsWithStyles2['default'])(_NotFoundPageScss2['default'])(NotFoundPage) || NotFoundPage;
    return NotFoundPage;
  })(_react.Component);
  
  exports['default'] = NotFoundPage;
  module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(40);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./NotFoundPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./NotFoundPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n  }\r\n\r\n}\r\n", "", {"version":3,"sources":["/./src/components/NotFoundPage/NotFoundPage.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,UAAU;EACV,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,wBAAwB;CACzB;;AAED;EACE,oBAAoB;EACpB,iBAAiB;EACjB,uBAAuB;CACxB;;AAED;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;;EAEE;IACE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;;CAEF","file":"NotFoundPage.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n  }\r\n\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ErrorPageScss = __webpack_require__(42);
  
  var _ErrorPageScss2 = _interopRequireDefault(_ErrorPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var title = 'Error';
  
  var ErrorPage = (function (_Component) {
    _inherits(ErrorPage, _Component);
  
    function ErrorPage() {
      _classCallCheck(this, _ErrorPage);
  
      _get(Object.getPrototypeOf(_ErrorPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(ErrorPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h1',
            null,
            title
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Sorry, an critical error occurred on this page.'
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _ErrorPage = ErrorPage;
    ErrorPage = (0, _decoratorsWithStyles2['default'])(_ErrorPageScss2['default'])(ErrorPage) || ErrorPage;
    return ErrorPage;
  })(_react.Component);
  
  exports['default'] = ErrorPage;
  module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(43);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ErrorPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ErrorPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n\r\n  }\r\n\r\n}\r\n", "", {"version":3,"sources":["/./src/components/ErrorPage/ErrorPage.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,UAAU;EACV,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,wBAAwB;CACzB;;AAED;EACE,oBAAoB;EACpB,iBAAiB;EACjB,uBAAuB;CACxB;;AAED;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;;EAEE;IACE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;;GAEnB;;CAEF","file":"ErrorPage.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n\r\n  }\r\n\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HomePageScss = __webpack_require__(45);
  
  var _HomePageScss2 = _interopRequireDefault(_HomePageScss);
  
  var _classnames = __webpack_require__(47);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _historyLibParsePath = __webpack_require__(26);
  
  var _historyLibParsePath2 = _interopRequireDefault(_historyLibParsePath);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _coreLocation = __webpack_require__(27);
  
  var _coreLocation2 = _interopRequireDefault(_coreLocation);
  
  var _apiBridge = __webpack_require__(101);
  
  var _apiBridge2 = _interopRequireDefault(_apiBridge);
  
  var _LightsListLightsList = __webpack_require__(50);
  
  var _LightsListLightsList2 = _interopRequireDefault(_LightsListLightsList);
  
  var _GroupsListGroupsList = __webpack_require__(63);
  
  var _GroupsListGroupsList2 = _interopRequireDefault(_GroupsListGroupsList);
  
  var _SchedulesListSchedulesList = __webpack_require__(95);
  
  var _SchedulesListSchedulesList2 = _interopRequireDefault(_SchedulesListSchedulesList);
  
  var _ScenesListScenesList = __webpack_require__(106);
  
  var _ScenesListScenesList2 = _interopRequireDefault(_ScenesListScenesList);
  
  var _GroupFormGroupForm = __webpack_require__(70);
  
  var _GroupFormGroupForm2 = _interopRequireDefault(_GroupFormGroupForm);
  
  var _storesLocalStorage = __webpack_require__(76);
  
  var _storesLocalStorage2 = _interopRequireDefault(_storesLocalStorage);
  
  var _modelsDaytime = __webpack_require__(105);
  
  var _modelsDaytime2 = _interopRequireDefault(_modelsDaytime);
  
  var title = 'Hue Steamer';
  
  var HomePage = (function (_Component) {
    _inherits(HomePage, _Component);
  
    _createClass(HomePage, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function HomePage(props) {
      _classCallCheck(this, _HomePage);
  
      _get(Object.getPrototypeOf(_HomePage.prototype), 'constructor', this).call(this, props);
      this.state = {
        lights: {},
        activeTab: _storesLocalStorage2['default'].get('activeTab') || 'lights',
        lightIDs: []
      };
    }
  
    _createClass(HomePage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        _apiBridge2['default'].get().then(this.onBridgeLoaded.bind(this))['catch'](this.onBridgeLoadError.bind(this));
      }
    }, {
      key: 'onBridgeLoaded',
      value: function onBridgeLoaded(bridge) {
        var _this = this;
  
        this.setState({ bridgeConnectionID: bridge.connection.id }, function () {
          if (_this.state.activeTab === 'schedules') {
            _this.getSchedules();
          } else if (_this.state.activeTab === 'scenes') {
            _this.getScenes();
          }
        });
        _apiBridge2['default'].getAllLights(bridge.connection.id).then(this.onAllLightsLoaded.bind(this))['catch'](this.onAllLightsLoadError.bind(this));
        _apiBridge2['default'].getGroups().then(this.onGroupsLoaded.bind(this))['catch'](this.onGroupsLoadError.bind(this));
      }
    }, {
      key: 'onBridgeLoadError',
      value: function onBridgeLoadError(response) {
        console.error('failed to load bridge', response);
        _coreLocation2['default'].push(_extends({}, (0, _historyLibParsePath2['default'])('/settings')));
      }
    }, {
      key: 'onSchedulesLoadError',
      value: function onSchedulesLoadError(response) {
        console.error('failed to load schedules', response);
      }
    }, {
      key: 'onScenesLoadError',
      value: function onScenesLoadError(response) {
        console.error('failed to load scenes', response);
      }
    }, {
      key: 'onAllLightsLoaded',
      value: function onAllLightsLoaded(group) {
        var _this2 = this;
  
        this.setState({ lightIDs: group.lights }, function () {
          group.lights.forEach(function (id) {
            _apiBridge2['default'].getLight(id).then(function (light) {
              light.id = id;
              _this2.onLightLoaded(light);
            })['catch'](_this2.onLightLoadError.bind(_this2, id));
          });
        });
      }
    }, {
      key: 'onAllLightsLoadError',
      value: function onAllLightsLoadError(response) {
        console.error('failed to load group of all lights', response);
      }
    }, {
      key: 'onGroupsLoaded',
      value: function onGroupsLoaded(rawGroups) {
        var groups = [];
        for (var i = 0; i < rawGroups.length; i++) {
          if (rawGroups[i].id !== '0') {
            groups.push(rawGroups[i]);
          }
        }
        groups.sort(this.nameSort);
        this.setState({ groups: groups });
      }
    }, {
      key: 'onGroupsLoadError',
      value: function onGroupsLoadError(response) {
        console.error('failed to load groups', response);
      }
    }, {
      key: 'onSchedulesLoaded',
      value: function onSchedulesLoaded(schedules) {
        this.setState({ schedules: schedules });
      }
    }, {
      key: 'onScenesLoaded',
      value: function onScenesLoaded(scenes) {
        scenes.sort(this.nameSort);
        this.setState({ scenes: scenes });
      }
    }, {
      key: 'onGroupCreated',
      value: function onGroupCreated(group) {
        this.onGroupsLoaded(this.state.groups.slice().concat(group));
        this.showGroupsTab();
      }
    }, {
      key: 'onEditGroup',
      value: function onEditGroup(id, name, lights) {
        var _this3 = this;
  
        this.setState({
          editGroupName: name,
          editGroupID: id,
          editGroupLightIDs: lights.map(function (l) {
            return typeof l === 'string' ? l : l.id;
          })
        }, function () {
          _this3.showGroupFormTab();
        });
      }
    }, {
      key: 'onGroupUpdated',
      value: function onGroupUpdated(group) {
        var _this4 = this;
  
        var newGroups = this.state.groups.slice();
        for (var i = 0; i < newGroups.length; i++) {
          if (newGroups[i].id === group.id) {
            var oldGroup = newGroups[i];
            for (var key in oldGroup) {
              if (oldGroup.hasOwnProperty(key)) {
                if (typeof group[key] === 'undefined') {
                  group[key] = oldGroup[key];
                }
              }
            }
            newGroups[i] = group;
            break;
          }
        }
        this.onGroupsLoaded(newGroups);
        this.setState({
          editGroupName: undefined,
          editGroupID: undefined,
          editGroupLightIDs: undefined
        }, function () {
          _this4.showGroupsTab();
        });
      }
    }, {
      key: 'onGroupCanceled',
      value: function onGroupCanceled() {
        var _this5 = this;
  
        var wasEditing = typeof this.state.editGroupID !== 'undefined';
        this.setState({
          editGroupName: undefined,
          editGroupID: undefined,
          editGroupLightIDs: undefined,
          newGroupName: undefined,
          newGroupLightIDs: undefined
        }, function () {
          if (wasEditing) {
            _this5.showGroupsTab();
          } else {
            _this5.showLightsTab();
          }
        });
      }
    }, {
      key: 'onLightLoaded',
      value: function onLightLoaded(light) {
        var oldLights = this.state.lights;
        var lightsHash = {};
        for (var id in oldLights) {
          if (oldLights.hasOwnProperty(id)) {
            lightsHash[id] = oldLights[id];
          }
        }
        lightsHash[light.id] = light;
        var lights = this.hashValues(lightsHash);
        lights.sort(this.lightCompare);
        this.setState({
          lights: lightsHash,
          groups: this.updateLightInGroups(light),
          scenes: this.updateLightInScenes(light),
          lightIDs: lights.map(function (l) {
            return l.id;
          })
        });
      }
    }, {
      key: 'onLightLoadError',
      value: function onLightLoadError(id, response) {
        console.error('failed to load light ' + id, response);
      }
    }, {
      key: 'onLightsFiltered',
      value: function onLightsFiltered(filter, lightIDs) {
        if (typeof filter === 'string') {
          this.setState({ newGroupLightIDs: lightIDs, newGroupName: filter });
        } else {
          this.setState({ newGroupLightIDs: undefined, newGroupName: undefined });
        }
      }
    }, {
      key: 'lightCompare',
      value: function lightCompare(lightA, lightB) {
        var isLightALoaded = typeof lightA === 'object';
        var isLightBLoaded = typeof lightB === 'object';
        if (!isLightALoaded && !isLightBLoaded) {
          return 0;
        }
        if (!isLightALoaded) {
          return -1;
        }
        if (!isLightBLoaded) {
          return 1;
        }
        return lightA.name.localeCompare(lightB.name);
      }
    }, {
      key: 'getSchedules',
      value: function getSchedules() {
        _apiBridge2['default'].getSchedules().then(this.onSchedulesLoaded.bind(this))['catch'](this.onSchedulesLoadError.bind(this));
      }
    }, {
      key: 'getScenes',
      value: function getScenes() {
        _apiBridge2['default'].getScenes().then(this.onScenesLoaded.bind(this))['catch'](this.onScenesLoadError.bind(this));
      }
    }, {
      key: 'updateLightInObject',
      value: function updateLightInObject(light, oldObject) {
        var newObject = {};
        var lights = oldObject.lights.slice();
        for (var i = 0; i < lights.length; i++) {
          var lightID = lights[i];
          if (lightID === light.id) {
            lights[i] = light;
            break;
          }
        }
        lights.sort(this.lightCompare);
        for (var key in oldObject) {
          if (oldObject.hasOwnProperty(key)) {
            newObject[key] = oldObject[key];
          }
        }
        newObject.lights = lights;
        return newObject;
      }
    }, {
      key: 'nameSort',
      value: function nameSort(a, b) {
        var aName = a.name.toLowerCase();
        var bName = b.name.toLowerCase();
        return aName.localeCompare(bName);
      }
    }, {
      key: 'updateLightInGroups',
      value: function updateLightInGroups(light) {
        var _this6 = this;
  
        var groups = this.state.groups;
        if (typeof groups !== 'object') {
          return groups;
        }
        return groups.slice().map(function (group) {
          return _this6.updateLightInObject(light, group);
        });
      }
    }, {
      key: 'updateLightInScenes',
      value: function updateLightInScenes(light) {
        var _this7 = this;
  
        var scenes = this.state.scenes;
        if (typeof scenes !== 'object') {
          return scenes;
        }
        return scenes.slice().map(function (scene) {
          return _this7.updateLightInObject(light, scene);
        });
      }
    }, {
      key: 'hashValues',
      value: function hashValues(hash) {
        var values = [];
        for (var key in hash) {
          if (hash.hasOwnProperty(key)) {
            values.push(hash[key]);
          }
        }
        return values;
      }
    }, {
      key: 'showTab',
      value: function showTab(event, activeTab) {
        if (event) {
          event.preventDefault();
          event.target.blur();
        }
        this.setState({ activeTab: activeTab });
        _storesLocalStorage2['default'].set('activeTab', activeTab);
      }
    }, {
      key: 'showLightsTab',
      value: function showLightsTab(event) {
        this.showTab(event, 'lights');
      }
    }, {
      key: 'showGroupsTab',
      value: function showGroupsTab(event) {
        this.showTab(event, 'groups');
      }
    }, {
      key: 'showGroupFormTab',
      value: function showGroupFormTab(event) {
        this.showTab(event, 'group-form');
      }
    }, {
      key: 'showSchedulesTab',
      value: function showSchedulesTab(event) {
        this.showTab(event, 'schedules');
        if (typeof this.state.schedules !== 'object') {
          this.getSchedules();
        }
      }
    }, {
      key: 'showScenesTab',
      value: function showScenesTab(event) {
        this.showTab(event, 'scenes');
        if (typeof this.state.scenes !== 'object') {
          this.getScenes();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var haveLights = typeof this.state.lightIDs === 'object';
        var haveGroups = typeof this.state.groups === 'object';
        var haveSchedules = typeof this.state.schedules === 'object';
        var haveScenes = typeof this.state.scenes === 'object';
        var themeClass = _modelsDaytime2['default'].isNight() ? _HomePageScss2['default'].night : _HomePageScss2['default'].day;
        return _react2['default'].createElement(
          'div',
          { className: themeClass },
          _react2['default'].createElement(
            'ul',
            { className: _HomePageScss2['default'].tabList },
            _react2['default'].createElement(
              'li',
              { className: this.state.activeTab === 'lights' ? _HomePageScss2['default'].active : _HomePageScss2['default'].inactive },
              _react2['default'].createElement(
                'a',
                { href: '#', onClick: this.showLightsTab.bind(this) },
                'Lights',
                haveLights ? _react2['default'].createElement(
                  'span',
                  { className: (0, _classnames2['default'])(_HomePageScss2['default'].badge, themeClass) },
                  this.state.lightIDs.length
                ) : ''
              )
            ),
            _react2['default'].createElement(
              'li',
              { className: this.state.activeTab === 'groups' ? _HomePageScss2['default'].active : _HomePageScss2['default'].inactive },
              _react2['default'].createElement(
                'a',
                { href: '#', onClick: this.showGroupsTab.bind(this) },
                'Groups',
                haveGroups ? _react2['default'].createElement(
                  'span',
                  { className: (0, _classnames2['default'])(_HomePageScss2['default'].badge, themeClass) },
                  this.state.groups.length
                ) : ''
              )
            ),
            _react2['default'].createElement(
              'li',
              { className: this.state.activeTab === 'group-form' ? _HomePageScss2['default'].active : _HomePageScss2['default'].inactive },
              _react2['default'].createElement(
                'a',
                { href: '#', onClick: this.showGroupFormTab.bind(this) },
                typeof this.state.editGroupName === 'string' ? _react2['default'].createElement(
                  'span',
                  null,
                  'Edit “',
                  this.state.editGroupName,
                  '”'
                ) : 'New Group'
              )
            ),
            _react2['default'].createElement(
              'li',
              { className: this.state.activeTab === 'schedules' ? _HomePageScss2['default'].active : _HomePageScss2['default'].inactive },
              _react2['default'].createElement(
                'a',
                { href: '#', onClick: this.showSchedulesTab.bind(this) },
                'Schedules',
                haveSchedules ? _react2['default'].createElement(
                  'span',
                  { className: (0, _classnames2['default'])(_HomePageScss2['default'].badge, themeClass) },
                  this.state.schedules.length
                ) : ''
              )
            ),
            _react2['default'].createElement(
              'li',
              { className: this.state.activeTab === 'scenes' ? _HomePageScss2['default'].active : _HomePageScss2['default'].inactive },
              _react2['default'].createElement(
                'a',
                { href: '#', onClick: this.showScenesTab.bind(this) },
                'Scenes',
                haveScenes ? _react2['default'].createElement(
                  'span',
                  { className: (0, _classnames2['default'])(_HomePageScss2['default'].badge, themeClass) },
                  this.state.scenes.length
                ) : ''
              )
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: _HomePageScss2['default'].tabs },
            _react2['default'].createElement(
              'div',
              { className: (0, _classnames2['default'])(_HomePageScss2['default'].lightsTab, _HomePageScss2['default'].tab, this.state.activeTab === 'lights' ? _HomePageScss2['default'].active : _HomePageScss2['default'].inactive) },
              haveLights ? _react2['default'].createElement(_LightsListLightsList2['default'], { lights: this.state.lights,
                ids: this.state.lightIDs,
                onFiltered: this.onLightsFiltered.bind(this)
              }) : _react2['default'].createElement(
                'p',
                { className: _HomePageScss2['default'].loading },
                'Loading lights...'
              )
            ),
            _react2['default'].createElement(
              'div',
              { className: (0, _classnames2['default'])(_HomePageScss2['default'].groupsTab, _HomePageScss2['default'].tab, this.state.activeTab === 'groups' ? _HomePageScss2['default'].active : _HomePageScss2['default'].inactive) },
              haveGroups ? _react2['default'].createElement(_GroupsListGroupsList2['default'], { groups: this.state.groups,
                onLightLoaded: this.onLightLoaded.bind(this),
                onEdit: this.onEditGroup.bind(this)
              }) : _react2['default'].createElement(
                'p',
                { className: _HomePageScss2['default'].loading },
                'Loading groups...'
              )
            ),
            _react2['default'].createElement(
              'div',
              { className: (0, _classnames2['default'])(_HomePageScss2['default'].newGroupTab, _HomePageScss2['default'].tab, this.state.activeTab === 'group-form' ? _HomePageScss2['default'].active : _HomePageScss2['default'].inactive) },
              _react2['default'].createElement(_GroupFormGroupForm2['default'], { lights: this.state.lights,
                ids: this.state.lightIDs,
                onCreated: this.onGroupCreated.bind(this),
                onUpdated: this.onGroupUpdated.bind(this),
                onCanceled: this.onGroupCanceled.bind(this),
                name: this.state.editGroupName || this.state.newGroupName,
                id: this.state.editGroupID,
                checkedLightIDs: this.state.editGroupLightIDs || this.state.newGroupLightIDs
              })
            ),
            _react2['default'].createElement(
              'div',
              { className: (0, _classnames2['default'])(_HomePageScss2['default'].schedulesTab, _HomePageScss2['default'].tab, this.state.activeTab === 'schedules' ? _HomePageScss2['default'].active : _HomePageScss2['default'].inactive) },
              haveSchedules ? _react2['default'].createElement(_SchedulesListSchedulesList2['default'], { schedules: this.state.schedules }) : _react2['default'].createElement(
                'p',
                { className: _HomePageScss2['default'].loading },
                'Loading schedules...'
              )
            ),
            _react2['default'].createElement(
              'div',
              { className: (0, _classnames2['default'])(_HomePageScss2['default'].scenesTab, _HomePageScss2['default'].tab, this.state.activeTab === 'scenes' ? _HomePageScss2['default'].active : _HomePageScss2['default'].inactive) },
              haveScenes ? _react2['default'].createElement(_ScenesListScenesList2['default'], { scenes: this.state.scenes }) : _react2['default'].createElement(
                'p',
                { className: _HomePageScss2['default'].loading },
                'Loading scenes...'
              )
            )
          )
        );
      }
    }]);
  
    var _HomePage = HomePage;
    HomePage = (0, _decoratorsWithStyles2['default'])(_HomePageScss2['default'])(HomePage) || HomePage;
    return HomePage;
  })(_react.Component);
  
  exports['default'] = HomePage;
  module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(46);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./HomePage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./HomePage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".HomePage_loading_XqX {\n}\n\n.HomePage_tabList_uR3 {\n  list-style: none;\n  padding-left: 0;\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n}\n\n.HomePage_tabList_uR3 li {\n  display: inline-block;\n}\n\n.HomePage_tabList_uR3 li + li {\n  margin-left: 4px;\n}\n\n.HomePage_tabList_uR3 li a {\n  display: block;\n  padding: 0.3em 0.6em;\n  text-decoration: none;\n  border-style: solid;\n  border-width: 1px;\n  border-bottom-width: 0;\n  -webkit-border-top-left-radius: 4px;\n  -webkit-border-top-right-radius: 4px;\n  -moz-border-radius-topleft: 4px;\n  -moz-border-radius-topright: 4px;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n}\n\n.HomePage_tabList_uR3 li.HomePage_inactive_2yj a {\n  opacity: 0.75;\n}\n\n.HomePage_tabList_uR3 li.HomePage_active_lyV a {\n  margin-bottom: -1px;\n}\n\n.HomePage_night_1p9 .HomePage_tabList_uR3 {\n  border-color: #38231D;\n}\n\n.HomePage_night_1p9 .HomePage_tabList_uR3 li a {\n  border-color: #38231D;\n}\n\n.HomePage_night_1p9 .HomePage_tabList_uR3 li.HomePage_inactive_2yj a {\n  background-color: #231511;\n}\n\n.HomePage_night_1p9 .HomePage_tabList_uR3 li.HomePage_active_lyV {\n  border-bottom: 1px solid #101010;\n}\n\n.HomePage_day_2WC .HomePage_tabList_uR3 {\n  border-color: #ccc;\n}\n\n.HomePage_day_2WC .HomePage_tabList_uR3 li a {\n  border-color: #ccc;\n  color: #97918A\n}\n\n.HomePage_day_2WC .HomePage_tabList_uR3 li a:hover, .HomePage_day_2WC .HomePage_tabList_uR3 li a:focus {\n  color: #E16C51;\n}\n\n.HomePage_day_2WC .HomePage_tabList_uR3 li.HomePage_inactive_2yj a {\n  background-color: #f1f1f1;\n}\n\n.HomePage_day_2WC .HomePage_tabList_uR3 li.HomePage_active_lyV {\n  border-bottom: 1px solid #fff;\n}\n\n.HomePage_day_2WC .HomePage_tabList_uR3 li.HomePage_active_lyV a {\n  color: #E16C51;\n}\n\n.HomePage_tab_16Q {\n}\n\n.HomePage_tab_16Q.HomePage_inactive_2yj {\n  display: none;\n}\n\n.HomePage_badge_HDA {\n  display: inline-block;\n  padding: 2px 5px;\n  font-size: 11px;\n  font-weight: bold;\n  line-height: 1;\n  border-radius: 20px;\n  margin-left: 5px\n}\n\n.HomePage_badge_HDA.HomePage_day_2WC {\n  color: #666;\n  background-color: #eee;\n}\n\n.HomePage_badge_HDA.HomePage_night_1p9 {\n  color: #101010;\n  background-color: #E16C51;\n}\n", "", {"version":3,"sources":["/./src/components/HomePage/HomePage.scss"],"names":[],"mappings":"AAAA;CACC;;AAED;EACE,iBAAiB;EACjB,gBAAgB;EAChB,yBAAyB;EACzB,2BAA2B;CAoC5B;;AAlCC;EACE,sBAAsB;CAgCvB;;AA9BC;EACE,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,qBAAqB;EACrB,sBAAsB;EACtB,oBAAoB;EACpB,kBAAkB;EAClB,uBAAuB;EACvB,oCAAoC;EACpC,qCAAqC;EACrC,gCAAgC;EAChC,iCAAiC;EACjC,4BAA4B;EAC5B,6BAA6B;CAC9B;;AAGC;EACE,cAAc;CACf;;AAID;EACE,oBAAoB;CACrB;;AAML;EACE,sBAAsB;CAiBvB;;AAdG;EACE,sBAAsB;CACvB;;AAGC;EACE,0BAA0B;CAC3B;;AAGH;EACE,iCAAiC;CAClC;;AAML;EACE,mBAAmB;CA0BpB;;AAvBG;EACE,mBAAmB;EACnB,cAAe;CAKhB;;AAHC;EACE,eAAe;CAChB;;AAID;EACE,0BAA0B;CAC3B;;AAGH;EACE,8BAA8B;CAK/B;;AAHC;EACE,eAAe;CAChB;;AAMT;CAIC;;AAHC;EACE,cAAc;CACf;;AAGH;EACE,sBAAsB;EACtB,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;EACf,oBAAoB;EACpB,gBAAiB;CAWlB;;AATC;EACE,YAAY;EACZ,uBAAuB;CACxB;;AAED;EACE,eAAe;EACf,0BAA0B;CAC3B","file":"HomePage.scss","sourcesContent":[".loading {\n}\n\n.tabList {\n  list-style: none;\n  padding-left: 0;\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n\n  li {\n    display: inline-block;\n\n    + li {\n      margin-left: 4px;\n    }\n\n    a {\n      display: block;\n      padding: 0.3em 0.6em;\n      text-decoration: none;\n      border-style: solid;\n      border-width: 1px;\n      border-bottom-width: 0;\n      -webkit-border-top-left-radius: 4px;\n      -webkit-border-top-right-radius: 4px;\n      -moz-border-radius-topleft: 4px;\n      -moz-border-radius-topright: 4px;\n      border-top-left-radius: 4px;\n      border-top-right-radius: 4px;\n    }\n\n    &.inactive {\n      a {\n        opacity: 0.75;\n      }\n    }\n\n    &.active {\n      a {\n        margin-bottom: -1px;\n      }\n    }\n  }\n}\n\n.night {\n  .tabList {\n    border-color: #38231D;\n\n    li {\n      a {\n        border-color: #38231D;\n      }\n\n      &.inactive {\n        a {\n          background-color: #231511;\n        }\n      }\n\n      &.active {\n        border-bottom: 1px solid #101010;\n      }\n    }\n  }\n}\n\n.day {\n  .tabList {\n    border-color: #ccc;\n\n    li {\n      a {\n        border-color: #ccc;\n        color: #97918A;\n\n        &:hover, &:focus {\n          color: #E16C51;\n        }\n      }\n\n      &.inactive {\n        a {\n          background-color: #f1f1f1;\n        }\n      }\n\n      &.active {\n        border-bottom: 1px solid #fff;\n\n        a {\n          color: #E16C51;\n        }\n      }\n    }\n  }\n}\n\n.tab {\n  &.inactive {\n    display: none;\n  }\n}\n\n.badge {\n  display: inline-block;\n  padding: 2px 5px;\n  font-size: 11px;\n  font-weight: bold;\n  line-height: 1;\n  border-radius: 20px;\n  margin-left: 5px;\n\n  &.day {\n    color: #666;\n    background-color: #eee;\n  }\n\n  &.night {\n    color: #101010;\n    background-color: #E16C51;;\n  }\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"loading": "HomePage_loading_XqX",
  	"tabList": "HomePage_tabList_uR3",
  	"inactive": "HomePage_inactive_2yj",
  	"active": "HomePage_active_lyV",
  	"night": "HomePage_night_1p9",
  	"day": "HomePage_day_2WC",
  	"tab": "HomePage_tab_16Q",
  	"badge": "HomePage_badge_HDA"
  };

/***/ },
/* 47 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 48 */,
/* 49 */
/***/ function(module, exports) {

  module.exports = {
  	"development": {
  		"localStorageKey": "hue-steamer",
  		"serverUri": "http://localhost:5000",
  		"clientUri": "http://localhost:3000",
  		"database": "hue-steamer-development.sqlite"
  	}
  };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LightsListScss = __webpack_require__(51);
  
  var _LightsListScss2 = _interopRequireDefault(_LightsListScss);
  
  var _LightLight = __webpack_require__(53);
  
  var _LightLight2 = _interopRequireDefault(_LightLight);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _classnames = __webpack_require__(47);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _LightFilterFormLightFilterForm = __webpack_require__(92);
  
  var _LightFilterFormLightFilterForm2 = _interopRequireDefault(_LightFilterFormLightFilterForm);
  
  var _modelsDaytime = __webpack_require__(105);
  
  var _modelsDaytime2 = _interopRequireDefault(_modelsDaytime);
  
  var LightsList = (function (_Component) {
    _inherits(LightsList, _Component);
  
    _createClass(LightsList, null, [{
      key: 'propTypes',
      value: {
        lights: _react.PropTypes.object.isRequired,
        ids: _react.PropTypes.array.isRequired,
        onFiltered: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function LightsList(props, context) {
      _classCallCheck(this, _LightsList);
  
      _get(Object.getPrototypeOf(_LightsList.prototype), 'constructor', this).call(this, props, context);
      this.state = { filteredIDs: undefined };
    }
  
    _createClass(LightsList, [{
      key: 'onFiltered',
      value: function onFiltered(filterName, filteredIDs) {
        this.setState({ filteredIDs: filteredIDs });
        this.props.onFiltered(filterName, filteredIDs);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this = this;
  
        var filteredIDs = this.props.ids;
        if (typeof this.state.filteredIDs === 'object') {
          filteredIDs = this.state.filteredIDs;
        }
        var nightDayClass = _modelsDaytime2['default'].isNight() ? _LightsListScss2['default'].night : _LightsListScss2['default'].day;
        return _react2['default'].createElement(
          'div',
          { className: _LightsListScss2['default'].lightListContainer },
          _react2['default'].createElement(_LightFilterFormLightFilterForm2['default'], { ids: this.props.ids, lights: this.props.lights,
            onFiltered: this.onFiltered.bind(this)
          }),
          _react2['default'].createElement(
            'ul',
            { className: _LightsListScss2['default'].lightList },
            filteredIDs.map(function (id) {
              var light = _this.props.lights[id];
              var loaded = typeof light === 'object';
              var xy = 'na';
              if (loaded) {
                xy = 'none';
                if (typeof light.state.xy === 'object') {
                  xy = light.state.xy.join(',');
                }
              }
              var key = 'light-' + id + '-loaded-' + loaded + '-on-' + (loaded ? light.state.on : 'na') + '-xy-' + xy;
              return _react2['default'].createElement(
                'li',
                { key: key, className: (0, _classnames2['default'])(_LightsListScss2['default'].light, nightDayClass) },
                loaded ? _react2['default'].createElement(_LightLight2['default'], { id: id, light: light }) : _react2['default'].createElement(
                  'span',
                  null,
                  'Loading light ',
                  id,
                  '...'
                )
              );
            })
          )
        );
      }
    }]);
  
    var _LightsList = LightsList;
    LightsList = (0, _decoratorsWithStyles2['default'])(_LightsListScss2['default'])(LightsList) || LightsList;
    return LightsList;
  })(_react.Component);
  
  exports['default'] = LightsList;
  module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(52);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./LightsList.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./LightsList.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".LightsList_lightList_14S {\n  list-style: none;\n  padding-left: 0;\n}\n\n.LightsList_light_3Ms {\n  width: 223px;\n  display: inline-block;\n  margin: 0 5px 12px 5px;\n  padding: 6px;\n  border-radius: 2px;\n  border-width: 1px;\n  border-style: solid\n}\n\n.LightsList_light_3Ms.LightsList_night_2nv {\n  border-color: #38231D;\n  color: #E5E4E1;\n  background-color: #231511;\n}\n\n.LightsList_light_3Ms.LightsList_day_3hZ {\n  border-color: #ccc;\n}\n", "", {"version":3,"sources":["/./src/components/LightsList/LightsList.scss"],"names":[],"mappings":"AAAA;EACE,iBAAiB;EACjB,gBAAgB;CACjB;;AAED;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,mBAAoB;CAWrB;;AATC;EACE,sBAAsB;EACtB,eAAe;EACf,0BAA0B;CAC3B;;AAED;EACE,mBAAmB;CACpB","file":"LightsList.scss","sourcesContent":[".lightList {\n  list-style: none;\n  padding-left: 0;\n}\n\n.light {\n  width: 223px;\n  display: inline-block;\n  margin: 0 5px 12px 5px;\n  padding: 6px;\n  border-radius: 2px;\n  border-width: 1px;\n  border-style: solid;\n\n  &.night {\n    border-color: #38231D;\n    color: #E5E4E1;\n    background-color: #231511;\n  }\n\n  &.day {\n    border-color: #ccc;\n  }\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"lightList": "LightsList_lightList_14S",
  	"light": "LightsList_light_3Ms",
  	"night": "LightsList_night_2nv",
  	"day": "LightsList_day_3hZ"
  };

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LightScss = __webpack_require__(54);
  
  var _LightScss2 = _interopRequireDefault(_LightScss);
  
  var _apiBridge = __webpack_require__(101);
  
  var _apiBridge2 = _interopRequireDefault(_apiBridge);
  
  var _modelsConverter = __webpack_require__(102);
  
  var _modelsConverter2 = _interopRequireDefault(_modelsConverter);
  
  var _reactColor = __webpack_require__(59);
  
  var _classnames = __webpack_require__(47);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _OnOffSwitchOnOffSwitch = __webpack_require__(60);
  
  var _OnOffSwitchOnOffSwitch2 = _interopRequireDefault(_OnOffSwitchOnOffSwitch);
  
  var _modelsDaytime = __webpack_require__(105);
  
  var _modelsDaytime2 = _interopRequireDefault(_modelsDaytime);
  
  var Light = (function (_Component) {
    _inherits(Light, _Component);
  
    _createClass(Light, null, [{
      key: 'propTypes',
      value: {
        id: _react.PropTypes.string.isRequired,
        light: _react.PropTypes.object.isRequired
      },
      enumerable: true
    }]);
  
    function Light(props, context) {
      _classCallCheck(this, _Light);
  
      _get(Object.getPrototypeOf(_Light.prototype), 'constructor', this).call(this, props, context);
      this.state = { showColorPicker: false };
    }
  
    _createClass(Light, [{
      key: 'onLightToggle',
      value: function onLightToggle(turnOn) {
        if (turnOn) {
          _apiBridge2['default'].turnOnLight(this.props.id).then(this.onLightToggleComplete.bind(this));
        } else {
          _apiBridge2['default'].turnOffLight(this.props.id).then(this.onLightToggleComplete.bind(this));
        }
      }
    }, {
      key: 'onLightToggleComplete',
      value: function onLightToggleComplete(success) {
        if (success) {
          var light = this.props.light;
          light.state.on = !light.state.on;
          this.setState({ light: light });
        }
      }
    }, {
      key: 'onColorPickerChange',
      value: function onColorPickerChange(color) {
        this.setState({ latestColor: color.hex });
        this.changeColor(color.hex);
      }
    }, {
      key: 'onColorPickerCancel',
      value: function onColorPickerCancel() {
        this.setState({ showColorPicker: false });
      }
    }, {
      key: 'onColorChanged',
      value: function onColorChanged(x, y, success) {
        if (!success) {
          console.error('failed to change light color', this.props.light.name);
        }
      }
    }, {
      key: 'getLightHex',
      value: function getLightHex(optionalLightState) {
        var lightState = optionalLightState || this.props.light.state;
        if (lightState.on) {
          var xy = lightState.xy;
          if (typeof xy === 'object') {
            return _modelsConverter2['default'].cie1931ToHex(xy[0], xy[1], lightState.bri);
          }
        }
      }
    }, {
      key: 'changeColor',
      value: function changeColor(color) {
        var xy = _modelsConverter2['default'].hexToCIE1931(color);
        var x = xy[0];
        var y = xy[1];
        _apiBridge2['default'].setLightColor(this.props.id, x, y).then(this.onColorChanged.bind(this, x, y));
      }
    }, {
      key: 'toggleColorPicker',
      value: function toggleColorPicker() {
        this.setState({ showColorPicker: !this.state.showColorPicker });
      }
    }, {
      key: 'render',
      value: function render() {
        var checkboxID = 'light-' + this.props.id + '-toggle';
        var colorStyle = {};
        var colorPickerStyle = {
          display: this.state.showColorPicker ? 'block' : 'none'
        };
        if (typeof this.state.latestColor === 'string') {
          colorStyle.backgroundColor = '#' + this.state.latestColor;
        } else {
          var color = this.getLightHex();
          if (typeof color === 'string') {
            colorStyle.backgroundColor = '#' + color;
          }
        }
        var nightDayClass = _modelsDaytime2['default'].isNight() ? _LightScss2['default'].night : _LightScss2['default'].day;
        return _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(_LightScss2['default'].light, nightDayClass) },
          _react2['default'].createElement(
            'header',
            { className: _LightScss2['default'].lightHeader },
            _react2['default'].createElement(
              'div',
              { className: _LightScss2['default'].lightNameArea },
              _react2['default'].createElement(
                'span',
                { className: _LightScss2['default'].name, title: this.props.light.name },
                this.props.light.name
              )
            ),
            _react2['default'].createElement(_OnOffSwitchOnOffSwitch2['default'], { id: checkboxID, state: this.props.light.state.on ? 2 : 0,
              onToggle: this.onLightToggle.bind(this)
            })
          ),
          _react2['default'].createElement(
            'footer',
            { className: _LightScss2['default'].lightFooter },
            _react2['default'].createElement(
              'div',
              { className: _LightScss2['default'].metadata },
              _react2['default'].createElement(
                'span',
                { className: _LightScss2['default'].type },
                this.props.light.type
              ),
              _react2['default'].createElement(
                'span',
                { className: _LightScss2['default'].manufacturer },
                this.props.light.manufacturername
              ),
              _react2['default'].createElement(
                'span',
                { className: _LightScss2['default'].model },
                this.props.light.modelid
              )
            ),
            colorStyle.backgroundColor ? _react2['default'].createElement(
              'div',
              { className: _LightScss2['default'].colorBlockAndPicker },
              _react2['default'].createElement('button', { type: 'button', onClick: this.toggleColorPicker.bind(this),
                className: _LightScss2['default'].colorBlock, style: colorStyle
              }),
              _react2['default'].createElement(
                'div',
                { style: colorPickerStyle, className: (0, _classnames2['default'])(_LightScss2['default'].colorPickerWrapper, nightDayClass) },
                _react2['default'].createElement(_reactColor.SliderPicker, { color: colorStyle.backgroundColor,
                  onChangeComplete: this.onColorPickerChange.bind(this)
                })
              )
            ) : ''
          )
        );
      }
    }]);
  
    var _Light = Light;
    Light = (0, _decoratorsWithStyles2['default'])(_LightScss2['default'])(Light) || Light;
    return Light;
  })(_react.Component);
  
  exports['default'] = Light;
  module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(55);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Light.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Light.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".Light_light_31m {\n}\n\n.Light_light_31m.Light_night_UWr .Light_metadata_3mh {\n  color: #97918A;\n}\n\n.Light_light_31m.Light_day_3-K .Light_metadata_3mh {\n  color: #797979;\n}\n\n.Light_lightHeader_Cjv, .Light_lightFooter_2ji {\n  display: table;\n  width: 100%;\n}\n\n.Light_lightFooter_2ji {\n  margin-top: 5px;\n}\n\n.Light_lightNameArea_1fg, .Light_metadata_3mh, .Light_colorBlockAndPicker_16B {\n  display: table-cell;\n  vertical-align: middle;\n}\n\n.Light_name_kaw {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  width: 151px;\n  display: block;\n}\n\n.Light_metadata_3mh {\n  font-size: 13px;\n}\n\n.Light_colorBlockAndPicker_16B {\n  width: 50px;\n  position: relative;\n}\n\n.Light_colorBlockAndPicker_16B .Light_colorBlock_3S8 {\n  border-radius: 4px;\n  border: none;\n  width: 100%;\n  height: 100%\n}\n\n.Light_colorBlockAndPicker_16B .Light_colorBlock_3S8:focus {\n  outline: 0;\n}\n\n.Light_colorBlockAndPicker_16B .Light_colorPickerWrapper_N1C {\n  z-index: 99;\n  position: absolute;\n  width: 400px;\n  border-width: 1px;\n  border-style: solid;\n  border-radius: 4px;\n  padding: 10px;\n  left: -175px;\n  -webkit-box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);\n  box-shadow: 0 0 5px 0 rgba(0,0,0,0.3)\n}\n\n.Light_colorBlockAndPicker_16B .Light_colorPickerWrapper_N1C.Light_night_UWr {\n  border-color: #38231D;\n  background-color: #101010;\n}\n\n.Light_colorBlockAndPicker_16B .Light_colorPickerWrapper_N1C.Light_day_3-K {\n  border-color: #ccc;\n  background-color: #fff;\n}\n\n.Light_type_49F {\n  display: block;\n}\n\n.Light_manufacturer_3j2 {\n  padding: 0 0.3em 0 0;\n}\n\n.Light_model_3h3 {\n}\n", "", {"version":3,"sources":["/./src/components/Light/Light.scss"],"names":[],"mappings":"AAAA;CAYC;;AAVG;EACE,eAAe;CAChB;;AAID;EACE,eAAe;CAChB;;AAIL;EAEE,eAAe;EACf,YAAY;CACb;;AAED;EACE,gBAAgB;CACjB;;AAED;EAGE,oBAAoB;EACpB,uBAAuB;CACxB;;AAED;EACE,oBAAoB;EACpB,wBAAwB;EACxB,iBAAiB;EACjB,aAAa;EACb,eAAe;CAChB;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,YAAY;EACZ,mBAAmB;CAmCpB;;AAjCC;EACE,mBAAmB;EACnB,aAAa;EACb,YAAY;EACZ,YAAa;CAKd;;AAHC;EACE,WAAW;CACZ;;AAGH;EACE,YAAY;EACZ,mBAAmB;EACnB,aAAa;EACb,kBAAkB;EAClB,oBAAoB;EACpB,mBAAmB;EACnB,cAAc;EACd,aAAa;EACb,8CAA8C;EAC9C,qCAAsC;CAWvC;;AATC;EACE,sBAAsB;EACtB,0BAA0B;CAC3B;;AAED;EACE,mBAAmB;EACnB,uBAAuB;CACxB;;AAIL;EACE,eAAe;CAChB;;AAED;EACE,qBAAqB;CACtB;;AAED;CACC","file":"Light.scss","sourcesContent":[".light {\n  &.night {\n    .metadata {\n      color: #97918A;\n    }\n  }\n\n  &.day {\n    .metadata {\n      color: #797979;\n    }\n  }\n}\n\n.lightHeader,\n.lightFooter {\n  display: table;\n  width: 100%;\n}\n\n.lightFooter {\n  margin-top: 5px;\n}\n\n.lightNameArea,\n.metadata,\n.colorBlockAndPicker {\n  display: table-cell;\n  vertical-align: middle;\n}\n\n.name {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  width: 151px;\n  display: block;\n}\n\n.metadata {\n  font-size: 13px;\n}\n\n.colorBlockAndPicker {\n  width: 50px;\n  position: relative;\n\n  .colorBlock {\n    border-radius: 4px;\n    border: none;\n    width: 100%;\n    height: 100%;\n\n    &:focus {\n      outline: 0;\n    }\n  }\n\n  .colorPickerWrapper {\n    z-index: 99;\n    position: absolute;\n    width: 400px;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 4px;\n    padding: 10px;\n    left: -175px;\n    -webkit-box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);\n    box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);\n\n    &.night {\n      border-color: #38231D;\n      background-color: #101010;\n    }\n\n    &.day {\n      border-color: #ccc;\n      background-color: #fff;\n    }\n  }\n}\n\n.type {\n  display: block;\n}\n\n.manufacturer {\n  padding: 0 0.3em 0 0;\n}\n\n.model {\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"light": "Light_light_31m",
  	"night": "Light_night_UWr",
  	"metadata": "Light_metadata_3mh",
  	"day": "Light_day_3-K",
  	"lightHeader": "Light_lightHeader_Cjv",
  	"lightFooter": "Light_lightFooter_2ji",
  	"lightNameArea": "Light_lightNameArea_1fg",
  	"colorBlockAndPicker": "Light_colorBlockAndPicker_16B",
  	"name": "Light_name_kaw",
  	"colorBlock": "Light_colorBlock_3S8",
  	"colorPickerWrapper": "Light_colorPickerWrapper_N1C",
  	"type": "Light_type_49F",
  	"manufacturer": "Light_manufacturer_3j2",
  	"model": "Light_model_3h3"
  };

/***/ },
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */
/***/ function(module, exports) {

  module.exports = require("react-color");

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _OnOffSwitchScss = __webpack_require__(61);
  
  var _OnOffSwitchScss2 = _interopRequireDefault(_OnOffSwitchScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _classnames = __webpack_require__(47);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _modelsDaytime = __webpack_require__(105);
  
  var _modelsDaytime2 = _interopRequireDefault(_modelsDaytime);
  
  var OnOffSwitch = (function (_Component) {
    _inherits(OnOffSwitch, _Component);
  
    _createClass(OnOffSwitch, null, [{
      key: 'propTypes',
      value: {
        id: _react.PropTypes.string.isRequired,
        state: _react.PropTypes.number.isRequired,
        onToggle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function OnOffSwitch(props, context) {
      _classCallCheck(this, _OnOffSwitch);
  
      _get(Object.getPrototypeOf(_OnOffSwitch.prototype), 'constructor', this).call(this, props, context);
      this.state = {};
    }
  
    _createClass(OnOffSwitch, [{
      key: 'onToggle',
      value: function onToggle() {
        var on = this.props.state > 0;
        this.props.onToggle(!on);
      }
    }, {
      key: 'render',
      value: function render() {
        var stateClass = this.props.state === 1 ? _OnOffSwitchScss2['default'].partial : _OnOffSwitchScss2['default'].full;
        var nightDayClass = _modelsDaytime2['default'].isNight() ? _OnOffSwitchScss2['default'].night : _OnOffSwitchScss2['default'].day;
        return _react2['default'].createElement(
          'div',
          { className: _OnOffSwitchScss2['default'].onoffswitch },
          _react2['default'].createElement('input', { type: 'checkbox', name: 'onoffswitch',
            className: (0, _classnames2['default'])(_OnOffSwitchScss2['default'].onoffswitchCheckbox, stateClass), id: this.props.id,
            checked: this.props.state > 0,
            onChange: this.onToggle.bind(this)
          }),
          _react2['default'].createElement(
            'label',
            { className: (0, _classnames2['default'])(_OnOffSwitchScss2['default'].onoffswitchLabel, stateClass, nightDayClass), htmlFor: this.props.id },
            _react2['default'].createElement('span', { className: (0, _classnames2['default'])(_OnOffSwitchScss2['default'].onoffswitchInner, stateClass, nightDayClass) }),
            _react2['default'].createElement('span', { className: (0, _classnames2['default'])(_OnOffSwitchScss2['default'].onoffswitchSwitch, nightDayClass) })
          )
        );
      }
    }]);
  
    var _OnOffSwitch = OnOffSwitch;
    OnOffSwitch = (0, _decoratorsWithStyles2['default'])(_OnOffSwitchScss2['default'])(OnOffSwitch) || OnOffSwitch;
    return OnOffSwitch;
  })(_react.Component);
  
  exports['default'] = OnOffSwitch;
  module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(62);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./OnOffSwitch.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./OnOffSwitch.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".OnOffSwitch_onoffswitch_3aL {\n  position: relative;\n  display: table-cell;\n  vertical-align: middle;\n  width: 50px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchCheckbox_3ON {\n  display: none\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchCheckbox_3ON:checked + .OnOffSwitch_onoffswitchLabel_1z- .OnOffSwitch_onoffswitchInner_suM {\n  margin-left: 0;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchCheckbox_3ON:checked + .OnOffSwitch_onoffswitchLabel_1z- .OnOffSwitch_onoffswitchSwitch_1-K {\n  right: 0;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchCheckbox_3ON:checked.OnOffSwitch_partial_2dt + .OnOffSwitch_onoffswitchLabel_1z- .OnOffSwitch_onoffswitchInner_suM {\n  margin-left: 50%;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchCheckbox_3ON:checked.OnOffSwitch_partial_2dt + .OnOffSwitch_onoffswitchLabel_1z- .OnOffSwitch_onoffswitchSwitch_1-K {\n  right: 15px;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchLabel_1z- {\n  display: block;\n  overflow: hidden;\n  cursor: pointer;\n  border-width: 2px;\n  border-style: solid;\n  border-radius: 18px\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchLabel_1z-.OnOffSwitch_full_3lp {\n  background-color: #fff;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchLabel_1z-.OnOffSwitch_day_NiO {\n  border-color: #ccc;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchLabel_1z-.OnOffSwitch_day_NiO.OnOffSwitch_partial_2dt {\n  background-color: #ddd;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchLabel_1z-.OnOffSwitch_night_3ss {\n  border-color: #97918A;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchLabel_1z-.OnOffSwitch_night_3ss.OnOffSwitch_partial_2dt {\n  background-color: #97918A;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchInner_suM {\n  display: block;\n  width: 200%;\n  margin-left: -100%;\n  -webkit-transition: margin 0.3s ease-in 0s;\n  -o-transition: margin 0.3s ease-in 0s;\n  transition: margin 0.3s ease-in 0s\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchInner_suM:before, .OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchInner_suM:after {\n  display: block;\n  float: left;\n  width: 50%;\n  height: 18px;\n  padding: 0;\n  line-height: 18px;\n  font-size: 12px;\n  color: white;\n  font-weight: 700;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchInner_suM:before {\n  content: \"on\";\n  padding-left: 10px;\n  background-color: #FFF7C2;\n  color: #474029;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchInner_suM:after {\n  content: \"off\";\n  padding-right: 10px;\n  background-color: #373634;\n  color: #D6D6D6;\n  text-align: right;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchInner_suM.OnOffSwitch_partial_2dt {}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchInner_suM.OnOffSwitch_partial_2dt:before, .OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchInner_suM.OnOffSwitch_partial_2dt:after {\n  content: \"\";\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchInner_suM.OnOffSwitch_partial_2dt.OnOffSwitch_day_NiO {}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchInner_suM.OnOffSwitch_partial_2dt.OnOffSwitch_day_NiO:before, .OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchInner_suM.OnOffSwitch_partial_2dt.OnOffSwitch_day_NiO:after {\n  background-color: #ddd;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchInner_suM.OnOffSwitch_partial_2dt.OnOffSwitch_night_3ss {}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchInner_suM.OnOffSwitch_partial_2dt.OnOffSwitch_night_3ss:before, .OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchInner_suM.OnOffSwitch_partial_2dt.OnOffSwitch_night_3ss:after {\n  background-color: #97918A;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchSwitch_1-K {\n  display: block;\n  width: 18px;\n  margin: 0px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 32px;\n  border-width: 2px;\n  border-style: solid;\n  border-radius: 18px;\n  -webkit-transition: all 0.3s ease-in 0s;\n  -o-transition: all 0.3s ease-in 0s;\n  transition: all 0.3s ease-in 0s\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchSwitch_1-K.OnOffSwitch_day_NiO {\n  border-color: #ccc;\n  background-color: #fff;\n}\n.OnOffSwitch_onoffswitch_3aL .OnOffSwitch_onoffswitchSwitch_1-K.OnOffSwitch_night_3ss {\n  border-color: #101010;\n  background-color: #E5E4E1;\n}\n", "", {"version":3,"sources":["/./src/components/OnOffSwitch/OnOffSwitch.scss"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,oBAAoB;EACpB,uBAAuB;EACvB,YAAY;EACZ,0BAA0B;EAC1B,uBAAuB;EACvB,sBAAsB;CA0IvB;AAxIC;EACE,aAAc;CAyBf;AArBK;EACE,eAAe;CAChB;AAED;EACE,SAAS;CACV;AAKC;EACE,iBAAiB;CAClB;AAED;EACE,YAAY;CACb;AAMT;EACE,eAAe;EACf,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,oBAAoB;EACpB,mBAAoB;CAqBrB;AAnBC;EACE,uBAAuB;CACxB;AAED;EACE,mBAAmB;CAKpB;AAHC;EACE,uBAAuB;CACxB;AAGH;EACE,sBAAsB;CAKvB;AAHC;EACE,0BAA0B;CAC3B;AAIL;EACE,eAAe;EACf,YAAY;EACZ,mBAAmB;EACnB,2CAAmC;EAAnC,sCAAmC;EAAnC,kCAAmC;CAkDpC;AAhDC;EACE,eAAe;EACf,YAAY;EACZ,WAAW;EACX,aAAa;EACb,WAAW;EACX,kBAAkB;EAClB,gBAAgB;EAChB,aAAa;EACb,iBAAiB;EACjB,+BAAuB;UAAvB,uBAAuB;CACxB;AAED;EACE,cAAc;EACd,mBAAmB;EACnB,0BAA0B;EAC1B,eAAe;CAChB;AAED;EACE,eAAe;EACf,oBAAoB;EACpB,0BAA0B;EAC1B,eAAe;EACf,kBAAkB;CACnB;AAED,yFAmBC;AAlBC;EAEE,YAAY;CACb;AAED,6GAKC;AAJC;EAEE,uBAAuB;CACxB;AAGH,+GAKC;AAJC;EAEE,0BAA0B;CAC3B;AAKP;EACE,eAAe;EACf,YAAY;EACZ,YAAY;EACZ,mBAAmB;EACnB,OAAO;EACP,UAAU;EACV,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;EACpB,oBAAoB;EACpB,wCAAgC;EAAhC,mCAAgC;EAAhC,+BAAgC;CAWjC;AATC;EACE,mBAAmB;EACnB,uBAAuB;CACxB;AAED;EACE,sBAAsB;EACtB,0BAA0B;CAC3B","file":"OnOffSwitch.scss","sourcesContent":[".onoffswitch {\n  position: relative;\n  display: table-cell;\n  vertical-align: middle;\n  width: 50px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n\n  .onoffswitchCheckbox {\n    display: none;\n\n    &:checked {\n      + .onoffswitchLabel {\n        .onoffswitchInner {\n          margin-left: 0;\n        }\n\n        .onoffswitchSwitch {\n          right: 0;\n        }\n      }\n\n      &.partial {\n        + .onoffswitchLabel {\n          .onoffswitchInner {\n            margin-left: 50%;\n          }\n\n          .onoffswitchSwitch {\n            right: 15px;\n          }\n        }\n      }\n    }\n  }\n\n  .onoffswitchLabel {\n    display: block;\n    overflow: hidden;\n    cursor: pointer;\n    border-width: 2px;\n    border-style: solid;\n    border-radius: 18px;\n\n    &.full {\n      background-color: #fff;\n    }\n\n    &.day {\n      border-color: #ccc;\n\n      &.partial {\n        background-color: #ddd;\n      }\n    }\n\n    &.night {\n      border-color: #97918A;\n\n      &.partial {\n        background-color: #97918A;\n      }\n    }\n  }\n\n  .onoffswitchInner {\n    display: block;\n    width: 200%;\n    margin-left: -100%;\n    transition: margin 0.3s ease-in 0s;\n\n    &:before, &:after {\n      display: block;\n      float: left;\n      width: 50%;\n      height: 18px;\n      padding: 0;\n      line-height: 18px;\n      font-size: 12px;\n      color: white;\n      font-weight: 700;\n      box-sizing: border-box;\n    }\n\n    &:before {\n      content: \"on\";\n      padding-left: 10px;\n      background-color: #FFF7C2;\n      color: #474029;\n    }\n\n    &:after {\n      content: \"off\";\n      padding-right: 10px;\n      background-color: #373634;\n      color: #D6D6D6;\n      text-align: right;\n    }\n\n    &.partial {\n      &:before,\n      &:after {\n        content: \"\";\n      }\n\n      &.day {\n        &:before,\n        &:after {\n          background-color: #ddd;\n        }\n      }\n\n      &.night {\n        &:before,\n        &:after {\n          background-color: #97918A;\n        }\n      }\n    }\n  }\n\n  .onoffswitchSwitch {\n    display: block;\n    width: 18px;\n    margin: 0px;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 32px;\n    border-width: 2px;\n    border-style: solid;\n    border-radius: 18px;\n    transition: all 0.3s ease-in 0s;\n\n    &.day {\n      border-color: #ccc;\n      background-color: #fff;\n    }\n\n    &.night {\n      border-color: #101010;\n      background-color: #E5E4E1;\n    }\n  }\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"onoffswitch": "OnOffSwitch_onoffswitch_3aL",
  	"onoffswitchCheckbox": "OnOffSwitch_onoffswitchCheckbox_3ON",
  	"onoffswitchLabel": "OnOffSwitch_onoffswitchLabel_1z-",
  	"onoffswitchInner": "OnOffSwitch_onoffswitchInner_suM",
  	"onoffswitchSwitch": "OnOffSwitch_onoffswitchSwitch_1-K",
  	"partial": "OnOffSwitch_partial_2dt",
  	"full": "OnOffSwitch_full_3lp",
  	"day": "OnOffSwitch_day_NiO",
  	"night": "OnOffSwitch_night_3ss"
  };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _GroupsListScss = __webpack_require__(64);
  
  var _GroupsListScss2 = _interopRequireDefault(_GroupsListScss);
  
  var _GroupGroup = __webpack_require__(66);
  
  var _GroupGroup2 = _interopRequireDefault(_GroupGroup);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var GroupsList = (function (_Component) {
    _inherits(GroupsList, _Component);
  
    _createClass(GroupsList, null, [{
      key: 'propTypes',
      value: {
        groups: _react.PropTypes.array.isRequired,
        onLightLoaded: _react.PropTypes.func.isRequired,
        onEdit: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function GroupsList(props, context) {
      _classCallCheck(this, _GroupsList);
  
      _get(Object.getPrototypeOf(_GroupsList.prototype), 'constructor', this).call(this, props, context);
      this.state = {};
    }
  
    _createClass(GroupsList, [{
      key: 'render',
      value: function render() {
        var _this = this;
  
        return _react2['default'].createElement(
          'ul',
          { className: _GroupsListScss2['default'].groupList },
          this.props.groups.map(function (group) {
            var loaded = true;
            group.lights.forEach(function (light) {
              loaded = loaded && typeof light === 'object';
            });
            var action = (group.action.on ? 'on' : 'off') + '.' + group.action.hue;
            var key = 'group-' + group.id + '-loaded-' + loaded + '-action-' + action;
            return _react2['default'].createElement(_GroupGroup2['default'], _extends({ key: key }, group, {
              onLightLoaded: _this.props.onLightLoaded,
              onEdit: _this.props.onEdit
            }));
          })
        );
      }
    }]);
  
    var _GroupsList = GroupsList;
    GroupsList = (0, _decoratorsWithStyles2['default'])(_GroupsListScss2['default'])(GroupsList) || GroupsList;
    return GroupsList;
  })(_react.Component);
  
  exports['default'] = GroupsList;
  module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(65);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./GroupsList.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./GroupsList.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".GroupsList_groupList_23X {\n  list-style: none;\n  padding-left: 0;\n}\n", "", {"version":3,"sources":["/./src/components/GroupsList/GroupsList.scss"],"names":[],"mappings":"AAAA;EACE,iBAAiB;EACjB,gBAAgB;CACjB","file":"GroupsList.scss","sourcesContent":[".groupList {\n  list-style: none;\n  padding-left: 0;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"groupList": "GroupsList_groupList_23X"
  };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _GroupScss = __webpack_require__(67);
  
  var _GroupScss2 = _interopRequireDefault(_GroupScss);
  
  var _classnames = __webpack_require__(47);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _reactFontawesome = __webpack_require__(69);
  
  var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
  
  var _OnOffSwitchOnOffSwitch = __webpack_require__(60);
  
  var _OnOffSwitchOnOffSwitch2 = _interopRequireDefault(_OnOffSwitchOnOffSwitch);
  
  var _apiBridge = __webpack_require__(101);
  
  var _apiBridge2 = _interopRequireDefault(_apiBridge);
  
  var _reactColor = __webpack_require__(59);
  
  var _modelsConverter = __webpack_require__(102);
  
  var _modelsConverter2 = _interopRequireDefault(_modelsConverter);
  
  var _modelsDaytime = __webpack_require__(105);
  
  var _modelsDaytime2 = _interopRequireDefault(_modelsDaytime);
  
  var Group = (function (_Component) {
    _inherits(Group, _Component);
  
    _createClass(Group, null, [{
      key: 'propTypes',
      value: {
        id: _react.PropTypes.string.isRequired,
        name: _react.PropTypes.string,
        type: _react.PropTypes.string,
        lights: _react.PropTypes.array,
        onLightLoaded: _react.PropTypes.func.isRequired,
        onEdit: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function Group(props, context) {
      _classCallCheck(this, _Group);
  
      _get(Object.getPrototypeOf(_Group.prototype), 'constructor', this).call(this, props, context);
      var latestColor = undefined;
      var colors = this.getColorsFromLights(props.lights);
      if (colors.length === 1) {
        latestColor = colors[0];
      }
      this.state = {
        open: false,
        on: false,
        showColorPicker: false,
        latestColor: latestColor,
        canSetColor: colors.length > 0
      };
    }
  
    _createClass(Group, [{
      key: 'onLightsToggle',
      value: function onLightsToggle(turnOn) {
        if (turnOn) {
          _apiBridge2['default'].turnOnGroup(this.props.id).then(this.onLightsToggleComplete.bind(this, true));
        } else {
          _apiBridge2['default'].turnOffGroup(this.props.id).then(this.onLightsToggleComplete.bind(this, false));
        }
      }
    }, {
      key: 'onLightsToggleComplete',
      value: function onLightsToggleComplete(on, success) {
        if (success) {
          for (var i = 0; i < this.props.lights.length; i++) {
            var light = this.props.lights[i];
            light.state.on = on;
            this.props.onLightLoaded(light);
          }
          var colors = this.getColorsFromLights(this.props.lights);
          var latestColor = undefined;
          if (colors.length === 1) {
            latestColor = colors[0];
          }
          this.setState({ latestColor: latestColor, canSetColor: colors.length > 0 });
        }
      }
    }, {
      key: 'onEdit',
      value: function onEdit(event) {
        event.preventDefault();
        event.target.blur();
        this.props.onEdit(this.props.id, this.props.name, this.props.lights);
      }
    }, {
      key: 'onColorPickerChange',
      value: function onColorPickerChange(color) {
        this.setState({ latestColor: color.hex });
        this.changeColor(color.hex);
      }
    }, {
      key: 'onColorPickerCancel',
      value: function onColorPickerCancel() {
        this.setState({ showColorPicker: false });
      }
    }, {
      key: 'onColorChanged',
      value: function onColorChanged(x, y, success) {
        if (success) {
          for (var i = 0; i < this.props.lights.length; i++) {
            var light = this.props.lights[i];
            if (light.state.on && typeof light.state.xy === 'object') {
              light.state.xy = [x, y];
              this.props.onLightLoaded(light);
            }
          }
        } else {
          console.error('failed to change group color', this.props.name);
        }
      }
    }, {
      key: 'onLightLoadError',
      value: function onLightLoadError(response) {
        console.error('failed to load light ' + this.props.id, response);
      }
    }, {
      key: 'getColorsFromLights',
      value: function getColorsFromLights(lights) {
        var _this = this;
  
        var colors = [];
        lights.forEach(function (light) {
          if (typeof light === 'object') {
            colors.push(_this.getLightHex(light.state));
          }
        });
        return [].concat(_toConsumableArray(new Set(colors))).filter(function (c) {
          return typeof c === 'string';
        });
      }
    }, {
      key: 'getLightHex',
      value: function getLightHex(lightState) {
        if (lightState.on) {
          var xy = lightState.xy;
          if (typeof xy === 'object') {
            return _modelsConverter2['default'].cie1931ToHex(xy[0], xy[1], lightState.bri);
          }
        }
      }
    }, {
      key: 'changeColor',
      value: function changeColor(color) {
        var xy = _modelsConverter2['default'].hexToCIE1931(color);
        var x = xy[0];
        var y = xy[1];
        _apiBridge2['default'].setGroupColor(this.props.id, x, y).then(this.onColorChanged.bind(this, x, y));
      }
    }, {
      key: 'toggleGroupOpen',
      value: function toggleGroupOpen(event) {
        event.preventDefault();
        this.setState({ open: !this.state.open });
        event.target.blur();
      }
    }, {
      key: 'areAllLightsOn',
      value: function areAllLightsOn() {
        for (var i = 0; i < this.props.lights.length; i++) {
          var light = this.props.lights[i];
          if (typeof light === 'string') {
            // Light not fully loaded, just have its ID
            return false;
          }
          if (!light.state.on) {
            return false;
          }
        }
        return true;
      }
    }, {
      key: 'areSomeLightsOn',
      value: function areSomeLightsOn() {
        for (var i = 0; i < this.props.lights.length; i++) {
          var light = this.props.lights[i];
          if (typeof light === 'string') {
            // Light not fully loaded, just have its ID
            return false;
          }
          if (light.state.on) {
            return true;
          }
        }
        return false;
      }
    }, {
      key: 'toggleColorPicker',
      value: function toggleColorPicker() {
        this.setState({ showColorPicker: !this.state.showColorPicker });
      }
    }, {
      key: 'render',
      value: function render() {
        var groupStyle = {};
        if (this.state.open) {
          groupStyle.display = 'block';
        } else {
          groupStyle.display = 'none';
        }
        var checkboxID = 'group-' + this.props.id + '-toggle';
        var switchState = 0;
        if (this.areSomeLightsOn()) {
          switchState = 1;
        }
        if (this.areAllLightsOn()) {
          switchState = 2;
        }
        var nightDayClass = _modelsDaytime2['default'].isNight() ? _GroupScss2['default'].night : _GroupScss2['default'].day;
        var colorPickerStyle = {
          display: this.state.showColorPicker ? 'block' : 'none'
        };
        var pickerColor = undefined;
        if (typeof this.state.latestColor === 'string') {
          pickerColor = '#' + this.state.latestColor;
        }
        return _react2['default'].createElement(
          'li',
          { className: (0, _classnames2['default'])(_GroupScss2['default'].group, nightDayClass) },
          _react2['default'].createElement(
            'header',
            { className: _GroupScss2['default'].groupHeader },
            _react2['default'].createElement(
              'h3',
              { className: _GroupScss2['default'].groupName },
              _react2['default'].createElement(
                'a',
                { href: '#', onClick: this.toggleGroupOpen.bind(this) },
                this.state.open ? _react2['default'].createElement(_reactFontawesome2['default'], { name: 'chevron-down', className: _GroupScss2['default'].openIndicator }) : _react2['default'].createElement(_reactFontawesome2['default'], { name: 'chevron-right', className: _GroupScss2['default'].openIndicator }),
                this.props.name
              )
            ),
            _react2['default'].createElement(_OnOffSwitchOnOffSwitch2['default'], { id: checkboxID, state: switchState,
              onToggle: this.onLightsToggle.bind(this)
            }),
            this.state.canSetColor ? _react2['default'].createElement(
              'div',
              { className: _GroupScss2['default'].colorBlockAndPicker },
              _react2['default'].createElement(
                'button',
                { type: 'button', onClick: this.toggleColorPicker.bind(this),
                  className: (0, _classnames2['default'])(_GroupScss2['default'].colorBlock, nightDayClass)
                },
                'Set Color'
              ),
              _react2['default'].createElement(
                'div',
                { style: colorPickerStyle, className: (0, _classnames2['default'])(_GroupScss2['default'].colorPickerWrapper, nightDayClass) },
                _react2['default'].createElement(_reactColor.SliderPicker, { color: pickerColor,
                  onChangeComplete: this.onColorPickerChange.bind(this)
                })
              )
            ) : ''
          ),
          _react2['default'].createElement(
            'div',
            { className: _GroupScss2['default'].groupContents, style: groupStyle },
            _react2['default'].createElement(
              'ul',
              { className: _GroupScss2['default'].groupLights },
              this.props.lights.map(function (light) {
                var isString = typeof light === 'string';
                var key = 'light-' + (isString ? light : light.id);
                return _react2['default'].createElement(
                  'li',
                  { key: key, className: _GroupScss2['default'].groupLight },
                  isString ? light : light.name
                );
              })
            ),
            _react2['default'].createElement(
              'a',
              { href: '#', onClick: this.onEdit.bind(this), className: _GroupScss2['default'].editLink },
              _react2['default'].createElement(_reactFontawesome2['default'], { name: 'pencil', className: _GroupScss2['default'].editIcon }),
              'Edit'
            )
          )
        );
      }
    }]);
  
    var _Group = Group;
    Group = (0, _decoratorsWithStyles2['default'])(_GroupScss2['default'])(Group) || Group;
    return Group;
  })(_react.Component);
  
  exports['default'] = Group;
  module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(68);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Group.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Group.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".Group_group_23_ {\n  width: 48%;\n  margin: 0 1% 10px;\n  display: inline-block;\n  border-width: 1px;\n  border-style: solid;\n  padding: 10px;\n  border-radius: 2px;\n  vertical-align: top\n}\n\n.Group_group_23_.Group_night_WFU {\n  border-color: #38231D\n}\n\n.Group_group_23_.Group_day_22J {\n  border-color: #ccc\n}\n\n.Group_groupHeader_g_v {\n  display: table;\n  width: 100%;\n}\n\n.Group_groupName_2Et {\n  margin-bottom: 0;\n  display: table-cell;\n  font-weight: normal;\n  font-size: 18px;\n}\n\n.Group_groupName_2Et a {\n  text-decoration: none;\n}\n\n.Group_colorBlockAndPicker_36H {\n  display: table-cell;\n  vertical-align: middle;\n}\n\n.Group_colorBlockAndPicker_36H {\n  width: 6.5em;\n  font-size: 12px;\n  position: relative;\n}\n\n.Group_colorBlockAndPicker_36H button.Group_colorBlock_1rp {\n  border-radius: 4px;\n  border: none;\n  width: 100%;\n  height: 24px;\n  line-height: 24px;\n  font-size: inherit;\n  padding: 0;\n  margin-left: 5px\n}\n\n.Group_colorBlockAndPicker_36H button.Group_colorBlock_1rp:focus {\n  outline: 0\n}\n\n.Group_colorBlockAndPicker_36H button.Group_colorBlock_1rp.Group_night_WFU {\n  background-color: #101010;\n  color: #97918A\n}\n\n.Group_colorBlockAndPicker_36H button.Group_colorBlock_1rp.Group_night_WFU:hover {\n  background-color: #231511;\n  color: #E5E4E1\n}\n\n.Group_colorBlockAndPicker_36H button.Group_colorBlock_1rp.Group_day_22J {\n  background-color: #fff;\n  color: #333\n}\n\n.Group_colorBlockAndPicker_36H .Group_colorPickerWrapper_3su {\n  z-index: 99;\n  position: absolute;\n  width: 400px;\n  border-width: 1px;\n  border-style: solid;\n  border-radius: 4px;\n  padding: 10px;\n  left: -175px;\n  -webkit-box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);\n  box-shadow: 0 0 5px 0 rgba(0,0,0,0.3)\n}\n\n.Group_colorBlockAndPicker_36H .Group_colorPickerWrapper_3su.Group_night_WFU {\n  border-color: #38231D;\n  background-color: #101010\n}\n\n.Group_colorBlockAndPicker_36H .Group_colorPickerWrapper_3su.Group_day_22J {\n  border-color: #ccc;\n  background-color: #fff\n}\n\n.Group_openIndicator_2t7 {\n  margin-right: 5px;\n  font-size: 16px;\n}\n\n.Group_onOffSwitch_QKC {\n  float: right;\n}\n\n.Group_groupContents_3Z0 {\n  margin-left: 21px;\n  margin-right: 55px;\n  font-size: 13px;\n}\n\n.Group_groupLights_MkK {\n  list-style: none;\n  padding-left: 0;\n  margin-bottom: 10px;\n}\n\n.Group_groupLight_1rf {\n  white-space: nowrap;\n  display: inline-block\n}\n\n.Group_groupLight_1rf:after {\n  content: \",\\A0\"\n}\n\n.Group_groupLight_1rf:last-child {\n\n}\n\n.Group_groupLight_1rf:last-child:after {\n  content: \"\"\n}\n\n.Group_editLink_yeU {\n  text-decoration: none;\n}\n\n.Group_editLink_yeU .Group_editIcon_2BR {\n  margin-right: 0.3em;\n}\n\n.Group_colorBlockAndPicker_36H {\n\n}\n\n.Group_colorBlock_1rp {\n\n}\n\n.Group_colorPickerWrapper_3su {\n\n}\n", "", {"version":3,"sources":["/./src/components/Group/Group.scss"],"names":[],"mappings":"AAAA;EACE,WAAW;EACX,kBAAkB;EAClB,sBAAsB;EACtB,kBAAkB;EAClB,oBAAoB;EACpB,cAAc;EACd,mBAAmB;EACnB,mBAAoB;CASrB;;AAPC;EACE,qBAAsB;CACvB;;AAED;EACE,kBAAmB;CACpB;;AAGH;EACE,eAAe;EACf,YAAY;CACb;;AAED;EACE,iBAAiB;EACjB,oBAAoB;EACpB,oBAAoB;EACpB,gBAAgB;CAKjB;;AAHC;EACE,sBAAsB;CACvB;;AAGH;EACE,oBAAoB;EACpB,uBAAuB;CACxB;;AAED;EACE,aAAa;EACb,gBAAgB;EAChB,mBAAmB;CAsDpB;;AApDC;EACE,mBAAmB;EACnB,aAAa;EACb,YAAY;EACZ,aAAa;EACb,kBAAkB;EAClB,mBAAmB;EACnB,WAAW;EACX,gBAAiB;CAoBlB;;AAlBC;EACE,UAAW;CACZ;;AAED;EACE,0BAA0B;EAC1B,cAAe;CAMhB;;AAJC;EACE,0BAA0B;EAC1B,cAAe;CAChB;;AAGH;EACE,uBAAuB;EACvB,WAAY;CACb;;AAGH;EACE,YAAY;EACZ,mBAAmB;EACnB,aAAa;EACb,kBAAkB;EAClB,oBAAoB;EACpB,mBAAmB;EACnB,cAAc;EACd,aAAa;EACb,8CAA8C;EAC9C,qCAAsC;CAWvC;;AATC;EACE,sBAAsB;EACtB,yBAA0B;CAC3B;;AAED;EACE,mBAAmB;EACnB,sBAAuB;CACxB;;AAIL;EACE,kBAAkB;EAClB,gBAAgB;CACjB;;AAED;EACE,aAAa;CACd;;AAED;EACE,kBAAkB;EAClB,mBAAmB;EACnB,gBAAgB;CACjB;;AAED;EACE,iBAAiB;EACjB,gBAAgB;EAChB,oBAAoB;CACrB;;AAED;EACE,oBAAoB;EACpB,qBAAsB;CAWvB;;AATC;EACE,eAAgB;CACjB;;AAED;;CAIC;;AAHC;EACE,WAAY;CACb;;AAIL;EACE,sBAAsB;CAKvB;;AAHC;EACE,oBAAoB;CACrB;;AAGH;;CAEC;;AAED;;CAEC;;AAED;;CAEC","file":"Group.scss","sourcesContent":[".group {\n  width: 48%;\n  margin: 0 1% 10px;\n  display: inline-block;\n  border-width: 1px;\n  border-style: solid;\n  padding: 10px;\n  border-radius: 2px;\n  vertical-align: top;\n\n  &.night {\n    border-color: #38231D;\n  }\n\n  &.day {\n    border-color: #ccc;\n  }\n}\n\n.groupHeader {\n  display: table;\n  width: 100%;\n}\n\n.groupName {\n  margin-bottom: 0;\n  display: table-cell;\n  font-weight: normal;\n  font-size: 18px;\n\n  a {\n    text-decoration: none;\n  }\n}\n\n.colorBlockAndPicker {\n  display: table-cell;\n  vertical-align: middle;\n}\n\n.colorBlockAndPicker {\n  width: 6.5em;\n  font-size: 12px;\n  position: relative;\n\n  button.colorBlock {\n    border-radius: 4px;\n    border: none;\n    width: 100%;\n    height: 24px;\n    line-height: 24px;\n    font-size: inherit;\n    padding: 0;\n    margin-left: 5px;\n\n    &:focus {\n      outline: 0;\n    }\n\n    &.night {\n      background-color: #101010;\n      color: #97918A;\n\n      &:hover {\n        background-color: #231511;\n        color: #E5E4E1;\n      }\n    }\n\n    &.day {\n      background-color: #fff;\n      color: #333;\n    }\n  }\n\n  .colorPickerWrapper {\n    z-index: 99;\n    position: absolute;\n    width: 400px;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 4px;\n    padding: 10px;\n    left: -175px;\n    -webkit-box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);\n    box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);\n\n    &.night {\n      border-color: #38231D;\n      background-color: #101010;\n    }\n\n    &.day {\n      border-color: #ccc;\n      background-color: #fff;\n    }\n  }\n}\n\n.openIndicator {\n  margin-right: 5px;\n  font-size: 16px;\n}\n\n.onOffSwitch {\n  float: right;\n}\n\n.groupContents {\n  margin-left: 21px;\n  margin-right: 55px;\n  font-size: 13px;\n}\n\n.groupLights {\n  list-style: none;\n  padding-left: 0;\n  margin-bottom: 10px;\n}\n\n.groupLight {\n  white-space: nowrap;\n  display: inline-block;\n\n  &:after {\n    content: \",\\a0\";\n  }\n\n  &:last-child {\n    &:after {\n      content: \"\";\n    }\n  }\n}\n\n.editLink {\n  text-decoration: none;\n\n  .editIcon {\n    margin-right: 0.3em;\n  }\n}\n\n.colorBlockAndPicker {\n\n}\n\n.colorBlock {\n\n}\n\n.colorPickerWrapper {\n\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"group": "Group_group_23_",
  	"night": "Group_night_WFU",
  	"day": "Group_day_22J",
  	"groupHeader": "Group_groupHeader_g_v",
  	"groupName": "Group_groupName_2Et",
  	"colorBlockAndPicker": "Group_colorBlockAndPicker_36H",
  	"colorBlock": "Group_colorBlock_1rp",
  	"colorPickerWrapper": "Group_colorPickerWrapper_3su",
  	"openIndicator": "Group_openIndicator_2t7",
  	"onOffSwitch": "Group_onOffSwitch_QKC",
  	"groupContents": "Group_groupContents_3Z0",
  	"groupLights": "Group_groupLights_MkK",
  	"groupLight": "Group_groupLight_1rf",
  	"editLink": "Group_editLink_yeU",
  	"editIcon": "Group_editIcon_2BR"
  };

/***/ },
/* 69 */
/***/ function(module, exports) {

  module.exports = require("react-fontawesome");

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _GroupFormScss = __webpack_require__(71);
  
  var _GroupFormScss2 = _interopRequireDefault(_GroupFormScss);
  
  var _classnames = __webpack_require__(47);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _LightCheckboxLightCheckbox = __webpack_require__(73);
  
  var _LightCheckboxLightCheckbox2 = _interopRequireDefault(_LightCheckboxLightCheckbox);
  
  var _apiBridge = __webpack_require__(101);
  
  var _apiBridge2 = _interopRequireDefault(_apiBridge);
  
  var GroupForm = (function (_Component) {
    _inherits(GroupForm, _Component);
  
    _createClass(GroupForm, null, [{
      key: 'propTypes',
      value: {
        lights: _react.PropTypes.object.isRequired,
        ids: _react.PropTypes.array.isRequired,
        onCreated: _react.PropTypes.func.isRequired,
        onUpdated: _react.PropTypes.func.isRequired,
        onCanceled: _react.PropTypes.func.isRequired,
        name: _react.PropTypes.string,
        action: _react.PropTypes.object,
        recycle: _react.PropTypes.bool,
        type: _react.PropTypes.string,
        id: _react.PropTypes.string,
        checkedLightIDs: _react.PropTypes.array
      },
      enumerable: true
    }]);
  
    function GroupForm(props, context) {
      _classCallCheck(this, _GroupForm);
  
      _get(Object.getPrototypeOf(_GroupForm.prototype), 'constructor', this).call(this, props, context);
      this.state = { name: undefined, checkedLightIDs: undefined };
    }
  
    _createClass(GroupForm, [{
      key: 'onNameChange',
      value: function onNameChange(e) {
        this.setState({ name: e.target.value });
      }
    }, {
      key: 'onLightToggled',
      value: function onLightToggled(id, checked) {
        var checkedLightIDs = this.state.checkedLightIDs || this.props.checkedLightIDs || [];
        var index = checkedLightIDs.indexOf(id);
        if (checked && index < 0) {
          checkedLightIDs.push(id);
        } else if (!checked && index > -1) {
          checkedLightIDs = checkedLightIDs.slice(0, index).concat(checkedLightIDs.slice(index + 1, checkedLightIDs.length));
        }
        this.setState({ checkedLightIDs: checkedLightIDs });
      }
    }, {
      key: 'onGroupSaved',
      value: function onGroupSaved(name, lightIDs, group) {
        group.name = name;
        var lights = this.props.lights;
        group.lights = lightIDs.map(function (id) {
          return lights[id];
        });
        if (typeof this.props.id === 'string') {
          this.props.onUpdated(group);
        } else {
          this.props.onCreated(group);
        }
        this.setState({ checkedLightIDs: undefined, name: undefined });
      }
    }, {
      key: 'onGroupUpdated',
      value: function onGroupUpdated(name, lightIDs, success) {
        if (success) {
          var group = { id: this.props.id };
          this.onGroupSaved(name, lightIDs, group);
        }
      }
    }, {
      key: 'onGroupSaveError',
      value: function onGroupSaveError(name, response) {
        var action = typeof this.props.id === 'string' ? 'update' : 'create';
        console.error('failed to ' + action + ' group', name, response);
      }
    }, {
      key: 'onCancel',
      value: function onCancel(event) {
        var _this = this;
  
        event.preventDefault();
        event.target.blur();
        this.setState({ name: undefined, checkedLightIDs: undefined }, function () {
          _this.props.onCanceled();
        });
      }
    }, {
      key: 'handleSubmit',
      value: function handleSubmit(e) {
        e.preventDefault();
        if (!this.isValid()) {
          return;
        }
        var name = this.props.name;
        if (typeof this.state.name === 'string') {
          name = this.state.name;
        }
        var lightIDs = this.props.checkedLightIDs;
        if (typeof this.state.checkedLightIDs === 'object') {
          lightIDs = this.state.checkedLightIDs;
        }
        if (typeof this.props.id === 'string') {
          _apiBridge2['default'].updateGroup(this.props.id, name, lightIDs).then(this.onGroupUpdated.bind(this, name, lightIDs))['catch'](this.onGroupSaveError.bind(this, name));
        } else {
          _apiBridge2['default'].createGroup(name, lightIDs).then(this.onGroupSaved.bind(this, name, lightIDs))['catch'](this.onGroupSaveError.bind(this, name));
        }
      }
    }, {
      key: 'isValid',
      value: function isValid() {
        if (typeof this.state.name === 'string' && this.state.name.trim().length < 1) {
          return false;
        }
        if (typeof this.state.checkedLightIDs === 'object' && this.state.checkedLightIDs.length < 1) {
          return false;
        }
        return true;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;
  
        var checkedLightIDs = [];
        if (typeof this.state.checkedLightIDs === 'undefined') {
          checkedLightIDs = this.props.checkedLightIDs || [];
        } else {
          checkedLightIDs = this.state.checkedLightIDs;
        }
        var name = typeof this.state.name === 'string' ? this.state.name : this.props.name || '';
        var showCancelLink = typeof this.props.id === 'string' || typeof this.props.name === 'string';
        return _react2['default'].createElement(
          'form',
          { onSubmit: this.handleSubmit.bind(this) },
          _react2['default'].createElement(
            'p',
            { className: _GroupFormScss2['default'].helpText },
            'Use groups to control multiple lights at once.'
          ),
          _react2['default'].createElement(
            'div',
            { className: _GroupFormScss2['default'].field },
            _react2['default'].createElement(
              'label',
              { className: _GroupFormScss2['default'].label, htmlFor: 'new-group-name' },
              'Name:'
            ),
            _react2['default'].createElement('input', { type: 'text', id: 'new-group-name',
              onChange: this.onNameChange.bind(this),
              value: name,
              placeholder: 'e.g., Back Bedroom',
              className: _GroupFormScss2['default'].textField,
              autoFocus: 'autofocus'
            })
          ),
          _react2['default'].createElement(
            'div',
            { className: (0, _classnames2['default'])(_GroupFormScss2['default'].lightsField, _GroupFormScss2['default'].field) },
            this.props.ids.map(function (lightID) {
              var checked = checkedLightIDs.indexOf(lightID) > -1;
              var key = 'light-' + lightID + '-checked-' + checked;
              return _react2['default'].createElement(_LightCheckboxLightCheckbox2['default'], _extends({ key: key, id: lightID,
                onToggle: _this2.onLightToggled.bind(_this2),
                checked: checked }, _this2.props.lights[lightID]));
            })
          ),
          _react2['default'].createElement(
            'div',
            { className: _GroupFormScss2['default'].formControls },
            _react2['default'].createElement(
              'button',
              { type: 'submit', className: _GroupFormScss2['default'].btn, disabled: !this.isValid() },
              'Save'
            ),
            showCancelLink ? _react2['default'].createElement(
              'a',
              { href: '#', className: _GroupFormScss2['default'].cancelLink, onClick: this.onCancel.bind(this) },
              'Cancel'
            ) : ''
          )
        );
      }
    }]);
  
    var _GroupForm = GroupForm;
    GroupForm = (0, _decoratorsWithStyles2['default'])(_GroupFormScss2['default'])(GroupForm) || GroupForm;
    return GroupForm;
  })(_react.Component);
  
  exports['default'] = GroupForm;
  module.exports = exports['default'];

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(72);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./GroupForm.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./GroupForm.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".GroupForm_field_1xT {\n  margin-bottom: 10px;\n  float: left;\n  margin-right: 2%\n}\n\n.GroupForm_field_1xT.GroupForm_lightsField_1Bl {\n  width: 100%;\n  clear: left;\n  margin-right: 0;\n  float: none\n}\n\n.GroupForm_formControls_2_u {\n  clear: both;\n}\n\n.GroupForm_label_1E2 {\n  display: inline-block;\n  font-weight: 700;\n  font-size: 14px;\n  margin: 0 10px;\n}\n\ninput[type=\"text\"].GroupForm_textField_2Rg {\n  display: inline-block;\n  width: 20em;\n}\n\nbutton.GroupForm_btn_1i0 {\n  margin-left: 10px;\n}\n\n.GroupForm_helpText_YNW {\n  margin: 0 10px 10px 10px;\n}\n\n.GroupForm_cancelLink_NH6 {\n  text-decoration: none;\n  font-size: 13px;\n  display: inline-block;\n  margin-left: 10px;\n}\n", "", {"version":3,"sources":["/./src/components/GroupForm/GroupForm.scss"],"names":[],"mappings":"AAAA;EACE,oBAAoB;EACpB,YAAY;EACZ,gBAAiB;CAQlB;;AANC;EACE,YAAY;EACZ,YAAY;EACZ,gBAAgB;EAChB,WAAY;CACb;;AAGH;EACE,YAAY;CACb;;AAED;EACE,sBAAsB;EACtB,iBAAiB;EACjB,gBAAgB;EAChB,eAAe;CAChB;;AAED;EACE,sBAAsB;EACtB,YAAY;CACb;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,yBAAyB;CAC1B;;AAED;EACE,sBAAsB;EACtB,gBAAgB;EAChB,sBAAsB;EACtB,kBAAkB;CACnB","file":"GroupForm.scss","sourcesContent":[".field {\n  margin-bottom: 10px;\n  float: left;\n  margin-right: 2%;\n\n  &.lightsField {\n    width: 100%;\n    clear: left;\n    margin-right: 0;\n    float: none;\n  }\n}\n\n.formControls {\n  clear: both;\n}\n\n.label {\n  display: inline-block;\n  font-weight: 700;\n  font-size: 14px;\n  margin: 0 10px;\n}\n\ninput[type=\"text\"].textField {\n  display: inline-block;\n  width: 20em;\n}\n\nbutton.btn {\n  margin-left: 10px;\n}\n\n.helpText {\n  margin: 0 10px 10px 10px;\n}\n\n.cancelLink {\n  text-decoration: none;\n  font-size: 13px;\n  display: inline-block;\n  margin-left: 10px;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"field": "GroupForm_field_1xT",
  	"lightsField": "GroupForm_lightsField_1Bl",
  	"formControls": "GroupForm_formControls_2_u",
  	"label": "GroupForm_label_1E2",
  	"textField": "GroupForm_textField_2Rg",
  	"btn": "GroupForm_btn_1i0",
  	"helpText": "GroupForm_helpText_YNW",
  	"cancelLink": "GroupForm_cancelLink_NH6"
  };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LightCheckboxScss = __webpack_require__(74);
  
  var _LightCheckboxScss2 = _interopRequireDefault(_LightCheckboxScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var LightCheckbox = (function (_Component) {
    _inherits(LightCheckbox, _Component);
  
    _createClass(LightCheckbox, null, [{
      key: 'propTypes',
      value: {
        checked: _react.PropTypes.bool.isRequired,
        id: _react.PropTypes.string.isRequired,
        onToggle: _react.PropTypes.func.isRequired,
        name: _react.PropTypes.string
      },
      enumerable: true
    }]);
  
    function LightCheckbox(props, context) {
      _classCallCheck(this, _LightCheckbox);
  
      _get(Object.getPrototypeOf(_LightCheckbox.prototype), 'constructor', this).call(this, props, context);
      this.state = { checked: undefined };
    }
  
    _createClass(LightCheckbox, [{
      key: 'onChange',
      value: function onChange(e) {
        var _this = this;
  
        e.target.blur();
        this.setState({ checked: e.target.checked }, function () {
          _this.props.onToggle(_this.props.id, _this.state.checked);
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var id = 'light-checkbox-' + this.props.id;
        var checked = false;
        if (typeof this.state.checked === 'undefined') {
          checked = this.props.checked;
        } else {
          checked = this.state.checked;
        }
        return _react2['default'].createElement(
          'label',
          { className: _LightCheckboxScss2['default'].label, htmlFor: id },
          _react2['default'].createElement('input', { type: 'checkbox', id: id, name: 'light',
            onChange: this.onChange.bind(this),
            className: _LightCheckboxScss2['default'].checkbox, checked: checked
          }),
          this.props.name
        );
      }
    }]);
  
    var _LightCheckbox = LightCheckbox;
    LightCheckbox = (0, _decoratorsWithStyles2['default'])(_LightCheckboxScss2['default'])(LightCheckbox) || LightCheckbox;
    return LightCheckbox;
  })(_react.Component);
  
  exports['default'] = LightCheckbox;
  module.exports = exports['default'];

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(75);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./LightCheckbox.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./LightCheckbox.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".LightCheckbox_label_3Di {\n  display: inline-block;\n  white-space: nowrap;\n  padding: 0 10px;\n  font-size: 14px;\n  width: 33%;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  position: relative;\n}\n\n.LightCheckbox_checkbox_2sa {\n  margin-right: 5px;\n}\n", "", {"version":3,"sources":["/./src/components/LightCheckbox/LightCheckbox.scss"],"names":[],"mappings":"AAAA;EACE,sBAAsB;EACtB,oBAAoB;EACpB,gBAAgB;EAChB,gBAAgB;EAChB,WAAW;EACX,wBAAwB;EACxB,iBAAiB;EACjB,mBAAmB;CACpB;;AAED;EACE,kBAAkB;CACnB","file":"LightCheckbox.scss","sourcesContent":[".label {\n  display: inline-block;\n  white-space: nowrap;\n  padding: 0 10px;\n  font-size: 14px;\n  width: 33%;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  position: relative;\n}\n\n.checkbox {\n  margin-right: 5px;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"label": "LightCheckbox_label_3Di",
  	"checkbox": "LightCheckbox_checkbox_2sa"
  };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _configJson = __webpack_require__(49);
  
  var _configJson2 = _interopRequireDefault(_configJson);
  
  var _reactCookie = __webpack_require__(77);
  
  var _reactCookie2 = _interopRequireDefault(_reactCookie);
  
  var CookieAndLocalStorage = (function () {
    function CookieAndLocalStorage() {
      _classCallCheck(this, CookieAndLocalStorage);
    }
  
    _createClass(CookieAndLocalStorage, [{
      key: 'getItem',
      value: function getItem(key) {
        if (typeof window !== 'undefined') {
          if (window.localStorage) {
            return window.localStorage.getItem(key);
          }
          console.error('browser does not support local storage');
        }
        return _reactCookie2['default'].load(key);
      }
    }, {
      key: 'setItem',
      value: function setItem(key, value) {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, value);
        }
        _reactCookie2['default'].save(key, value, { path: '/' });
      }
    }]);
  
    return CookieAndLocalStorage;
  })();
  
  var LocalStorage = (function () {
    function LocalStorage() {
      _classCallCheck(this, LocalStorage);
    }
  
    _createClass(LocalStorage, null, [{
      key: 'getStore',
      value: function getStore() {
        if (typeof this.store === 'undefined') {
          this.store = new CookieAndLocalStorage();
        }
        return this.store;
      }
    }, {
      key: 'getJSON',
      value: function getJSON() {
        var store = this.getStore();
        var appData = store.getItem(_configJson2['default'][("development")].localStorageKey) || '{}';
        return JSON.parse(appData);
      }
    }, {
      key: 'get',
      value: function get(key) {
        var appData = this.getJSON();
        return appData[key];
      }
    }, {
      key: 'set',
      value: function set(key, value) {
        var appData = this.getJSON();
        appData[key] = value;
        this.writeHash(appData);
      }
    }, {
      key: 'setMany',
      value: function setMany(data) {
        var appData = this.getJSON();
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            var value = data[key];
            if (typeof value === 'undefined') {
              delete appData[key];
            } else {
              appData[key] = value;
            }
          }
        }
        this.writeHash(appData);
      }
    }, {
      key: 'writeHash',
      value: function writeHash(appData) {
        var store = this.getStore();
        store.setItem(_configJson2['default'][("development")].localStorageKey, JSON.stringify(appData));
      }
    }, {
      key: 'delete',
      value: function _delete(key) {
        var appData = this.getJSON();
        delete appData[key];
        this.writeHash(appData);
      }
    }]);
  
    return LocalStorage;
  })();
  
  exports['default'] = LocalStorage;
  module.exports = exports['default'];

/***/ },
/* 77 */
/***/ function(module, exports) {

  module.exports = require("react-cookie");

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _SettingsPageScss = __webpack_require__(79);
  
  var _SettingsPageScss2 = _interopRequireDefault(_SettingsPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _apiBridge = __webpack_require__(101);
  
  var _apiBridge2 = _interopRequireDefault(_apiBridge);
  
  var _BridgeDisplay = __webpack_require__(81);
  
  var _BridgeDisplay2 = _interopRequireDefault(_BridgeDisplay);
  
  var _UserForm = __webpack_require__(82);
  
  var _UserForm2 = _interopRequireDefault(_UserForm);
  
  var title = 'Settings';
  
  var SettingsPage = (function (_Component) {
    _inherits(SettingsPage, _Component);
  
    _createClass(SettingsPage, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function SettingsPage(props) {
      _classCallCheck(this, _SettingsPage);
  
      _get(Object.getPrototypeOf(_SettingsPage.prototype), 'constructor', this).call(this, props);
      this.state = {
        numLights: undefined,
        bridgeDiscovered: false,
        discoveredIP: undefined
      };
    }
  
    _createClass(SettingsPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        _apiBridge2['default'].get().then(this.onBridgeLoaded.bind(this))['catch'](this.onBridgeLoadError.bind(this));
      }
    }, {
      key: 'onAllLightsLoaded',
      value: function onAllLightsLoaded(group) {
        if (group.hasOwnProperty('errno')) {
          console.error('failed to load group of all lights', group);
          return;
        }
        this.setState({ numLights: group.lights.length });
      }
    }, {
      key: 'onBridgeLoaded',
      value: function onBridgeLoaded(bridgeAndConnection) {
        if (bridgeAndConnection.hasOwnProperty('error')) {
          console.error('failed to load bridge info', bridgeAndConnection.error);
          return;
        }
        var connection = bridgeAndConnection.connection;
        this.setState({
          user: connection.user,
          ip: connection.ip,
          bridge: bridgeAndConnection.bridge,
          haveBridge: true,
          bridgeConnectionID: connection.id
        });
      }
    }, {
      key: 'onBridgeLoadError',
      value: function onBridgeLoadError(response) {
        console.error('failed to load bridge', response);
      }
    }, {
      key: 'onBridgeSaved',
      value: function onBridgeSaved(bridgeAndConnection) {
        this.onBridgeLoaded(bridgeAndConnection);
        var connection = bridgeAndConnection.connection;
        _apiBridge2['default'].getAllLights(connection.id).then(this.onAllLightsLoaded.bind(this));
      }
    }, {
      key: 'onBridgeSaveError',
      value: function onBridgeSaveError(response) {
        console.error('failed to save bridge info', response);
      }
    }, {
      key: 'onBridgesDiscovered',
      value: function onBridgesDiscovered(bridges) {
        if (bridges.length > 0) {
          this.setState({
            discoveredIP: bridges[0].ipaddress,
            bridgeDiscovered: true
          });
        }
      }
    }, {
      key: 'discoverBridges',
      value: function discoverBridges() {
        _apiBridge2['default'].discover().then(this.onBridgesDiscovered.bind(this));
      }
    }, {
      key: 'handleSubmit',
      value: function handleSubmit(e) {
        e.preventDefault();
        if (typeof this.state.ip === 'string' && typeof this.state.user === 'string') {
          _apiBridge2['default'].save(this.state.ip, this.state.user).then(this.onBridgeSaved.bind(this))['catch'](this.onBridgeSaveError.bind(this));
        }
      }
    }, {
      key: 'handleIPChange',
      value: function handleIPChange(e) {
        var ip = e.target.value.trim();
        if (ip === '') {
          ip = undefined;
        }
        this.setState({ ip: ip, haveBridge: false });
      }
    }, {
      key: 'handleUserChange',
      value: function handleUserChange(e) {
        var user = e.target.value.trim();
        if (user === '') {
          user = undefined;
        }
        this.setState({ user: user, haveBridge: false });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'header',
            null,
            _react2['default'].createElement(
              'h2',
              null,
              'Bridge Setup'
            )
          ),
          this.state.haveBridge ? _react2['default'].createElement(_BridgeDisplay2['default'], _extends({}, this.state.bridge, {
            numLights: this.state.numLights
          })) : _react2['default'].createElement(
            'div',
            null,
            this.state.bridgeDiscovered ? _react2['default'].createElement(
              'div',
              null,
              this.state.attemptedRegistration ? '' : _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                  'p',
                  null,
                  'Found your bridge! Its IP address is',
                  _react2['default'].createElement(
                    'strong',
                    null,
                    ' ',
                    this.state.discoveredIP
                  ),
                  '.'
                ),
                _react2['default'].createElement(_UserForm2['default'], { ip: this.state.discoveredIP,
                  onBridgeSaved: this.onBridgeSaved.bind(this)
                })
              )
            ) : _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(
                'p',
                null,
                'We have to connect to your Philips Hue bridge. You can connect to it manually:'
              ),
              _react2['default'].createElement(
                'form',
                { onSubmit: this.handleSubmit.bind(this) },
                _react2['default'].createElement(
                  'div',
                  { className: _SettingsPageScss2['default'].field },
                  _react2['default'].createElement(
                    'label',
                    { className: _SettingsPageScss2['default'].label, htmlFor: 'hue_bridge_ip' },
                    'Philips Hue bridge IP address:'
                  ),
                  _react2['default'].createElement('input', { type: 'text', id: 'hue_bridge_ip',
                    value: this.state.ip,
                    onChange: this.handleIPChange.bind(this),
                    placeholder: 'e.g., 192.168.1.182'
                  })
                ),
                _react2['default'].createElement(
                  'div',
                  { className: _SettingsPageScss2['default'].field },
                  _react2['default'].createElement(
                    'label',
                    { className: _SettingsPageScss2['default'].label, htmlFor: 'hue_bridge_user' },
                    'Philips Hue bridge user:'
                  ),
                  _react2['default'].createElement('input', { type: 'text', id: 'hue_bridge_user',
                    value: this.state.user,
                    onChange: this.handleUserChange.bind(this),
                    placeholder: 'e.g., 165131875f4bdff60d7f3dd05d46bd48'
                  })
                ),
                _react2['default'].createElement(
                  'div',
                  { className: _SettingsPageScss2['default'].formControls },
                  _react2['default'].createElement(
                    'button',
                    { type: 'submit' },
                    'Save'
                  )
                )
              ),
              _react2['default'].createElement('hr', null),
              _react2['default'].createElement(
                'p',
                null,
                'Or we can search for it on your network:'
              ),
              _react2['default'].createElement(
                'button',
                { onClick: this.discoverBridges.bind(this), type: 'button' },
                'Discover Bridge'
              )
            )
          )
        );
      }
    }]);
  
    var _SettingsPage = SettingsPage;
    SettingsPage = (0, _decoratorsWithStyles2['default'])(_SettingsPageScss2['default'])(SettingsPage) || SettingsPage;
    return SettingsPage;
  })(_react.Component);
  
  exports['default'] = SettingsPage;
  module.exports = exports['default'];

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(80);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./SettingsPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./SettingsPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n.SettingsPage_field_1jr {\n  margin-bottom: 10px;\n  width: 47%;\n  float: left;\n  margin-right: 2%;\n}\n\n.SettingsPage_formControls_1dN {\n  clear: both;\n}\n\n.SettingsPage_label_24A {\n  display: block;\n  font-weight: 700;\n  margin-bottom: 5px;\n  font-size: 14px;\n}\n\n.SettingsPage_bridgeDetails_2cH th {\n  font-weight: 700;\n  text-align: right;\n  padding-right: 15px;\n}\n\n.SettingsPage_error_2J9 {\n  padding: 15px;\n  margin-bottom: 20px;\n  border: 1px solid #ebccd1;\n  border-radius: 4px;\n  color: #a94442;\n  background-color: #f2dede;\n}\n\n.SettingsPage_userField_1K5 {\n  width: 20em;\n  display: inline-block;\n  margin-right: 10px;\n}\n\n.SettingsPage_inlineButton_gUo {\n  height: 36px;\n  vertical-align: top;\n}\n", "", {"version":3,"sources":["/./src/components/variables.scss","/./src/components/SettingsPage/SettingsPage.scss"],"names":[],"mappings":"AACwD,UAAU,GACV,aAAa,CACb,UAAU,CACV,UAAU,CACV,UAAU,EASlC,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;;ACfjE;EACE,oBAAoB;EACpB,WAAW;EACX,YAAY;EACZ,iBAAiB;CAClB;;AAED;EACE,YAAY;CACb;;AAED;EACE,eAAe;EACf,iBAAiB;EACjB,mBAAmB;EACnB,gBAAgB;CACjB;;AAGC;EACE,iBAAiB;EACjB,kBAAkB;EAClB,oBAAoB;CACrB;;AAGH;EACE,cAAc;EACd,oBAAoB;EACpB,0BAA0B;EAC1B,mBAAmB;EACnB,eAAe;EACf,0BAA0B;CAC3B;;AAED;EACE,YAAY;EACZ,sBAAsB;EACtB,mBAAmB;CACpB;;AAED;EACE,aAAa;EACb,oBAAoB;CACrB","file":"SettingsPage.scss","sourcesContent":["$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n$link-color: #E16C51;\r\n$link-hover-color: #97918A;\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n$max-content-width:     1000px;\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n","@import '../variables.scss';\n\n.field {\n  margin-bottom: 10px;\n  width: 47%;\n  float: left;\n  margin-right: 2%;\n}\n\n.formControls {\n  clear: both;\n}\n\n.label {\n  display: block;\n  font-weight: 700;\n  margin-bottom: 5px;\n  font-size: 14px;\n}\n\n.bridgeDetails {\n  th {\n    font-weight: 700;\n    text-align: right;\n    padding-right: 15px;\n  }\n}\n\n.error {\n  padding: 15px;\n  margin-bottom: 20px;\n  border: 1px solid #ebccd1;\n  border-radius: 4px;\n  color: #a94442;\n  background-color: #f2dede;\n}\n\n.userField {\n  width: 20em;\n  display: inline-block;\n  margin-right: 10px;\n}\n\n.inlineButton {\n  height: 36px;\n  vertical-align: top;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"field": "SettingsPage_field_1jr",
  	"formControls": "SettingsPage_formControls_1dN",
  	"label": "SettingsPage_label_24A",
  	"bridgeDetails": "SettingsPage_bridgeDetails_2cH",
  	"error": "SettingsPage_error_2J9",
  	"userField": "SettingsPage_userField_1K5",
  	"inlineButton": "SettingsPage_inlineButton_gUo"
  };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _SettingsPageScss = __webpack_require__(79);
  
  var _SettingsPageScss2 = _interopRequireDefault(_SettingsPageScss);
  
  var BridgeDisplay = (function (_Component) {
    _inherits(BridgeDisplay, _Component);
  
    _createClass(BridgeDisplay, null, [{
      key: 'propTypes',
      value: {
        localtime: _react.PropTypes.string,
        ipaddress: _react.PropTypes.string.isRequired,
        name: _react.PropTypes.string.isRequired,
        modelid: _react.PropTypes.string.isRequired,
        numLights: _react.PropTypes.number
      },
      enumerable: true
    }]);
  
    function BridgeDisplay(props, context) {
      _classCallCheck(this, BridgeDisplay);
  
      _get(Object.getPrototypeOf(BridgeDisplay.prototype), 'constructor', this).call(this, props, context);
      this.state = {};
    }
  
    _createClass(BridgeDisplay, [{
      key: 'getPrettyTime',
      value: function getPrettyTime() {
        var date = new Date(this.props.localtime);
        var utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        return utc.toLocaleString();
      }
    }, {
      key: 'render',
      value: function render() {
        var bridgeUrl = 'http://' + this.props.ipaddress;
        return _react2['default'].createElement(
          'table',
          { className: _SettingsPageScss2['default'].bridgeDetails },
          _react2['default'].createElement(
            'tbody',
            null,
            _react2['default'].createElement(
              'tr',
              null,
              _react2['default'].createElement(
                'th',
                null,
                'Name'
              ),
              _react2['default'].createElement(
                'td',
                null,
                this.props.name
              )
            ),
            _react2['default'].createElement(
              'tr',
              null,
              _react2['default'].createElement(
                'th',
                null,
                'IP Address'
              ),
              _react2['default'].createElement(
                'td',
                null,
                _react2['default'].createElement(
                  'a',
                  { href: bridgeUrl, target: '_blank' },
                  this.props.ipaddress
                )
              )
            ),
            _react2['default'].createElement(
              'tr',
              null,
              _react2['default'].createElement(
                'th',
                null,
                'Model'
              ),
              _react2['default'].createElement(
                'td',
                null,
                this.props.modelid
              )
            ),
            _react2['default'].createElement(
              'tr',
              null,
              _react2['default'].createElement(
                'th',
                null,
                'Time'
              ),
              _react2['default'].createElement(
                'td',
                null,
                this.getPrettyTime()
              )
            ),
            _react2['default'].createElement(
              'tr',
              null,
              _react2['default'].createElement(
                'th',
                null,
                '# Lights'
              ),
              _react2['default'].createElement(
                'td',
                null,
                typeof this.props.numLights === 'number' ? this.props.numLights : '--'
              )
            )
          )
        );
      }
    }]);
  
    return BridgeDisplay;
  })(_react.Component);
  
  exports['default'] = BridgeDisplay;
  module.exports = exports['default'];

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _SettingsPageScss = __webpack_require__(79);
  
  var _SettingsPageScss2 = _interopRequireDefault(_SettingsPageScss);
  
  var _apiBridge = __webpack_require__(101);
  
  var _apiBridge2 = _interopRequireDefault(_apiBridge);
  
  var UserForm = (function (_Component) {
    _inherits(UserForm, _Component);
  
    _createClass(UserForm, null, [{
      key: 'propTypes',
      value: {
        ip: _react.PropTypes.string.isRequired,
        onBridgeSaved: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function UserForm(props, context) {
      _classCallCheck(this, UserForm);
  
      _get(Object.getPrototypeOf(UserForm.prototype), 'constructor', this).call(this, props, context);
      this.state = {
        attemptedRegistration: false,
        registerUserError: false
      };
    }
  
    _createClass(UserForm, [{
      key: 'onBridgeSaved',
      value: function onBridgeSaved(bridgeAndConnection) {
        this.props.onBridgeSaved(bridgeAndConnection);
      }
    }, {
      key: 'onBridgeSaveError',
      value: function onBridgeSaveError(response) {
        console.error('failed to save bridge info', response);
      }
    }, {
      key: 'onRegisterUserError',
      value: function onRegisterUserError(response) {
        console.error('failed to register bridge user', response);
        this.setState({ registerUserError: true });
      }
    }, {
      key: 'onUserChange',
      value: function onUserChange(e) {
        this.setState({ user: e.target.value.trim() });
      }
    }, {
      key: 'handleSubmit',
      value: function handleSubmit(e) {
        e.preventDefault();
        this.setState({ registerUserError: false });
        if (typeof this.state.user !== 'string' || this.state.user.length < 1) {
          return;
        }
        _apiBridge2['default'].save(this.props.ip, this.state.user).then(this.onBridgeSaved.bind(this))['catch'](this.onBridgeSaveError.bind(this));
      }
    }, {
      key: 'registerUser',
      value: function registerUser() {
        var user = 'hue-steamer';
        _apiBridge2['default'].registerUser(this.props.ip, user).then(this.onBridgeSaved.bind(this))['catch'](this.onRegisterUserError.bind(this));
        this.setState({
          attemptedRegistration: true,
          registerUserError: false
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'form',
          { onSubmit: this.handleSubmit.bind(this) },
          this.state.registerUserError ? _react2['default'].createElement(
            'p',
            { className: _SettingsPageScss2['default'].error },
            'There was an error registering a user on your Philips Hue bridge. Did you press the Link button on your bridge?'
          ) : '',
          _react2['default'].createElement(
            'div',
            { className: _SettingsPageScss2['default'].formGroup },
            _react2['default'].createElement(
              'label',
              { htmlFor: 'user' },
              'If you already have a user on this Philips Hue bridge, you can enter the name here:'
            ),
            _react2['default'].createElement('input', { type: 'text', id: 'user', onChange: this.onUserChange.bind(this),
              className: _SettingsPageScss2['default'].userField
            }),
            _react2['default'].createElement(
              'button',
              { type: 'submit', className: _SettingsPageScss2['default'].inlineButton },
              'Save'
            )
          ),
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
              'p',
              null,
              'Or, if you do not have a user on your bridge yet, please press the link button on your Philips Hue bridge, then click the button below:'
            ),
            _react2['default'].createElement(
              'button',
              { type: 'button', onClick: this.registerUser.bind(this) },
              'Register User'
            )
          )
        );
      }
    }]);
  
    return UserForm;
  })(_react.Component);
  
  exports['default'] = UserForm;
  module.exports = exports['default'];

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _config = __webpack_require__(14);
  
  var Html = (function (_Component) {
    _inherits(Html, _Component);
  
    function Html() {
      _classCallCheck(this, Html);
  
      _get(Object.getPrototypeOf(Html.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Html, [{
      key: 'trackingCode',
      value: function trackingCode() {
        return { __html: '(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=' + 'function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;' + 'e=o.createElement(i);r=o.getElementsByTagName(i)[0];' + 'e.src=\'https://www.google-analytics.com/analytics.js\';' + 'r.parentNode.insertBefore(e,r)}(window,document,\'script\',\'ga\'));' + ('ga(\'create\',\'' + _config.googleAnalyticsId + '\',\'auto\');ga(\'send\',\'pageview\');')
        };
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'html',
          { className: 'no-js', lang: 'en' },
          _react2['default'].createElement(
            'head',
            null,
            _react2['default'].createElement('meta', { charSet: 'utf-8' }),
            _react2['default'].createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
            _react2['default'].createElement(
              'title',
              null,
              this.props.title
            ),
            _react2['default'].createElement('meta', { name: 'description', content: this.props.description }),
            _react2['default'].createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
            _react2['default'].createElement('link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' }),
            _react2['default'].createElement('link', { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css' }),
            _react2['default'].createElement('style', { id: 'css', dangerouslySetInnerHTML: { __html: this.props.css } })
          ),
          _react2['default'].createElement(
            'body',
            null,
            _react2['default'].createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: this.props.body } }),
            _react2['default'].createElement('script', { src: this.props.entry }),
            _react2['default'].createElement('script', { dangerouslySetInnerHTML: this.trackingCode() })
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        title: _react.PropTypes.string,
        description: _react.PropTypes.string,
        css: _react.PropTypes.string,
        body: _react.PropTypes.string.isRequired,
        entry: _react.PropTypes.string.isRequired
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        title: '',
        description: ''
      },
      enumerable: true
    }]);
  
    return Html;
  })(_react.Component);
  
  exports['default'] = Html;
  module.exports = exports['default'];

/***/ },
/* 84 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 85 */
/***/ function(module, exports) {

  module.exports = require("sqlite");

/***/ },
/* 86 */
/***/ function(module, exports) {

  module.exports = require("node-hue-api");

/***/ },
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LightFilterFormScss = __webpack_require__(93);
  
  var _LightFilterFormScss2 = _interopRequireDefault(_LightFilterFormScss);
  
  var _LightLight = __webpack_require__(53);
  
  var _LightLight2 = _interopRequireDefault(_LightLight);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _classnames = __webpack_require__(47);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var LightFilterForm = (function (_Component) {
    _inherits(LightFilterForm, _Component);
  
    _createClass(LightFilterForm, null, [{
      key: 'propTypes',
      value: {
        lights: _react.PropTypes.object.isRequired,
        ids: _react.PropTypes.array.isRequired,
        onFiltered: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function LightFilterForm(props, context) {
      _classCallCheck(this, _LightFilterForm);
  
      _get(Object.getPrototypeOf(_LightFilterForm.prototype), 'constructor', this).call(this, props, context);
      this.state = {
        filter: undefined,
        lightState: undefined,
        model: undefined
      };
    }
  
    _createClass(LightFilterForm, [{
      key: 'onFilterChange',
      value: function onFilterChange(event) {
        var _this = this;
  
        var filter = event.target.value.toLowerCase().trim();
        if (filter.length < 1) {
          filter = undefined;
        }
        this.setState({ filter: filter }, function () {
          _this.handleSubmit();
        });
      }
    }, {
      key: 'onStateChange',
      value: function onStateChange(event) {
        var _this2 = this;
  
        var lightState = event.target.value;
        if (lightState.length < 1) {
          lightState = undefined;
        }
        this.setState({ lightState: lightState }, function () {
          _this2.handleSubmit();
        });
      }
    }, {
      key: 'onModelChange',
      value: function onModelChange(event) {
        var _this3 = this;
  
        var model = event.target.value;
        if (model.length < 1) {
          model = undefined;
        }
        this.setState({ model: model }, function () {
          _this3.handleSubmit();
        });
      }
    }, {
      key: 'getFilteredLightIDs',
      value: function getFilteredLightIDs() {
        var _this4 = this;
  
        var filteredIDs = this.props.ids;
        if (typeof this.state.filter !== 'undefined') {
          filteredIDs = filteredIDs.filter(function (id) {
            var light = _this4.props.lights[id];
            if (typeof light !== 'object') {
              return true;
            }
            return light.name.toLowerCase().indexOf(_this4.state.filter) > -1;
          });
        }
        if (typeof this.state.lightState !== 'undefined') {
          filteredIDs = filteredIDs.filter(function (id) {
            var light = _this4.props.lights[id];
            if (typeof light !== 'object') {
              return true;
            }
            if (light.state.on && _this4.state.lightState === 'on') {
              return true;
            }
            return !light.state.on && _this4.state.lightState === 'off';
          });
        }
        if (typeof this.state.model !== 'undefined') {
          filteredIDs = filteredIDs.filter(function (id) {
            var light = _this4.props.lights[id];
            if (typeof light !== 'object') {
              return true;
            }
            return light.modelid === _this4.state.model;
          });
        }
        return filteredIDs;
      }
    }, {
      key: 'getModels',
      value: function getModels() {
        var _this5 = this;
  
        var models = this.props.ids.map(function (id) {
          var light = _this5.props.lights[id];
          if (typeof light !== 'object') {
            return undefined;
          }
          return light.modelid;
        });
        return [].concat(_toConsumableArray(new Set(models)));
      }
    }, {
      key: 'isFiltered',
      value: function isFiltered() {
        var props = [this.state.filter, this.state.lightState, this.state.model];
        var types = props.map(function (prop) {
          return typeof prop;
        });
        return types.indexOf('string') > -1;
      }
    }, {
      key: 'clearFilter',
      value: function clearFilter(event) {
        var _this6 = this;
  
        event.preventDefault();
        this.setState({
          filter: undefined,
          model: undefined,
          lightState: undefined
        }, function () {
          _this6.handleSubmit();
        });
      }
    }, {
      key: 'handleSubmit',
      value: function handleSubmit(event) {
        if (event) {
          event.preventDefault();
        }
        var props = [this.state.filter, this.state.lightState, this.state.model];
        var filters = props.map(function (prop) {
          if (typeof prop === 'string') {
            return prop;
          }
        });
        var filterName = filters.length > 0 ? filters.join(', ') : undefined;
        this.props.onFiltered(filterName, this.getFilteredLightIDs());
      }
    }, {
      key: 'render',
      value: function render() {
        var models = this.getModels();
        return _react2['default'].createElement(
          'form',
          { onSubmit: this.handleSubmit.bind(this) },
          _react2['default'].createElement('input', { type: 'search', placeholder: 'Filter lights...',
            className: _LightFilterFormScss2['default'].lightFilter,
            onChange: this.onFilterChange.bind(this),
            value: this.state.filter,
            autoFocus: 'autofocus'
          }),
          _react2['default'].createElement(
            'label',
            { className: _LightFilterFormScss2['default'].label },
            'State:'
          ),
          _react2['default'].createElement(
            'select',
            { className: _LightFilterFormScss2['default'].stateFilter,
              onChange: this.onStateChange.bind(this)
            },
            _react2['default'].createElement(
              'option',
              { value: '', selected: typeof this.state.lightState === 'undefined' },
              'Any'
            ),
            _react2['default'].createElement(
              'option',
              { value: 'on' },
              'On'
            ),
            _react2['default'].createElement(
              'option',
              { value: 'off' },
              'Off'
            )
          ),
          _react2['default'].createElement(
            'label',
            { className: _LightFilterFormScss2['default'].label },
            'Model:'
          ),
          _react2['default'].createElement(
            'select',
            { className: _LightFilterFormScss2['default'].modelFilter,
              onChange: this.onModelChange.bind(this)
            },
            _react2['default'].createElement(
              'option',
              { value: '', selected: typeof this.state.model === 'undefined' },
              'Any'
            ),
            models.map(function (model) {
              return _react2['default'].createElement(
                'option',
                { value: model, key: model },
                model
              );
            })
          ),
          this.isFiltered() ? _react2['default'].createElement(
            'a',
            { href: '#', className: _LightFilterFormScss2['default'].clear, onClick: this.clearFilter.bind(this) },
            'Clear'
          ) : ''
        );
      }
    }]);
  
    var _LightFilterForm = LightFilterForm;
    LightFilterForm = (0, _decoratorsWithStyles2['default'])(_LightFilterFormScss2['default'])(LightFilterForm) || LightFilterForm;
    return LightFilterForm;
  })(_react.Component);
  
  exports['default'] = LightFilterForm;
  module.exports = exports['default'];

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(94);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./LightFilterForm.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./LightFilterForm.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "input[type=\"search\"].LightFilterForm_lightFilter_2eF, select.LightFilterForm_stateFilter_3sK, select.LightFilterForm_modelFilter_2R5, .LightFilterForm_label_1bv {\n  display: inline-block;\n}\n\ninput[type=\"search\"].LightFilterForm_lightFilter_2eF {\n  width: 12em;\n}\n\nselect.LightFilterForm_stateFilter_3sK {\n  width: 5em;\n}\n\nselect.LightFilterForm_modelFilter_2R5 {\n  width: 10em;\n}\n\n.LightFilterForm_label_1bv {\n  margin: 0 5px 0 30px;\n}\n\n.LightFilterForm_clear_T4R {\n  text-decoration: none;\n  padding-left: 10px;\n  font-size: 13px;\n}\n", "", {"version":3,"sources":["/./src/components/LightFilterForm/LightFilterForm.scss"],"names":[],"mappings":"AAAA;EAIE,sBAAsB;CACvB;;AAED;EACE,YAAY;CACb;;AAED;EACE,WAAW;CACZ;;AAED;EACE,YAAY;CACb;;AAED;EACE,qBAAqB;CACtB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;CACjB","file":"LightFilterForm.scss","sourcesContent":["input[type=\"search\"].lightFilter,\nselect.stateFilter,\nselect.modelFilter,\n.label {\n  display: inline-block;\n}\n\ninput[type=\"search\"].lightFilter {\n  width: 12em;\n}\n\nselect.stateFilter {\n  width: 5em;\n}\n\nselect.modelFilter {\n  width: 10em;\n}\n\n.label {\n  margin: 0 5px 0 30px;\n}\n\n.clear {\n  text-decoration: none;\n  padding-left: 10px;\n  font-size: 13px;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"lightFilter": "LightFilterForm_lightFilter_2eF",
  	"stateFilter": "LightFilterForm_stateFilter_3sK",
  	"modelFilter": "LightFilterForm_modelFilter_2R5",
  	"label": "LightFilterForm_label_1bv",
  	"clear": "LightFilterForm_clear_T4R"
  };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _SchedulesListScss = __webpack_require__(96);
  
  var _SchedulesListScss2 = _interopRequireDefault(_SchedulesListScss);
  
  var _ScheduleSchedule = __webpack_require__(98);
  
  var _ScheduleSchedule2 = _interopRequireDefault(_ScheduleSchedule);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var SchedulesList = (function (_Component) {
    _inherits(SchedulesList, _Component);
  
    _createClass(SchedulesList, null, [{
      key: 'propTypes',
      value: {
        schedules: _react.PropTypes.array.isRequired
      },
      enumerable: true
    }]);
  
    function SchedulesList(props, context) {
      _classCallCheck(this, _SchedulesList);
  
      _get(Object.getPrototypeOf(_SchedulesList.prototype), 'constructor', this).call(this, props, context);
      this.state = {};
    }
  
    _createClass(SchedulesList, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'ul',
          { className: _SchedulesListScss2['default'].schedulesList },
          this.props.schedules.map(function (schedule) {
            var key = 'schedule-' + schedule.id;
            return _react2['default'].createElement(_ScheduleSchedule2['default'], _extends({ key: key }, schedule));
          })
        );
      }
    }]);
  
    var _SchedulesList = SchedulesList;
    SchedulesList = (0, _decoratorsWithStyles2['default'])(_SchedulesListScss2['default'])(SchedulesList) || SchedulesList;
    return SchedulesList;
  })(_react.Component);
  
  exports['default'] = SchedulesList;
  module.exports = exports['default'];

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(97);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./SchedulesList.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./SchedulesList.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".SchedulesList_schedulesList_2h3 {\n  padding-left: 0;\n}\n", "", {"version":3,"sources":["/./src/components/SchedulesList/SchedulesList.scss"],"names":[],"mappings":"AAAA;EACE,gBAAgB;CACjB","file":"SchedulesList.scss","sourcesContent":[".schedulesList {\n  padding-left: 0;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"schedulesList": "SchedulesList_schedulesList_2h3"
  };

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ScheduleScss = __webpack_require__(99);
  
  var _ScheduleScss2 = _interopRequireDefault(_ScheduleScss);
  
  var _classnames = __webpack_require__(47);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _modelsDaytime = __webpack_require__(105);
  
  var _modelsDaytime2 = _interopRequireDefault(_modelsDaytime);
  
  var Schedule = (function (_Component) {
    _inherits(Schedule, _Component);
  
    _createClass(Schedule, null, [{
      key: 'propTypes',
      value: {
        id: _react.PropTypes.string.isRequired,
        description: _react.PropTypes.string.isRequired,
        name: _react.PropTypes.string.isRequired,
        localtime: _react.PropTypes.string.isRequired,
        time: _react.PropTypes.string.isRequired,
        created: _react.PropTypes.string.isRequired,
        recycle: _react.PropTypes.bool.isRequired,
        status: _react.PropTypes.string.isRequired,
        command: _react.PropTypes.object.isRequired
      },
      enumerable: true
    }]);
  
    function Schedule(props, context) {
      _classCallCheck(this, _Schedule);
  
      _get(Object.getPrototypeOf(_Schedule.prototype), 'constructor', this).call(this, props, context);
      this.state = {};
    }
  
    _createClass(Schedule, [{
      key: 'localtimeToDays',
      value: function localtimeToDays() {
        var parts = this.props.localtime.split('/');
        var days = [];
        var listOfDays = parts[0].slice(1); // number up to 127
        var sunday = 1;
        var monday = 64;
        var tuesday = 32;
        var wednesday = 16;
        var thursday = 8;
        var friday = 4;
        var saturday = 2;
        if (listOfDays & sunday) {
          days.push('Sunday');
        }
        if (listOfDays & monday) {
          days.push('Monday');
        }
        if (listOfDays & tuesday) {
          days.push('Tuesday');
        }
        if (listOfDays & wednesday) {
          days.push('Wednesday');
        }
        if (listOfDays & thursday) {
          days.push('Thursday');
        }
        if (listOfDays & friday) {
          days.push('Friday');
        }
        if (listOfDays & saturday) {
          days.push('Saturday');
        }
        return days;
      }
    }, {
      key: 'localtimeToTime',
      value: function localtimeToTime() {
        var parts = this.props.localtime.split('/');
        var fullTime = parts[1].slice(1); // 24hr timestamp like 20:00:00
        var timeParts = fullTime.split(':').map(function (t) {
          return parseInt(t, 10);
        });
        var hour = timeParts[0];
        var minute = timeParts[1];
        var time = '';
        var amPm = 'am';
        if (hour > 12) {
          time = String(hour - 12);
          amPm = 'pm';
        } else {
          time = String(hour);
          if (hour === 12) {
            amPm = 'pm';
          }
        }
        time += ':';
        if (minute < 10) {
          time += '0';
        }
        time += String(minute);
        return time + ' ' + amPm;
      }
    }, {
      key: 'summarizeDays',
      value: function summarizeDays(days) {
        if (days.length === 7) {
          return 'Every day';
        }
        var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        if (days.length === weekdays.length) {
          var includesWeekday = days.map(function (d) {
            return weekdays.indexOf(d) > -1;
          });
          if (includesWeekday.indexOf(false) < 0) {
            return 'Weekdays';
          }
        }
        var weekends = ['Saturday', 'Sunday'];
        if (days.length === weekends.length) {
          var includesWeekend = days.map(function (d) {
            return weekends.indexOf(d) > -1;
          });
          if (includesWeekend.indexOf(false) < 0) {
            return 'Weekends';
          }
        }
        return days.join(', ');
      }
    }, {
      key: 'render',
      value: function render() {
        var days = this.localtimeToDays();
        var time = this.localtimeToTime();
        var themeClass = _modelsDaytime2['default'].isNight() ? _ScheduleScss2['default'].night : _ScheduleScss2['default'].day;
        return _react2['default'].createElement(
          'li',
          { className: _ScheduleScss2['default'].schedule },
          _react2['default'].createElement(
            'h3',
            { className: _ScheduleScss2['default'].name },
            this.props.name
          ),
          this.summarizeDays(days),
          ' at ',
          time,
          this.props.status === 'enabled' ? _react2['default'].createElement(
            'span',
            { className: (0, _classnames2['default'])(themeClass, _ScheduleScss2['default'].enabled) },
            'Enabled'
          ) : _react2['default'].createElement(
            'span',
            { className: (0, _classnames2['default'])(themeClass, _ScheduleScss2['default'].disabled) },
            'Disabled'
          )
        );
      }
    }]);
  
    var _Schedule = Schedule;
    Schedule = (0, _decoratorsWithStyles2['default'])(_ScheduleScss2['default'])(Schedule) || Schedule;
    return Schedule;
  })(_react.Component);
  
  exports['default'] = Schedule;
  module.exports = exports['default'];

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(100);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Schedule.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Schedule.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".Schedule_schedule_2-Z {\n  list-style: none;\n}\n\n.Schedule_schedule_2-Z + .Schedule_schedule_2-Z {\n  margin-top: 15px;\n}\n\n.Schedule_name_XTc {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n\n.Schedule_enabled_3aQ, .Schedule_disabled_2oR {\n  padding: 1px 0.3em;\n  border-radius: 2px;\n  display: inline-block;\n  margin-left: 10px;\n}\n\n.Schedule_enabled_3aQ {\n}\n\n.Schedule_enabled_3aQ.Schedule_day_mWg {\n  background-color: #dff0d8;\n  color: #3c763d;\n}\n\n.Schedule_enabled_3aQ.Schedule_night_qdy {\n  color: #dff0d8;\n  background-color: #468847;\n}\n\n.Schedule_disabled_2oR {\n}\n\n.Schedule_disabled_2oR.Schedule_day_mWg {\n  background-color: #f7f7f9;\n  color: #767676;\n}\n\n.Schedule_disabled_2oR.Schedule_night_qdy {\n  color: #F0F0F0;\n  background-color: #868686;\n}\n", "", {"version":3,"sources":["/./src/components/Schedule/Schedule.scss"],"names":[],"mappings":"AAAA;EACE,iBAAiB;CAKlB;;AAHC;EACE,iBAAiB;CAClB;;AAGH;EACE,cAAc;EACd,mBAAmB;CACpB;;AAED;EAEE,mBAAmB;EACnB,mBAAmB;EACnB,sBAAsB;EACtB,kBAAkB;CACnB;;AAED;CAUC;;AATC;EACE,0BAA0B;EAC1B,eAAe;CAChB;;AAED;EACE,eAAe;EACf,0BAA0B;CAC3B;;AAGH;CAUC;;AATC;EACE,0BAA0B;EAC1B,eAAe;CAChB;;AAED;EACE,eAAe;EACf,0BAA0B;CAC3B","file":"Schedule.scss","sourcesContent":[".schedule {\n  list-style: none;\n\n  + .schedule {\n    margin-top: 15px;\n  }\n}\n\n.name {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n\n.enabled,\n.disabled {\n  padding: 1px 0.3em;\n  border-radius: 2px;\n  display: inline-block;\n  margin-left: 10px;\n}\n\n.enabled {\n  &.day {\n    background-color: #dff0d8;\n    color: #3c763d;\n  }\n\n  &.night {\n    color: #dff0d8;\n    background-color: #468847;\n  }\n}\n\n.disabled {\n  &.day {\n    background-color: #f7f7f9;\n    color: #767676;\n  }\n\n  &.night {\n    color: #F0F0F0;\n    background-color: #868686;\n  }\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"schedule": "Schedule_schedule_2-Z",
  	"name": "Schedule_name_XTc",
  	"enabled": "Schedule_enabled_3aQ",
  	"disabled": "Schedule_disabled_2oR",
  	"day": "Schedule_day_mWg",
  	"night": "Schedule_night_qdy"
  };

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _coreFetch = __webpack_require__(12);
  
  var _coreFetch2 = _interopRequireDefault(_coreFetch);
  
  var _configJson = __webpack_require__(49);
  
  var _configJson2 = _interopRequireDefault(_configJson);
  
  var Bridge = (function () {
    function Bridge() {
      _classCallCheck(this, Bridge);
    }
  
    _createClass(Bridge, null, [{
      key: 'get',
      value: function get(id) {
        return regeneratorRuntime.async(function get$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              if (!(typeof id === 'undefined')) {
                context$2$0.next = 2;
                break;
              }
  
              return context$2$0.abrupt('return', this.makeRequest('/bridge'));
  
            case 2:
              return context$2$0.abrupt('return', this.makeRequest('/bridges/' + id));
  
            case 3:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'discover',
      value: function discover() {
        return regeneratorRuntime.async(function discover$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.abrupt('return', this.makeRequest('/bridges/discover'));
  
            case 1:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'save',
      value: function save(ip, user) {
        var opts;
        return regeneratorRuntime.async(function save$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              opts = { method: 'POST' };
              return context$2$0.abrupt('return', this.makeRequest('/bridges?ip=' + encodeURIComponent(ip) + '&user=' + encodeURIComponent(user), opts));
  
            case 2:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'registerUser',
      value: function registerUser(ip, user) {
        var opts;
        return regeneratorRuntime.async(function registerUser$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              opts = { method: 'POST' };
              return context$2$0.abrupt('return', this.makeRequest('/users?ip=' + encodeURIComponent(ip) + '&user=' + encodeURIComponent(user), opts));
  
            case 2:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getGroups',
      value: function getGroups() {
        return regeneratorRuntime.async(function getGroups$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.abrupt('return', this.makeRequest('/groups'));
  
            case 1:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getSchedules',
      value: function getSchedules() {
        return regeneratorRuntime.async(function getSchedules$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.abrupt('return', this.makeRequest('/schedules'));
  
            case 1:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getScenes',
      value: function getScenes() {
        return regeneratorRuntime.async(function getScenes$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.abrupt('return', this.makeRequest('/scenes'));
  
            case 1:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getScene',
      value: function getScene(sceneID) {
        return regeneratorRuntime.async(function getScene$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.abrupt('return', this.makeRequest('/scene/' + sceneID));
  
            case 1:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getGroup',
      value: function getGroup(groupID) {
        return regeneratorRuntime.async(function getGroup$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.abrupt('return', this.makeRequest('/group/' + (groupID || '0')));
  
            case 1:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'createGroup',
      value: function createGroup(name, lightIDs) {
        var opts;
        return regeneratorRuntime.async(function createGroup$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              opts = { method: 'POST' };
              return context$2$0.abrupt('return', this.makeRequest('/groups?name=' + encodeURIComponent(name) + '&ids=' + lightIDs.join(','), opts));
  
            case 2:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'updateGroup',
      value: function updateGroup(id, name, lightIDs) {
        var opts;
        return regeneratorRuntime.async(function updateGroup$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              opts = { method: 'PUT' };
              return context$2$0.abrupt('return', this.makeRequest('/group/' + id + '?name=' + encodeURIComponent(name) + '&ids=' + lightIDs.join(','), opts));
  
            case 2:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getLight',
      value: function getLight(lightID) {
        return regeneratorRuntime.async(function getLight$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.abrupt('return', this.makeRequest('/light/' + lightID));
  
            case 1:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getAllLights',
      value: function getAllLights() {
        return regeneratorRuntime.async(function getAllLights$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.abrupt('return', this.getGroup('0'));
  
            case 1:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'turnOnLight',
      value: function turnOnLight(id) {
        var opts;
        return regeneratorRuntime.async(function turnOnLight$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              opts = { method: 'POST' };
              return context$2$0.abrupt('return', this.makeRequest('/light/' + id + '/on', opts));
  
            case 2:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'turnOffLight',
      value: function turnOffLight(id) {
        var opts;
        return regeneratorRuntime.async(function turnOffLight$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              opts = { method: 'POST' };
              return context$2$0.abrupt('return', this.makeRequest('/light/' + id + '/off', opts));
  
            case 2:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'turnOnGroup',
      value: function turnOnGroup(id) {
        var opts;
        return regeneratorRuntime.async(function turnOnGroup$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              opts = { method: 'POST' };
              return context$2$0.abrupt('return', this.makeRequest('/group/' + id + '/on', opts));
  
            case 2:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'turnOffGroup',
      value: function turnOffGroup(id) {
        var opts;
        return regeneratorRuntime.async(function turnOffGroup$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              opts = { method: 'POST' };
              return context$2$0.abrupt('return', this.makeRequest('/group/' + id + '/off', opts));
  
            case 2:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'setLightColor',
      value: function setLightColor(id, x, y) {
        var opts;
        return regeneratorRuntime.async(function setLightColor$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              opts = { method: 'POST' };
              return context$2$0.abrupt('return', this.makeRequest('/light/' + id + '/color' + '?x=' + x + '&y=' + y, opts));
  
            case 2:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'setGroupColor',
      value: function setGroupColor(id, x, y) {
        var opts;
        return regeneratorRuntime.async(function setGroupColor$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              opts = { method: 'POST' };
              return context$2$0.abrupt('return', this.makeRequest('/group/' + id + '/color' + '?x=' + x + '&y=' + y, opts));
  
            case 2:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'makeRequest',
      value: function makeRequest(path, optionalOptions) {
        var options, url, response, json;
        return regeneratorRuntime.async(function makeRequest$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              options = optionalOptions || {};
              url = _configJson2['default'][("development")].serverUri + path;
              context$2$0.next = 4;
              return regeneratorRuntime.awrap((0, _coreFetch2['default'])(url, options));
  
            case 4:
              response = context$2$0.sent;
              context$2$0.next = 7;
              return regeneratorRuntime.awrap(response.json());
  
            case 7:
              json = context$2$0.sent;
  
              if (!response.ok) {
                context$2$0.next = 10;
                break;
              }
  
              return context$2$0.abrupt('return', json);
  
            case 10:
              if (!json.hasOwnProperty('error')) {
                context$2$0.next = 16;
                break;
              }
  
              if (!(typeof json.error === 'string')) {
                context$2$0.next = 15;
                break;
              }
  
              throw new Error(json.error);
  
            case 15:
              throw new Error(JSON.stringify(json.error));
  
            case 16:
              throw new Error(response.statusText);
  
            case 17:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }]);
  
    return Bridge;
  })();
  
  exports['default'] = Bridge;
  module.exports = exports['default'];

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _colorHelper = __webpack_require__(103);
  
  var _colorHelper2 = _interopRequireDefault(_colorHelper);
  
  // Thanks to
  // https://github.com/benknight/hue-python-rgb-converter/blob/master/rgb_cie.py
  
  var Converter = (function () {
    function Converter() {
      _classCallCheck(this, Converter);
    }
  
    _createClass(Converter, null, [{
      key: 'hexToCIE1931',
  
      // Converts hexadecimal colors represented as a String to approximate CIE 1931
      // coordinates. May not produce accurate values.
      value: function hexToCIE1931(h) {
        var rgb = _colorHelper2['default'].hexToRgb(h);
        return this.rgbToCIE1931(rgb[0], rgb[1], rgb[2]);
      }
  
      // Converts red, green and blue integer values to approximate CIE 1931 x and y
      // coordinates. Algorithm from:
      // http://www.easyrgb.com/index.php?X=MATH&H=02#text2.
      // May not produce accurate values.
    }, {
      key: 'rgbToCIE1931',
      value: function rgbToCIE1931(red, green, blue) {
        var point = _colorHelper2['default'].getXYPointFromRGB(red, green, blue);
        return [point.x, point.y];
      }
  
      // Returns the approximate CIE 1931 x, y coordinates represented by the
      // supplied hexColor parameter, or of a random color if the parameter is not
      // passed. Let people set a lamp's color to any random color.
    }, {
      key: 'getCIEColor',
      value: function getCIEColor(hexColor) {
        var xy = [];
        if (typeof hexColor === 'undefined') {
          var r = _colorHelper2['default'].randomRGBValue();
          var g = _colorHelper2['default'].randomRGBValue();
          var b = _colorHelper2['default'].randomRGBValue();
          xy = this.rgbToCIE1931(r, g, b);
        } else {
          xy = this.hexToCIE1931(hexColor);
        }
        return xy;
      }
  
      // Converts CIE 1931 x and y coordinates and brightness value from 0 to 1 to an
      // RGB color.
    }, {
      key: 'cie1931ToRGB',
      value: function cie1931ToRGB(x, y, optionalBri) {
        var bri = undefined;
        if (typeof optionalBri === 'undefined') {
          bri = 1;
        } else {
          bri = optionalBri;
        }
        return _colorHelper2['default'].getRGBFromXYAndBrightness(x, y, bri);
      }
  
      // Converts CIE 1931 x and y coordinates and brightness value from 0 to 1 to a
      // CSS hex color.
    }, {
      key: 'cie1931ToHex',
      value: function cie1931ToHex(x, y, bri) {
        var rgb = this.cie1931ToRGB(x, y, bri);
        return _colorHelper2['default'].rgbToHex(rgb[0], rgb[1], rgb[2]);
      }
    }]);
  
    return Converter;
  })();
  
  exports['default'] = Converter;
  module.exports = exports['default'];

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _xyPoint = __webpack_require__(104);
  
  var _xyPoint2 = _interopRequireDefault(_xyPoint);
  
  // Thanks to
  // https://github.com/benknight/hue-python-rgb-converter/blob/master/rgb_cie.py
  
  var ColorHelper = (function () {
    function ColorHelper() {
      _classCallCheck(this, ColorHelper);
    }
  
    _createClass(ColorHelper, null, [{
      key: 'red',
  
      // See http://www.developers.meethue.com/documentation/color-conversions-rgb-xy
      value: function red() {
        return new _xyPoint2['default'](0.675, 0.322);
      }
  
      // See http://www.developers.meethue.com/documentation/color-conversions-rgb-xy
    }, {
      key: 'lime',
      value: function lime() {
        return new _xyPoint2['default'](0.4091, 0.518);
      }
  
      // See http://www.developers.meethue.com/documentation/color-conversions-rgb-xy
    }, {
      key: 'blue',
      value: function blue() {
        return new _xyPoint2['default'](0.167, 0.04);
      }
  
      // Parses a valid hex color string and returns the Red RGB integer value.
    }, {
      key: 'hexToRed',
      value: function hexToRed(hex) {
        return parseInt(hex.slice(0, 2), 16);
      }
  
      // Parses a valid hex color string and returns the Green RGB integer value.
    }, {
      key: 'hexToGreen',
      value: function hexToGreen(hex) {
        return parseInt(hex.slice(2, 4), 16);
      }
  
      // Parses a valid hex color string and returns the Blue RGB integer value.
    }, {
      key: 'hexToBlue',
      value: function hexToBlue(hex) {
        return parseInt(hex.slice(4, 6), 16);
      }
  
      // Converts a valid hex color string to an RGB array.
    }, {
      key: 'hexToRgb',
      value: function hexToRgb(hex) {
        return [this.hexToRed(hex), this.hexToGreen(hex), this.hexToBlue(hex)];
      }
  
      // Converts RGB to hex.
    }, {
      key: 'rgbToHex',
      value: function rgbToHex(r, g, b) {
        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }
  
      // Return a random Integer in the range of 0 to 255, representing an RGB color
      // value.
    }, {
      key: 'randomRgbValue',
      value: function randomRgbValue() {
        return Math.floor(Math.random() * 256);
      }
  
      // Returns the cross product of two XYPoints.
    }, {
      key: 'crossProduct',
      value: function crossProduct(p1, p2) {
        return p1.x * p2.y - p1.y * p2.x;
      }
  
      // Check if the provided XYPoint can be recreated by a Hue lamp.
    }, {
      key: 'checkPointInLampsReach',
      value: function checkPointInLampsReach(p) {
        var lime = this.lime();
        var red = this.red();
        var blue = this.blue();
        var v1 = new _xyPoint2['default'](lime.x - red.x, lime.y - red.y);
        var v2 = new _xyPoint2['default'](blue.x - red.x, blue.y - red.y);
        var q = new _xyPoint2['default'](p.x - red.x, p.y - red.y);
        var s = this.crossProduct(q, v2) / this.crossProduct(v1, v2);
        var t = this.crossProduct(v1, q) / this.crossProduct(v1, v2);
        return s >= 0.0 && t >= 0.0 && s + t <= 1.0;
      }
  
      // Find the closest point on a line. This point will be reproducible by a Hue
      // lamp.
    }, {
      key: 'getClosestPointToLine',
      value: function getClosestPointToLine(A, B, P) {
        var AP = new _xyPoint2['default'](P.x - A.x, P.y - A.y);
        var AB = new _xyPoint2['default'](B.x - A.x, B.y - A.y);
        var ab2 = AB.x * AB.x + AB.y * AB.y;
        var apAb = AP.x * AB.x + AP.y * AB.y;
        var t = apAb / ab2;
        if (t < 0.0) {
          t = 0.0;
        } else if (t > 1.0) {
          t = 1.0;
        }
        return new _xyPoint2['default'](A.x + AB.x * t, A.y + AB.y * t);
      }
    }, {
      key: 'getClosestPointToPoint',
      value: function getClosestPointToPoint(xyPoint) {
        var lime = this.lime();
        var red = this.red();
        var blue = this.blue();
  
        // Color is unreproducible, find the closest point on each line in the CIE
        // 1931 'triangle'.
        var pAB = this.getClosestPointToLine(red, lime, xyPoint);
        var pAC = this.getClosestPointToLine(blue, red, xyPoint);
        var pBC = this.getClosestPointToLine(lime, blue, xyPoint);
  
        // Get the distances per point and see which point is closer to our Point.
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
  
        // Change the xy value to a value which is within the reach of the lamp.
        return new _xyPoint2['default'](closestPoint.x, closestPoint.y);
      }
  
      // Returns the distance between two XYPoints.
    }, {
      key: 'getDistanceBetweenTwoPoints',
      value: function getDistanceBetweenTwoPoints(one, two) {
        var dx = one.x - two.x;
        var dy = one.y - two.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
  
      // Returns an XYPoint object containing the closest available CIE 1931
      // coordinates based on the RGB input values.
    }, {
      key: 'getXYPointFromRGB',
      value: function getXYPointFromRGB(red, green, blue) {
        var r = undefined;
        var g = undefined;
        var b = undefined;
        if (red > 0.04045) {
          r = Math.pow((red + 0.055) / (1.0 + 0.055), 2.4);
        } else {
          r = red / 12.92;
        }
        if (green > 0.04045) {
          g = Math.pow((green + 0.055) / (1.0 + 0.055), 2.4);
        } else {
          g = green / 12.92;
        }
        if (blue > 0.04045) {
          b = Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4);
        } else {
          b = blue / 12.92;
        }
  
        var X = r * 0.4360747 + g * 0.3850649 + b * 0.0930804;
        var Y = r * 0.2225045 + g * 0.7168786 + b * 0.0406169;
        var Z = r * 0.0139322 + g * 0.0971045 + b * 0.7141733;
  
        var cx = undefined;
        var cy = undefined;
        if (X + Y + Z === 0) {
          cx = 0;
          cy = 0;
        } else {
          cx = X / (X + Y + Z);
          cy = Y / (X + Y + Z);
        }
  
        // Check if the given XY value is within the color reach of our lamps.
        var xyPoint = new _xyPoint2['default'](cx, cy);
        var inReachOfLamps = this.checkPointInLampsReach(xyPoint);
        if (!inReachOfLamps) {
          xyPoint = this.getClosestPointToPoint(xyPoint);
        }
        return xyPoint;
      }
  
      // Returns a rgb tuplet for given x, y values.  Not actually an inverse of
      // getXYPointFromRGB.
    }, {
      key: 'getRGBFromXYAndBrightness',
      value: function getRGBFromXYAndBrightness(x, y, optionalBri) {
        var bri = undefined;
        if (typeof optionalBri === 'undefined') {
          bri = 1;
        } else {
          bri = optionalBri;
        }
        var xyPoint = new _xyPoint2['default'](x, y);
        if (!this.checkPointInLampsReach(xyPoint)) {
          xyPoint = this.getClosestPointToPoint(xyPoint);
        }
        var Y = bri;
        var X = Y / xyPoint.y * xyPoint.x;
        var Z = Y / xyPoint.y * (1 - xyPoint.x - xyPoint.y);
        var r = X * 1.612 - Y * 0.203 - Z * 0.302;
        var g = -X * 0.509 + Y * 1.412 + Z * 0.066;
        var b = X * 0.026 - Y * 0.072 + Z * 0.962;
        var reverseGammaCorrect = function reverseGammaCorrect(value) {
          if (value <= 0.0031308) {
            return 12.92 * value;
          }
          return (1.0 + 0.055) * Math.pow(value, 1.0 / 2.4) - 0.055;
        };
        r = reverseGammaCorrect(r);
        g = reverseGammaCorrect(g);
        b = reverseGammaCorrect(b);
        r = Math.max(0, r);
        g = Math.max(0, g);
        b = Math.max(0, b);
        var maxComponent = Math.max(r, g, b);
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
    }]);
  
    return ColorHelper;
  })();
  
  exports['default'] = ColorHelper;
  module.exports = exports['default'];

/***/ },
/* 104 */
/***/ function(module, exports) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  var XYPoint = function XYPoint(x, y) {
    _classCallCheck(this, XYPoint);
  
    this.x = x;
    this.y = y;
  };
  
  exports["default"] = XYPoint;
  module.exports = exports["default"];

/***/ },
/* 105 */
/***/ function(module, exports) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  var Daytime = (function () {
    function Daytime() {
      _classCallCheck(this, Daytime);
    }
  
    _createClass(Daytime, null, [{
      key: "isNight",
      value: function isNight() {
        var curTime = new Date();
        return curTime.getHours() >= 20;
      }
    }]);
  
    return Daytime;
  })();
  
  exports["default"] = Daytime;
  module.exports = exports["default"];

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ScenesListScss = __webpack_require__(107);
  
  var _ScenesListScss2 = _interopRequireDefault(_ScenesListScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _SceneScene = __webpack_require__(109);
  
  var _SceneScene2 = _interopRequireDefault(_SceneScene);
  
  var ScenesList = (function (_Component) {
    _inherits(ScenesList, _Component);
  
    _createClass(ScenesList, null, [{
      key: 'propTypes',
      value: {
        scenes: _react.PropTypes.array.isRequired
      },
      enumerable: true
    }]);
  
    function ScenesList(props, context) {
      _classCallCheck(this, _ScenesList);
  
      _get(Object.getPrototypeOf(_ScenesList.prototype), 'constructor', this).call(this, props, context);
      this.state = {};
    }
  
    _createClass(ScenesList, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'ul',
          { className: _ScenesListScss2['default'].scenesList },
          this.props.scenes.map(function (scene) {
            var loaded = true;
            scene.lights.forEach(function (light) {
              loaded = loaded && typeof light === 'object';
            });
            var key = 'scene-' + scene.id + '-loaded-' + loaded;
            return _react2['default'].createElement(_SceneScene2['default'], _extends({ key: key }, scene));
          })
        );
      }
    }]);
  
    var _ScenesList = ScenesList;
    ScenesList = (0, _decoratorsWithStyles2['default'])(_ScenesListScss2['default'])(ScenesList) || ScenesList;
    return ScenesList;
  })(_react.Component);
  
  exports['default'] = ScenesList;
  module.exports = exports['default'];

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(108);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ScenesList.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ScenesList.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".ScenesList_scenesList_3Hf {\n  padding-left: 0;\n}\n", "", {"version":3,"sources":["/./src/components/ScenesList/ScenesList.scss"],"names":[],"mappings":"AAAA;EACE,gBAAgB;CACjB","file":"ScenesList.scss","sourcesContent":[".scenesList {\n  padding-left: 0;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"scenesList": "ScenesList_scenesList_3Hf"
  };

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _SceneScss = __webpack_require__(110);
  
  var _SceneScss2 = _interopRequireDefault(_SceneScss);
  
  var _classnames = __webpack_require__(47);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _modelsDaytime = __webpack_require__(105);
  
  var _modelsDaytime2 = _interopRequireDefault(_modelsDaytime);
  
  var _reactFontawesome = __webpack_require__(69);
  
  var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
  
  var _apiBridge = __webpack_require__(101);
  
  var _apiBridge2 = _interopRequireDefault(_apiBridge);
  
  var Scene = (function (_Component) {
    _inherits(Scene, _Component);
  
    _createClass(Scene, null, [{
      key: 'propTypes',
      value: {
        id: _react.PropTypes.string.isRequired,
        name: _react.PropTypes.string.isRequired,
        appdata: _react.PropTypes.object.isRequired,
        owner: _react.PropTypes.string.isRequired,
        locked: _react.PropTypes.bool.isRequired,
        recycle: _react.PropTypes.bool.isRequired,
        lights: _react.PropTypes.array.isRequired,
        version: _react.PropTypes.number.isRequired,
        picture: _react.PropTypes.string,
        lastupdated: _react.PropTypes.string
      },
      enumerable: true
    }]);
  
    function Scene(props, context) {
      _classCallCheck(this, _Scene);
  
      _get(Object.getPrototypeOf(_Scene.prototype), 'constructor', this).call(this, props, context);
      this.state = { open: false, picture: undefined, lightstates: undefined };
    }
  
    _createClass(Scene, [{
      key: 'onSceneLoaded',
      value: function onSceneLoaded(scene) {
        this.setState({ picture: scene.picture, lightstates: scene.lightstates });
      }
    }, {
      key: 'onSceneLoadError',
      value: function onSceneLoadError(response) {
        console.error('failed to get scene', response);
      }
    }, {
      key: 'loadPicture',
      value: function loadPicture() {
        _apiBridge2['default'].getScene(this.props.id).then(this.onSceneLoaded.bind(this))['catch'](this.onSceneLoadError.bind(this));
      }
    }, {
      key: 'toggleSceneOpen',
      value: function toggleSceneOpen(event) {
        var _this = this;
  
        event.preventDefault();
        this.setState({ open: !this.state.open }, function () {
          if (_this.state.open && typeof _this.state.picture === 'undefined') {
            _this.loadPicture();
          }
        });
        event.target.blur();
      }
    }, {
      key: 'render',
      value: function render() {
        var lightCount = this.props.lights.length;
        var units = lightCount === 1 ? 'light' : 'lights';
        var themeClass = _modelsDaytime2['default'].isNight() ? _SceneScss2['default'].night : _SceneScss2['default'].day;
        var openStyle = { display: 'none' };
        if (this.state.open) {
          openStyle.display = 'block';
        }
        return _react2['default'].createElement(
          'li',
          { className: (0, _classnames2['default'])(_SceneScss2['default'].scene, themeClass) },
          _react2['default'].createElement(
            'h3',
            { className: (0, _classnames2['default'])(_SceneScss2['default'].name, themeClass) },
            _react2['default'].createElement(
              'a',
              { href: '#', onClick: this.toggleSceneOpen.bind(this) },
              this.state.open ? _react2['default'].createElement(_reactFontawesome2['default'], { name: 'chevron-down', className: _SceneScss2['default'].openIndicator }) : _react2['default'].createElement(_reactFontawesome2['default'], { name: 'chevron-right', className: _SceneScss2['default'].openIndicator }),
              '“',
              this.props.name,
              '”'
            ),
            _react2['default'].createElement(
              'span',
              { className: _SceneScss2['default'].lightCount },
              lightCount,
              ' ',
              units
            )
          ),
          _react2['default'].createElement(
            'div',
            { style: openStyle },
            _react2['default'].createElement(
              'p',
              { className: _SceneScss2['default'].lights },
              this.props.lights.map(function (light) {
                if (typeof light === 'string') {
                  return light;
                }
                return light.name;
              }).join(', ')
            ),
            _react2['default'].createElement(
              'div',
              { className: _SceneScss2['default'].id },
              'ID: ',
              this.props.id
            )
          )
        );
      }
    }]);
  
    var _Scene = Scene;
    Scene = (0, _decoratorsWithStyles2['default'])(_SceneScss2['default'])(Scene) || Scene;
    return Scene;
  })(_react.Component);
  
  exports['default'] = Scene;
  module.exports = exports['default'];

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(111);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Scene.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Scene.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".Scene_scene_1Ly {\n  width: 48%;\n  margin: 0 1% 10px;\n  display: inline-block;\n  border-width: 1px;\n  border-style: solid;\n  padding: 10px;\n  border-radius: 2px;\n  vertical-align: top\n}\n\n.Scene_scene_1Ly.Scene_night_19h {\n  border-color: #38231D\n}\n\n.Scene_scene_1Ly.Scene_day_1Yn {\n  border-color: #ccc\n}\n\n.Scene_name_2wR {\n  margin: 0;\n  font-weight: normal;\n}\n\n.Scene_name_2wR a {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  width: 79%;\n  text-decoration: none;\n  display: block;\n  float: left;\n}\n\n.Scene_name_2wR.Scene_day_1Yn {\n  color: #97918A\n}\n\n.Scene_name_2wR.Scene_night_19h {\n  color: #E16C51\n}\n\n.Scene_name_2wR:after {\n  content: \"\";\n  display: table;\n  clear: both\n}\n\n.Scene_openIndicator_etj {\n  margin-right: 5px;\n  font-size: 16px;\n}\n\n.Scene_lightCount_3Fy {\n  font-size: 14px;\n  float: right;\n  opacity: 0.8;\n}\n\n.Scene_lights_1Hk {\n  margin: 5px 0 0 0;\n}\n\n.Scene_id_WPz {\n  font-family: \"Andale Mono\", \"Courier New\", monospace;\n  margin-top: 5px;\n  font-size: 12px;\n}\n", "", {"version":3,"sources":["/./src/components/Scene/Scene.scss"],"names":[],"mappings":"AAAA;EACE,WAAW;EACX,kBAAkB;EAClB,sBAAsB;EACtB,kBAAkB;EAClB,oBAAoB;EACpB,cAAc;EACd,mBAAmB;EACnB,mBAAoB;CASrB;;AAPC;EACE,qBAAsB;CACvB;;AAED;EACE,kBAAmB;CACpB;;AAGH;EACE,UAAU;EACV,oBAAoB;CAyBrB;;AAvBC;EACE,wBAAwB;EACxB,iBAAiB;EACjB,oBAAoB;EACpB,WAAW;EACX,sBAAsB;EACtB,eAAe;EACf,YAAY;CACb;;AAED;EACE,cAAe;CAChB;;AAED;EACE,cAAe;CAChB;;AAED;EACE,YAAY;EACZ,eAAe;EACf,WAAY;CACb;;AAGH;EACE,kBAAkB;EAClB,gBAAgB;CACjB;;AAED;EACE,gBAAgB;EAChB,aAAa;EACb,aAAa;CACd;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,qDAAqD;EACrD,gBAAgB;EAChB,gBAAgB;CACjB","file":"Scene.scss","sourcesContent":[".scene {\n  width: 48%;\n  margin: 0 1% 10px;\n  display: inline-block;\n  border-width: 1px;\n  border-style: solid;\n  padding: 10px;\n  border-radius: 2px;\n  vertical-align: top;\n\n  &.night {\n    border-color: #38231D;\n  }\n\n  &.day {\n    border-color: #ccc;\n  }\n}\n\n.name {\n  margin: 0;\n  font-weight: normal;\n\n  a {\n    text-overflow: ellipsis;\n    overflow: hidden;\n    white-space: nowrap;\n    width: 79%;\n    text-decoration: none;\n    display: block;\n    float: left;\n  }\n\n  &.day {\n    color: #97918A;\n  }\n\n  &.night {\n    color: #E16C51;\n  }\n\n  &:after {\n    content: \"\";\n    display: table;\n    clear: both;\n  }\n}\n\n.openIndicator {\n  margin-right: 5px;\n  font-size: 16px;\n}\n\n.lightCount {\n  font-size: 14px;\n  float: right;\n  opacity: 0.8;\n}\n\n.lights {\n  margin: 5px 0 0 0;\n}\n\n.id {\n  font-family: \"Andale Mono\", \"Courier New\", monospace;\n  margin-top: 5px;\n  font-size: 12px;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"scene": "Scene_scene_1Ly",
  	"night": "Scene_night_19h",
  	"day": "Scene_day_1Yn",
  	"name": "Scene_name_2wR",
  	"openIndicator": "Scene_openIndicator_etj",
  	"lightCount": "Scene_lightCount_3Fy",
  	"lights": "Scene_lights_1Hk",
  	"id": "Scene_id_WPz"
  };

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map