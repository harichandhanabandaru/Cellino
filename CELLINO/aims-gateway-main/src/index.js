const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const userService = require('./services/user-service');
const {getUserProfileExpiryTime} = require('./utils/date-utils');
const usersCache = new Map();

const app = express();
app.disable("x-powered-by");

const userProfileHeaderKey = 'user-profile';

const getUserEmail = function (req) {
  if (req.headers['x-goog-authenticated-user-email'] !== undefined) {
    return req.headers['x-goog-authenticated-user-email'].split(':')[1];
  } else {
    return null;
  }
};

const getUserProfileAsString = function (req) {
  const email = getUserEmail(req);
  if (email) {
    const profile = usersCache.get(email);
    if (profile) {
      return JSON.stringify(profile);
    }
  }
  return null;
};

app.use(async (req, res, next) => {
  const xGoogIapJwtAssertion = req.headers['x-goog-iap-jwt-assertion'];
  if (xGoogIapJwtAssertion !== undefined) {
    res.setHeader('x-goog-iap-jwt-assertion', xGoogIapJwtAssertion);
  }

  const xGoogAuthenticatedUserId = req.headers['x-goog-authenticated-user-id'];
  if (xGoogAuthenticatedUserId !== undefined) {
    res.setHeader('x-goog-authenticated-user-id', xGoogAuthenticatedUserId);
  }

  const xGoogAuthenticatedUserEmail =
    req.headers['x-goog-authenticated-user-email'];
  if (xGoogAuthenticatedUserEmail !== undefined) {
    res.setHeader(
      'x-goog-authenticated-user-email',
      xGoogAuthenticatedUserEmail
    );
  }

  const email = getUserEmail(req);
  if (email) {
    if (
      usersCache.get(email) === undefined ||
      userService.isUserProfileExpired(usersCache.get(email))
    ) {
      const userProfile = await userService.getUserPermissionsByEmail(email);
      if (userProfile !== null) {
        userProfile.expiry = getUserProfileExpiryTime();
        usersCache.set(email, userProfile);
      } else {
        res.status(403).end();
      }
    }
  }
  next();
});

app.use(
  '/run-mgmt-svc',
  createProxyMiddleware({
    target: process.env.RUNS_TARGET,
    changeOrigin: true,
    logger: console,
    on: {
      proxyReq: async (proxyReq, req) => {
        proxyReq.setHeader(userProfileHeaderKey, getUserProfileAsString(req));
      },
    },
  })
);

app.use(
  '/api/wells',
  createProxyMiddleware({
    target: process.env.WELLS_TARGET,
    changeOrigin: true,
    logger: console,
    on: {
      proxyReq: async (proxyReq, req) => {
        proxyReq.setHeader(userProfileHeaderKey, getUserProfileAsString(req));
      },
    },
  })
);

app.use(
  '/user-mgmt-svc',
  createProxyMiddleware({
    target: process.env.USERS_TARGET,
    changeOrigin: true,
    logger: console,
    on: {
      proxyReq: async (proxyReq, req) => {
        proxyReq.setHeader(userProfileHeaderKey, getUserProfileAsString(req));
      },
    },
  })
);

app.use(
  '/graphql',
  createProxyMiddleware({
    target: process.env.GRAPHQL_TARGET,
    changeOrigin: true,
    logger: console,
    on: {
      proxyReq: async (proxyReq, req) => {
        proxyReq.setHeader(userProfileHeaderKey, getUserProfileAsString(req));
      },
    },
  })
);

app.use(
  '/cookie',
  createProxyMiddleware({
    target: process.env.COOKIE_TARGET,
    changeOrigin: true,
    logger: console,
    on: {
      proxyReq: async (proxyReq, req) => {
        proxyReq.setHeader(userProfileHeaderKey, getUserProfileAsString(req));
      },
    },
  })
);

app.use(
  '/well-mgmt-svc',
  createProxyMiddleware({
    target: process.env.WELLS_V2_TARGET,
    changeOrigin: true,
    logger: console,
    on: {
      proxyReq: async (proxyReq, req) => {
        proxyReq.setHeader(userProfileHeaderKey, getUserProfileAsString(req));
      },
    },
  })
);

app.use(
  '/notification-svc',
  createProxyMiddleware({
    target: process.env.NOTIFICATION_TARGET,
    changeOrigin: true,
    logger: console,
    on: {
      proxyReq: async (proxyReq, req) => {
        proxyReq.setHeader('userProfile', getUserProfileAsString(req));
      },
    },
  })
);

app.get('/healthz', (req, res) => {
  res.status(200).send('success');
});

// react app
app.use(
  '/',
  createProxyMiddleware({
    target: process.env.UI_TARGET,
    changeOrigin: true,
    logger: console,
  })
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`aims-gateway started on ${PORT}`);
});
