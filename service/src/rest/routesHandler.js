const {
  createSnippet,
  getSnippet,
  deleteSnippet,
  searchForSnippet,
} = require('./controllers/snippetsControllers').snippetsController();
const {
  createGroup,
  getGroup,
  getGroupWithSnippets,
} = require('./controllers/groupsControllers').groupsController();

module.exports = (router) => {

  // Snippets routes
  router.post('/snippets', createSnippet);
  router.get('/snippets/:id', getSnippet);
  router.delete('/snippets/:id', deleteSnippet);
  router.post('/snippets/_search', searchForSnippet);

  // Groups routes
  router.post('/groups', createGroup);
  router.get('/groups/:id', getGroup);
  router.post('/groups/_search', getGroupWithSnippets);
};
