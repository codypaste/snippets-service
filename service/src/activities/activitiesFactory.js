const joi = require('joi');

const snippetsActivities = require('./snippetsActivities');
const groupsActivities = require('./groupsActivities');

const { prisma } = require('../database/generated/prisma-client');

const snippetJoiSchema = joi.object().keys({
  snippet: joi.string().required(),
  group: joi.string().required(),
  author: joi.string().default('unknown'), // This will be either userID (when logged) or default if not logged
  snippetName: joi.string().required(),
  syntax: joi.string(),
});

const groupJoiSchema = joi.object().keys({
  title: joi.string().required(),
  description: joi.string(),
  author: joi
    .string()
    .when('isProtected', { is: true, then: joi.required() })
    .default('unknown'),
  isPublic: joi.bool().default(true),
  isEncrypted: joi.bool().default(false),
  password: joi.string().when('isPublic', { is: false, then: joi.required() }),
  isProtected: joi.bool().default(false),
  expirationDatetime: joi
    .date()
    .iso()
    .allow(null),
});

const groupsDao = {
  create: prisma.createGroup,
  getSingle: id => prisma.group({ id }),
  removeSingle: id => prisma.deleteGroup({ id }),
  getSnippetsForGroup: id => prisma.group({ id }).snippets(),
};

const snippetsDao = {
  create: prisma.createSnippet,
  removeSingle: id => prisma.deleteSnippet({ id }),
  getSingle: id => prisma.snippet({ id }),
};

const snippetChunksDao = {
  create: prisma.createSnippetChunk,
  getChunksForSnippet: id => prisma.snippet({ id }).chunks(),
  removeChunksForSnippet: s => prisma.deleteManySnippetChunks({ snippet: { id: s.id } }),
};

module.exports = {
  get snippets() {
    return snippetsActivities({
      dao: snippetsDao,
      groupsDao,
      snippetChunksDao,
      JoiSchema: snippetJoiSchema,
      getResourceBody: payload => payload,
    });
  },
  get groups() {
    return groupsActivities({
      dao: groupsDao,
      snippetsDao,
      snippetChunksDao,
      JoiSchema: groupJoiSchema,
      getResourceBody: payload => payload,
    });
  },
};
