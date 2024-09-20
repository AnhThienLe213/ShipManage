'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BookCruises extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            BookCruises.belongsTo(models.Users, { foreignKey: 'UserID' });
            BookCruises.belongsTo(models.Cruises, { foreignKey: 'CruiseID' });
        }
    }



    BookCruises.init({

        UserID: DataTypes.INTEGER,
        CruiseID: DataTypes.INTEGER,
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
        modelName: 'BookCruises',
    });
    return BookCruises;
};