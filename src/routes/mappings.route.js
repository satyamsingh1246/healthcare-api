const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const v = require('../middleware/validators.middleware');
const c = require('../controllers/mappings.controller');

router.use(auth);
router.post('/', ...v.mapping, validate, c.create);
router.get('/', c.list);
router.get('/:patient_id/', c.byPatient);
router.delete('/:id/', c.remove);

module.exports = router;
