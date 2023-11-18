const mongoose = require('mongoose')

const conversation = mongoose.Schema({
    conversationId:{
        type:String
    },
    users:[
        {
            id:String
        }
    ],
    messages:messages
})
const messages = mongoose.Schema({
    senderID :{type:mongoose.Schema.Types.ObjectID, }
})