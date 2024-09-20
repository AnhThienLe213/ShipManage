'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Attractions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }



    Attractions.init({
        AttractionName: DataTypes.STRING,
        AttractionImg: DataTypes.BLOB("long"),
        Description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Attractions',
    });
    return Attractions;
};