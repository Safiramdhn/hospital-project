const {Doctor} = require('../models/users');

const getAll = async () => {
    try {
        const doctors = await Doctor.findAll();
        return doctors;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll
}