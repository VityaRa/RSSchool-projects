const donateNowBtn = document.querySelector('.pay__donate')
const donateForVolunteersBtn = document.querySelector('.footer__btn')
const preModal = document.querySelector('.premodal__container')
const closeButton = document.querySelector('.premodal__close')
const premodalBtnList = document.querySelectorAll('.premodal__payments .premodal__item')
const unactiveClass = 'premodal__unactive'




const closePreModal = () => {
  if (!preModal.classList.contains(unactiveClass))
    preModal.classList.toggle(unactiveClass)
}


donateNowBtn.addEventListener('click', () => {
  preModal.classList.toggle(unactiveClass)
})

donateForVolunteersBtn.addEventListener('click', () => {
  preModal.classList.toggle(unactiveClass)
})

closeButton.addEventListener('click', () => {
  preModal.classList.toggle(unactiveClass)
})


//Main modal
const modalWindows = document.querySelectorAll('.modal__window')
const modalContainer = document.querySelector('.modal__container')

const modalNextBtn = document.querySelectorAll('.modal__next')
const donationAmountBtn = document.querySelector('.donation_submit-input')
const otherAmountField = document.querySelector('.modal__other input')
const valueArray = ['10', '20', '30', '50', '80', '100']


const openMainModal = (initialValue) => {
  if (initialValue) {
    otherAmountField.value = initialValue
  }
  modalContainer.classList.toggle('modal__unactive')
  modalWindows[0].classList.toggle('modal__window__hidden')
}

const closeMainModal = () => {
  if (!modalContainer.classList.contains('modal__unactive'))
    modalContainer.classList.toggle('modal__unactive')

  modalWindows.forEach(elem => {
    if (!elem.classList.contains('modal__window__hidden'))
      elem.classList.toggle('modal__window__hidden')
  })
}

preModal.addEventListener('click', (elem) => {
  if (elem.target.hasAttribute('data-close')) {
    closePreModal()
    document.querySelectorAll('.modal__inner [data-choose="true"]').forEach(elem => {
      if (elem.classList.contains("active__item"))
        elem.classList.toggle("active__item")
    })
    document.querySelector(`.modal__donation 
    [data-value="${elem.target.getAttribute('data-value')}"]`).classList.toggle('active__item')
  }
  openMainModal(elem.target.getAttribute('data-value'))
})


donationAmountBtn.addEventListener('click', (elem) => {
  elem.preventDefault()
  let chosenValue = document.querySelector('.donation__text-input').value
  openMainModal(chosenValue)
})



modalContainer.addEventListener('click', elem => {
  const target = elem.target

  //logic for pressing next btn
  if (target.getAttribute('data-type') === 'next') {
    if (target.getAttribute('data-number') === 'second') {

      let nameField = document.querySelector('.modal__bill [name="input-2-1"]')
      let emailField = document.querySelector('.modal__bill [name="input-2-2"]')
      if (nameField.value.trim() === "") {
        if (!nameField.classList.contains('wrong'))
        nameField.classList.toggle('wrong')
      } 
      if (emailField.value.trim() == "") {
        if (!emailField.classList.contains('wrong'))
        emailField.classList.toggle('wrong')
      }
      if (nameField.value.trim() != '' && emailField.value.trim() != '') {
        nameField.classList.remove('wrong')
        emailField.classList.remove('wrong')
        document.querySelector(`.modal__${target.getAttribute('data-number')}`).classList.toggle("modal__window__hidden")
        document.querySelector(`.modal__${target.getAttribute('data-next')}`).classList.toggle("modal__window__hidden")
      }
    }
   else {
    if (target.getAttribute('data-number') === 'third') {
      let cardNumber = document.querySelector('.modal__payment #input-2-1')
      let cvvNumber = document.querySelector('.modal__payment #input-2-2')
      let month = document.querySelector('#modal__month')
      let year = document.querySelector('#modal__year')
      
      if (cardNumber.value.trim() == "") {
        if (!cardNumber.classList.contains('wrong'))
        cardNumber.classList.toggle('wrong')
      } 
      if (cvvNumber.value.trim() == "") {
        if (!cvvNumber.classList.contains('wrong'))
        cvvNumber.classList.toggle('wrong')
      }
      if (month.options.selectedIndex == 0) {
        if (!month.classList.contains('wrong'))
        month.classList.toggle('wrong')
      }
      if (year.options.selectedIndex == 0) {
        if (!year.classList.contains('wrong'))
        year.classList.toggle('wrong')
      }
      if (cardNumber.value.trim() != '' && cvvNumber.value.trim() != '' && month.options.selectedIndex != -1 && month.options.selectedIndex != -1) {
        cardNumber.classList.remove('wrong')
        cvvNumber.classList.remove('wrong')
        month.classList.remove('wrong')
        year.classList.remove('wrong')

        document.querySelector(`.modal__${target.getAttribute('data-number')}`).classList.toggle("modal__window__hidden")
        closeMainModal()
        alert('Thank you for your donation!'); 
      }
    }
    else if (target.getAttribute('data-number') === 'first') {
      document.querySelector(`.modal__${target.getAttribute('data-number')}`).classList.toggle("modal__window__hidden")
      document.querySelector(`.modal__${target.getAttribute('data-next')}`).classList.toggle("modal__window__hidden")

    }
       
    }
   
  }

  //logic for pressing back btn
  if (target.getAttribute('data-type') === 'back') {
    document.querySelector(`.modal__${target.getAttribute('data-number')}`).classList.toggle("modal__window__hidden")
    document.querySelector(`.modal__${target.getAttribute('data-prev')}`).classList.toggle("modal__window__hidden")
  }

  //logic for closing on click outside
  if (target.getAttribute('data-close') === 'true'){
    closeMainModal()
  }

  //logic for chosing value
  if (target.hasAttribute('data-choose')){
    if (target.hasAttribute('data-other')) {
      document.querySelectorAll('.modal__inner [data-choose="true"]').forEach(elem => {
        if (elem.classList.contains("active__item"))
          elem.classList.toggle("active__item")
      })
      
      target.classList.toggle("active__item")
      if (document.querySelector('.modal__other input').hasAttribute('disabled'))
        document.querySelector('.modal__other input').removeAttribute('disabled')
      else document.querySelector('.modal__other input').setAttribute('disabled', 'true')
    }
    else {
      document.querySelectorAll('.modal__inner [data-choose="true"]').forEach(elem => {
        if (elem.classList.contains("active__item"))
          elem.classList.toggle("active__item")
      })
      target.classList.toggle("active__item")
    }

  }

 
})

