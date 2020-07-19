module.exports = (sequelize, DataTypes, name) => {
  return sequelize.define(name, {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: false,
    },
    content: {
      type: DataTypes.STRING(10000),
      allowNull: false,
      defaultValue: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  });
};