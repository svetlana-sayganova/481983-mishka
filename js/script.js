var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");
var modal = document.querySelector(".modal");
var overlay = document.querySelector(".overlay");
var btnModal = document.querySelectorAll(".btn-modal");


navMain.classList.remove("main-nav--nojs");
navMain.classList.add("main-nav--closed");

navToggle.addEventListener("click", function() {
  navMain.classList.toggle("main-nav--closed");
  navMain.classList.toggle("main-nav--opened");
});

for (var i = 0; i < btnModal.length; i++) {
  btnModal[i].addEventListener("click", function(evt) {
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

function initMap() {
  var location = {lat: 59.938705, lng: 30.322992};
  var map = new google.maps.Map(document.querySelector(".contacts__map"), {
    zoom: 17,
    center: location
  });

  var image = {  // для отображения кастомного маркера в IE. Источник: https://stackoverflow.com/a/40770331
    url: "img/icon-map-pin.svg",
    scaledSize: new google.maps.Size(66, 101),
  }

  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: "Мишка",
    optimized: false,
    icon: image
  });
}
