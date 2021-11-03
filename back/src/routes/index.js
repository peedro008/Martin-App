const { Router } = require('express');
const {products, productsCat, productsSale, updateProduct,postProduct} = require('../controllers/products.js')
const categories = require('../controllers/categories.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const{signup, login, isAuth, signupadmin, infoGet, userGet, infoPost,updateInfo}=require ('../controllers/user.js');
const { getOrders, postOrderItems, getUserOrders, getPendingOrders,getOrderId, setDispatchedStatus, setPendingStatus, setReceivedStatus } = require('../controllers/orders.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//USER

router.post('/login', login);

router.post('/signupadmin', signupadmin);

router.post('/signup', signup);

router.get('/private', isAuth);

router.get('/user', userGet);

router.get('/userinfo', infoGet);

router.post('/userinfo', infoPost);

router.put('/userinfo', updateInfo);

//PRODUCT

router.get('/products',products)

router.get('/productsCat', productsCat)

router.get('/productsSale', productsSale)

router.get('/categories',categories)

router.put("/updateProduct", updateProduct)

router.post("/createProduct", postProduct)

//ORDER:

router.get("/orders", getOrders)

router.get("/orderuser", getUserOrders)

router.get("/orderpending", getPendingOrders)

router.post("/orderItems", postOrderItems)

router.put("/setReceivedStatus", setReceivedStatus)

router.put("/setPendingStatus", setPendingStatus)

router.put("/setDispatchedStatus", setDispatchedStatus)

router.get("/orderid", getOrderId)







 
module.exports = router;
