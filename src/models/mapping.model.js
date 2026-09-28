const sequelize = require('../config/db');

const Mapping = sequelize.define(
  'Mapping',
  {},
  {
    indexes: [
      {
        unique: true,
        fields: ['PatientId', 'DoctorId'],
      },
    ],
  }
);

module.exports = Mapping;
