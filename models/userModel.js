const mongoose = require('mongoose')

const userSchema= mongoose.Schema(
    {
        firstname:{
            type:String,
            required:[true, "Please the include user First Name"]
        },
        surname:{
            type:String
        },
        email:{
            type:String,
            required:[true, "Please include the user Email"]
        },
        password:{
            type:String,
            required:[true, "Please include the user Password"]
        },
        userName:{
            type:String,
            required:[true, "Enter User ID"]
        }
    },
    {
        timestamps:true 
    }
)

const User = mongoose.model('User', userSchema)
module.exports = User