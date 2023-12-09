const User = require('../models/userModel')
const Conversation = require('../models/conversation')
const path = require('path')


module.exports.messages_get = (req, res) =>{      //redirecting to /messages.html
    const filePath = path.join(__dirname,'../views/messagesView/messages.html')
    res.sendFile(filePath)
    
}
module.exports.messages_post = async (req, res)=>{
    
    const {action}= req.body
    if(action ==='loadContacts'){

        const user= req.user.userID
        const conversations = await Conversation.find({participants:{$in:[user]}})
        let contactIDs=[]
        //console.log(conversations)
        conversations.forEach(conversation=> {
            let count = 0           //use this count to check is the user is chatting with themselves
            for(let i=0; i<conversation.participants.length;i++){               //there are 2 participants, 1 of them is the user and another is the contact.
                if(user !==conversation.participants[i].toString()){            //this code gets the contactID to be used for the code below
                    contactIDs.push(conversation.participants[i].toString())
                }
                else if(user===conversation.participants[i].toString()){
                    count++
                }
            }
            if(count===2){              //if count===1, the user is chatting another person
                contactIDs.push(conversation.participants[0].toString())
            }
        })
        //this is the code below
        const contacts = await User.find({_id:contactIDs})

        res.status(200).json({success:'true', conversations:conversations, contacts:contacts, user:user})
    }
    else if(action === 'loadContactMessages'){

        const sender= req.user.userID
        const recepient = req.body.recepient
        
        let conversation=''
        if(sender ===recepient){
            conversation = await Conversation.findOne({participants:sender})    //ayusin mo to. pag nag chat sa sarili, ibang conversation ang kinukuha
        }
        else{
            conversation = await Conversation.findOne({participants:{$all:[sender, recepient]}})
        }
        

        res.status(200).json({conversation:conversation, sender:sender})
    }
    else if(action ==='searchPerson'){
        const letters = req.body.name
        const regex = new RegExp(`^${letters}`, 'i')        //takes the letters and 'i' because it does not care whether uppercase or lowercase
        const users = await User.find({firstname:{$regex:regex}})
        res.status(200).json({success:'true', users:users})
    }
    else if(action ==='sendMessage'){
        const sender= req.user.userID
        const recepient = req.body.recepient
        const conversation = await Conversation.findOne({participants:{$all:[sender, recepient]}})
        if(conversation){
            conversation.messages.push({senderID:sender, content:req.body.message})
            const updatedConversation =await conversation.save()
            res.status(200).json({success:true,conversation:updatedConversation, recepient:recepient, sender:sender})
        }
        else{
            const convo = await Conversation.create({
                participants:[sender,recepient],
                messages:[{
                    senderID:sender,
                    content:req.body.message,
                }]
            })
            res.status(200).json({success:true, conversation:convo, sender:sender})
        }
    }
    else{
        res.status(200).json({success:false,message:"Action Not Recognized"})
    }
}