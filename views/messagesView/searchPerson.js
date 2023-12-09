const dropdown = document.getElementById('results-container')
document.addEventListener('click',(event)=>{
    if(!dropdown.contains(event.target)){
        closeSearchResults()
    }
})


async function showResults(query){
    const results  = await getSearchResult(query)
    displayResults(results)     //takes results which contains all the information from the database
}

async function getSearchResult(query){      //every letter input, this gets the similar lettered user from mongodb
    try {
        const response = await fetch('/messages',{
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                'action':'searchPerson',
                'name':query
            })
})
        
        const result = await response.json()
        return  result.users
    } catch (error) {
        console.error(error)
    }
}
function displayResults(results){           //displays the result with a div
    const resultsContainer = document.getElementById('results-container')
    resultsContainer.innerHTML=``
    const searchInput = document.getElementById('searchPersonInput').value.trim()
    if(searchInput ===''){
        resultsContainer.style.display='none'
    }else if (results.length > 0) {
        results.forEach(user => {
            const fullName = user.firstname+" "+user.surname
            const resultItem = document.createElement('div');
            const nameContainer = document.createElement('h5')
            resultItem.className= 'result-item';
            nameContainer.textContent = fullName;
            resultItem.appendChild(nameContainer)
            resultItem.addEventListener('click', () => {
                if(!existsOnPersonContainer(user._id)){
                    putToPersonsContainer(user)
                    selectChat(user)
                    closeSearchResults()
                }else{
                    closeSearchResults()
                    selectChat(user)
                }
            });
            resultsContainer.appendChild(resultItem);
        });

        resultsContainer.style.display = 'grid';
    } else {
        resultsContainer.style.display = 'none';
    }
}
function existsOnPersonContainer(resultID){
    const exist = document.getElementById(resultID)
    if(exist === null){
        return false
    }else{
        return true
    }

}
function closeSearchResults () {
    const resultsContainer = document.getElementById('results-container')
    if(resultsContainer){
        resultsContainer.style.display='none'            //hides the results container
    }
    
}
function putToPersonsContainer(result){
    const personsContainer = document.getElementById('people-container')
    const newPerson = document.createElement('div')
    newPerson.className ='person'
    newPerson.id=result._id
    newPerson.onclick = ()=>{
        selectChat(result)
    }
    const personDetails = document.createElement('div')
    personDetails.textContent= result.firstname+' '+result.surname
    newPerson.appendChild(personDetails)
    personsContainer.appendChild(newPerson)
}