const animals = ['panda', 'eagle', 'gorilla', 'lemur']
const hostingRef = "https://rolling-scopes-school.github.io/vityara-JSFE2021Q1/online-zoo/pages/"

animals.forEach(animal => {
  let btn = document.querySelector(`.${animal}__find`)
  btn.addEventListener('click', () => {
    document.location.href = hostingRef + `${animal}.html`;
  })
})