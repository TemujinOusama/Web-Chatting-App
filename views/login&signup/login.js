const loginForm = document.getElementById('loginForm')
const loginEmail = document.getElementById('email')
const loginPassword = document.getElementById('password')



loginForm.addEventListener('submit', async(event)=>{
    event.preventDefault()
    if(loginEmail.checkValidity() && loginPassword.checkValidity()){ 
        try {
            const response = await fetch('/',{              //send these values to the server
                method: 'POST',
                headers:{
                    "Content-Type":'application/json'
                },
                body: JSON.stringify({              //body contains the necessary values
                    email:loginEmail.value,
                    password:loginPassword.value,
                    action:"login"
                })
            })
            const result = await response.json()    //await the result of the sent body(the result came from the server)
            if(result.success){
                window.location.href = "/messages"      //redirect to /messages
                console.log('Logging in...')
            }
            else{
                alert(result.message)       //if the server responds something else
            }
        } catch (error) {
            console.error(error)
            alert("invalid")
            console.log(error.message)
        }
    }
    else{
        alert('Something went wrong...')
    }
})
