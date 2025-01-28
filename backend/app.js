require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const authRoutes = require('./routes/authRoute');
const patientRoutes = require('./routes/patientRoute');
const outpatientRegistrationRoutes = require('./routes/outpatientRegisterRoute');
const employeeRoutes = require('./routes/employeeRoute');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Swagger documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/outpatient-register', outpatientRegistrationRoutes);
app.use('/api/employee', employeeRoutes);

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Unable to connect to database:', err));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
