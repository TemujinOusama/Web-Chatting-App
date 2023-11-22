
async function modalOpen(){
    const path = window.location.pathname.startsWith('/user')

    if(path){
        const id = window.location.pathname
        console.log(id)
        const response = await fetch('/user/:id',{      //send these values to the server for processing
            method: 'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify({       
                id:id
            })
        })
    }
}
modalOpen( )