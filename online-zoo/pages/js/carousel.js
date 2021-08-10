const petLeftBtn = document.querySelector(".pets__left-btn");
const petRightBtn = document.querySelector(".pets__right-btn");

const testimonialsLeftBtn = document.querySelector(".testimonials__left-btn");
const testimonialsRightBtn = document.querySelector(".testimonials__btn:last-child");

const leftDirection = "left";
const rightDirection = "right";

const petRowClass = "pets__row";
const petCardClass = "pets__card";

const testimonialsRowClass = "testtimonials__row";
const testimonialsCardClass = "testimonials__card";

const testimonialsTimer = 15 * 1000
const testimonialsDelay = 60 * 1000

const findFirstCard = (rowClass, cardClass) => {
  return document.querySelector(
    `.${rowClass} .${cardClass}:first-child`
  );
};

const findLastCard = (rowClass, cardClass) => {
  return document.querySelector(
    `.${rowClass} .${cardClass}:last-child`
  );
};

const swipe = (direction, rowClass, cardClass) => {
  const rowNode = document.querySelector(`.${rowClass}`);
  const swipeCount = 2

  switch (direction) {
    case "left":
      for (let i = 0; i < swipeCount; i++) {
        rowNode.prepend(findLastCard(rowClass, cardClass));
      }
      break;
    case "right":
      for (let i = 0; i < swipeCount; i++) {
        rowNode.append(findFirstCard(rowClass, cardClass));
      }
      break;
  }
};

let testimonialsInterval = setInterval(() => {
  swipe(rightDirection, testimonialsRowClass, testimonialsCardClass)
}, testimonialsTimer)

const addDelay = () => {
  clearInterval(testimonialsInterval)
  setTimeout(() => {
    testimonialsInterval = setInterval(() => {
      swipe(rightDirection, testimonialsRowClass, testimonialsCardClass)
    }, testimonialsTimer)
  }, testimonialsDelay)
}

petLeftBtn.addEventListener("click", () => swipe(leftDirection, petRowClass, petCardClass));
petRightBtn.addEventListener("click", () => swipe(rightDirection, petRowClass, petCardClass));

document.querySelectorAll('.testimonials__card').forEach(card => {
  card.addEventListener('click', addDelay)
})
testimonialsLeftBtn.addEventListener("click", () => {
  addDelay()
  swipe(leftDirection, testimonialsRowClass, testimonialsCardClass)
});
testimonialsRightBtn.addEventListener("click", () => {
  addDelay()
  swipe(rightDirection, testimonialsRowClass, testimonialsCardClass)
});


