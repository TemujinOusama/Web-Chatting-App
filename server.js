const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const cors = require('cors')

const mongoose = require('mongoose')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const app = express()
const server = http.createServer(app)
const io = socketIO(server)


app.use(cookieParser())
// app.use(cors({
//     origin:'http://localhost:5001'
// }))

const route =require('./routes/routes')
app.use(route)


const port = process.env.PORT || 5000

mongoose.connect(process.env.mongodbURI)
.then(()=>{
    server.listen(port, ()=>{
        console.log(`The server is listening to port ${port}...`)
    })
    console.log('Connected to MongoDB...')
}).catch((error)=>{
    console.error(error)
})

const onlineUsers = new Map()   //contains the online users

io.on('connection',(socket)=>{
    console.log(`Client Connected: ${socket.id}`)
    socket.on('add-user', (data)=>{
        onlineUsers.set(data.userID, socket.id)
        console.log(onlineUsers)
    })
    socket.on('send-message', (data)=>{
        const userOnline = onlineUsers.get(data.to)
        if(userOnline){
            io.to(userOnline).emit('recieve-message',data)
        }
    
    })
    socket.on('disconnect',()=>{
        console.log(`Client Disconnected: ${socket.id} `)
        
    })
})
