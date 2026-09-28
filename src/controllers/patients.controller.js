const { Patient } = require('../models');

function findOwned(req) {
  return Patient.findOne({
    where: {
      id: req.params.id,
      createdBy: req.user.id,
    },
  });
}

async function create(req, res) {
  const patient = await Patient.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(patient);
}

async function list(req, res) {
  const patients = await Patient.findAll({
    where: { createdBy: req.user.id },
    order: [['id', 'ASC']],
  });
  res.json(patients);
}

async function get(req, res) {
  const patient = await findOwned(req);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  res.json(patient);
}

async function update(req, res) {
  const patient = await findOwned(req);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  await patient.update(req.body);
  res.json(patient);
}

async function remove(req, res) {
  const patient = await findOwned(req);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  await patient.destroy();
  res.json({ message: 'Patient deleted' });
}

module.exports = {
  create,
  list,
  get,
  update,
  remove,
}
