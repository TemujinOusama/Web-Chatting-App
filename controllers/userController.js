const User = require('../models/userModel')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.user_get =  async(req,res)=>{
    const indexPath = path.join(__dirname,'../views/login&signup/login.html')
    res.sendFile(indexPath)
}
module.exports.user_post = async(req, res)=>{
    const user = await User.find({userName:req.params.id})
    res.json(user)
}