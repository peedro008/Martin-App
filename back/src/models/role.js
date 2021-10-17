const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Role= (sequelize)=>{
   sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
     },
     
     role: {
        type: DataTypes.STRING,
        defaultValue: "client"
     },

  });
};
module.exports= Role;