
const person = document.getElementById('person')
const rightCol = document.getElementById('right-column')

person.addEventListener('click', async(event)=>{
    event.preventDefault()
    console.log('clicked')
    rightCol.innerHTML = ''     //erases the contents of conversation div
    try {
        const response = await fetch('/messages', {
            method: 'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify({       
                action:"getUserID"
            })
        })
        const result = await response.json()
    
        updateChatUI()
    } catch (error) {
        
    }
   
    
})

//displays the conversation UI
function updateChatUI(name){
    
    const conversationDiv = document.createElement('div')
    const chatHeader = document.createElement('div')
    const messageEntryDiv = document.createElement('div')
    const textArea = document.createElement('textarea')
    const img = document.createElement('img')

    chatHeader.className = 'chatHeader'
    chatHeader.textContent=name
    
    conversationDiv.className='conversation'
    conversationDiv.id='conversation'
  
    messageEntryDiv.className='message-entry'

    
    textArea.name='message-input'
    textArea.id='message-input'
    textArea.placeholder='Message'
    
    img.src='send-icon.png'
    img.id='send-btn'
    messageEntryDiv.appendChild(textArea)
    messageEntryDiv.appendChild(img)


    rightCol.appendChild(chatHeader)
    rightCol.appendChild(conversationDiv)
    rightCol.appendChild(messageEntryDiv)
    
    
}