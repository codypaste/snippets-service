const moment = require('moment');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');
const logger = require('../utils/logger');

const {
  validateBody,
  disposeOfProhibitedFields,
} = require('./activityHelpers');
const {
  entityNotFound,
  resourceHasExpired,
  unauthorizedGroupSearch,
  badRequestFormat,
} = require('../errors');

const authorizeGroupSearch = async (group, password) => {
  const raiseUnauthorizedError = () => {
    throw unauthorizedGroupSearch(group.id);
  };

  try {
    const authorized = await bcrypt.compare(password, group.password);
    if (authorized === false) {
      raiseUnauthorizedError();
    }
  } catch (e) {
    raiseUnauthorizedError();
  }
};

const hashPasswordIfApplicable = async (group) => {
  if (!group.password || group.password.length < 1) {
    return group;
  }

  const groupWithHashedPassword = group;
  groupWithHashedPassword.password = await bcrypt.hash(group.password, 10);
  return groupWithHashedPassword;
};

module.exports = ({
  dao,
  snippetChunksDao,
  snippetsDao,
  JoiSchema,
  getResourceBody,
}) => {
  const createNew = async (payload) => {
    const validBody = validateBody(getResourceBody(payload), JoiSchema);

    const created = await dao.create(await hashPasswordIfApplicable(validBody));
    return disposeOfProhibitedFields(created);
  };

  const getSingle = async (resourceId, returnWithPassword = false) => {
    const group = await dao.getSingle(resourceId);

    if (!group) {
      throw entityNotFound('group', resourceId);
    }
    const { expirationDatetime } = group;

    const requestDatetime = moment()
      .utc()
      .format();
    if (
      !_.isNull(expirationDatetime)
      && moment(expirationDatetime).isBefore(requestDatetime)
    ) {
      throw resourceHasExpired('group', resourceId);
    }

    if (returnWithPassword) {
      return group;
    }

    return disposeOfProhibitedFields(group);
  };

  const deleteGroupWithItsSnippets = async (groupId) => {
    const group = await dao.getSingle(groupId);
    if (!group) {
      throw entityNotFound('group', groupId);
    }
    const snippets = await dao.getSnippetsForGroup(groupId);
    await Promise.map(snippets, async (snippet) => {
      await snippetChunksDao.removeChunksForSnippet(snippet);
      await snippetsDao.removeSingle(snippet.id);
    });
    return dao.removeSingle(groupId);
  };

  const searchAndGetAllSnippets = async ({ groupId, password }) => {
    if (!groupId) {
      throw badRequestFormat('Group', groupId);
    }
    const group = await getSingle(groupId, true);

    if (!group.isPublic) {
      await authorizeGroupSearch(group, password);
    }

    const snippets = await dao.getSnippetsForGroup(groupId);

    const snippetsWithContent = await Promise.map(snippets, async (snippet) => {
      const snippetWithContent = snippet;
      const chunks = await snippetChunksDao.getChunksForSnippet(snippet.id);
      snippetWithContent.snippet = chunks.map(c => c.value).join('');
      return snippetWithContent;
    });

    return {
      group: disposeOfProhibitedFields(group),
      snippets: snippetsWithContent,
    };
  };

  return {
    createNew,
    getSingle,
    searchAndGetAllSnippets,
    deleteGroupWithItsSnippets,
  };
};
