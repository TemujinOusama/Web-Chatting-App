
document.addEventListener('DOMContentLoaded',()=>{

    const socket = io('http://localhost:5001')

    const userID= getCookie('user_id')
    
    socket.emit('add-user', {userID:userID})    //add user to the online users

    socket.on('recieve-message', (data)=>{
      
      const recievingUser = document.getElementsByName('chatHeader')
      if(recievingUser[0].id ===data.from){           //if it is the opened message box
        const conversationContainer = document.getElementById('conversation')
        const messageRecieveDiv = document.createElement('div')
        messageRecieveDiv.className = 'contact-message-div'
        const messageRecieveSpan = document.createElement('div')
        messageRecieveSpan.className = 'contact-message-span'
        messageRecieveSpan.innerText=data.message
        messageRecieveDiv.appendChild(messageRecieveSpan)
        conversationContainer.appendChild(messageRecieveDiv)
        conversationContainer.scrollTop = conversationContainer.scrollHeight
      }
      
      
    })
})

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        
        
        return decodeURIComponent(cookieValue);
        
      }
    }
    return null;
}