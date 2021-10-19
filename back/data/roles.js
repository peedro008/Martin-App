const {Role} = require('../src/bd')


function roles(){
    var owner =  Role.create({
        role: "Owner",
      });
    var admin =  Role.create({
        role: "Admin",
      });
    var client =  Role.create({
        role: "Client",
      });
}

module.exports= roles;