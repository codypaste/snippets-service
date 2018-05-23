const moment = require('moment');
const _ = require('lodash');

const {
  validateBody,
  validateIDFormat,
} = require('./activityHelpers');
const {
  entityNotFound,
  resourceHasExpired,
} = require('../errors');

const checkExpirationAndGet = async (groupsDao, groupID) => {
  const group = await groupsDao.getSingle(groupID);
  if (!group) {
    throw entityNotFound('group', groupID);
  }
  const { expirationDatetime } = group;

  const requestDatetime = moment().utc().format();
  if (!_.isNull(expirationDatetime) && moment(expirationDatetime).isBefore(requestDatetime)) {
    throw resourceHasExpired('group', groupID);
  }

  return group;

};

module.exports = ({ Dao, JoiSchema, getResourceBody }) => {

  const { groupsDao, snippetsDao } = Dao;

  const createNew = async (payload) => {
    const validBody = validateBody(getResourceBody(payload), JoiSchema);
    return groupsDao.create(validBody);
  };

  const getSingle = async (resourceId) => {
    const validID = validateIDFormat(resourceId);
    return checkExpirationAndGet(groupsDao, validID);
  };

  const deleteSingle = async resourceId => groupsDao.deleteSingle(resourceId);

  const searchAndGetAllSnippets = async ({ groupId }) => {
    const foundGroup = await checkExpirationAndGet(groupsDao, groupId);

    const snippetsFromGroup = await snippetsDao.findByGroup(groupId);

    return {
      group: foundGroup,
      snippets: snippetsFromGroup,
      snippetsAmount: snippetsFromGroup.length,
    };
  };

  return {
    createNew,
    getSingle,
    deleteSingle,
    searchAndGetAllSnippets,
  };
};
