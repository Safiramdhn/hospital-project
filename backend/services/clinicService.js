const clinicRepo = require('../repositories/clinicRepository');

const getClinics = async () => {
    return await clinicRepo.getAll();
}

module.exports = {
    getClinics
}