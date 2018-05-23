const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const snippetsActivities = require('./snippetsActivities');
const groupsActivities = require('./groupsActivities');

const snippetsDao = require('../database/dao/snippetsDao');
const groupsDao = require('../database/dao/groupsDao');

const snippetJoiSchema = joi.object().keys({
  snippet: joi.string().required(),
  group: joi.objectId().required(),
  author: joi.string().default('unknown'), // This will be either userID (when logged) or default if not logged
  snippetName: joi.string().required(),
  description: joi.string(),
  syntax: joi.string(),
});

const groupJoiSchema = joi.object().keys({
  title: joi.string().required(),
  description: joi.string(),
  author: joi.string().default('unknown'),
  isPublic: joi.bool().default(true),
});

module.exports = {
  get snippets() {
    return snippetsActivities({
      Dao: {
        snippetsDao,
        groupsDao,
      },
      JoiSchema: snippetJoiSchema,
      getResourceBody: payload => payload,
    });
  },
  get groups() {
    return groupsActivities({
      Dao: {
        snippetsDao,
        groupsDao,
      },
      JoiSchema: groupJoiSchema,
      getResourceBody: payload => payload,
    });
  },
};