const HttpError = require('../../../../utils/httpError');

const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 255;

const MIN_INFO_LENGTH = 3;
const MAX_INFO_LENGTH = 255;

function validateObjectShape(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new HttpError(400, 'Input must be a JSON object.');
  }
}

function ensureNoUnknownFields(input,allowedFields) {
  const unknownFields = Object.keys(input).filter(
    (field) => !allowedFields.includes(field)
  );

  if (unknownFields.length > 0) {
    throw new HttpError(400, 'Body contains unsupported fields.', {
      unsupportedFields: unknownFields,
    });
  }
}

function validateObject(input,allowedFields) {
  validateObjectShape(input);
  ensureNoUnknownFields(input,allowedFields);
}

function normalizeActionIfPresent(payload, normalized) {
    console.log("payload",payload)
  if (!Object.hasOwn(payload, 'action')) {
    return;
  }

  if (typeof payload.action !== 'string') {
    throw new HttpError(400, 'action must be a string.');
  }

  const trimmedAction = payload.action.trim();

  if(trimmedAction.length > MAX_TITLE_LENGTH){
    throw new HttpError(400,'action max length = 255')
  }

  if(trimmedAction.length < MIN_TITLE_LENGTH){
    throw new HttpError(400,'action min length = 3')
  }

  normalized.action = trimmedAction;
}

function normalizeInfoIfPresent(payload, normalized) {
  if (!Object.hasOwn(payload, 'info')) {
    return;
  }

  if (typeof payload.info !== 'string') {
    throw new HttpError(400, 'info must be a string.');
  }

  const trimmedInfo = payload.info.trim();

  if(trimmedInfo.length > MAX_INFO_LENGTH){
    throw new HttpError(400,'info max length = 255')
  }

  if(trimmedInfo.length < MIN_INFO_LENGTH){
    throw new HttpError(400,'info max length = 3')
  }

  normalized.info = trimmedInfo;
}

function normalizePageIfPresent(query, normalized) {
  if (!Object.hasOwn(query, 'page')) {
    normalized.page = 1;
    return;
  }

  const page = Number(query.page);

  if (!Number.isInteger(page) || page < 1) {
      throw new HttpError(400, 'page must be a positive integer.');
  }

  normalized.page = page;
}

function normalizeLimitIfPresent(query, normalized) {
  if (!Object.hasOwn(query, 'limit')) {
    normalized.limit = 2;
    return;
  }

  const limit = Number(query.limit);

  if (!Number.isInteger(limit) || limit < 1) {
      throw new HttpError(400, 'limit must be a positive integer.');
  }

  normalized.limit = limit;
}

module.exports = {
  validateObjectShape,
  ensureNoUnknownFields,
  validateObject,
  normalizeActionIfPresent,
  normalizeInfoIfPresent,
  normalizePageIfPresent,
  normalizeLimitIfPresent
};