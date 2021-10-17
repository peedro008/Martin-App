const {Category} = require ('../bd.js')

const categories=async(req,res)=>{
    try{
        let categoriesBd= await Category.findAll({
            
            attributes:['name','id','description'],
    
        });
        categoriesBd ? res.status(200).json(categoriesBd):
       res.status(404).send("Categories not found");
    }
    catch(e){
        console.log("Error in categories controller "+ e)
    }

};

module.exports= categories;