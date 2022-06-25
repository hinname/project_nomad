let fav = document.getElementsByClassName('fav')
let imgNum
let i = 0
let container = document.getElementById('container')
let main = document.body.getElementsByTagName('main')[0]

function goHome() {
  location.href = '../home/index.html'
}

function goSettings() {
  location.href = '../configuracao/index.html'
}

//Pressing the touchscreen to swipe
function touchPress(favDiv){
  fav = favDiv
  fav.classList.add("active");
  fav.addEventListener("touchmove", onDragMobile)
}

function touchRelease(){
  let getStyle = window.getComputedStyle(fav);
  let left = parseInt(getStyle.left);

  fav.classList.remove("active");
  fav.removeEventListener("touchmove", onDragMobile)

  if (left <= 45){
      fav.classList.add("swiped");
      fav.classList.add("right");
  fav.style.transitionDuration = '0.8s'
      setTimeout(removeFav,800)
  } else if (left >= -40){
      fav.classList.add("swiped");
      fav.classList.add("left");
      fav.style.transitionDuration = '0.8s'
      setTimeout(removefav,800)
  } else{
      fav.style.transitionDuration = '0.1s'
      fav.style.left = 0;
      setTimeout(()=>{fav.style.transitionDuration='0s'},150)
  }
}

//remover favorito
function removeFav(){
  let i = 0
  let fav = document.getElementsByClassName('fav')
  for (i in fav){
      if (fav[i].classList[1] == 'swiped'){
          fav[i].outerHTML = ''
      }
  }
}

//Mover favorito
function onDragMobile(touch){
  let touchLocation = touch.targetTouches[0]
  let getFavStyle = window.getComputedStyle(fav);
  let left = parseInt(getFavStyle.left);
  let favWidth = parseInt(getFavStyle.width);
  let containerWidth = parseInt(window.getComputedStyle(container).width);
  let bodyWidth = parseInt(window.getComputedStyle(document.body).width);
  fav.style.left = `${touchLocation.pageX - containerWidth/2}px`
  console.log(touchLocation.pageX)
}