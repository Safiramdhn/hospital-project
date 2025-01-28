const User = require('../models/users/index');

const findByID = async (id) => {
    try {
        const employee = await User.Employee.findByPk(id);
        return employee;
    } catch (error) {
        throw new Error(`Error finding employee by id: ${error.message}`);
    }
}

module.exports = {
    findByID,
};