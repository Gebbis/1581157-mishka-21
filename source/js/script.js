var mainNavigation = document.querySelector(".main-navigation");
var menuToggle = mainNavigation.querySelector(".main-navigation__toggle");

mainNavigation.classList.add("main-navigation--closed");

menuToggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  mainNavigation.classList.toggle("main-navigation--opened");
})

var modalPopup = document.querySelector(".modal-popup");
var itemCarts = document.querySelectorAll(".item__cart");
var productButton = document.querySelector(".product__button");

for (var i = 0; i < itemCarts.length; i++) {
  itemCarts[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    modalPopup.classList.add("modal-popup--active");
  })
}

if (productButton) {
  productButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    modalPopup.classList.add("modal-popup--active");
  })
}
