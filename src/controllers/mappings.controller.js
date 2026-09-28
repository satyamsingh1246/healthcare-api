const { Mapping, Patient, Doctor } = require('../models');

async function create(req, res) {
  const { patient_id, doctor_id } = req.body;
  const patient = await Patient.findOne({
    where: {
      id: patient_id,
      createdBy: req.user.id,
    },
  });
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  const doctor = await Doctor.findByPk(doctor_id);
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

  const [mapping, created] = await Mapping.findOrCreate({
    where: { PatientId: patient.id, DoctorId: doctor.id },
  });
  if (!created) return res.status(409).json({ message: 'Doctor already assigned to this patient' });
  res.status(201).json(mapping);
};

async function list(req, res) {
  const mappings = await Mapping.findAll({
    include: [
      { model: Patient, where: { createdBy: req.user.id } },
      { model: Doctor },
    ],
    order: [['id', 'ASC']],
  });
  res.json(mappings);
};

async function byPatient(req, res) {
  const patient = await Patient.findOne({
    where: {
      id: req.params.patient_id,
      createdBy: req.user.id,
    },
  });
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  const mappings = await Mapping.findAll({
    where: { PatientId: patient.id },
    include: [Doctor],
  });
  const doctors = mappings.map(function mapDoctor(mapping) {
    return {
      mappingId: mapping.id,
      ...mapping.Doctor.toJSON(),
    };
  });

  res.json({ patient, doctors });
}

async function remove(req, res) {
  const mapping = await Mapping.findOne({
    where: { id: req.params.id },
    include: [{ model: Patient, where: { createdBy: req.user.id } }],
  });
  if (!mapping) return res.status(404).json({ message: 'Mapping not found' });
  await mapping.destroy();
  res.json({ message: 'Doctor removed from patient' });
};

module.exports = {
  create,
  list,
  byPatient,
  remove,
};
