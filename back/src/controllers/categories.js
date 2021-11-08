const {Category} = require ('../bd')

const categories=async(req,res)=>{
    try{
        let categoriesBd= await Category.findAll({
            
            attributes:['name','id','description', 'img'],
    
        });
        categoriesBd ? res.status(200).json(categoriesBd):
       res.status(404).send("Categories not found");
    }
    catch(e){
        console.log("Error in categories controller "+ e)
    }

};
const category=async(req,res)=>{
    let id= req.query.id
    try{
        let categoriesBd= await Category.findOne({
            
            attributes:['name','id','description', 'img'],
            where:{id:id}
    
        });
        categoriesBd ? res.status(200).json(categoriesBd):
       res.status(404).send("Category not found");
    }
    catch(e){
        console.log("Error in category controller "+ e)
    }

};

module.exports={ 
    categories,
    category
};