const {
  createSnippet,
  getSnippet,
  deleteSnippet,
} = require('./controllers/snippetsControllers').snippetsController();
const {
  createGroup,
  getGroup,
  getGroupWithSnippets,
  deleteGroup,
} = require('./controllers/groupsControllers').groupsController();

module.exports = (router) => {
  // Snippets routes
  router.post('/snippets', createSnippet);
  router.get('/snippets/:id', getSnippet);
  router.delete('/snippets/:id', deleteSnippet);

  // Groups routes
  router.post('/groups', createGroup);
  router.get('/groups/:id', getGroup);
  router.delete('/groups/:id', deleteGroup);
  router.post('/groups/_search', getGroupWithSnippets);
};
