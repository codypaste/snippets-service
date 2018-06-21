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

  const getGroupWithSnippets = async (ctx, next) => {
    ctx.body = await groupsActivities.searchAndGetAllSnippets(ctx.request.body);
    ctx.status = 200;
    ctx.set('Cache-Control', 'public, max-age=31536000');
    await next();
  };

  const patchGroup = async (ctx, next) => {
    const { body: patchPayload } = ctx.request;
    const { id } = ctx.params;
    await groupsActivities.updateWithPatch(id, patchPayload);
    ctx.status = 204;
    await next();
  };

  return {
    createGroup,
    getGroup,
    getGroupWithSnippets,
    patchGroup,
  };
};

module.exports = { groupsController };
