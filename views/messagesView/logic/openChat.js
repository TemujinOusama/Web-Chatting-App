
function selectChat(contact){
    const allPersons = document.querySelectorAll('.person')
    const targetUser = document.getElementById(contact._id)
    allPersons.forEach(person => {
        person.classList.remove('focused');
    });

    
    // Add focus class to the clicked person
    targetUser.classList.add('focused')   

    // Your additional logic for focusing on the clicked person
    openChat(contact)
   
}

//displays the conversation UI
function openChat(contact){                        //used by selectChat() function to open the chat inteface
    const rightCol = document.getElementById('right-column')
    rightCol.innerHTML=''
    
    const conversationDiv = document.createElement('div')
    const chatHeader = document.createElement('div')
    const nameCont = document.createElement('div')
    const messageEntryDiv = document.createElement('div')
    const textArea = document.createElement('textarea')
    const img = document.createElement('img')


    chatHeader.className = 'chatHeader'
    chatHeader.setAttribute('name', 'chatHeader')      //another way to set the attribute of html element using JS
    chatHeader.id = contact._id
    nameCont.textContent=contact.firstname+" "+contact.surname
    chatHeader.appendChild(nameCont)
  
    
    conversationDiv.className='conversation'
    conversationDiv.id='conversation'
    conversationDiv.style.maxHeight = `${rightCol.clientHeight * 0.82}px`   //set the height based on the parent's size because overflow does not work properly if height is in percentage
  
    messageEntryDiv.className='message-entry'

    
    textArea.name='message-input'
    textArea.id='message-input'
    textArea.placeholder='Message'
    
    img.src='send-icon.png'
    img.id='send-btn'
    img.onclick=()=>{
        if(textArea.value!==""){
            sendMessage(contact, textArea.value)
        }
        
    }
    messageEntryDiv.appendChild(textArea)
    messageEntryDiv.appendChild(img)


    rightCol.appendChild(chatHeader)
    rightCol.appendChild(conversationDiv)
    rightCol.appendChild(messageEntryDiv)

    loadContactMessages(contact)
    
       
    
    
}

async function loadContactMessages(contact){
    
    const conversation = await fetchContactMessages(contact)

    if(conversation.conversation!==null){                    //conversations can be null if first time chatting
        const messages = conversation.conversation.messages
        const conversationContainer = document.getElementById('conversation')
        messages.forEach(message => {
    
            if(message.senderID===conversation.sender){
                const messageDiv = document.createElement('div')
                messageDiv.className = 'user-message-div'
                const messageSpan = document.createElement('div')
                messageSpan.className='user-message-span'
                messageSpan.innerHTML = message.content
                messageDiv.appendChild(messageSpan)
                conversationContainer.appendChild(messageDiv)
            }
            else{
                const messageDiv = document.createElement('div')
                messageDiv.className = 'contact-message-div'
                const messageSpan = document.createElement('div')
                messageSpan.className='contact-message-span'
                messageSpan.innerHTML = message.content
                messageDiv.appendChild(messageSpan)
                conversationContainer.appendChild(messageDiv)
            }
        })

        conversationContainer.scrollTop = conversationContainer.scrollHeight    //scroll automatically to the bottom
        
    }
    
   

}
async function fetchContactMessages(contact){
    const response = await fetch('/messages',{
        method:"POST",
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify({
            'action':'loadContactMessages',
            'recepient':contact._id
        })
    })
    const result = await response.json()
   
    return result
}