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

let initialPosition;
let finalPosition;
let canISlide = true;
let posX1;
let posX2;

function dragMove(e) {
  posX2 = posX1 - e.clientX;
  posX1 = e.clientX;
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
    posX1 = e.clientX;
    document.onmouseup = dragEnd;
    document.onmousemove = dragMove;
  }
}

slide.addEventListener("mousedown", dragStart);

function switchSlide(arg, arg2) {
  slide.classList.add("transition");
  if (!arg2) {
    initialPosition = slide.offsetLeft;
  }
  if (canISlide) {
    if (arg === "next") {
      index++;
      slide.style.left = `${initialPosition - slideWidth}px`;
    } else {
      index--;
      slide.style.left = `${initialPosition + slideWidth}px`;
    }
  }
  canISlide = false;
}

function checkIndex() {
  slide.classList.remove("transition");

  if (index === 0) {
    slide.style.left = `-${slideLength * slideWidth}px`;
    index = 4;
  }

  if (index === slideLength + 1) {
    slide.style.left = `-${slideWidth}px`;
    index = 1;
  }
  canISlide = true;
}

btnNext.addEventListener("click", function () {
  switchSlide("next");
});
btnPrev.addEventListener("click", function () {
  switchSlide("prev");
});
slide.addEventListener("transitionend", checkIndex);
