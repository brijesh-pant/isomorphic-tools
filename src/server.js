var path = require('path');
var express = require('express');

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

// app.use('/public', express.static(DIST_DIR));

const getMarkup = (webserver) => {
    const HTML = `
        <!doctype html>
        <html>
            <head>
            </head>
            <body>
                <script src="${webserver}/dist/client.js"></script>
            </body>
        </html>`;
    return HTML;
}



app.get("*", (req, res) => {
    const webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":8080";
    const output = getMarkup(webserver);
    res.send(output);
});

app.listen(app.get("port"));