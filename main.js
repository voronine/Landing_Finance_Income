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

const rangeInput = document.getElementById('investmentRange');
const rangeValue = document.querySelector('.range-value');
const rangeInputIncome = document.getElementById('investmentRangeIncome');
const rangeValueIncome = document.querySelector('.range-value-income');

const range = document.querySelector(".range-slider");
const rangeIncome = document.querySelector(".range-slider-income");

function setInitialColorAndValue(element, valueElement) {
  const value = (element.value - element.min) / (element.max - element.min);
  const percent = value * 100;
  const color = 'linear-gradient(to right, rgba(33, 160, 56, 1) 0%, rgba(33, 160, 56, 1) ' + percent + '%, rgba(227, 237, 227, 1) ' + percent + '%, rgba(227, 237, 227, 1))';
  element.style.background = color;
  valueElement.textContent = element.value;
}

setInitialColorAndValue(range, rangeValue);
setInitialColorAndValue(rangeIncome, rangeValueIncome);

function updateRangeAndColor(element, valueElement, relatedElement) {
  const value = (element.value - element.min) / (element.max - element.min);
  const percent = value * 100;
  const color = 'linear-gradient(to right, rgba(33, 160, 56, 1) 0%, rgba(33, 160, 56, 1) ' + percent + '%, rgba(227, 237, 227, 1) ' + percent + '%, rgba(227, 237, 227, 1))';
  element.style.background = color;
  valueElement.textContent = element.value;

  const relatedValue = Math.round((element.value / element.max) * relatedElement.max);
  relatedElement.value = relatedValue;
  setInitialColorAndValue(relatedElement, relatedElement == rangeInputIncome ? rangeValueIncome : rangeValue);
}

rangeInput.addEventListener('input', function() {
  updateRangeAndColor(rangeInput, rangeValue, rangeInputIncome);
}); 

rangeInputIncome.addEventListener('input', function() {
  updateRangeAndColor(rangeInputIncome, rangeValueIncome, rangeInput);
});