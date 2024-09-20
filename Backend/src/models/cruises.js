'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cruises extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Cruises.init({

        CruiseName: DataTypes.STRING,
        CruiseImg: DataTypes.BLOB("long"),
        Duration: DataTypes.STRING,
        Price: DataTypes.DECIMAL,
        Description: DataTypes.TEXT,

    }, {
        sequelize,
        modelName: 'Cruises',
    });
    return Cruises;
};