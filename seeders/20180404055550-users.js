'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { updatedAt: new Date(), createdAt: new Date(), name: 'Aleksey Kuznetsov', photoUrl: 'https://ca.slack-edge.com/T054X90PD-U054AJDL4-ae3c8bbffc13-512', email: 'a.kuznetsov@mercurydevelopment.com' },
      { updatedAt: new Date(), createdAt: new Date(), name: 'Anton Uskov', photoUrl: 'https://ca.slack-edge.com/T054X90PD-U1H4T3MK6-f184f22b8429-512', email: 'uskov@mercurydevelopment.com' },
      { updatedAt: new Date(), createdAt: new Date(), name: 'Anton Demin', photoUrl: 'https://ca.slack-edge.com/T054X90PD-U1JAJ466P-2fd127b566de-512', email: 'anton.demin@mercurydevelopment.com' },
      { updatedAt: new Date(), createdAt: new Date(), name: 'Anton Barinov', photoUrl: 'https://ca.slack-edge.com/T054X90PD-U1H536NBU-5b40b90cfc42-512', email: 'barinov@mercurydevelopment.com' },
      { updatedAt: new Date(), createdAt: new Date(), name: 'Renat Berezovskiy', photoUrl: 'https://pp.userapi.com/c624628/v624628236/495a7/fNaOz7495HQ.jpg', email: 'renat.berezovskiy@mercurydevelopment.com' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
