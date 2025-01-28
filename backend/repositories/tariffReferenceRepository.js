const {TariffReference} = require('../models/outpatientRegistration');

const getAll = async () => {
    try {
        const tariffs = await TariffReference.findAll();
        if (!tariffs.length) {
            console.log('No tariffs found');
            return [];
        }
        return tariffs
    } catch (error) {
        throw new Error(`Could not retrieve tariffs ${error.message}`);
    }
}

module.exports = {
    getAll,
}