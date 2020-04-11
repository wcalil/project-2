module.exports = function (sequelize, DataTypes) {
    var Hangout = sequelize.define("Hangout", {
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

    // Hangout.associate = function (models) {
      
    // };

    Hangout.associate = function (models) {
        Hangout.belongsTo(models.Interest, {
            foreignKey: {
                allowNull: false
            }
        });
        Hangout.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Hangout;

};