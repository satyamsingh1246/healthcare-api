const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const v = require('../middleware/validators.middleware');
const c = require('../controllers/patients.controller');

router.use(auth);
router.post('/', ...v.patientCreate, validate, c.create);
router.get('/', c.list);
router.get('/:id/', c.get);
router.put('/:id/', ...v.patientUpdate, validate, c.update);
router.delete('/:id/', c.remove);

module.exports = router;
