const openButton = document.getElementById('openModalBtn')
const closeButton = document.getElementById('closeModalBtn')
const modal = document.getElementById('modal')
const form = document.getElementById('createAccountForm')


//modal open and close
openButton.addEventListener('click', ()=>{
    modal.showModal()
})
closeButton.addEventListener('click', ()=>{
    modal.close()
})

//for creating a new account
const firstname = document.getElementById('createFirstName')
const surname = document.getElementById('createSurName')
const email = document.getElementById('createEmail')
const password = document.getElementById('createPassword')
const userName = document.getElementById('userID')

form.addEventListener('submit', async(event)=>{
    event.preventDefault()
    if(firstname.checkValidity()&&surname.checkValidity()&&email.checkValidity()&&password.checkValidity()){       //to check if the input areas are filled out correctly
        try {
            const response = await fetch('/',{      //send these values to the server for processing
               method: 'POST',
               headers:{
                   "Content-Type":'application/json'
               },
               body: JSON.stringify({       
                   firstname:format(firstname.value),
                   surname:format(surname.value),
                   email:email.value,
                   password:password.value,
                   action:"createAccount",
                   userName:userName.value
               })
           })
          
           const result = await response.json()     //await the response of the server
           if(result.success){              
            alert('Account Created')
            modal.close()
           }
           else{
            alert('Email is already in use!')
           }
       } catch (error) {
           console.error(error)
           alert('Client Error')
       }
    }
    else{
        console.error("Error! Incorrect Values")
    }
    
})


function format(word){
    return word.charAt(0).toUpperCase() + word.slice(1)
}