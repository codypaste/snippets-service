const path = require('path');
// Dunno where to set that
process.env.NODE_CONFIG_DIR = path.join(__dirname, '../../config');
const config = require('config');

const { helpers } = require('./helpers');

const host = () => `${config.get('application.host')}:${config.get('application.PORT')}`;

module.exports = {
  get groupsHelpers() {
    return helpers({
      host: host(),
      path: '/groups',
      contentType: 'application/json',
    });
  },
  get snippetsHelpers() {
    return helpers({
      host: host(),
      path: '/snippets',
      contentType: 'application/json',
    });
  },
  get groupsSearchHelpers() {
    return helpers({
      host: host(),
      path: '/groups/_search',
      contentType: 'application/json',
    });
  },
};
