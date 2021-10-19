const { DataTypes } = require('sequelize');


const Product= (sequelize)=>{
    sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
     },
     name: {
        type: DataTypes.STRING,
        allowNull: false,
     },
     description: {
        type: DataTypes.TEXT,
     },
     img: {
        type: DataTypes.TEXT,
        allowNull: false,
     },
     price:{
         type:DataTypes.FLOAT,
         allowNull:false
     },
     sale: {
        type:DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
     },
     salePercent:{
        type:DataTypes.INTEGER,
        defaultValue: 0
     }

  });
};
module.exports= Product;
