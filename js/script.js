var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");
var modal = document.querySelector(".modal");
var overlay = document.querySelector(".overlay");
var btnBuy = document.querySelectorAll(".button--buy");


navMain.classList.remove("main-nav--nojs");
navMain.classList.add("main-nav--closed");

navToggle.addEventListener("click", function() {
  navMain.classList.toggle("main-nav--closed");
  navMain.classList.toggle("main-nav--opened");
});

for (var i = 0; i < btnBuy.length; i++) {
  btnBuy[i].addEventListener("click", function(evt) {
    evt.preventDefault();
    modal.classList.add("modal--show");
    overlay.classList.add("overlay--show");
  });
}

overlay.addEventListener("click", function(evt) {
  evt.preventDefault();
  modal.classList.remove("modal--show");
  overlay.classList.remove("overlay--show");
});

modal.addEventListener("click", function(evt) {
  evt.stopPropagation(); // для предотвращения закрытия модального окна при клике по нему. Источник: https://learn.javascript.ru/event-bubbling#прекращение-всплытия
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (modal.classList.contains("modal--show")) {
      modal.classList.remove("modal--show");
    }
    if (overlay.classList.contains("overlay--show")) {
      overlay.classList.remove("overlay--show");
    }
  }
});
