const sendBtn = document.getElementById('send-btn')

const messageElement = document.getElementById('message-input')

sendBtn.addEventListener('click', async (event)=>{
    event.preventDefault()
    const message = messageElement.value
    if(message.trim() !== ''){          //if the message entered is blank
        try {
            const response = await fetch('/messages', {  //send the message to the server
                method: 'POST',
                headers:{
                    "Content-Type":'application/json'
                },
                body: JSON.stringify({       
                    message:message,


                })
            })
            const result = await response.json()
            
            if(result.success){
                displayMessage(message)
                //console.log(message)
            }
            else{
                alert('Message not sent')
            }
        } catch (error) {
            console.error(error)
        }
        
    }
    messageElement.value=''  //clear the message entry when sending 
})




function displayMessage(message){
    const newDiv = document.createElement('div') //create a div that contains span for easier design
    const newSpan = document.createElement('span')//create the span
    newDiv.className='message-div'
    newSpan.className='message-span'
    newSpan.textContent = message
    newDiv.appendChild(newSpan)         //put the span inside the div
    const conversation = document.getElementById('conversation')
    conversation.appendChild(newDiv)    //put the div inside the conversation area
}  