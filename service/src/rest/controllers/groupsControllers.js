const groupsActivities = require('../../activities/activitiesFactory').groups;
const { entityNotFound } = require('../../errors');

const groupsController = () => {

  const createGroup = async (ctx, next) => {
    const newGroup = await groupsActivities.createNew(ctx.request.body);
    ctx.body = newGroup;
    ctx.status = 201;
    await next();
  };

  const getGroup = async (ctx, next) => {
    const { id } = ctx.params;
    const group = await groupsActivities.getSingle(id);
    if (!group) { throw entityNotFound('group', id); }
    ctx.body = group;
    ctx.status = 200;
    await next();
  };

  const getGroupWithSnippets = async (ctx, next) => {
    ctx.body = await groupsActivities.searchAndGetAllSnippets(ctx.request.body);
    ctx.status = 200;
    await next();
  };

  return {
    createGroup,
    getGroup,
    getGroupWithSnippets,
  };
};

module.exports = { groupsController };
