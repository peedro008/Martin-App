
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize( "postgres", "postgres", "pesanmene",  {
  host: "martinappproduce.cnudap9ls8sm.us-east-2.rds.amazonaws.com",
  dialect:'postgres',
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });
 // Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User,Product,Category,Order, OrderItems, Role, UserInfo} = sequelize.models;

Category.hasMany(Product);
Product.belongsTo(Category);

User.belongsToMany(Role,{ through: 'user_role' });
Role.belongsToMany(User,{ through: 'user_role' });

User.hasMany(Order);
Order.belongsTo(User);

UserInfo.hasMany(Order);
Order.belongsTo(UserInfo)

User.hasOne(UserInfo);
UserInfo.belongsTo(User)

Order.hasMany(OrderItems);
OrderItems.belongsTo(Order);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   sequelize,    // para importart la conexión { conn } = require('./db.js');
};