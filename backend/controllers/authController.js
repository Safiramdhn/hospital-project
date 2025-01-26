const Employee = require('../models/employeeModel');
const helpers = require('../helpers/token');
const bycrypt = require('bcrypt');


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const employee = await Employee.findOne({ where: { email } });
        
        if (!employee) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bycrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password, please try again' });
        }

        const token = helpers.GenerateToken(employee.id, employee.email);
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

module.exports = { login };