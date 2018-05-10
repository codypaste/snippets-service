const config = require('config');

const logger = require('./src/utils/logger');
const { service } = require('./src/service');

(async () => {
  try {
    await service().start(config.get('application.PORT'));
  } catch (err) {
    logger.error(`Error while starting service, ${err}`);
    process.exit(1);
  }
})();
