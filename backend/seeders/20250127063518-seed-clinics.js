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
    await queryInterface.sequelize.query('ALTER TABLE clinics AUTO_INCREMENT = 1;');

   await queryInterface.bulkInsert('clinics', [{
    name: 'Poliklinik Anak',
    code: 'POL01',
   },{
    name: 'Poliklinik Obsgyn',
    code: 'POL02',
   },{
    name: 'Poliklinik Penyakit Dalam',
    code: 'POL03',
   },{
    name: 'Poliklinik Mata',
    code: 'POL04',
   },{
    name: 'Poliklinik Bedah',
    code: 'POL05',
   },{
    name: 'Poliklinik Gigi dan Mulut',
    code: 'POL06',
   },{
    name: 'Poliklinik Syaraf',
    code: 'POL07',
   },{
    name: 'Poliklinik THT',
    code: 'POL08',
   },{
    name: 'Poliklinik Rehabilitas Medik',
    code: 'POL09',
   },{
    name: 'Poliklinik Vaksin',
    code: 'POL10',
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('clinics', null, {});
  }
};
