const express = require('express')
const router = express.Router()
const User = require('../models/userModel')



//logging in route
router.post('/', async(req, res)=>{
    const action = req.body.action          //contains the action. whether login or createAccount
    if(action === 'login'){             
        try {
        const user = await User.findOne({email:req.body.email})     //find the user email on the database. if it exists, then proceed to login
        if(user!==null){
            if(user.email === req.body.email && user.password === req.body.password){
                res.status(200).json({success:true, message:'Logged In!'})
            }
            else{
                res.status(401).json({success:false, message:'Incorrect Email or Password'})
            }
        }
        else{
            res.status(404).json({success:false, message:'User not found'})     //if the user does not exist, then dont proceed to login
        }
        } catch (error) {
            console.error('error during login: ',error)
            res.status(500).json({success:false, message:"Internal Server Error"})
        }
    }
//creating account route
    else if(action === 'createAccount'){                
        try {
            const existingEmail = await User.findOne({email:req.body.email})    //find the email from the database. if it exists, do not proceed to the account creation
            if(existingEmail===null){
                const user = await User.create(req.body)
                res.status(200).json({success:true, message:"Account Created"})
                console.log("Data got: ", req.body)
            }else{
                res.status(409).json({success:false, message:"User Already Exists"})
            }

            
        } catch (error) {
            console.log(error.message)
            res.status(500).json({success:false, message:error.message})
        }
    }
    else{
        console.log(action)
    }
})

module.exports = router


