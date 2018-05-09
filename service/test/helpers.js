const config = require('config');

console.log(config);
const getApplicationURL = () => `${config.get('application.host')}:${config.get('application.PORT')}`;

module.exports = { getApplicationURL };
