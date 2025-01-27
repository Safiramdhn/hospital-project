'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.sequelize.query('ALTER TABLE tariff_references AUTO_INCREMENT = 1;');

    await queryInterface.bulkInsert('tariff_references', [{
      tariff_code: 'RH',
      category: 'Rawat Jalan',
      description: 'Rawat Jalan',
      base_registration_fee: 25000.00,
      base_examination_fee: 125000.0,
    },{
      tariff_code: 'RHU',
      category: 'Rawat Jalan',
      description: 'Rawat Jalan Umum',
      base_registration_fee: 25000.00,
      base_examination_fee: 150000.0,
    },{
      tariff_code: 'RHBPJS',
      category: 'Rawat Jalan',
      description: 'Rawat Jalan BPJS',
      base_registration_fee: 0.00,
      base_examination_fee: 0.0,
    },{
      tariff_code: 'RHA',
      category: 'Rawat Jalan',
      description: 'Rawat Jalan & Pemeriksaan Anak',
      base_registration_fee: 25000.00,
      base_examination_fee: 126000.0,
    },{
      tariff_code: 'RHO',
      category: 'Rawat Jalan',
      description: 'Rawat Jalan Obsgyn',
      base_registration_fee: 25000.00,
      base_examination_fee: 150000.0,
    },{
      tariff_code: 'RHM',
      category: 'Rawat Jalan',
      description: 'Rawat Jalan & Periksa Mata',
      base_registration_fee: 25000.00,
      base_examination_fee: 145000.00,
    },{
      tariff_code: 'RHB',
      category: 'Rawat Jalan',
      description: 'Rawat Jalan & Konsulasi Bedah',
      base_registration_fee: 25000.00,
      base_examination_fee: 200000.00,
    },{
      tariff_code: 'RHG',
      category: 'Rawat Jalan',
      description: 'Rawat Jalan & Periksa Gigi',
      base_registration_fee: 25000.00,
      base_examination_fee: 150000.0,
    },{
      tariff_code: 'RHS',
      category: 'Rawat Jalan',
      description: 'Rawat Jalan & Periksa Syaraf',
      base_registration_fee: 25000.00,
      base_examination_fee: 230000.00,
    },{
      tariff_code: 'RHRM',
      category: 'Rawat Jalan',
      description: 'Rawat Jalan Rehabilitas Medis',
      base_registration_fee: 25000.00,
      base_examination_fee: 150000.00,
    },{
      tariff_code: 'RHV',
      category: 'Rawat Jalan',
      description: 'Vaksinasi',
      base_registration_fee: 25000.00,
      base_examination_fee: 75000.00,
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('tariff_references', null, {});
  }
};
