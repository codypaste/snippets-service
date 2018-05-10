const Koa = require('koa');
const Router = require('koa-router');

const config = require('config');
const logger = require('./utils/logger');
const mongoDB = require('./database/mongoDB');
const routesHandler = require('./rest/routesHandler');

const app = new Koa();
const router = new Router();

const service = () => {
  const start = async (port) => {
    // Connecting to database
    await mongoDB(config.get('database')).connect();

    app
      .use(router.routes())
      .use(router.allowedMethods());

    routesHandler(router);

    app.listen(port);
    logger.info(`Service started on port ${port}`);
  };
  return { start };
};

module.exports = { service };
