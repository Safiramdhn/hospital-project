const User = require('../models/users/index');

const findByEmail = async (email) => {
    try {
        const employee = await User.Employee.findOne({ where: { email } });

        if (!employee) {
            throw new Error(`Employee with email ${email} not found.`);
        }
        return employee;
    } catch (error) {
        throw new Error(`Error finding employee by email: ${error.message}`);
    }
}

module.exports = {
    findByEmail,
};