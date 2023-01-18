const itemSlide = document.querySelectorAll(".item-slide");
var slideWidth = itemSlide[0].clientWidth;

const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");
const slide = document.querySelector(".slide");

let index = 1;
const firstSlide = itemSlide[0].cloneNode(true);
const lastSlide = itemSlide[itemSlide.length - 1].cloneNode(true);

let slideLength = itemSlide.length;
slide.appendChild(firstSlide);
slide.insertBefore(lastSlide, itemSlide[0]);
const dots = document.querySelector(".dots");
for (var i = 1; i <= slideLength; i++) {
  dots.innerHTML += '<div class="dot-item" data-indexdot = ' + i + "></div>";
}

const dotItem = document.querySelectorAll(".dot-item");
dotItem[0].classList.add("active-item");
[...dotItem].forEach((g) => g.classList.add("transdot"));

[...dotItem].forEach(function (item) {
  item.addEventListener("click", function (c) {
    [...dotItem].forEach((g) => g.classList.remove("active-item"));
    c.target.classList.add("active-item");
    const dotIndex = parseInt(c.target.dataset.indexdot);
    index = dotIndex;
    console.log("🚀 ~ file: slide.js:29 ~ index", index);
    slide.classList.add("transition");
    slide.style.left = `-${index * slideWidth}px`;
  });
});

let initialPosition;
let finalPosition;
let canISlide = true;
let posX1;
let posX2;

slide.addEventListener("mousedown", dragStart);
slide.addEventListener("touchstart", dragStart);
slide.addEventListener("touchend", dragEnd);
slide.addEventListener("touchmove", dragMove);

btnNext.addEventListener("click", function () {
  switchSlide("next");
});
btnPrev.addEventListener("click", function () {
  switchSlide("prev");
});
slide.addEventListener("transitionend", checkIndex);

function dragMove(e) {
  if (e.type == "touchmove") {
    posX2 = posX1 - e.touches[0].clientX;
    posX1 = e.touches[0].clientX;
  } else {
    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;
  }
  slide.style.left = `${slide.offsetLeft - posX2}px`;
}

function dragEnd() {
  finalPosition = slide.offsetLeft;
  if (finalPosition - initialPosition < -1) {
    switchSlide("next", "dragging");
  } else if (finalPosition - initialPosition > 1) {
    switchSlide("prev", "dragging");
  } else {
    slide.style.left = `${initialPosition}px`;
  }
  document.onmouseup = null;
  document.onmousemove = null;
}

function dragStart(e) {
  if (canISlide) {
    e.preventDefault();
    initialPosition = slide.offsetLeft;
    if (e.type == "touchstart") {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragMove;
    }
  }
}

function checkIndex() {
  slide.classList.remove("transition");

  if (index === 0) {
    slide.style.left = `-${slideLength * slideWidth}px`;
    dotItem[3].classList.add("active-item");
    index = 4;
  }

  if (index === slideLength + 1) {
    slide.style.left = `-${slideWidth}px`;
    dotItem[0].classList.add("active-item");
    index = 1;
  }
  canISlide = true;
}

function switchSlide(arg, arg2) {
  slide.classList.add("transition");
  [...dotItem].forEach((g) => g.classList.remove("active-item"));
  if (!arg2) {
    initialPosition = slide.offsetLeft;
  }
  if (canISlide) {
    slide.style.left = `${initialPosition - slideWidth}px`;
    if (arg === "next") {
      index++;
      console.log("🚀 ~ file: slide.js:122 ~ switchSlide ~ index", index);
    } else {
      index--;
      console.log("🚀 ~ file: slide.js:126 ~ switchSlide ~ index", index);
      slide.style.left = `${initialPosition + slideWidth}px`;
    }
    if ((index < 5) & (index > 0)) {
      dotItem[index - 1].classList.add("active-item");
    }
  }
  canISlide = false;
}
