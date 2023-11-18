const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) =>{      //redirecting to /messages.html
    const filePath = path.join(__dirname,'../public/messages.html')
    res.sendFile(filePath)
})

module.exports = router