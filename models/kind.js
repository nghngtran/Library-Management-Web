'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kind = sequelize.define('Kind', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey :true
    },
    kind:DataTypes.STRING
  }, {});
  Kind.associate = function(models) {
    Kind.hasMany(models.Book);
    // associations can be defined here
  };
  return Kind;
};