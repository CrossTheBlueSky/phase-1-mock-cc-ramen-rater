const ramenForm = document.getElementById("new-ramen")
const editForm = document.getElementById("edit-ramen")
const deleteButton = document.getElementById("delete-button")
let currentRamen

ramenForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    addNewRamen(e)
})

editForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    editRamen(e)
})

deleteButton.addEventListener("click", ()=>{
    deleteRamen()
})

function initialize(){

    fetch("http://localhost:3000/ramens")
    .then(res=>res.json())
    .then((data)=>{
            renderRamen(data)
            currentRamen = data[0]
            ramenClicked(currentRamen)
    })

}

function updateRamens(){
    fetch("http://localhost:3000/ramens")
    .then(res=>res.json())
    .then((data)=>{
            renderRamen(data)
            currentRamen = data[0]
            ramenClicked(currentRamen)
    })
}

function renderRamen(arr){
    const menu = document.getElementById("ramen-menu")
    menu.innerHTML = ""
    arr.forEach((e)=>{
        const newRamen = document.createElement("img")
        newRamen.src = e.image
        newRamen.addEventListener("click", ()=>{ramenClicked(e)})
        menu.append(newRamen)
    })
}

function ramenClicked(ramen){
    const image = document.querySelector(".detail-image")
    const name = document.querySelector(".name")
    const restaurant = document.querySelector(".restaurant")
    const rating = document.querySelector("#rating-display")
    const comments = document.querySelector("#comment-display")
    image.src = ramen.image
    name.innerText = ramen.name
    restaurant.innerText = ramen.restaurant
    rating.innerText = ramen.rating
    comments.innerText = ramen.comment
    currentRamen = ramen
}

function addNewRamen(ramen){
    const ramenData = {
        image: ramen.target[2].value,
        name: ramen.target[0].value,
        rating: ramen.target[3].value,
        restaurant: ramen.target[1].value,
        comment: ramen.target[4].value
    }

    fetch(`http://localhost:3000/ramens/`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ramenData)})
        .then(()=>{
            updateRamens()
        })

    const menu = document.getElementById("ramen-menu")
    const newRamen = document.createElement("img")
    newRamen.src = (ramen.target[2].value)
    newRamen.addEventListener("click", ()=>{ramenClicked(ramenData)})
    
    menu.append(newRamen)
}


function editRamen(form){
    
    const patchObj = {
        rating : form.target[0].value,
        comment : form.target[1].value
            }

    fetch(`http://localhost:3000/ramens/${currentRamen.id}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(patchObj)})
        .then(()=>{
            updateRamens()
        })


}

function deleteRamen(){

    fetch(`http://localhost:3000/ramens/${currentRamen.id}`, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json"
        }})
        .then(()=>{
            updateRamens()
        })
}

    initialize()

