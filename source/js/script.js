var mainNavigation = document.querySelector(".main-navigation");
var menuToggle = mainNavigation.querySelector(".main-navigation__toggle");

mainNavigation.classList.add("main-navigation--closed");

menuToggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  mainNavigation.classList.toggle("main-navigation--opened");
})
