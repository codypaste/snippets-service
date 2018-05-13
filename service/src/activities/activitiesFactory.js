const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const snippetsActivities = require('./snippetsActivities');
const groupsAvtivities = require('./groupsAvtivities');

const snippetsOrm = require('../database/OrmHelpers/snippetsOrm');
const groupsOrm = require('../database/OrmHelpers/groupsOrm');

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
      OrmHelpers: {
        snippetsOrm,
        groupsOrm,
      },
      JoiSchema: snippetJoiSchema,
      getResourceBody: payload => payload,
    });
  },
  get groups() {
    return groupsAvtivities({
      OrmHelpers: groupsOrm,
      JoiSchema: groupJoiSchema,
      getResourceBody: payload => payload,
    });
  },
};
