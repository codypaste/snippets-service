const Koa = require('koa');

const logger = require('./utils/logger');

const app = new Koa();

const service = () => {
  const start = (port) => {
    app.use(async (ctx) => {
      ctx.body = 'Cody Paste';
    });

    app.listen(port);
    logger.info(`Service started on port ${port}`);
  };
  return { start };
};

module.exports = { service };
