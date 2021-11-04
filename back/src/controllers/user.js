
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const{User,Role, UserInfo}= require('../bd')

const signupadmin =async (req, res, next) => {
    // checks if email already exists
    User.findOne({ where : {
        email: req.body.email, 
    }})
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message: "email already exists"});
        } else if (req.body.email && req.body.password) {
            // password hash
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                     User.create(({
                        email: req.body.email,
                        name: req.body.name,
                        lastName:req.body.lastName,
                        password: passwordHash,
                        role: req.body.role
                        
                    }))
                    .then(() => {
                        res.status(200).json({message: "user created"});
                    })
                    .catch(err => {
                        console.log("Error in signup controllers: " + err);
                        res.status(502).json({message: "error while creating the user"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const userGet = async (req, res) => {
    try{
        let id=req.query.id
        let info=await User.findOne({
         where:{
             id:id
         },
         attributes:['id','name','lastName'],
         
        })
     info?res.status(200).json(info):
     res.status(404).send("not found");
    }
    catch(e){
     console.log("Error in userGet controller"+ e)
 }
}

const signup =async (req, res, next) => {
    // checks if email already exists
    User.findOne({ where : {
        email: req.body.email, 
    }})
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message: "email already exists"});
        } else if (req.body.email && req.body.password) {
            // password hash
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    let userBd= User.create(({
                        email: req.body.email,
                        name: req.body.name,
                        lastName:req.body.lastName,
                        password: passwordHash,
                        
                    }))
                    .then(() => {
                        res.status(200).json({message: "user created"});
                    })
                    .catch(err => {
                        console.log("Error in signup controllers: " + err);
                        res.status(502).json({message: "error while creating the user"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const login = (req, res, next) => {
    // checks if email exists
    User.findOne({ where : {
        email: req.body.email, 
    }})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "user not found"});
        } else {
            // password hash
            bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                if (err) { // error while comparing
                    res.status(502).json({message: "error while checking user password"});
                } else if (compareRes) { // password match
                    const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "user logged in", "token": token, role: dbUser.role, userId:dbUser.id});
                } else { // password doesnt match
                    res.status(401).json({message: "invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('Error in login controllers: ' + err);
    });
};

const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'unauthorized' });
    } else {
        res.status(200).json({ message: 'here is your resource' });
    };
};

const infoGet = async (req, res) => {
    try{
        let userId=req.query.userId
        let info=await UserInfo.findOne({
         where:{
             userId:userId
         },
         attributes:['id','fullName','address','apt_Suite',"city", "postalCode", "phone", "default"],
         
        })
     info?res.status(200).json(info):
     res.status(404).send("no address");
    }
    catch(e){
     console.log("Error in info controller"+ e)
 }
}
const infoPost = async (req, res) =>{
    try{
        console.log(req.body.fullName)
        UserInfo.findOne({ where: { userId:req.query.id} })
        .then(res=> {
            // update
            if(res){
                res.update({
                    userId: req.query.id,
                    fullName: req.body.fullName,
                    address: req.body.address,
                    apt_Suite: req.body.apt_Suite.toString(),
                    postalCode: req.body.postalCode.toString(),
                    city:req.body.city,
                    phone: req.body.phone.toString(),
                    default:req.body.default

                });
            }else{
                UserInfo.create({
                   userId: req.query.id,
                   fullName: req.body.fullName,
                   address: req.body.address,
                   apt_Suite: req.body.apt_Suite.toString(),
                   postalCode: req.body.postalCode.toString(),
                   city:req.body.city,
                   phone: req.body.phone.toString(),
                   default:req.body.default
                });
            }
            // insert
        })
        res.status(200).send("Order Added") 
    }
catch(e){
console.log("Error in infoPost controller"+ e)
}
    
}
const updateInfo=async(req,res)=>{
      
    try{
        let boolDefault = req.body.boolDefault
        let id = req.query.id
        let user= await UserInfo.findOne({
                where:{userId:id}
            })
            if(user){
                user.update(
                    {default:boolDefault}
                )
                res.status(200).send("Success")
            }
            else{
                res.status(404).send("user not found");
            }
       
  
     
    }
    catch(e){
     console.log("Error in updateInfo controller"+ e)
 }
}


module.exports={
    signup,
    userGet,
    login,
    isAuth,
    signupadmin,
    infoGet, 
    infoPost,
    updateInfo
}