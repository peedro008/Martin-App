const {Product,Category} = require ('../bd')


const products=async(req,res)=>{
    try{
        const {id,name}=req.query


        if(id){
            let productBd= await Product.findOne({
                where: { id: id },
                include:{
                    model:Category,
                    attributes:["id","name"]
                   } 
            })
            productBd ? res.status(200).json(productBd):
            res.status(404).send("Product not found");
        }else{
            let productsBd= await Product.findAll({
                attributes:['name','id','description','img','price',"sale","salePercent"],
                 include:{
                 model:Category,
                 attributes:["id","name"]
                }
            
            });
            if(name){
                productsBd=productsBd.filter(el=> el.name.toLowerCase().includes(name.toLowerCase()))
            }
           productsBd ? res.status(200).json(productsBd):
           res.status(404).send("Products not found");

        }
    }
    catch(e){
        console.log("Error in products controller: " + e)
    }

};


const productsCat=async(req,res)=>{
    let categor = req.query
    try{
        let productsBd= await Product.findAll({
            attributes:['name','id','description','img','price', "sale","salePercent"],
            include:{
             model:Category,
             attributes:["id","name", "description"]
            } })
       let pes = await productsBd.filter(e=>e.categories[0].id == categor.id)
         
        //console.log(productfilter[0].categories)
        pes ? res.status(200).json(pes):
       res.status(404).send("Products not found");
    }
    catch(e){
        console.log("Error in products controller"+ e)
    }

};
const productsSale=async(req,res)=>{
    try{
        let productsBd= await Product.findAll({
            attributes:['name','id','description','img','price', "sale","salePercent"],
            include:{
             model:Category,
             attributes:["id","name", "description"]
            } })
       let sales = await productsBd.filter(e=>e.sale == true)
         
        //console.log(productfilter[0].categories)
        sales ? res.status(200).json(sales):
       res.status(404).send("sales not found");
    }
    catch(e){
        console.log("Error in products controller"+ e)
    }

};
const updateProduct=async(req,res)=>{
      
    try{
        let id = req.body.id
        // let idCat = req.body.idCat
        let price = req.body.price
        let description = req.body.description
        let name = req.body.name
        let sale = req.body.sale
        let salePercent = req.body.salePercent
        console.log(id)
        console.log(price)
        let orderBd=await Product.update(
            {price:price,
             description:description,
             name:name,
             sale:sale,
             salePercent:salePercent
            },
            {where:{id:id}},
            
        )
        // orderBd.setCategory([idCat])
        
     orderBd?res.status(200).send("Success"):
     res.status(404).send("product not found");
    }
    catch(e){
     console.log("Error in products controller"+ e)
 }
}



const putProductSale=async(req,res)=>{
      
    try{
        let sale = req.body.sale
        let salePercent = req.body.salePercent
        let id = req.body.id
       if(sale==true){
        var orderBd=await Product.update(
            
            {sale:false,
            salePercent:salePercent
            },
            {where:{id:id}},
            
        )}
        else{
            {
                var orderBd=await Product.update(
                    
                    {sale:true,
                    sale:salePercent},
                    {where:{id:id}},
                    
                )}

        }
        
     orderBd?res.status(200).send("Success"):
     res.status(404).send("product not found");
    }
    catch(e){
     console.log("Error in products controller"+ e)
 }

}



module.exports={
    products,
    productsCat,
    productsSale,
    updateProduct,
    putProductSale
    
    
}
