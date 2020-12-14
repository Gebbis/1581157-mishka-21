var itemCarts = document.querySelectorAll(".item__cart");

for (var i = 0; i < itemCarts.length; i++) {
  itemCarts[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    modalPopup.classList.add("modal-popup--active");
  })
}
