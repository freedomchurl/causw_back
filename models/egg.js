module.exports = (sequelize, DataTypes) => {
    return sequelize.define('egg', { 
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        PrimaryKey:true,
      },
    }, {
        timestamps: false,
    });
  };