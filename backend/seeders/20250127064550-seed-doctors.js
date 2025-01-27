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
    await queryInterface.sequelize.query('ALTER TABLE doctors AUTO_INCREMENT = 1;');
   
   await queryInterface.bulkInsert('doctors', [{
    name:'dr. Dessy Rusmawatiningtyas, M.Sc, Sp.A',
    code: 'DR00000001',
    clinic_id: 1,
   },{
    name:'dr. Kristia Hermawan, M.Sc, Sp.A',
    code: 'DR00000002',
    clinic_id: 1,
   },{
    name:'dr. Nur Muhammad Artha, M.Sc, M.Kes, Sp.A',
    code: 'DR00000003',
    clinic_id: 1,
   },{
    name:'dr. Rina Fatmawati, Sp.OG',
    code: 'DR00000004',
    clinic_id: 2,
   },{
    name:'dr. Nizar Hero Kartika, M.Kes, Sp.OG',
    code: 'DR00000005',
    clinic_id: 2,
   },{
    name:'dr. Edi Patmini Setya Siswanti, Sp.OG',
    code: 'DR00000006',
    clinic_id: 2,
   },{
    name:'dr. Isti Haryani M.Sc, Sp.PD-FINASIM',
    code: 'DR00000007',
    clinic_id: 3,
   },{
    name:'dr. Dessy Nurwahyuningtyas, Sp.PD',
    code: 'DR00000008',
    clinic_id: 3,
   },{
    name:'dr. Catur Sari Widyaningrum, Sp.PD',
    code: 'DR00000009',
    clinic_id: 3,
   },{
    name:'dr. Amanda Nur Shinta Pertiwi, Sp.M',
    code: 'DR00000010',
    clinic_id: 4,
   },{
    name:'dr. Jantje Jefrie Arikalang, Sp.B',
    code: 'DR00000011',
    clinic_id: 5,
   },{
    name:'dr. Agustina Widiastuti, Sp.B',
    code: 'DR00000012',
    clinic_id: 5,
   },{
    name:'drg. Nanny Herminingsih, Sp.BM',
    code: 'DR00000013',
    clinic_id: 6,
   },{
    name:'drg. Yuliani Purwantika, Sp. KGA',
    code: 'DR00000014',
    clinic_id: 6,
   },{
    name:'dr. Retno Sulistyowati, Sp.N',
    code: 'DR00000015',
    clinic_id: 7,
   },{
    name:'dr. Windarti Isminarsih, Sp.THT-KL',
    code: 'DR00000016',
    clinic_id: 8,
   },{
    name:'dr. Asriningrum, Sp.KFR',
    code: 'DR00000017',
    clinic_id: 9,
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('doctors', null, {});
  }
};
