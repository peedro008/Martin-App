const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const User= (sequelize)=>{
   sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
     },
     email: {
        type: DataTypes.STRING,
        allowNull: false,
     },
     name: {
        type: DataTypes.STRING,
     },
     lastName: {
        type: DataTypes.STRING,
     },
     password: {
        type: DataTypes.STRING,
        allowNull: false,
     },
     role: {
        type: DataTypes.ENUM("Client","Admin"),
        defaultValue: "Client"
     }
    

  });
};
module.exports= User;