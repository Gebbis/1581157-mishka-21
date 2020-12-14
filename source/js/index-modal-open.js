var productButton = document.querySelector(".product__button");

productButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalPopup.classList.add("modal-popup--active");
})
