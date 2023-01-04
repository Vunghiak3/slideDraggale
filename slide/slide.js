// const elment = document.querySelector(".box");

// let posX1;
// let posX2;
// let posY1;
// let posY2;

// elment.addEventListener("mousedown", dragStart);
// // elment.addEventListener("touchstart", dragStart);
// // elment.addEventListener("touchmove", dragMove);
// // elment.addEventListener("touchend", dragEnd);

// function dragStart(e) {
//   e.preventDefault();
//   if (e.type == "touchStart") {
//     // posX1 = e.touches[0].clientX;
//     // posY1 = e.touches[0].clientY;
//   } else {
//     posX1 = e.clientX;
//     posY1 = e.clientY;
//     document.onmouseup = dragEnd;
//     document.onmousemove = dragMove;
//   }
// }

// function dragMove(e) {
//   if (e.type == "touchmove") {
//     // posX2 = posX1 - e.touches[0].clientX;
//     // posX1 = e.touches[0].clientX;
//     // posY2 = posY1 - e.touches[0].clientY;
//     // posY1 = e.touches[0].clientY;
//   } else {
//     posX2 = posX1 - e.clientX;
//     posX1 = e.clientX;
//     posY2 = posY1 - e.clientY;
//     posY1 = e.clientY;
//   }

//   elment.style.left = `${elment.offsetLeft - posX2}px`;
//   elment.style.top = `${elment.offsetTop - posY2}px`;
// }

// function dragEnd() {
//   document.onmouseup = null;
//   document.onmousemove = null;
// }

const box = document.querySelector(".box");

let posX1;
let posX2;

box.addEventListener("mousedown", function (e) {
  e.preventDefault();
  posX1 = e.clientX;
  document.onmouseup = dragEnd;
  document.onmousemove = dragMove;
});

function dragMove(e) {
  posX2 = posX1 - e.clientX;
  posX1 = e.clientX;
  box.style.left = `${box.offsetLeft - posX2}px`;
}

function dragEnd(e) {
  document.onmouseup = null;
  document.onmousemove = null;
}
