var togglePrev = document.querySelector(".reviews__toggle--prev");
var toggleNext = document.querySelector(".reviews__toggle--next");
var slide = document.querySelector(".reviews__item");

toggleNext.addEventListener("click", function (evt) {
  evt.preventDefault();

  var slideCurrent = document.querySelector(".reviews__item--show");

  var slideNext = slideCurrent.nextElementSibling;

  if (!slideNext) return; // нет следующего слайда -- выход

  slideCurrent.classList.remove("reviews__item--show");
  slideNext.classList.add("reviews__item--show");
});

togglePrev.addEventListener("click", function (evt) {
  evt.preventDefault();

  var slideCurrent = document.querySelector(".reviews__item--show");

  var slidePrev = slideCurrent.previousElementSibling;

  if (!slidePrev) return; // нет предыдущего слайда -- выход

  slideCurrent.classList.remove("reviews__item--show");
  slidePrev.classList.add("reviews__item--show");
});
