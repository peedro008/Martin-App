const server = require('./src/app.js');
const { sequelize } = require('./src/bd')
const categories = require('./data/categories.js')
const products = require('./data/products.js')
const roles = require('./data/roles.js')
const admin =require("./data/admin")


// Syncing all the models at once.
sequelize.sync({ force: true }).then(() => {
  server.listen(5000,"192.168.0.12", async()=>{
    
    //aca cargo los productos y categorias a la base de datos
    try{
      Promise.all([categories(),products(),roles(),admin()])
      .then(res=> console.log("Datos cargados"))
     
      console.log('%s listening at 5000'); // eslint-disable-line no-console
    }
    catch(e){
      console.log("Error in sequelize.sinc, index.js: " + e)
    }
  });
});

