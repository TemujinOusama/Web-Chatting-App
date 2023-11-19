const mongoose = require('mongoose')

const messagesSchema = mongoose.Schema({
    senderID :{
        type:mongoose.Schema.Types.ObjectID,
        ref:"User",
    },
    content:{
        type:String,
        required:true
    },
    sentAt:{
        type:Date,
        immutable:true,
        default:()=>Date.now,
    }
})
const conversationSchema = mongoose.Schema({
    
    participants:[
        {   
            type:mongoose.Schema.Types.ObjectId, 
            ref:"User",
            required:true,
        }
    ],
    messages:[messagesSchema]
})

const conversation = mongoose.model("Conversation",conversationSchema)
module.exports = conversation