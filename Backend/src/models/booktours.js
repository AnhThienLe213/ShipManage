'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BookTours extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            BookTours.belongsTo(models.Users, { foreignKey: 'UserID' });
            BookTours.belongsTo(models.Tours, { foreignKey: 'TourID' });
        }
    }



    BookTours.init({

        UserID: DataTypes.INTEGER,
        TourID: DataTypes.INTEGER,
        BookingDate: DataTypes.DATE,
        ConfirmationCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        IsConfirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'BookTours',
    });
    return BookTours;
};