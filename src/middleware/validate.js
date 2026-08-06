function validate(validator) {
  return (req, res, next) => {
    req.body = validator(req.body);
    next();
  };
}

module.exports = validate;