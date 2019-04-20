const groupsActivities = require('../../activities/activitiesFactory').groups;

const groupsController = () => {
  const createGroup = async (ctx, next) => {
    const newGroup = await groupsActivities.createNew(ctx.request.body);
    ctx.body = newGroup;
    ctx.status = 201;
    await next();
  };

  const getGroup = async (ctx, next) => {
    const { id } = ctx.params;
    ctx.body = await groupsActivities.getSingle(id);
    ctx.status = 200;
    await next();
  };

  const deleteGroup = async (ctx, next) => {
    await groupsActivities.deleteGroupWithItsSnippets(ctx.params.id);
    ctx.status = 204;
    await next();
  };

  const getGroupWithSnippets = async (ctx, next) => {
    ctx.body = await groupsActivities.searchAndGetAllSnippets(ctx.request.body);
    ctx.status = 200;
    ctx.set('Cache-Control', 'public, max-age=31536000');
    await next();
  };

  return {
    createGroup,
    getGroup,
    getGroupWithSnippets,
    deleteGroup,
  };
};

module.exports = { groupsController };
