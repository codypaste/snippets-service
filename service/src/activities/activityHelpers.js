const joi = require('joi');

const validatePayload = (input, JoiSchema) => {
  const schemaValidationError = (joi.validate(input, JoiSchema)).error;
  if (schemaValidationError) {
    const error = Error(schemaValidationError);
    error.status = 422;
    throw error;
  }
  return input;
};

module.exports = { validatePayload };
