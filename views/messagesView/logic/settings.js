const settings = document.getElementById('gear-icon')
const settingsMenu = document.getElementById('settings-menu')
const editProfileMenu = document.getElementById('profile')
const logOutBtn = document.getElementById('log-out')

//hide settings when clicking outside

settings.addEventListener('click', ()=>{
    settingsMenu.style.display = 'grid'
})


editProfileMenu.addEventListener('click',()=>{
    editProfile()
})




logOutBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    window.location.href ='/logout'

   
})