const sendBtn = document.getElementById('send-btn')

const messageElement = document.getElementById('message-input')

sendBtn.addEventListener('click', ()=>{
    
    const message = messageElement.value
    if(message.trim() !== ''){          //if the message entered is blank


        displayMessage(message)
        console.log(message)
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