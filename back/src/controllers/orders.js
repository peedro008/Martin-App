const {Order, OrderItems, UserInfo} = require("../bd") 

const postOrderItems=async(req,res)=>{
    let order = req.body[0]
    let user = req.body[1]
    let fullName = req.body[2].fullName
    let address = req.body[2].address
    let apt_Suite_ = req.body[2].apt_Suite_
    let postalCode = req.body[2].postalCode
    let phone = req.body[2].phone
    let city = req.body[2].city

    console.log( user)
     let count =0
     for(let i=0; i<order.length; i++){
         count+=order[i].total
     }
         
    try{
        await UserInfo.create({
            
            city:city,
            fullName: fullName,
            address:address,
            apt_Suite_: apt_Suite_,
            postalCode: postalCode,
            phone: phone,
             
        })
        
        
        
        
        
        
        .then(UserInfo =>
            Order.create({
            total:count,
            email: user[0] ,
            userInfoId: UserInfo.id 
        }))
        
        
        .then(Order => order.map(e=>{
            try{
                OrderItems.create({
                    productId: e.id,
                    quantity:e.quantity,
                    price: e.price,
                    total: e.total,
                    name: e.name,
                    orderId: Order.id,
                    img: e.img
                })
                
                res.status(200).send("Order Added")   
            }
        
            catch(e){
                console.log("Error in Order items controller "+ e)
            }
         count +=e.total
         console.log(count)
        })

        )
        
    }
    catch(e){
        console.log("Error in Order controller "+ e)
    }
     
   
}
const getOrders=async(req,res)=>{
   try{
       let orderBd=await Order.findAll({
        attributes:['email','id','status','total', "createdAt"],
        include:[{
            model:OrderItems},
            {model:UserInfo
          
            
           }]
       })
    orderBd?res.status(200).json(orderBd):
    res.status(404).send("order not found");
   }
   catch(e){
    console.log("Error in products controller"+ e)
}
}
const getUserOrders=async(req,res)=>{
    let email= req.query.email
   
    try{
        
        let orderBd=await Order.findAll({
            where:{email:email},
          
            include:{
                model:OrderItems,
                
               }
        })
     orderBd?res.status(200).json(orderBd):
     res.status(404).send("order not found");
    }
    catch(e){
     console.log("Error in products controller"+ e)
 }
 

}
const getUserOrdersPending=async(req,res)=>{
    let email= req.query.email
   
    try{
        
        let orderBd=await Order.findAll({
            where:{email:email,
            status:"Pending"
            },
          
            include:{
                model:OrderItems,
                
               }
        })
     orderBd?res.status(200).json(orderBd):
     res.status(404).send("order not found");
    }
    catch(e){
     console.log("Error in products controller"+ e)
 }
 

}


const getPendingOrders=async(req,res)=>{
   
   
    try{
        
        let orderBd=await Order.findAll({
            where:{status:"Pending"},
            attributes:['email','id','status','total',"createdAt"],
            include:{
                model:OrderItems,
                
               }
        })
     orderBd?res.status(200).json(orderBd):
     res.status(404).send("order not found");
    }
    catch(e){
     console.log("Error in products controller"+ e)
 }
 

}

const setReceivedStatus=async(req,res)=>{
      
    try{
        let id = req.body.id
        console.log(id)
        let orderBd=await Order.update(
            {status:"Received"},
            {where:{id:id}},
            
        )
        
     orderBd?res.status(200).send("Seccess"):
     res.status(404).send("order not found");
    }
    catch(e){
     console.log("Error in products controller"+ e)
 }
 

}
const setPendingStatus=async(req,res)=>{
      
    try{
        let id = req.body.id
        console.log(id)
        let orderBd=await Order.update(
            {status:"Pending"},
            {where:{id:id}},
            
        )
        
     orderBd?res.status(200).send("Seccess"):
     res.status(404).send("order not found");
    }
    catch(e){
     console.log("Error in products controller"+ e)
 }
 

}
const setDispatchedStatus=async(req,res)=>{
      
    try{
        let id = req.body.id
        console.log(id)
        let orderBd=await Order.update(
            {status:"Dispatched"},
            {where:{id:id}},
            
        )
        
     orderBd?res.status(200).send("Seccess"):
     res.status(404).send("order not found");
    }
    catch(e){
     console.log("Error in products controller"+ e)
 }
 

}
const getOrderId=async(req,res)=>{
    try{
        let id = req.query.id
        let orderBd=await Order.findAll({
            where:{
                id:id
            },
         attributes:['email','id','status','total', "createdAt"],
         include:[{
            model:OrderItems},
            {model:UserInfo
          
            
           }]
        })
     orderBd?res.status(200).json(orderBd):
     res.status(404).send("order not found");
    }
    catch(e){
     console.log("Error in products controller"+ e)
 }
 }
 


module.exports={
    postOrderItems,
    getOrders,
    getUserOrders,
    setPendingStatus,
    setDispatchedStatus,
    setReceivedStatus,
    getPendingOrders,
    getOrderId,
    getUserOrdersPending
}
