const camList = document.querySelectorAll('.cam__item')
const activeClass = 'cam__item-active'


const openFullBtn = document.querySelector('.sidebar__label-btn')
const nextAnimalBtn = document.querySelector('.sidebar__bottom-btn')

const animalCardClass = "sidebar__animal"
const animalRowClass = "sidebar__list"

const sidebarContainer = document.querySelector('.sidebar__container')
const sidebarTop = document.querySelector(`.sidebar__top`)
const animalList = document.querySelectorAll(`.${animalCardClass}`)





openFullBtn.addEventListener('click', () => {
  sidebarContainer.classList.toggle('sidebar__active')
})

const findLastCard = (rowClass, cardClass) => {
  return document.querySelector(
    `.${rowClass} .${cardClass}:last-child`
  );
};

const showNextAnimal = (rowClass) => {
  const rowNode = document.querySelector(`.${rowClass}`);
  rowNode.prepend(findLastCard(rowClass, animalCardClass))
}

nextAnimalBtn.addEventListener('click', (e) => {
  e.preventDefault()
  showNextAnimal(animalRowClass)
})


const makeAllUnactive = () => {
  camList.forEach(cam => {
    cam.classList.remove(activeClass)
  })
}

const camMainContainer = document.querySelector('.cam__video')


const replaceCam = (clicked) => {
  const currentFrame = document.querySelector('.cam__video iframe')
  const chosenFrame = document.querySelector('.cam__item.cam__item-active iframe')
  const camExtraContainer = document.querySelector('.cam__item.cam__item-active')
  currentFrame.remove()
  
  camMainContainer.append(chosenFrame)
  camExtraContainer.append(currentFrame)
}


camList.forEach(cam => cam.addEventListener('click', (elem) => {
  
  const clickedElem = elem.target.parentNode
  if (!clickedElem.classList.contains(activeClass)) {
    makeAllUnactive()
    clickedElem.classList.add(activeClass)
    replaceCam()
  }

}))

