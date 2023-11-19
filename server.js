const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express()


app.use(express.json())
app.use(express.static('public'))

//routing for cleanliness
const userRoute = require('./routes/index')
const messagesRoute = require('./routes/messages')
app.use(userRoute)
app.use(messagesRoute)
//This is my todo, try to serve messages.html after logging in

const port = process.env.PORT || 5000

mongoose.connect('mongodb+srv://lariwellRodrigueza:yzKkiyjJQfWJFCtj@lariwellcluster1.ufcnhzl.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    app.listen(port, ()=>{
        console.log(`The server is listening to port ${port}...`)
    })
    console.log('Connected to MongoDB...')
}).catch(()=>{
    console.error(error)
})