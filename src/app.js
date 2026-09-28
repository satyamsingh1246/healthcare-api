require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/patients', require('./routes/patients.route'));
app.use('/api/doctors', require('./routes/doctors.route'));
app.use('/api/mappings', require('./routes/mappings.route'));

app.use(function notFound(req, res) {
	return res.status(404).json({ message: 'Route not found' });
});
app.use(require('./middleware/error.middleware'));

module.exports = app;
