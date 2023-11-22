const User = require('../models/userModel')
const path = require('path')


module.exports.messages_get = (req, res) =>{      //redirecting to /messages.html
    const filePath = path.join(__dirname,'../views/messagesView/messages.html')
    res.sendFile(filePath)
}
module.exports.messages_post = async (req, res)=>{
    const {action}= req.body
    if(action === 'getUserID'){
        res.status(200).json({success:true})
    }
    else{
        res.status(200)
    }
}