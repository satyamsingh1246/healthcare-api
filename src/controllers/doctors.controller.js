const { Doctor } = require('../models');

async function create(req, res) {
  const doctor = await Doctor.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(doctor);
}

async function list(req, res) {
  res.json(await Doctor.findAll({ order: [['id', 'ASC']] }));
}

async function get(req, res) {
  const doctor = await Doctor.findByPk(req.params.id);
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
  res.json(doctor);
}

// Only the user who created a doctor can modify or delete it.
async function findOwned(req, res) {
  const doctor = await Doctor.findByPk(req.params.id);
  if (!doctor) {
    res.status(404).json({ message: 'Doctor not found' });
    return null;
  }

  if (doctor.createdBy !== req.user.id) {
    res.status(403).json({ message: 'Not allowed' });
    return null;
  }

  return doctor;
}

async function update(req, res) {
  const doctor = await findOwned(req, res);
  if (!doctor) return;
  await doctor.update(req.body);
  res.json(doctor);
}

async function remove(req, res) {
  const doctor = await findOwned(req, res);
  if (!doctor) return;
  await doctor.destroy();
  res.json({ message: 'Doctor deleted' });
}

module.exports = {
  create,
  list,
  get,
  update,
  remove,
}
