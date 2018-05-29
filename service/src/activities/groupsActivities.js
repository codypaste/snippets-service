const moment = require('moment');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const {
  validateBody,
  validateIDFormat,
  disposeOfProhibitedFields,
  validateAndPatch,
} = require('./activityHelpers');
const {
  entityNotFound,
  resourceHasExpired,
  unauthorizedGroupSearch,
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

const authorizeGroupSearch = async (group, password) => {
  const raiseUnauthorizedError = () => { throw unauthorizedGroupSearch(group._id); };

  try {
    const authorized = await bcrypt.compare(password, group.password);
    if (authorized === false) { raiseUnauthorizedError(); }
  } catch (e) {
    raiseUnauthorizedError();
  }
};

module.exports = ({ Dao, JoiSchema, getResourceBody }) => {

  const { groupsDao, snippetsDao } = Dao;

  const createNew = async (payload) => {
    const validBody = validateBody(getResourceBody(payload), JoiSchema);
    const created = await groupsDao.create(validBody);
    return disposeOfProhibitedFields(created);
  };

  const getSingle = async (resourceId) => {
    const validID = validateIDFormat(resourceId);
    const group = await checkExpirationAndGet(groupsDao, validID);
    return disposeOfProhibitedFields(group);
  };

  const deleteSingle = async resourceId => groupsDao.deleteSingle(resourceId);

  const updateWithPatch = async (resourceId, patchPayload) => {
    const groupToPatch = await getSingle(resourceId);
    const patchedGroup = validateAndPatch(patchPayload, groupToPatch);
    return groupsDao.updateById(resourceId, patchedGroup);
  };

  const searchAndGetAllSnippets = async ({ groupId, password }) => {
    const foundGroup = await checkExpirationAndGet(groupsDao, groupId);
    if (!foundGroup.isPublic) {
      await authorizeGroupSearch(foundGroup, password);
    }
    const snippetsFromGroup = await snippetsDao.findByGroup(groupId);

    return {
      group: disposeOfProhibitedFields(foundGroup),
      snippets: snippetsFromGroup,
      snippetsAmount: snippetsFromGroup.length,
    };
  };

  return {
    createNew,
    getSingle,
    deleteSingle,
    searchAndGetAllSnippets,
    updateWithPatch,
  };
};
