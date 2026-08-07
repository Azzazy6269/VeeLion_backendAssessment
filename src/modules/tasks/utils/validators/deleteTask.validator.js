const HttpError = require('../../../../utils/httpError');

const { 
    validateObject,
    normalizeIdIfPresent,
  } = require('./validator');


const ALLOWED_DELETE_FIELDS = ['id'];

function validateDeleteTask(params) {
  validateObject(params, ALLOWED_DELETE_FIELDS);

  const normalized = {};
  normalizeIdIfPresent(params, normalized);
  
  if (!Object.hasOwn(normalized, 'id')) {
    throw new HttpError(400, '"id" is required and must be a valid UUID.');
  }
  return normalized;
}

module.exports = validateDeleteTask