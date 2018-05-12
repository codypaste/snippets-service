const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const activities = require('./activities');

const { SnippetModel } = require('../database/models/SnippetModel');
const { GroupModel } = require('../database/models/GroupModel');

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
    return activities({
      MongooseModel: () => SnippetModel,
      JoiSchema: snippetJoiSchema,
      getResourceBody: payload => payload,
    });
  },
  get groups() {
    return activities({
      MongooseModel: () => GroupModel,
      JoiSchema: groupJoiSchema,
      getResourceBody: payload => payload,
    });
  },
};
