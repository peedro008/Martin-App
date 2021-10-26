const { DataTypes } = require('sequelize');

const Order= (sequelize)=>{
    sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
     },
     email:{
         type:DataTypes.TEXT,
         
     },
     status:{
         type: DataTypes.ENUM("Pending", "Received", "Dispatched"),
         defaultValue: "Pending",
         allowNull: false
     },
     total:{
         type: DataTypes.FLOAT,
         allowNull: false
     },
    

  });
};
module.exports= Order;