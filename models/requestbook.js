'use strict';
module.exports = (sequelize, DataTypes) => {
  const RequestBook = sequelize.define('RequestBook', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey :true
    },
    userId : DataTypes.INTEGER,
    bookLend : DataTypes.ARRAY(DataTypes.INTEGER),
    borrrowedDate : DataTypes.DATE,
    returnedDate: DataTypes.DATE,
    status : DataTypes.STRING,
    fee : DataTypes.INTEGER,
    comment : DataTypes.STRING
  }, {});
  RequestBook.associate = function(models) {
    RequestBook.belongsTo(models.User,{foreignKey:'userId'});
    //RequestBook.hasMany(models.Book);
    // associations can be defined here
  };
  return RequestBook;
};