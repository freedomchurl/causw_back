module.exports = (sequelize, DataTypes) => {
    return sequelize.define('group', { 
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(45),
        allowNull: false,
      }
    }, {
        timestamps: false,
    });
  };