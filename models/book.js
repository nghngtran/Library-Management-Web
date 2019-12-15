'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey :true
    },
    title:DataTypes.STRING,
    description:DataTypes.STRING,
    kindid:DataTypes.INTEGER,
    author:DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    available:DataTypes.INTEGER,
    ratings:DataTypes.FLOAT,
    imgID : DataTypes.STRING
  }, {});
  Book.associate = function(models) {
    Book.belongsTo(models.RequestBook);
    Book.hasOne(models.Image);
    Book.belongsTo(models.Kind);
    // associations can be defined here
  };
  return Book;
};