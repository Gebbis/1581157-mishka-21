var mainNavigation = document.querySelector(".main-navigation");
var menuToggle = mainNavigation.querySelector(".main-navigation__toggle");

mainNavigation.classList.add("main-navigation--closed");

menuToggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  mainNavigation.classList.toggle("main-navigation--opened");
})

var modalPopup = document.querySelector(".modal-popup");
var popupOpen = document.querySelectorAll(".modal-popup__open-button");

for (var i = 0; i < popupOpen.length; i++) {
  popupOpen[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    modalPopup.classList.add("modal-popup--active");
  })
}
