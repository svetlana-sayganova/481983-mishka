var togglePrev = document.querySelector(".reviews__toggle--prev");
var toggleNext = document.querySelector(".reviews__toggle--next");

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
