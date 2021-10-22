
const {Order, OrderItems} = require("../bd") 

const postOrderItems=async(req,res)=>{
    let order = req.body[0]
    let user = req.body[1]
    console.log( user)
     let count =0
     for(let i=0; i<order.length; i++){
         count+=order[i].total
     }
         
    try{
        await Order.create({
            total:count,
            email: user[0],
        })
        .then(Order => order.map(e=>{
            try{
                OrderItems.create({
                    productId: e.id,
                    quantity:e.quantity,
                    price: e.price,
                    total: e.total,
                    name: e.name,
                    orderId: Order.id
                })
                
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
const getUserOrders=async(req,res)=>{
    let email= req.query.email
   
    try{
        
        let orderBd=await Order.findAll({
            where:{email:email},
            attributes:['email','id','status','total'],
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
            attributes:['email','id','status','total'],
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

const updateOrderStatus=async(req,res)=>{
      
    try{
        let id = req.body.id
        console.log(id)
        let orderBd=await Order.update(
            {status:"received"},
            {where:{id:id}},
            
        )
        
     orderBd?res.status(200).send("Seccess"):
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
    updateOrderStatus,
    getPendingOrders
}
