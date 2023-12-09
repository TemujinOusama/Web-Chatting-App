const User = require('../models/userModel')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.user_get =  async(req,res)=>{
    const indexPath = path.join(__dirname,'../views/login&signup/login.html')
    res.sendFile(indexPath)
}
module.exports.user_post = async(req, res)=>{
    const user = await User.find({userName:req.body.userName})
    if(user.length!==0){
        const profile = {
            success:true,
            firstname:user[0].firstname,
            surname:user[0].surname,
            userName:user[0].userName
        }
        res.status(200).json(profile)
    }
    else{
        res.status(404).json({success:false, message:"User not found"})
    }
    


}