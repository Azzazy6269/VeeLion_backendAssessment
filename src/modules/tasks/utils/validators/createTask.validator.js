const HttpError = require('../../../../utils/httpError');
const {
    validateObject,
    normalizeTitleIfPresent,
    normalizeCompletedIfPresent
}= require('./validator');

const ALLOWED_CREATE_FIELDS = ['title', 'completed'];

function validateCreateTask(payload) {
  validateObject(payload,ALLOWED_CREATE_FIELDS);

  const normalized = {};
  normalizeTitleIfPresent(payload, normalized);
  normalizeCompletedIfPresent(payload, normalized);

  if (!Object.hasOwn(normalized, 'title')) {
    throw new HttpError(400, '"title" is required.');
  }

  if (!Object.hasOwn(normalized, 'completed')) {
    normalized.completed = false;
  }

  return normalized;
}

module.exports = validateCreateTask