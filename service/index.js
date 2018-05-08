const { PORT } = require('./config/defaults');

const { service } = require('./src/service');

service().start(PORT);

