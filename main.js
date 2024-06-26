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

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let nameInput = document.getElementById("name");
  let lastNameInput = document.getElementById("lastName");
  let emailInput = document.getElementById("email");
  let phoneInput = document.getElementById("phone");
  let nameError = document.getElementById("nameError");
  let lastNameError = document.getElementById("lastNameError");
  let emailError = document.getElementById("emailError");
  let phoneError = document.getElementById("phoneError");
  let errorMessage = document.getElementById("errorMessage");
  let name = nameInput.value.trim();
  let lastName = lastNameInput.value.trim();
  let email = emailInput.value.trim();
  let phone = phoneInput.value.trim();
  let isValid = true;
  
  if (name === "") {
      nameError.textContent = "Будь ласка, введіть ім'я";
      nameInput.focus();
      isValid = false;
  } else if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s']*$/u.test(name)) {
      nameError.textContent = "Ім'я повинно містити лише букви";
      nameInput.focus();
      isValid = false;
  } else {
      nameInput.value = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  if (lastName === "") {
      lastNameError.textContent = "Будь ласка, введіть прізвище";
      lastNameInput.focus();
      isValid = false;
  } else if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s']*$/u.test(name)) {
      lastNameError.textContent = "Прізвище повинно містити лише букви";
      lastNameInput.focus();
      isValid = false;
  } else {
      lastNameInput.value = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
  }

  if (email === "") {
      emailError.textContent = "Будь ласка, введіть email";
      emailInput.focus();
      isValid = false;
  } else if (!isValidEmail(email)) {
      emailError.textContent = "Невірний формат email";
      emailInput.focus();
      isValid = false;
  }

  if (phone === "") {
      phoneError.textContent = "Будь ласка, введіть номер телефону";
      phoneInput.focus();
      isValid = false;
  } else if (!isValidPhone(phone)) {
      phoneError.textContent = "Невірний формат номера телефону";
      phoneInput.focus();
      isValid = false;
  }

  if (!isValid) {
      event.preventDefault();
  } else {
      errorMessage.style.display = "none";
  }

  let formData = {
    name: name,
    lastName: lastName,
    email: email,
    phone: phone
  };

  console.log("Вхідна інформація:", formData);

  this.reset();
});

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  var phoneRegex = /^(?:\+\d{1,3}\s?)?\(?\d{2,3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
  return phoneRegex.test(phone);
}

document.getElementById("name").addEventListener("input", function(event) {
  let nameInput = event.target;
  let nameError = document.getElementById("nameError");
  let errorMessage = document.getElementById("errorMessage");
  let name = nameInput.value.trim();
  
  if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s']*$/u.test(name)) {
      nameError.textContent = "Ім'я повинно содержати тільки букви";
      errorMessage.style.display = "block";
  } else {
      nameError.textContent = "";
      errorMessage.style.display = "none";
  }
});

document.getElementById("lastName").addEventListener("input", function(event) {
  let lastNameInput = event.target;
  let lastNameError = document.getElementById("lastNameError");
  let errorMessage = document.getElementById("errorMessage");
  let lastName = lastNameInput.value.trim();
  
  if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s']*$/u.test(lastName)) {
      lastNameError.textContent = "Прізвище повинно містити лише букв";
      errorMessage.style.display = "block";
  } else {
      lastNameError.textContent = "";
      errorMessage.style.display = "none";
  }
});

document.getElementById("email").addEventListener("input", function(event) {
  let emailInput = event.target;
  let emailError = document.getElementById("emailError");
  let errorMessage = document.getElementById("errorMessage");
  let email = emailInput.value.trim();
  
  if (!isValidEmail(email)) {
      emailError.textContent = "Невірний формат email";
      errorMessage.style.display = "block";
  } else {
      emailError.textContent = "";
      errorMessage.style.display = "none";
  }
});

document.getElementById("phone").addEventListener("input", function(event) {
  let phoneInput = event.target;
  let phoneError = document.getElementById("phoneError");
  let errorMessage = document.getElementById("errorMessage");
  let phone = phoneInput.value.trim();
  
  if (!isValidPhone(phone)) {
      phoneError.textContent = "Невірний формат номера телефону";
      errorMessage.style.display = "block";
  } else {
      phoneError.textContent = "";
      errorMessage.style.display = "none";
  }
});

let burger = document.querySelector('.header__burger');
let menuOverlay = document.querySelector('.menu-overlay');
let menuLinks = document.querySelectorAll('.menu a');

burger.addEventListener("click", function () {
    this.classList.toggle("active");
    menuOverlay.style.left = menuOverlay.style.left === '0px' ? '-100%' : '0px';
    
    document.body.classList.toggle('no-scroll');
});

menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        burger.classList.remove('active');
        menuOverlay.style.left = '-100%';
        
        document.body.classList.remove('no-scroll');
        
        let target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('scrollToForm').addEventListener('click', function() {
  document.getElementById('form').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('scrollToForm2').addEventListener('click', function() {
  document.getElementById('form').scrollIntoView({ behavior: 'smooth' });
});
