const doctorRepo = require('../repositories/doctorRepository');

const getDoctors = async () => {
    return await doctorRepo.getAll();
}

module.exports = {
    getDoctors
}