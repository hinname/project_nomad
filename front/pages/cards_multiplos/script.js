const card1 = document.getElementById('card1')

function onDrag({movementX}){
    let getStyle = window.getComputedStyle(card1);
    let left = parseInt(getStyle.left);
    card1.style.left = `${left + movementX}px`
}

card1.addEventListener("mousedown", ()=>{
    card1.classList.add("active");
    card1.addEventListener("mousemove", onDrag)
})

document.addEventListener("mouseup", ()=>{
    card1.classList.remove("active")
    card1.removeEventListener("mousemove", onDrag)
})