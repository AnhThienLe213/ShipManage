'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tours extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Tours.init({
        TourName: DataTypes.STRING,
        TourImg: DataTypes.BLOB("long"),
        Duration: DataTypes.STRING,
        Transportation: DataTypes.STRING,
        DepartureLocation: DataTypes.STRING,
        Price: DataTypes.DECIMAL,
        Description: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Tours',
    });
    return Tours;
};