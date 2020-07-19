module.exports = (sequelize, DataTypes) => {
    return sequelize.define('lockertime', { 
      time : {
          type : DataTypes.DATE,
          allowNull : false,
          defaultValue: DataTypes.NOW,
      }
    }, {
        timestamps: true,
    });
  };
