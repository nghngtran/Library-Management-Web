'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.addColumn('RequestBooks','status',Sequelize.STRING),
    queryInterface.addColumn('RequestBooks','fee',Sequelize.INTEGER),
    queryInterface.addColumn('RequestBooks','comment',Sequelize.STRING)
  ])
  },  

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
