async function loadConversations (){
    const leftCol= document.getElementById('left-column')
    const personsContainer = document.getElementById('people-container')
    personsContainer.style.maxHeight = `${leftCol.clientHeight * 0.80}px`
    const loadingPersons = document.createElement('div')
    loadingPersons.innerText= `Loading Persons...`
    personsContainer.appendChild(loadingPersons)            //loading display
    const conversations = await getConversations()
    personsContainer.removeChild(loadingPersons)            //remove loading display once the convos are fetched
   
    conversations.contacts.forEach(contact => {         //this contains the contacts of the user 
        const divPerson = document.createElement('div')     //create the divs for each of the,
        divPerson.id=contact._id
        divPerson.className="person"
        divPerson.onclick=()=>{                 //dont forget the onclick selectChat
            selectChat(contact)
        }
        const divPersonChild = document.createElement('div')
        divPersonChild.innerHTML = contact.firstname 
        divPerson.appendChild(divPersonChild)
        
        personsContainer.appendChild(divPerson)
    });
    
}
async function getConversations(){
    try {
        const response = await fetch('/messages',{
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                'action':'loadContacts',
                
            })
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error)
    }
}