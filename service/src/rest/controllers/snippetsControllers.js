const snippetsActivities = require('../../activities/activitiesFactory').snippets;

const snippetsController = () => {

  const createSnippet = async (ctx, next) => {
    const createdSnippet = await snippetsActivities.createNew(ctx.request.body);
    ctx.body = createdSnippet;
    ctx.status = 201;
    await next();
  };

  const getSnippet = async (ctx, next) => {
    const snippet = await snippetsActivities.getSingle(ctx.params.id);
    ctx.body = snippet;
    ctx.status = 200;
    await next();
  };

  const deleteSnippet = async (ctx, next) => {
    const snippet = await snippetsActivities.deleteSingle(ctx.params.id);
    ctx.body = snippet;
    ctx.status = 204;
    await next();
  };

  const searchForSnippet = async (ctx, next) => {
    // TODO
    await next();
  };

  return {
    createSnippet,
    getSnippet,
    deleteSnippet,
    searchForSnippet,
  };
};

module.exports = { snippetsController };
