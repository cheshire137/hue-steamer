/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import assets from './assets';
import { port } from './config';
import Config from './config.json';
import db from 'sqlite';
import Promise from 'bluebird';

const hue = require('node-hue-api');
const server = global.server = express();

async function getHueApi(id) {
  const connection = await db.get('SELECT user, ip FROM bridge_connections ' +
                                'WHERE id = ?', id);
  return new hue.HueApi(connection.ip, connection.user);
}

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/content', require('./api/content'));

server.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin',
             Config[process.env.NODE_ENV].clientUri);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

server.get('/bridgeConnection/:id', async (req, res) => {
  const id = req.params.id;
  const row = await db.get('SELECT * FROM bridge_connections WHERE id = ?', id);
  res.send(JSON.stringify(row));
});

server.post('/bridgeConnection', async (req, res) => {
  const ip = req.query.ip;
  const user = req.query.user;
  if (typeof ip !== 'string') {
    res.send('{"error": "Must provide Hue Bridge IP address in ip param"}');
    return;
  }
  if (typeof user !== 'string') {
    res.send('{"error": "Must provide Hue Bridge user in user param"}');
    return;
  }
  let row = await db.get('SELECT * FROM bridge_connections ' +
                         'WHERE ip = ? AND user = ?', ip, user);
  if (typeof row !== 'object') {
    await db.run('INSERT INTO bridge_connections (user, ip) VALUES (?, ?)',
                 user, ip);
    row = await db.get('SELECT * FROM bridge_connections ORDER BY id DESC ' +
                       'LIMIT 1');
  }
  res.send(JSON.stringify(row));
});

server.get('/bridge/:id', async (req, res) => {
  const api = await getHueApi(req.params.id);
  api.config().then((bridge) => {
    res.send(JSON.stringify(bridge));
  }).fail((err) => {
    res.send(JSON.stringify(err));
  }).done();
});

server.get('/group/:id', async (req, res) => {
  const groupID = req.params.id;
  if (typeof req.query.connectionID === 'undefined') {
    res.send('{"error": "Pass bridge connection ID in connectionID param"}');
    return;
  }
  const api = await getHueApi(req.query.connectionID);
  api.getGroup(groupID).then((group) => {
    res.send(JSON.stringify(group));
  }).fail((err) => {
    res.send(JSON.stringify(err));
  }).done();
});

server.get('/light/:id', async (req, res) => {
  const lightID = req.params.id;
  if (typeof req.query.connectionID === 'undefined') {
    res.send('{"error": "Pass bridge connection ID in connectionID param"}');
    return;
  }
  const api = await getHueApi(req.query.connectionID);
  api.lightStatus(lightID).then((result) => {
    res.send(JSON.stringify(result));
  }).fail((err) => {
    res.send(JSON.stringify(err));
  }).done();
});

server.post('/light/:id/on', async (req, res) => {
  const lightID = req.params.id;
  if (typeof req.query.connectionID === 'undefined') {
    res.send('{"error": "Pass bridge connection ID in connectionID param"}');
    return;
  }
  const api = await getHueApi(req.query.connectionID);
  const lightState = hue.lightState;
  const state = lightState.create();
  api.setLightState(lightID, state.on()).then((result) => {
    res.send(JSON.stringify(result));
  }).fail((err) => {
    res.send(JSON.stringify(err));
  }).done();
});

server.post('/light/:id/off', async (req, res) => {
  const lightID = req.params.id;
  if (typeof req.query.connectionID === 'undefined') {
    res.send('{"error": "Pass bridge connection ID in connectionID param"}');
    return;
  }
  const api = await getHueApi(req.query.connectionID);
  const lightState = hue.lightState;
  const state = lightState.create();
  api.setLightState(lightID, state.off()).then((result) => {
    res.send(JSON.stringify(result));
  }).fail((err) => {
    res.send(JSON.stringify(err));
  }).done();
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };
    const css = [];
    const context = {
      insertCss: styles => css.push(styles._getCss()),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    await Router.dispatch({ path: req.path, query: req.query, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!doctype html>\n' + html);
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------
const dbName = Config[process.env.NODE_ENV].database || ':memory:';
console.log('Working with database ' + dbName);
db.open(dbName, { verbose: true, Promise }).
   catch(err => console.error(err)).
   finally(() => {
     server.listen(port, () => {
       /* eslint-disable no-console */
       console.log(`The server is running at http://localhost:${port}/`);
     });
   });
