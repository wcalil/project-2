module.exports = function (sequelize, DataTypes) {
    var Hangout = sequelize.define("Hangout", {
        HangoutInput: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },

        HangoutComment: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },

        City: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },

        Date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

    });

    Hangout.associate = function (models) {

        Hangout.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Hangout;

};