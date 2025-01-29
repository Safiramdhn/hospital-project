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
const clinicRoutes = require('./routes/clinicRoute');
const doctorRoutes = require('./routes/doctorRoute');
const tariffReferenceRoutes = require('./routes/tariffReferenceRoute');
const employeeRoutes = require('./routes/employeeRoute');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Swagger documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/outpatient-register', outpatientRegistrationRoutes);
app.use('/api/clinic', clinicRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/tariff-reference', tariffReferenceRoutes);
app.use('/api/employee', employeeRoutes);

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Unable to connect to database:', error));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
