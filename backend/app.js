require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoute");
const patientRoutes = require("./routes/patientRoute");
const outpatientRegistrationRoutes = require("./routes/outpatientRegisterRoute");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use('/api/patient', patientRoutes)
app.use('/api/outpatient-register', outpatientRegistrationRoutes)

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Unable to connect to database:", err));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
