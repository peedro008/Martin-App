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
     apt_Suite: {
        type: DataTypes.STRING,
        allowNull: true,
     },
     city: {
        type:DataTypes.STRING,
        allowNull:false,
     },
     postalCode: {
        type:DataTypes.STRING,
        allowNull:false,
     },
     phone:{
         type:DataTypes.STRING(),
         allowNull:false
     },
     default:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
     }

    

  });
};
module.exports= UserInfo;