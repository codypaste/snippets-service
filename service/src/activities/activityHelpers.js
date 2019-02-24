const joi = require('joi');
const jsonpatch = require('fast-json-patch');

const Errors = require('../errors');

const validateBody = (input, JoiSchema) => {
  const { value, error } = joi.validate(input, JoiSchema);
  if (error) {
    const e = Error(error);
    e.status = 422;
    throw e;
  }
  return value;
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
  const fixedObject = resource;
  prohibitedFields.forEach((field) => {
    fixedObject[field] = undefined;
  });
  return fixedObject;
};

module.exports = {
  validateBody,
  validateAndPatch,
  disposeOfProhibitedFields,
};
