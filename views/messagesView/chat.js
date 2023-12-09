const socket = io('http://localhost:5001')

async function sendMessage(contact, message){
    try {
        const response = await fetch('/messages',{          //put the message to the database first.
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                'action':'sendMessage',
                'recepient':contact._id,
                'message':message
                
            })
        })
        const result = await response.json()
        if(result.success){
            displayMessage(message)             //then display the message
            
            socket.emit('send-message', {message:message,from:result.sender, to:result.recepient})

        }
    } catch (error) {
        console.error(error)
    }
}

function displayMessage(message){
    const messageContainer = document.createElement('div') //create a div that contains span for easier design
    const messageDiv = document.createElement('div')//create the span
    messageContainer.className='user-message-div'
    messageDiv.className='user-message-span'
    messageDiv.textContent = message
    messageContainer.appendChild(messageDiv)         //put the span inside the div
    const conversation = document.getElementById('conversation')
    conversation.appendChild(messageContainer)    //put the div inside the conversation area

    const messageEntry = document.getElementById('message-input')
    messageEntry.value = ''

    conversation.scrollTop = conversation.scrollHeight
    
}  
