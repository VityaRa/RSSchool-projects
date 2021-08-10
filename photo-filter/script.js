let image = document.querySelector('body > main > div.editor > img')

const getTime = () => {
  let currentHour = new Date().getHours()
  if (currentHour >= 6 && currentHour < 12)
    return 'morning'
  else if (currentHour >= 12 && currentHour < 18)
    return 'day'
  else if (currentHour >= 18 && currentHour < 24)
    return 'evening'
  else if (currentHour >= 0 && currentHour < 6)
    return 'night'
}

const changeValues = (btn) => {
  let output = document.querySelector(`body > main > div.filters > label:nth-child(${btn.getAttribute('data-number')}) > output`)
  output.innerHTML = btn.value

  image.style.setProperty(`--${btn.name}`, `${output.innerHTML}${btn.getAttribute('data-sizing')}`)
} 

const resetAllFilters = () => {
  document.querySelectorAll('.filters input').forEach(elem => {
    elem.max == 200 ? elem.value = 100 : elem.value = elem.min
    document.querySelector(`body > main > div.filters > label:nth-child(${elem.getAttribute('data-number')}) > output`).innerHTML = elem.value
    image.style.setProperty(`--${elem.name}`, `${elem.value}${elem.getAttribute('data-sizing')}`)
  })
}

let resetButton = document.querySelector('.btn-reset')
resetButton.addEventListener('click', () => resetAllFilters())

window.onload = resetAllFilters

document.querySelector('.fullscreen').addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
})
let saveButton = document.querySelector('.btn-save')

const saveImage = () => {
  let canvas  = document.createElement("canvas");

  canvas.width  = image.width;
  canvas.height = image.height;
  let context = canvas.getContext("2d");

  //let filters = `blur:(${document.querySelector('body > main > div.filters > label:nth-child(1) > input[type=range]').value}px) invert:(${document.querySelector('body > main > div.filters > label:nth-child(2) > input[type=range]').value}%) sepia:(${document.querySelector('body > main > div.filters > label:nth-child(3) > input[type=range]').value}%) hue:(${document.querySelector('body > main > div.filters > label:nth-child(4) > input[type=range]').value}deg) saturate:(${document.querySelector('body > main > div.filters > label:nth-child(5) > input[type=range]').value}%);`
  let filters = {
    blur: document.querySelector('body > main > div.filters > label:nth-child(1) > input[type=range]').value,
    invert: document.querySelector('body > main > div.filters > label:nth-child(2) > input[type=range]').value,
    sepia: document.querySelector('body > main > div.filters > label:nth-child(3) > input[type=range]').value,
    saturate: document.querySelector('body > main > div.filters > label:nth-child(4) > input[type=range]').value,
    hue: document.querySelector('body > main > div.filters > label:nth-child(5) > input[type=range]').value,
  }

  context.filter = `blur(${filters.blur}px) `
  context.filter += `invert(${filters.invert}%) `
  context.filter += `sepia(${filters.sepia}%) `
  context.filter += `hue-rotate(${filters.hue}deg) `
  context.filter += `saturate(${filters.saturate}%)`
  
  context.drawImage(image, 0, 0, image.width, image.height);
  console.log(context.filter)

  let ref = document.createElement('a')
  ref.href = canvas.toDataURL("image/png")
  ref.download = 'photo'
  document.body.append(ref)
  ref.click()
  ref.remove()

}

saveButton.addEventListener('click', () => saveImage())


let nextButton = document.querySelector('.btn-next')

let currentImageNumber = 0
const showNextImage = () => {
  currentImageNumber++
  if (currentImageNumber > 20) currentImageNumber = 1
  if (currentImageNumber < 10) currentImageNumber = '0' + currentImageNumber
  image.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTime()}/${currentImageNumber}.jpg`
  currentImageNumber = parseInt(currentImageNumber, 10)
}

nextButton.addEventListener('click', () => showNextImage())

window.onload = showNextImage

const loadImage = (loadInput) => {
  if (loadInput.files) {
    let fr = new FileReader();
    fr.onload = function () {
      image.src = fr.result;
    }
    fr.readAsDataURL(loadInput.files[0]);
  }
}
