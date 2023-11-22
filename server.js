const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express()


app.use(express.json())


const route =require('./routes/routes')
app.use(route)

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