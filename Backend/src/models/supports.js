'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Supports.init({
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Image: DataTypes.BLOB("long"),
    Tel: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Supports',
  });
  return Supports;
};