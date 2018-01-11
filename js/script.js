"use strict";

(function () {
  var navMain = document.querySelector(".main-nav");
  var navToggle = document.querySelector(".main-nav__toggle");

  var modal = document.querySelector(".modal");
  var overlay = document.querySelector(".overlay");
  var modalBtns = document.querySelectorAll(".btn-modal");

  // Мобильное меню
  navMain.classList.remove("main-nav--nojs");
  navMain.classList.add("main-nav--closed");

  navToggle.addEventListener("click", function() {
    navMain.classList.toggle("main-nav--closed");
    navMain.classList.toggle("main-nav--opened");
  });

  // Модальное окно
  if (modal && overlay && modalBtns) {
    modalBtns = Array.prototype.slice.call(modalBtns); // modalBtns -- массив

    var closeModal = function() {
      if (modal.classList.contains("modal--show")) {
        modal.classList.remove("modal--show");
      }
      if (overlay.classList.contains("overlay--show")) {
        overlay.classList.remove("overlay--show");
      }
    }

    modalBtns.forEach(function(elem) {
      elem.addEventListener("click", function(evt) {
        evt.preventDefault();
        modal.classList.add("modal--show");
        overlay.classList.add("overlay--show");
      });
    });

    overlay.addEventListener("click", closeModal);

    modal.addEventListener("click", function(evt) {
      evt.stopPropagation(); // для предотвращения закрытия модального окна при клике по нему. Источник: https://learn.javascript.ru/event-bubbling#прекращение-всплытия
    });

    window.addEventListener("keydown", function(evt) {
      if (evt.keyCode === 27) {
        closeModal();
      }
    });
  }
})();

(function () {
  // Слайдер
  var togglePrev = document.querySelector(".reviews__toggle--prev");
  var toggleNext = document.querySelector(".reviews__toggle--next");

  if(togglePrev && toggleNext) {
    toggleNext.addEventListener("click", function (evt) {
      evt.preventDefault();

      var slideCurrent = document.querySelector(".reviews__item--show");
      var slideNext = slideCurrent.nextElementSibling;

      if (!slideNext) return; // нет следующего слайда -- выход
      if (!slideNext.nextElementSibling) {
        toggleNext.classList.add("reviews__toggle--disabled");
      } // елси следующий слайд -- последний, то кнопка становится недоступной

      slideCurrent.classList.remove("reviews__item--show");
      slideNext.classList.add("reviews__item--show");
      togglePrev.classList.remove("reviews__toggle--disabled"); // делаем кнопку "Предыдущий отзыв" доступной для нажатия
    });

    togglePrev.addEventListener("click", function (evt) {
      evt.preventDefault();

      var slideCurrent = document.querySelector(".reviews__item--show");
      var slidePrev = slideCurrent.previousElementSibling;

      if (!slidePrev) return; // нет предыдущего слайда -- выход
      if (!slidePrev.previousElementSibling) {
        togglePrev.classList.add("reviews__toggle--disabled");
      } // елси предыдущий слайд -- первый, то кнопка становится недоступной

      slideCurrent.classList.remove("reviews__item--show");
      slidePrev.classList.add("reviews__item--show");
      toggleNext.classList.remove("reviews__toggle--disabled"); // делаем кнопку "Следующий отзыв" доступной для нажатия
    });
  }
})();


(function () {
  // Интерактивня карта
  var interactiveMap = document.querySelector(".contacts__map");

  if (interactiveMap) {
    window.initMap = function () {
      var location = {lat: 59.938705, lng: 30.322992};
      var map = new google.maps.Map(interactiveMap, {
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
  }
})();
