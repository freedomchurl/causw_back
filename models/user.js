module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', { 
      login_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      auth: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue : 0
      },
      year: {
        type: DataTypes.INTEGER,
      }
    }, {
        timestamps: false,
    });
  };