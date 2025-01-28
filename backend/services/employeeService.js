const employeeRepo = require('../repositories/employeeRepository');

const getEmployee = async (id) => {
    if (id <= 0) {
        throw new Error('Invalid employee ID');
    }
    try {
        const employee = await employeeRepo.findById(id);
        return employee;
    } catch (error) {
        throw new Error('Error retrieving employee data:'+ error.message);
    }
}