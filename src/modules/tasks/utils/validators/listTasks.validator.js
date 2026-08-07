const HttpError = require('../../../../utils/httpError');
const {
    validateObject,
    normalizePageIfPresent,
    normalizeLimitIfPresent
}= require('./validator');

const ALLOWED_LIST_FIELDS = ['page', 'limit'];

function validateListTasks(query) {
  validateObject(query, ALLOWED_LIST_FIELDS);

  const normalized = {};
  normalizePageIfPresent(query, normalized);
  normalizeLimitIfPresent(query, normalized);

  return normalized;
}

module.exports = validateListTasks