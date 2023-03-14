const menuButton = document.getElementById("menu");
const closeButton = document.getElementById("close-menu");
const menuList = document.querySelector("nav ul");

menuButton.addEventListener("click", function () {
  menuList.classList.toggle("menu-visible");
});

closeButton.addEventListener("click", function () {
  menuList.classList.toggle("menu-visible");
});

