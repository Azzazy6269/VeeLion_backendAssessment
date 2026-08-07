const { validate } = require('uuid');
const HttpError = require('../../../../utils/httpError');

const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 255;

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

function normalizeTitleIfPresent(payload, normalized) {
  if (!Object.hasOwn(payload, 'title')) {
    return;
  }

  if (typeof payload.title !== 'string') {
    throw new HttpError(400, 'title must be a string.');
  }

  const trimmedTitle = payload.title.trim();

  if(trimmedTitle > MAX_TITLE_LENGTH){
    throw new HttpError(400,'title max length = 255')
  }

  if(trimmedTitle < MIN_TITLE_LENGTH){
    throw new HttpError(400,'title max length = 3')
  }

  normalized.title = trimmedTitle;
}

function normalizeCompletedIfPresent(payload, normalized) {
  if (!Object.hasOwn(payload, 'completed')) {
    return;
  }

  if (typeof payload.completed !== 'boolean') {
    throw new HttpError(400, 'completed must be a boolean.');
  }

  normalized.completed = payload.completed;
}

function normalizeIdIfPresent(params, normalized) {
  if (!Object.hasOwn(params, 'id')) {
    return;
  }

  if (!validate(params.id)) {
    throw new HttpError(400, 'id must be a valid UUID.');
  }

  normalized.id = params.id;
}

function normalizePageIfPresent(query, normalized) {
  if (!Object.hasOwn(query, 'page')) {
    normalized.page = 1;
    return;
  }

  const page = Number(query.page);

  if (!Number.isInteger(page) || page < 1) {
      throw new HttpError(400, '"page" must be a positive integer.');
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
  normalizeTitleIfPresent,
  normalizeCompletedIfPresent,
  normalizeIdIfPresent,
  normalizePageIfPresent,
  normalizeLimitIfPresent
};