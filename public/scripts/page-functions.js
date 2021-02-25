window.addEventListener("load", pageFunctions);

function pageFunctions() {
  hamburgerMenu();
  testimonialsCarousel();
}
function testimonialsCarousel() {
  $(".owl-carousel").owlCarousel({
    items: 1,
    margin: 10,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
  });
}
function hamburgerMenu() {
  const icon = document.getElementById("hamburger-icon");
  const nav = document.getElementById("navigation");
  icon.addEventListener("click", () => {
    icon.classList.toggle("open");
    nav.classList.toggle("active");
  });
}
