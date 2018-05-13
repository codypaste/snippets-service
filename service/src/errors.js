module.exports = {
  groupForSnippetNotFound: {
    status: 404,
    message: 'Group provided for this snippet does not exist',
  },
  entityNotFound: (resource, id) => ({
    status: 404,
    message: `${resource} with id ${id} not found`,
  }),
};
