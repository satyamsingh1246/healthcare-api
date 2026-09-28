const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const v = require('../middleware/validators.middleware');
const c = require('../controllers/doctors.controller');

router.use(auth);
router.post('/', ...v.doctorCreate, validate, c.create);
router.get('/', c.list);
router.get('/:id/', c.get);
router.put('/:id/', ...v.doctorUpdate, validate, c.update);
router.delete('/:id/', c.remove);

module.exports = router;
