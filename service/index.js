const config = require('config');

const { service } = require('./src/service');

service().start(config.get('application.PORT'));

