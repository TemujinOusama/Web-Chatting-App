const settings = document.getElementById('gear-icon')
const settingsMenu = document.getElementById('settings-menu')
const editProfileMenu = document.getElementById('edit-profile')
const logOut = document.getElementById('log-out')
settings.addEventListener('click', ()=>{
    settingsMenu.style.display = 'grid'
})

editProfileMenu.addEventListener('click',()=>{
    console.log('gawin mo na to')
})

async function getUser(){

}
async function editProfile(user){
    const editProfileContainer = document.createElement('div')
    editProfileContainer.id = 'edit-profile-container'
}

logOut.addEventListener('click', (event)=>{
    event.preventDefault()
    window.location.href ='/logout'

    console.log('clicked logout')
})