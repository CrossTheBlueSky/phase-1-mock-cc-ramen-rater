const ramenForm = document.getElementById("new-ramen")

ramenForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    addNewRamen(e)
})

function initialize(){

    fetch("http://localhost:3000/ramens")
    .then(res=>res.json())
    .then((data)=>{
            renderRamen(data)
    })

}

function renderRamen(arr){
    const menu = document.getElementById("ramen-menu")
    
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
    
}

function addNewRamen(ramen){
    const ramenData = {
        image: ramen.target[2].value,
        name: ramen.target[0].value,
        rating: ramen.target[3].value,
        restaurant: ramen.target[1].value,
        comment: ramen.target[4].value
    }
    const menu = document.getElementById("ramen-menu")
    const newRamen = document.createElement("img")
    newRamen.src = (ramen.target[2].value)
    newRamen.addEventListener("click", ()=>{ramenClicked(ramenData)})
    

    menu.append(newRamen)
    
    
}

    initialize()

