const card = document.getElementById('card')
let image = document.getElementById('image')

function onDrag({movementX}){
    let getStyle = window.getComputedStyle(card);
    let left = parseInt(getStyle.left);
    
    card.style.left = `${left + movementX}px`
}

function onDragMobile(touch){
    let touchLocation = touch.targetTouches[0]
    let getStyle = window.getComputedStyle(card);
    let left = parseInt(getStyle.left);
    let width = parseInt(getStyle.width);

    card.style.left = `${touchLocation.pageX - width/2}px`
}

function goHome() {
  location.href = '../home/index.html'
}

function goFavs() {
  location.href = '../favoritos/index.html'
}

function goMultipleCards() {
  location.href = '../cards_multiplos/index.html'
}

function denyCard() {
  card.classList.add("swiped");
  card.classList.add("left");
  card.style.transitionDuration = '0.8s'
  setTimeout(removeCard,800)
}

function favoriteCard() {
  card.classList.add("swiped");
  card.classList.add("right");
  card.style.transitionDuration = '0.8s'
  setTimeout(removeCard,800)
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
    let getStyle = window.getComputedStyle(card);
    let left = parseInt(getStyle.left);


    image.classList.remove("active");
    image.removeEventListener("touchmove", onDragMobile)

    if (left >= 45){
        card.classList.add("swiped");
        card.classList.add("right");
        card.style.transitionDuration = '0.8s'
        setTimeout(removeCard,800)
    } else if (left <= -40){
        card.classList.add("swiped");
        card.classList.add("left");
        card.style.transitionDuration = '0.8s'
        setTimeout(removeCard,800)
    } else{
        card.style.transitionDuration = '0.1s'
        card.style.left = 0;
        setTimeout(()=>{card.style.transitionDuration='0s'},150)
    }
})