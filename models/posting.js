module.exports = (sequelize, DataTypes, name) => {
    return sequelize.define(name, { 
      id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true,
      },/*
      userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue : false,
        references : 'users',
        referenceKey: 'id',
      },
      groupId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue : false,
        references : 'groups',
        referenceKey:'id',
      },*/
      title: {
        type: DataTypes.STRING(500),
        allowNull: false,
        defaultValue : false,
    },
     content: {
        type: DataTypes.STRING(10000),
        allowNull: false,
        defaultValue : false,
    },
     viewCount : {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue : 0,
     },
     
     file : {
      type: DataTypes.JSON,
      defaultValue : null,
     },
     page_info : {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue : false,
     },
     commentCount : {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue : 0,
     },
    })
  };