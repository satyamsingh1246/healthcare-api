function errorHandler(err, req, res, next) {
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ message: 'Record already exists', fields: Object.keys(err.fields || {}) });
  }
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors.map(function getErrorMessage(error) {
        return error.message;
      }),
    });
  }
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON body' });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}

module.exports = errorHandler;
