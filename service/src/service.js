const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const etag = require('koa-etag');
const cors = require('@koa/cors');

const logger = require('./utils/logger');
const routesHandler = require('./rest/routesHandler');
const errorCatcher = require('./middlewares/errorCatcher');
const rateLimiter = require('./middlewares/rateLimiter');

const app = new Koa();
app.proxy = true;

const router = new Router();

const service = () => {
  const start = async (port) => {
    app
      .use(errorCatcher)
      .use(bodyParser())
      .use(rateLimiter)
      .use(
        etag({
          weak: false,
        }),
      )
      .use(
        cors({
          maxAge: 600,
          keepHeadersOnError: true,
        }),
      )
      .use(router.routes())
      .use(router.allowedMethods());

    routesHandler(router);

    app.listen(port);
    logger.info(`Service started on port ${port}`);
  };
  return { start };
};

module.exports = { service };
