module.exports = (sequelize, DataTypes, name) => {
    return sequelize.define(name, { 
      type: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      verNum: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      verName: {
        type: DataTypes.STRING(45),
        allowNull: false,
      }
    }, {
        timestamps: false,
    });
  };