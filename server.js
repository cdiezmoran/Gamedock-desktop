/* eslint-disable no-console */
/**
* Setup and run the development server for Hot-Module-Replacement
* https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
* @flow
*/

import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import mongoose from 'mongoose';
import { spawn } from 'child_process';

// React, Redux
import { configureStore } from './app/store/configureStore';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

import routes from './app/routes';
import { fetchComponentData } from './server/util/fetchData';
//import posts from './routes/post.routes';

import config from './webpack.config.development';

const argv = require('minimist')(process.argv.slice(2));

const app = express();
const compiler = webpack(config);
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/gamedock', (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

const wdm = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});

app.use(wdm);

app.use(webpackHotMiddleware(compiler));

app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" type="text/css">
      <title>Gamedock</title>
      <script>
        (function() {
          if (!process.env.HOT) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = './dist/style.css';
            document.write(link.outerHTML);
          }
        }());
      </script>
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
      <script>
        {
          const script = document.createElement('script');
          const port = process.env.PORT || 3000;
          script.src = (process.env.HOT)
          ? 'http://localhost:' + port + '/dist/bundle.js'
          : './dist/bundle.js';
          document.write(script.outerHTML);
        }
      </script>

      <script src="../node_modules/msr/MediaStreamRecorder.js"> </script>
      <script src="https://cdn.WebRTC-Experiment.com/gumadapter.js"></script>

    </body>
  </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch((error) => next(error));
  });
});

const server = app.listen(PORT, 'localhost', serverError => {
  if (serverError) {
    return console.error(serverError);
  }

  if (argv['start-hot']) {
    spawn('npm', ['run', 'start-hot'], { shell: true, env: process.env, stdio: 'inherit' })
    .on('close', code => process.exit(code))
    .on('error', spawnError => console.error(spawnError));
  }

  console.log(`Listening at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  wdm.close();
  server.close(() => {
    process.exit(0);
  });
});
