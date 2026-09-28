const { matchedData, validationResult } = require('express-validator');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(function getErrorMessage(error) {
        return error.msg;
      }),
    });
  }

  req.body = matchedData(req, {
    locations: ['body'],
    includeOptionals: true,
  });
  next();
}

module.exports = validate;
