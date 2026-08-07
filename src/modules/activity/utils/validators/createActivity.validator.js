const HttpError = require('../../../../utils/httpError');
const {
    validateObject,
    normalizeActionIfPresent,
    normalizeInfoIfPresent
}= require('./validator');

const ALLOWED_CREATE_FIELDS = ['action', 'info'];

function validateCreateActivity(payload) {
  validateObject(payload,ALLOWED_CREATE_FIELDS);

  const normalized = {};
  normalizeActionIfPresent(payload, normalized);
  normalizeInfoIfPresent(payload, normalized);

  if (!Object.hasOwn(normalized, 'action')) {
    throw new HttpError(400, 'action is required.');
  }

  if (!Object.hasOwn(normalized, 'info')) {
    throw new HttpError(400, 'info is required.');
  }

  return normalized;
}

module.exports = validateCreateActivity