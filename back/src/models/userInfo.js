const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const UserInfo= (sequelize)=>{
   sequelize.define('userInfo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
     },
     fullName: {
        type: DataTypes.STRING(50),
        allowNull: false,
     },
     address: {
        type: DataTypes.STRING,
     },
     apt_Suite_: {
        type: DataTypes.STRING,
        allowNull: true,
     },
     postalCode: {
        type:DataTypes.STRING,
        allowNull:false,
     },
     phone:{
         type:DataTypes.STRING(50),
         allowNull:false
     },
  

    

  });
};
module.exports= UserInfo;