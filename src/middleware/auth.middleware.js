const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET); // errors -> error handler
  req.user = { id: payload.id };
  next();
}

module.exports = authenticate;
