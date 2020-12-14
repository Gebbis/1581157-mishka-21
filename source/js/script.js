var mainNavigation = document.querySelector(".main-navigation");
var menuToggle = mainNavigation.querySelector(".main-navigation__toggle");
var modalPopup = document.querySelector(".modal-popup");

mainNavigation.classList.add("main-navigation--closed");

menuToggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  mainNavigation.classList.toggle("main-navigation--opened");
})
