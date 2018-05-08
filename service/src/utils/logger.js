const path = require('path');
const fs = require('fs');
const winston = require('winston');

const LOGS_PATH = '../../logs/logs.log';
const filename = fs.existsSync(LOGS_PATH) ? LOGS_PATH : path.join(__dirname, LOGS_PATH);

module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({ filename }),
    new (winston.transports.Console)(),
  ],
});
