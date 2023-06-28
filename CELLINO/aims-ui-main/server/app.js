const express = require("express");
const compression = require("compression");
const path = require("path");
const cookieParser = require("cookie-parser");
// const helmet = require("helmet");
const app = express();

// TODO: should this be an ENV variable?
// cache versioned files in the browser for xxx milliseconds
const CACHE_VERSIONED_FILES_DURATION = parseInt(
  process.env.CACHE_VERSIONED_FILES_DURATION
);
const STALE_WHILE_REVALIDATE_DURATION = parseInt(
  process.env.STALE_WHILE_REVALIDATE_DURATION
);

app.disable("x-powered-by");

// TODO: use brotli instead of gzip compression
app.use(compression());

// https://expressjs.com/en/advanced/best-practice-security.html
// https://helmetjs.github.io/
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//     crossOriginEmbedderPolicy: false,
//   })
//   // helmet.contentSecurityPolicy({
//   //   directives: {
//   //     "default-src": ["'self'", "https:", "data:", "blob:", "*.cellinobio.app"],
//   //     "img-src": ["'self'", "https:", "data:", "blob:", "*.cellinobio.app"],
//   //     "connect-src": ["'self'", "https:", "data:", "blob:", "*.cellinobio.app"],
//   //     // TODO: revisit unsafe-eval. looks like the zarr library is using string as javascript
//   //     "script-src": ["'self'", "'unsafe-eval'"],
//   //   },
//   // })
// );

app.use(express.json());

// support rich json in query params
// reference: https://expressjs.com/en/api.html#express.urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//Serve website
app.use(
  express.static(path.join(__dirname, "build"), {
    etag: true, // Just being explicit about the default.
    lastModified: true, // Just being explicit about the default.
    setHeaders: (res, path) => {
      const hashRegExp = /\.[0-9a-f]{8}\./;
      if (path.endsWith(".html")) {
        // All the project's HTML files end in .html
        res.setHeader("Cache-Control", "no-cache");
      } else if (hashRegExp.test(path)) {
        // If the RegExp matched, then we have a versioned URL.
        res.setHeader(
          "Cache-Control",
          `max-age=${CACHE_VERSIONED_FILES_DURATION},stale-while-revalidate=${STALE_WHILE_REVALIDATE_DURATION}`
        );
      }
    },
  })
);

//Client side routing fix on page refresh or direct browsing to non-root directory
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = app;
