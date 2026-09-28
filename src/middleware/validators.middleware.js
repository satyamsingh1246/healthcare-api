const { body } = require('express-validator');

const genders = ['male', 'female', 'other'];

const register = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail(),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6, max: 72 })
    .withMessage('Password must be between 6 and 72 characters'),
];

const login = [
  body('email').isEmail().withMessage('Email must be valid').normalizeEmail(),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password is required'),
];

const patientCreate = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('age')
    .isInt({ min: 0, max: 150 })
    .withMessage('Age must be an integer between 0 and 150')
    .toInt(),
  body('gender')
    .isIn(genders)
    .withMessage('Gender must be male, female, or other'),
  body('address').optional({ nullable: true }).isString().withMessage('Address must be a string').trim(),
  body('medicalHistory')
    .optional({ nullable: true })
    .isString()
    .withMessage('Medical history must be a string')
    .trim(),
];

const patientUpdate = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('age')
    .optional()
    .isInt({ min: 0, max: 150 })
    .withMessage('Age must be an integer between 0 and 150')
    .toInt(),
  body('gender').optional().isIn(genders).withMessage('Gender must be male, female, or other'),
  body('address').optional({ nullable: true }).isString().withMessage('Address must be a string').trim(),
  body('medicalHistory')
    .optional({ nullable: true })
    .isString()
    .withMessage('Medical history must be a string')
    .trim(),
];

const doctorCreate = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('specialization')
    .isString()
    .withMessage('Specialization must be a string')
    .trim()
    .notEmpty()
    .withMessage('Specialization is required'),
  body('email').isEmail().withMessage('Email must be valid').normalizeEmail(),
  body('phone').optional({ nullable: true }).isString().withMessage('Phone must be a string').trim(),
];

const doctorUpdate = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('specialization')
    .optional()
    .isString()
    .withMessage('Specialization must be a string')
    .trim()
    .notEmpty()
    .withMessage('Specialization is required'),
  body('email').optional().isEmail().withMessage('Email must be valid').normalizeEmail(),
  body('phone').optional({ nullable: true }).isString().withMessage('Phone must be a string').trim(),
];

const mapping = [
  body('patient_id')
    .isInt({ min: 1 })
    .withMessage('Patient ID must be a positive integer')
    .toInt(),
  body('doctor_id')
    .isInt({ min: 1 })
    .withMessage('Doctor ID must be a positive integer')
    .toInt(),
];

module.exports = {
  register,
  login,
  patientCreate,
  patientUpdate,
  doctorCreate,
  doctorUpdate,
  mapping,
};
