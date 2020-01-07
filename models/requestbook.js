'use strict';
module.exports = (sequelize, DataTypes) => {
  const RequestBook = sequelize.define('RequestBook', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey :true
    },
    userId : DataTypes.INTEGER,
    borrowedDate : DataTypes.DATE,
    returnedDate: DataTypes.DATE,
    status : DataTypes.STRING,
    fee : DataTypes.INTEGER,
    comment : DataTypes.STRING,
    username : DataTypes.STRING,
    borrowingDate : DataTypes.STRING,
    returningDate : DataTypes.STRING,
    bookLend : DataTypes.INTEGER,
    bookID :
    {
      type : DataTypes.INTEGER,
      refrences : {model : 'Books',key : 'id'}
    }
  }, {});
  RequestBook.associate = function(models) {
    //RequestBook.belongsTo(models.User,{foreignKey:'userId'});
    RequestBook.belongsTo(models.Book)
    // associations can be defined here
  };
  return RequestBook;
};