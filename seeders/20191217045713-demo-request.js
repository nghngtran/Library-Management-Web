'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [{
      "id": "1",
      "userid": "1753027",
      "bookLend": [1],
      "borrowedDate": "7/10/2019",
      "returnedDate": "11/12/2019",
      "fee": "0",
      "comment": "Returned Date: 12/12/2019",
      "status": "Borrowing"

    },
    {
      "id": "2",
      "userid": "2537027",
      "bookLend": [2],
      "borrowedDate": "12/11/2019",
      "returnedDate": "10/12/2019",
      "status": "Expired",
      "fee": "15000",
      "comment": "Returned Date: 8/12/2019"
    },

    ]
    data.map(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
      return item;
    });
    return queryInterface.bulkInsert('RequestBooks', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

