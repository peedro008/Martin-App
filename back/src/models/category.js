const { DataTypes } = require('sequelize');

const Category= (sequelize)=>{
    sequelize.define('category', {
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
     }

  });
};
module.exports= Category;