module.exports = (sequelize, DataTypes) => {
    return sequelize.define('usergroup', { 
      agree: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : false,
    },
    /*
    who :{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue : null,
    },
    how :
    {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue : null,
    },
    ps :
    {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue : null,

    }*/
    })
  };