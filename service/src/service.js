const Koa = require('koa');

const config = require('config');
const logger = require('./utils/logger');
const mongoDB = require('./database/mongoDB');

const app = new Koa();

const service = () => {
  const start = (port) => {
    // Connecting to database
    mongoDB(config.get('database')).connect();

    app.use(async (ctx) => {
      ctx.body = 'Cody Paste';
    });

    app.listen(port);
    logger.info(`Service started on port ${port}`);
  };
  return { start };
};

module.exports = { service };
