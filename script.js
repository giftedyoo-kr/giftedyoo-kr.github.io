const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

function updateHeader() {
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader);
updateHeader();

menuButton.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
  });
});
