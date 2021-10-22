const { DataTypes } = require('sequelize');

const OrderItems= (sequelize)=>{
    sequelize.define('orderItems', {
    productId:{
         type:DataTypes.FLOAT,
           },
     quantity:{
         type: DataTypes.FLOAT,
         defaultValue: 1,
         allowNull: false
     },
     price:{
         type:DataTypes.FLOAT
     },
     total:{
         type:DataTypes.FLOAT
     },
     name:{
         type:DataTypes.TEXT
     },
     
     orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'orderId',
    },
    img:{
        type: DataTypes.STRING,
        allowNull: false   
    }


  });
};
module.exports= OrderItems;