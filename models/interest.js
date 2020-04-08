
// Creating our Interest model
module.exports = function(sequelize, DataTypes) {
  var Interest = sequelize.define("Interest", {
     Interest: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

Interest.associate = function(models) {
  Interest.belongsToMany(models.User, {
    through: 'UserInterest'
  });

};

return Interest;

};
