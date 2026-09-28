const router = require('express').Router();
const validate = require('../middleware/validate.middleware');
const v = require('../middleware/validators.middleware');
const c = require('../controllers/auth.controller');

router.post('/register/', ...v.register, validate, c.register);
router.post('/login/', ...v.login, validate, c.login);

module.exports = router;
