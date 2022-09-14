'use strict';

///////////////////////////////////////
// Modal window
// ELEMENTS //
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
const btnScrollTo = document.querySelector('.btn--scroll-to');

// FUNCTIONS //
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// RUN Open Modal
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// RUN Close Modal
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Close Modal on Escape Key Press
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Open Navbar
navToggle.addEventListener('click', () =>
  navLinks.classList.toggle('nav__links--toggle')
);

// Dark Theme Toggle Button
let flag;
const checkbox = document.querySelector('.checkbox__toggle');
checkbox.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  navLinks.classList.toggle('dark');
  navToggle.classList.toggle('dark');
  modal.classList.toggle('dark');
  flag = !flag;
  if (flag) {
    document.documentElement.style.setProperty('--color-primary', '#ff585f');
  } else {
    document.documentElement.style.setProperty('--color-primary', '#5ec576');
  }
});

// Create Cookie Message and Append To UI
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';
const header = document.querySelector('.header');
header.append(message);

// Delete Cookie Message
const cookieBtn = document.querySelector('.btn--close--cookie');
cookieBtn.addEventListener('click', () => {
  message.remove();
});

// Page Navagation
btnScrollTo.addEventListener('click', () => {
  const section1 = document.querySelector('#section--1');
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', e => {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    // Get href value and store it into id var
    const id = e.target.getAttribute('href');
    // Select that element id and scroll it into view
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    // Close Nav Bar On Mobile
    navLinks.classList.remove('nav__links--toggle');
  }
});

// LECTURES //
//////////////////////////////////
/////////////////////////////////
////////////////////////////////
