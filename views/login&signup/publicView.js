
async function displayPublicView(containerID){
    const publicView = document.getElementById(containerID)   //there should be a dialog/modal container in the page 
    const closeBtn = document.createElement('span')
    closeBtn.innerHTML='&#10006;'
    closeBtn.id = 'close-btn'
    publicView.appendChild(closeBtn)

    publicView.style.display ='grid'
    publicView.showModal()

    const closePublicView = document.getElementById('close-btn')
    closePublicView.addEventListener('click',(event)=>{
    event.preventDefault()
    publicView.style.display='none'
    publicView.close()
    window.location.href ="/"
    })

    const profile = await getProfile()
    
    if(profile.success){
        makePublicView(publicView)  //creates the template for the public view
        renderContent(profile)  //use the profile to fill the template

    }
    else{
        userDoesNotExist(publicView)    //displays "user does not exist"
    }
        
}

function userDoesNotExist(publicView){
    const doesNotExist = document.createElement('div')
    doesNotExist.className='does-not-exist'
    const h1 = document.createElement('h1')
    h1.textContent ='User Does Not Exist'
    doesNotExist.appendChild(h1)
    publicView.appendChild(doesNotExist)
}

function makePublicView(publicView){

    const header = document.createElement('div')
    header.className = 'header'
    const profilePic = document.createElement('div')
    profilePic.className='profile-pic'
    profilePic.id='profile-pic'
    header.appendChild(profilePic)
    const picture = document.createElement('div')
    picture.className = 'picture'
    profilePic.appendChild(picture)
    const details = document.createElement('div')
    details.className ='details'
    details.id='details'
    header.appendChild(details)
    const name= document.createElement('div')
    name.id ='name'
    details.appendChild(name)
    const nameh1= document.createElement('h1')
    const userName = document.createElement('h3')
    nameh1.id='nameh1'
    userName.id ='user-name'
    name.appendChild(nameh1)
    name.appendChild(userName)
    const linkHolder = document.createElement('div')
    details.appendChild(linkHolder)
    const link = document.createElement('div')
    link.id='link'
    linkHolder.appendChild(link)
    publicView.appendChild(header)
}

async function renderContent(profile){
    const nameContainer = document.getElementById('nameh1')
    const userNameContainer = document.getElementById('user-name')
    nameContainer.textContent = profile.firstname +" "+ profile.surname
    userNameContainer.textContent = profile.userName
}




async function getProfile(){
    try {
        const userName = window.location.pathname.split('/user/')[1]
       
        const response = await fetch('/user/:id',{     //send these values to the server for processing
            method: 'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify({       
                userName:userName
            })
        })

        const result =  await response.json()
      
        return result
    } catch (error) {
        console.log(error)
    }
}
