window.addEventListener("load", pageFunctions);

function pageFunctions() {
  hamburgerMenu();
  testimonialsCarousel();
  contactForm();
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
function validateForm() {
  let inputState = this.validity;
  console.log(inputState);

  this.classList.add("selected");

  let label = document.querySelector("label.selected");
  label.classList.remove("selected");
  lable = document.querySelector(`label[for="${this.id}"]`);
  lable.classList.add("selected");

  this.setCustomValidity("");
  switch (!this.checkValidity()) {
    case inputState.badInput:
      this.setCustomValidity(`Please enter a valid ${label.innerText}`);
      break;

    case inputState.valueMissing:
      this.setCustomValidity(`Please eneter your ${label.innerText}`);
      break;

    case inputState.patternMismatch:
      this.setCustomValidity(`Please enter a valid ${label.innerText}`);
      break;

    default:
      break;
  }
  this.reportValidity();

  const form = document.getElementById("contact-form");
  const sendButton = document.getElementById("sendForm");
  console.log(form.checkValidity());

  if (form.checkValidity()) {
    sendButton.disabled = false;
    sendButton.addEventListener("click", sendForm);
  } else {
    sendButton.disabled = true;
    sendButton.removeEventListener("click", sendForm);
  }
}
function contactForm() {
  const allInputs = document.querySelectorAll(".form-input");
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener("focus", validateForm);
    allInputs[i].addEventListener("input", validateForm);
  }
}
async function sendForm(e) {
  e.preventDefault();
  const form = document.getElementById("contact-form");
  const data = new FormData(form);

  const endpint = "/contact";
  const options = {
    method: "POST",
    body: data,
  };
  const req = new Request(endpint, options);

  const response = await fetch(req);
  const responseJson = await response.json();

  console.log(responseJson);
}
