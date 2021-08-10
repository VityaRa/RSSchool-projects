

//Change letters's value function
const changeLettersValue = () => {
  let keys = document.querySelectorAll('.piano-key')
  keys.forEach(key => key.classList.toggle('piano-key-letter'))
}

//Change letters' mode by pressing Notes or Letters btn's
const changeLettersMode = (button) => {
  if (button.classList.contains('btn-active')) return
  document.querySelectorAll('.btn').forEach(element => element.classList.toggle('btn-active'))
  changeLettersValue()
}

//Change letter's value event
document.querySelectorAll('.btn').forEach(element => {
  element.addEventListener('click', () => changeLettersMode(element))
});

//Get data-letter value 
const getSymbolCode = (str) => {
  return str[str.length - 1]
}



//Find all piano keys
keys = document.querySelectorAll('.piano-key')

//Necessury variable to check mouse state for using multi-key using
let isMouseDown

//If mouse pressed, isMouseDown = true
window.addEventListener('mousedown', (elem) => {
    isMouseDown = true
})

//Else isMouseDown = false
window.addEventListener('mouseup', (elem) => {
    isMouseDown = false
})

//Events for mouse
keys.forEach(key => {
  //Event that provides single note playing
  key.addEventListener('mousedown', () => {
    const pianoKey = document.querySelector(`.piano-key[data-note="${key.getAttribute('data-note')}"]`)
    isMouseDown = true
    if (!pianoKey) return
    if (isMouseDown){
      playSound(pianoKey.getAttribute('data-note'))
      key.classList.toggle('piano-key-active')
    }
  })

  //Event that provides 'slide' note playing
  key.addEventListener('mouseover', () => {
    const pianoKey = document.querySelector(`.piano-key[data-note="${key.getAttribute('data-note')}"]`)
    if (!pianoKey) return
    if (isMouseDown){
      playSound(pianoKey.getAttribute('data-note'))
      key.classList.toggle('piano-key-active')
    }
  })

  //Removing styles, when mouseUp or mouseLeave
  key.addEventListener('mouseup', () => {
    isMouseDown = false
  if (key.classList.contains('piano-key-active'))
    key.classList.remove('piano-key-active')
  })
  key.addEventListener('mouseleave', () => {
    if (key.classList.contains('piano-key-active'))
      key.classList.remove('piano-key-active')
    })
  
})

//Fullscreen event by clicking fullscreen button
document.querySelector('.fullscreen').addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
})


//Play melody
const playSound = (noteName) => {
  let audio = new Audio();
  audio.preload = 'auto';
  audio.src = `./assets/audio/${noteName}.mp3`;
  audio.play();
}


//Key press event with keyboard
window.addEventListener('keydown', (pressedKey) => {
  //Find key
  
  const pianoKey = 
    document.querySelector(`.piano-key[data-letter="${getSymbolCode(pressedKey.code)}"]`)
    //Use code property that provides CAPS LOCK, russian lang and english lang keys work as one

  //If no key, then function ends
  if (!pianoKey) return
  //Else check, was key pressed?
  if (!pianoKey.classList.contains('piano-key-active'))
  {
    //If pressed, then add style and play sound (I made this check, because holding keyboard key lead to multiple playsounds)
    playSound(pianoKey.getAttribute('data-note'))
    pianoKey.classList.toggle('piano-key-active')
    return
  }
})

window.addEventListener('keyup', (pressedKey) => {
  const pianoKey = document.querySelector(`.piano-key[data-letter="${getSymbolCode(pressedKey.code)}"]`)
  if (!pianoKey) return
  pianoKey.classList.remove('piano-key-active')
})


