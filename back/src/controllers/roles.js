const {Role} = require ('../bd')


const roles = async(req,res)=>{

    try{
        let rolesBd= await Role.findAll({
            attributes:['id','role']
        });
        
        rolesBd ? res.status(200).json(rolesBd):
        res.status(404).send("Roles not found");
    }
    catch(e){
        console.log("Error in roles controllers: " +e);
    }
}


module.exports= roles;