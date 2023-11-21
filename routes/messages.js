const express = require('express')
const router = express.Router()
const path = require('path')
const Conversation = require('../models/conversation')
const User = require('../models/userModel')
//const {requireAuth} = require('../middleware/authMiddleware')

router.get('/messages', (req, res) =>{      //redirecting to /messages.html
    const filePath = path.join(__dirname,'../public/messages.html')
    res.sendFile(filePath)
})

router.post('/messages', async (req, res)=>{
    const {action}= req.body
    if(action === 'getUserID'){
        res.status(200).json({success:true})
    }
    else{
        res.status(200)
    }
    
})

module.exports = router