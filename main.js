document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);

          if (targetSection) {
              const offsetTop = targetSection.offsetTop;
              window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
              });
          }
      });
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

const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.slide');
const carousel = document.querySelector('.carusel');

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));

  slides[index].classList.add('active');
}

function showNextSlide() {
  const currentSlideIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
  const nextSlideIndex = (currentSlideIndex + 1) % slides.length;

  showSlide(nextSlideIndex);
}

function showPreviousSlide() {
  const currentSlideIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
  const previousSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;

  showSlide(previousSlideIndex);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    dots.forEach(dot => dot.classList.remove('active'));

    dot.classList.add('active');

    showSlide(index);

    carousel.scrollLeft = index * carousel.offsetWidth;
  });
});

let startX = 0;
let endX = 0;

carousel.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener('touchmove', e => {
  endX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', () => {
  if (startX - endX > 50) {
    showNextSlide();
  } else if (endX - startX > 50) {
    showPreviousSlide();
  }
});

showSlide(0);

function updateActiveSlide(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  slides.forEach(slide => slide.classList.remove('active'));

  dots[index].classList.add('active');
  slides[index].classList.add('active');
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    updateActiveSlide(index);
  });
});

function showNextSlide() {
  const currentSlideIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
  const nextSlideIndex = (currentSlideIndex + 1) % slides.length;

  updateActiveSlide(nextSlideIndex);
}

function showPreviousSlide() {
  const currentSlideIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
  const previousSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;

  updateActiveSlide(previousSlideIndex);
}
