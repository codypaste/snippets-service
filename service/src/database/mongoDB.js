const mongoose = require('mongoose');

const logger = require('../utils/logger');

mongoose.Promise = global.Promise;

module.exports = ({ host, port, dbName }) => {
  const CONNECTION_STRING = `mongodb://${host}:${port}/${dbName}`;

  const handleConnectionError = (err) => {
    logger.error(`Failed to connect to DB ${dbName} on startup `, err);
  };

  const connect = async () => {
    try {
      await mongoose.connect(CONNECTION_STRING);
      logger.info(`Connected to ${dbName} database`);
    } catch (e) {
      handleConnectionError(e);
    }
  };

  return { connect };
};
