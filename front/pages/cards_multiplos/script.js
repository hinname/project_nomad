
    let cards
    let card
    let images = document.getElementsByClassName('image')
    let imgNum
    let i = 0
    let main = document.body.getElementsByTagName('main')[0]
    
// addCardFunctions()


// function addCardFunctions(){
//     cards = document.getElementsByClassName('card')
//     for (card of cards){
//         image = card.getElementsByClassName('image')[0]
//         image.addEventListener("touchstart", touchPress(image))
//         image.addEventListener("touchend", touchRelease(image))
//     }
// }

function onDrag({movementX}){
    let getStyle = window.getComputedStyle(card);
    let left = parseInt(getStyle.left);
    
    card.style.left = `${left + movementX}px`
}

function onDragMobile(touch){
    card = image.parentElement
    checkNum(this)
    let touchLocation = touch.targetTouches[0]
    let getCardStyle = window.getComputedStyle(card);
    let left = parseInt(getCardStyle.left);
    let cardWidth = parseInt(getCardStyle.width);
    let bodyWidth = parseInt(window.getComputedStyle(document.body).width)
    if (imgNum%2 == 0){
        card.style.left = `${touchLocation.pageX - bodyWidth/1.4}px`
    } else {
        card.style.left = `${touchLocation.pageX - cardWidth/2}px`
    }
}

function removeCard(){
    let i = 0
    let cards = document.getElementsByClassName('card')
    for (i in cards){
        if (cards[i].classList[1] == 'swiped'){
            cards[i].outerHTML = ''
            keepGrid()
            console.log('sasas')
        }
    }
}
//Holding mouse left button to swipe
image.addEventListener("mousedown", ()=>{
    image.classList.add("active");
    image.addEventListener("mousemove", onDrag)
})
//Pressing the touchscreen to swipe
function touchPress(cardImg){
    image = cardImg
    image.classList.add("active");
    image.addEventListener("touchmove", onDragMobile)
    
}
//Releasing the mouse left button
document.addEventListener("mouseup", ()=>{
    image.classList.remove("active")
    image.removeEventListener("mousemove", onDrag)
})
//Releasing the touchscreen
function touchRelease(){
    let getStyle = window.getComputedStyle(card);
    let left = parseInt(getStyle.left);

    card.classList.remove("active");
    card.removeEventListener("touchmove", onDragMobile)

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
}

function checkNum(img){
    i = 0
    for (i in images){
        if (img==images[i]){
            imgNum = parseInt(i)+1
        }
    }
    return imgNum
}

function keepGrid(){
    if (main.childElementCount < 3){
       main.innerHTML += '<div></div>' 
    }
}
//Reajuste automático pro tamanho real da viewport height
window.addEventListener('resize', () =>{
    let vh = window.innerHeight *0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`)
})