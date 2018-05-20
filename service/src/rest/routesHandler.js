const {
  createSnippet,
  getSnippet,
  deleteSnippet,
  searchForSnippet,
  patchSnippet,
} = require('./controllers/snippetsControllers').snippetsController();
const {
  createGroup,
  getGroup,
  getGroupWithSnippets,
} = require('./controllers/groupsControllers').groupsController();

module.exports = (router) => {

  // Snippets routes
  router.post('/snippets', createSnippet);
  router.post('/snippets/_search', searchForSnippet);
  router.get('/snippets/:id', getSnippet);
  router.delete('/snippets/:id', deleteSnippet);
  router.patch('/snippets/:id', patchSnippet);

  // Groups routes
  router.post('/groups', createGroup);
  router.get('/groups/:id', getGroup);
  router.post('/groups/_search', getGroupWithSnippets);
};
