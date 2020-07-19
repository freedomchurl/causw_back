module.exports = (sequelize, DataTypes) => {
    return sequelize.define('locker', { 
      floor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        PrimaryKey:true,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        PrimaryKey:true,
      }, 
      agree: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : false,
    }
    }, {
        timestamps: false,
    });
  };