const logger = require('../utils/logger');

const errorCatcher = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = err.status || 500;
    ctx.body = err.message;
    logger.error(err);
  }
};

module.exports = errorCatcher;
