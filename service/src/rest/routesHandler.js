const snippetsActivities = require('../activities/snippetsActivities')();

module.exports = (router) => {
  router.post('/snippets', async (ctx, next) => {
    // const createdSnippet = await snippetsActivities.createNew(ctx.params.id);
    // ctx.body = createdSnippet;
    ctx.body = 'Created!';
    ctx.status = 201;
    await next();
  });

  router.get('/snippets/:id', async (ctx, next) => {
    const snippet = await snippetsActivities.getSingle(ctx.params.id);
    ctx.body = snippet;
    ctx.status = 201;
    await next();
  });

  router.delete('/snippets/:id', async (ctx, next) => {
    const snippet = await snippetsActivities.deleteSingle(ctx.params.id);
    ctx.body = snippet;
    ctx.status = 201;
    await next();
  });
};
