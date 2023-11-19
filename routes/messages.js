const express = require('express')
const router = express.Router()
const path = require('path')
const Conversation = require('../models/conversation')
const User = require('../models/userModel')

router.get('/messages', (req, res) =>{      //redirecting to /messages.html
    const filePath = path.join(__dirname,'../public/messages.html')
    res.sendFile(filePath)
})

router.post('/messages', async (req, res)=>{

    const participant = await User.find()
    //const conversation = await Conversation.create({participants:})
    
    
})

module.exports = router