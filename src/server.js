var path = require('path');
var express = require('express');
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router'
import { routes } from './app'
import { initialize } from "./app";

const hostname = process.env.HOSTNAME || "localhost";

const app           = express(),
//   DIST_DIR      = config.output.path,
//   HTML_FILE     = path.join(DIST_DIR, "index.html"),
  DEFAULT_PORT  = 8081;

// app.get('*.js', function (req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

app.set("port", process.env.PORT || DEFAULT_PORT);

app.use(express.static('static'))

app.get("*", (req, res) => {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      const getMarkup = (webserver, history) => {
        const renderedComponent = ReactDOM.renderToString(
          <RouterContext history={history} {...renderProps} />
        );

        const HTML = `
            <!doctype html>
            <html>
                <head>
                </head>
                <body>
                    <div id="react-root">${renderedComponent}</div>
                    <script src="${webserver}/dist/client.js"></script>
                </body>
            </html>`;
            return HTML;
      }

      const history = createMemoryHistory(req.url);
    
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":8080";
        const output = getMarkup(webserver, history);
        res.status(200).send(output)
      } else {
        res.status(404).send('Not found')
      }

    })
});

app.listen(app.get("port"));