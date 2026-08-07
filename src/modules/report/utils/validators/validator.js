const HttpError = require('../../../../utils/httpError');


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




module.exports = {
  validateObjectShape,
  ensureNoUnknownFields,
  validateObject
};