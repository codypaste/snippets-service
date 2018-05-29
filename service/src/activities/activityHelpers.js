const joi = require('joi');
const jsonpatch = require('fast-json-patch');

const Errors = require('../errors');

const validateBody = (input, JoiSchema) => {
  const schemaValidationError = (joi.validate(input, JoiSchema)).error;
  if (schemaValidationError) {
    const error = Error(schemaValidationError);
    error.status = 422;
    throw error;
  }
  return input;
};

const validateIDFormat = (id) => {
  // Regex matching mongo ObjectID
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw Errors.badRequestFormat('ObjectID', id);
  }
  return id;
};

const validateAndPatch = (patchPayload, objToPatch) => {
  const errors = jsonpatch.validate(patchPayload, objToPatch);
  if (errors && errors.length !== 0) {
    throw Errors.badPatchPayloadFormat(errors);
  }
  return jsonpatch.applyPatch(objToPatch, patchPayload).newDocument;
};

const disposeOfProhibitedFields = (resource) => {
  const prohibitedFields = ['password'];
  prohibitedFields.forEach((field) => {
    resource[field] = undefined;
  });
  return resource;
};

module.exports = {
  validateBody,
  validateIDFormat,
  validateAndPatch,
  disposeOfProhibitedFields,
};
