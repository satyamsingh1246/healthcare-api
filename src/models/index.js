const sequelize = require('../config/db');
const User = require('./user.model');
const Patient = require('./patient.model');
const Doctor = require('./doctor.model');
const Mapping = require('./mapping.model');

User.hasMany(Patient, { foreignKey: 'createdBy', onDelete: 'CASCADE' });
Patient.belongsTo(User, { foreignKey: 'createdBy' });
User.hasMany(Doctor, { foreignKey: 'createdBy', onDelete: 'CASCADE' });
Doctor.belongsTo(User, { foreignKey: 'createdBy' });

Patient.hasMany(Mapping, { onDelete: 'CASCADE' });
Mapping.belongsTo(Patient);
Doctor.hasMany(Mapping, { onDelete: 'CASCADE' });
Mapping.belongsTo(Doctor);

module.exports = { sequelize, User, Patient, Doctor, Mapping };
