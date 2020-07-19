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
       },*/
       commentId:{
         type: DataTypes.INTEGER,
         allowNull: false,
       },
       content: {
         type: DataTypes.STRING(1000),
         allowNull: false,
         defaultValue : false,
     }, 
     page_info : {
       type: DataTypes.STRING,
       allowNull: false,
       defaultValue : false,
      },
      postingId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
     })
   };