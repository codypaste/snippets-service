const mongoose = require('mongoose');

const logger = require('../utils/logger');

mongoose.Promise = global.Promise;

module.exports = ({ host, port, dbName }) => {
  const CONNECTION_STRING = `mongodb://${host}:${port}/${dbName}`;

  const handleSuccessfulConnection = () => {
    logger.info(`Connected to ${dbName} database`);
  };

  const handleConnectionError = (err) => {
    logger.log('error', { err });
  };

  const connect = () => {
    mongoose.connect(CONNECTION_STRING);
    const { connection } = mongoose;
    connection.once('open', handleSuccessfulConnection);
    connection.on('error', handleConnectionError);
  };

  return { connect };
};
