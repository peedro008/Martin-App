const {User} = require("../src/bd")

var admin = function admin (){
    User.create({
        email: "admin",
        password: "$2a$12$X8.UX9uC8rAs/SJ39ysII.HUZU6wND3cuAX2DXWD0bU.koadOKrRy",
        name: "admin",
        role: "Admin"
    })
} 
module.exports= admin;