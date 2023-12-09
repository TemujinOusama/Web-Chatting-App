const User = require('../models/userModel')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {createUser,createToken ,maxAge} = require('../middleware/authMiddleware')


module.exports.login_get = (req, res) =>{
    const filePath = path.join(__dirname,'../views/login&signup/login.html')
    res.sendFile(filePath)
}

module.exports.login_post = async(req,res)=>{
    const action = req.body.action          //contains the action. whether login or createAccount

    if(action === 'login'){     
             
        try {
        const user = await User.findOne({email:req.body.email})     //find the user email on the database. if it exists, then proceed to login

        if(user){
            if(await bcrypt.compare(req.body.password,user.password)){
                const token = createToken(user)
                const userID = createUser(user)
                res.cookie('jwt', token,{httpOnly:true, maxAge:maxAge})
                res.cookie('user_id',userID,{maxAge:maxAge, path:'/messages' })
                
                res.status(200).json({success:true, message:'Logged In!', user:user._id})
            }
            else{
                res.status(401).json({success:false, message:'Incorrect Password'})
            }
        }
        else{
            res.status(404).json({success:false, message:'User does not Exist'})     //if the user does not exist, then dont proceed to login
        }
        } catch (error) {
            console.error('error during login: ',error)
            res.status(500).json({success:false, message:"Internal Server Error"})
        }
    }
//creating account route
    else if(action === 'createAccount'){                
        try {
            const existingEmail = await User.exists({email:req.body.email})    //find the email from the database. if it exists, do not proceed to the account creation
            if(!existingEmail){
                
                const hashedPassword = await bcrypt.hash(req.body.password, 10) //hash the password
                req.body.password = hashedPassword
                const user = await User.create(req.body)
                res.status(200).json({success:true, message:"Account Created"})
            }else{
                res.status(409).json({success:false, message:"User Already Exists"})
            }

            
        } catch (error) {
            console.log(error.message)
            res.status(500).json({success:false, message:error.message})
        }
    }
    else{
        console.log("Action not recognized...")
        res.status(404).json({success:false, message:"Action not Recognized"})
    }
}
