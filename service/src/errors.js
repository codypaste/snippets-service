module.exports = {
  groupForSnippetNotFound: {
    status: 404,
    message: 'Group provided for this snippet does not exist',
  },
  entityNotFound: (resource, id) => ({
    status: 404,
    message: `${resource} with id ${id} not found`,
  }),
  badRequestFormat: (resource, value) => ({
    status: 400,
    message: `Bad value format : ${value} for : ${resource}`,
  }),
  badPatchPayloadFormat: validationError => ({
    status: 400,
    message: validationError,
  }),
  resourceHasExpired: (resource, id) => ({
    status: 423,
    message: `${resource} with id ${id} has expired`,
  }),
  unauthorizedGroupSearch: id => ({
    status: 401,
    message: `unauthorized for group with id ${id}`,
  }),
};
