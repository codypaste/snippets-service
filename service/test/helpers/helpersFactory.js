const path = require('path');
// Dunno where to set that
process.env.NODE_CONFIG_DIR = path.join(__dirname, '../../config');

const { helpers } = require('./helpers');

const host = () => 'http://localhost';

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
