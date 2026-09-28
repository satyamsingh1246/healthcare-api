# Healthcare API

A REST API for managing users, patients, doctors, and patient-doctor mappings.

## Tech Stack

- Node.js and Express 5
- PostgreSQL with Sequelize
- JWT authentication
- `bcryptjs` for password hashing
- `express-validator` for request validation

## Requirements

- Node.js 18 or newer
- PostgreSQL

## Setup

1. Create a PostgreSQL database named `healthcare` or use another database name.
2. Create a `.env` file in the project root with the following values:

```env
PORT=5000
DB_NAME=healthcare
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=1d
```

3. Install the dependencies:

```bash
npm install
```

4. Start the API:

```bash
npm run dev
```

For a normal start, use `npm start`.

Sequelize creates the tables automatically when the server starts.

## Authentication

Register or log in to receive a JWT token. Send the token with protected requests:

```http
Authorization: Bearer <token>
```

The patient and doctor routes, along with mapping routes, require authentication.

## API Endpoints

### Auth

| Method | Endpoint | Auth |
| --- | --- | --- |
| `POST` | `/api/auth/register/` | No |
| `POST` | `/api/auth/login/` | No |

### Patients

| Method | Endpoint | Auth |
| --- | --- | --- |
| `POST` | `/api/patients/` | Yes |
| `GET` | `/api/patients/` | Yes |
| `GET` | `/api/patients/:id/` | Yes |
| `PUT` | `/api/patients/:id/` | Yes |
| `DELETE` | `/api/patients/:id/` | Yes |

### Doctors

| Method | Endpoint | Auth |
| --- | --- | --- |
| `POST` | `/api/doctors/` | Yes |
| `GET` | `/api/doctors/` | Yes |
| `GET` | `/api/doctors/:id/` | Yes |
| `PUT` | `/api/doctors/:id/` | Yes |
| `DELETE` | `/api/doctors/:id/` | Yes |

### Mappings

| Method | Endpoint | Auth |
| --- | --- | --- |
| `POST` | `/api/mappings/` | Yes |
| `GET` | `/api/mappings/` | Yes |
| `GET` | `/api/mappings/:patient_id/` | Yes |
| `DELETE` | `/api/mappings/:id/` | Yes |

## Request Examples

Register a user:

```json
{
	"name": "Ravi",
	"email": "ravi@test.com",
	"password": "secret123"
}
```

Create a patient:

```json
{
	"name": "Amit",
	"age": 30,
	"gender": "male",
	"address": "Prayagraj",
	"medicalHistory": "None"
}
```

Create a doctor:

```json
{
	"name": "Dr. Sharma",
	"specialization": "Cardiology",
	"email": "sharma@hosp.com",
	"phone": "9999999999"
}
```

Create a patient-doctor mapping:

```json
{
	"patient_id": 1,
	"doctor_id": 1
}
```

## Project Structure

```text
src/
	app.js
	server.js
	config/
		db.js
	controllers/
		*.controller.js
	middleware/
		*.middleware.js
	models/
		*.model.js
		index.js
	routes/
		*.route.js
```
