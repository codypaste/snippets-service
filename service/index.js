const config = require('config');

const apmUrl = config.get('apmServerUrl');

if (apmUrl && apmUrl.length > 0) {
  require('elastic-apm-node').start({
    serviceName: require('./package.json').name,
    serverUrl: apmUrl,
    captureBody: 'all',
  });
}

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
