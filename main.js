document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll(".nav__link:not(.a_calculate)");
  const calculateLink = document.querySelector(".a_calculate");

  links.forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      links.forEach(link => {
        link.classList.remove("is-active");
      });
      this.classList.add("is-active");
    });
  });

  calculateLink.addEventListener("click", function(event) {
    event.preventDefault();
    links.forEach(link => {
      link.classList.remove("is-active");
    });
    this.classList.add("is-calculate-active");
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const logo = document.querySelector('.logo');

  logo.addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// range

const rangeInput = document.getElementById('investmentRange');
const rangeValue = document.querySelector('.range-value');

rangeInput.addEventListener('input', function() {
    rangeValue.textContent = this.value;
});

const range = document.querySelector(".range-slider");

function setInitialColor() {
  const value = (range.value - range.min) / (range.max - range.min);
  const percent = value * 100;
  const color = 'linear-gradient(to right, rgba(33, 160, 56, 1) 0%, rgba(33, 160, 56, 1) ' + percent + '%, rgba(227, 237, 227, 1) ' + percent + '%, rgba(227, 237, 227, 1))';
  range.style.background = color;
}

setInitialColor();

range.addEventListener("input", function() {
  const value = (range.value - range.min) / (range.max - range.min);
  const percent = value * 100;
  const color = 'linear-gradient(to right, rgba(33, 160, 56, 1) 0%, rgba(33, 160, 56, 1) ' + percent + '%, rgba(227, 237, 227, 1) ' + percent + '%, rgba(227, 237, 227, 1))';
  range.style.background = color;
});