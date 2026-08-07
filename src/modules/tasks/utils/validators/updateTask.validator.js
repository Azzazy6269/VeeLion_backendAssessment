const HttpError = require('../../../../utils/httpError');
const {
    validateObject,
    normalizeTitleIfPresent,
    normalizeCompletedIfPresent,
    normalizeIdIfPresent
}= require('./validator');

const ALLOWED_UPDATE_BODY_FIELDS = ['title', 'completed'];
const ALLOWED_UPDATE_PARAMS_FIELDS = ['id'];

function validateUpdateTaskBody(payload) {
  validateObject(payload,ALLOWED_UPDATE_BODY_FIELDS);

  const normalized = {};
  normalizeTitleIfPresent(payload, normalized);
  normalizeCompletedIfPresent(payload, normalized);

  if (!Object.hasOwn(normalized, 'title') && !Object.hasOwn(normalized, 'completed')) {
    throw new HttpError(400, 'at least add one of title or completed.');
  }

  return normalized;
}

function validateUpdateTaskParams(payload) {
  validateObject(payload,ALLOWED_UPDATE_PARAMS_FIELDS);

  const normalized = {};
  normalizeIdIfPresent(payload, normalized)

  if (!Object.hasOwn(normalized, 'id')) {
    throw new HttpError(400, 'params must contain id in uuid format.');
  }

  return normalized;
}

module.exports = {validateUpdateTaskBody,validateUpdateTaskParams}