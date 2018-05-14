const snippetsActivities = require('../../activities/activitiesFactory').groups;
const { entityNotFound } = require('../../errors');

const groupsController = () => {

  const createGroup = async (ctx, next) => {
    const newGroup = await snippetsActivities.createNew(ctx.request.body);
    ctx.body = newGroup;
    ctx.status = 201;
    await next();
  };

  const getGroup = async (ctx, next) => {
    const { id } = ctx.params;
    const group = await snippetsActivities.getSingle(id);
    if (!group) { throw entityNotFound('group', id); }
    ctx.body = group;
    ctx.status = 200;
    await next();
  };

  return {
    createGroup,
    getGroup,
  };
};

module.exports = { groupsController };
