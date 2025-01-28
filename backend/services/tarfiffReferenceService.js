const tariffReferenceRepo = require('../repositories/tariffReferenceRepository');

const getTariffReferences = async () => {
    return await tariffReferenceRepo.getAll();
}

module.exports = {
    getTariffReferences
}