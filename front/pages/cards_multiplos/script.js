const card1 = document.getElementById('card1')
image = card1.getElementsByClassName('image')[0]

function onDrag({movementX}){
    let getStyle = window.getComputedStyle(card1);
    let left = parseInt(getStyle.left);
    
    card1.style.left = `${left + movementX}px`
}

function onDragMobile(touch){
    let touchLocation = touch.targetTouches[0]
    let getStyle = window.getComputedStyle(card1);
    let left = parseInt(getStyle.left);
    let width = parseInt(getStyle.width);

    card1.style.left = `${touchLocation.pageX - width/2}px`
}

function removeCard(){
    let i = 0
    let cards = document.getElementsByClassName('card')
    for (i in cards){
        if (cards[i].classList[1] == 'swiped'){
            cards[i].style.display = 'none'
        }
    }

}
//Holding mouse left button to swipe
image.addEventListener("mousedown", ()=>{
    image.classList.add("active");
    image.addEventListener("mousemove", onDrag)
})
//Pressing the touchscreen to swipe
image.addEventListener("touchstart", ()=>{
    image.classList.add("active");
    image.addEventListener("touchmove", onDragMobile)
})
//Releasing the mouse left button
document.addEventListener("mouseup", ()=>{
    image.classList.remove("active")
    image.removeEventListener("mousemove", onDrag)
})
//Releasing the touchscreen
image.addEventListener("touchend", ()=>{
    let getStyle = window.getComputedStyle(card1);
    let left = parseInt(getStyle.left);

    image.classList.remove("active");
    image.removeEventListener("touchmove", onDragMobile)

    if (left >= 45){
        card1.classList.add("swiped");
        card1.classList.add("right");
        card1.style.transitionDuration = '0.8s'
        setTimeout(removeCard,800)
    } else if (left <= -40){
        card1.classList.add("swiped");
        card1.classList.add("left");
        card1.style.transitionDuration = '0.8s'
        setTimeout(removeCard,800)
    } else{
        card1.style.transitionDuration = '0.1s'
        card1.style.left = 0;
        setTimeout(()=>{card1.style.transitionDuration='0s'},150)
    }
})