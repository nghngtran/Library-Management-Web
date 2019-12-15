'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey :true
    },
    imglink:DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    //Image.hasOne(models.Book);
  };
  return Image;
};