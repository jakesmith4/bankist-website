'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Open Modal
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// Close Modal
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
let flag = true;
const checkbox = document.querySelector('.checkbox__toggle');
checkbox.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  navLinks.classList.toggle('dark');
  navToggle.classList.toggle('dark');
  modal.classList.toggle('dark');
  flag = !flag;
  if (!flag) {
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
message.style.position = 'fixed';
message.style.bottom = '0';
message.style.zIndex = '200';
message.style.background = '#37383d';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 25 + 'px';

// Delete Cookie Message
const cookieBtn = document.querySelector('.btn--close--cookie');
// console.log(cookieBtn);
cookieBtn.addEventListener('click', () => {
  message.remove();
});

// Lecture
//////////////////////////////////
/////////////////////////////////
////////////////////////////////

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// console.log(document.querySelector('.header'));
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// console.log(document.getElementById('section--1'));
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// Creating and Inserting Elements
// .insertAjacentHTML

// const h1 = document.querySelector('h1');
// h1.insertAdjacentHTML('beforeend', '<p>hello world</p>');

// header.prepend(message);

// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Styles

message.style.boxShadow = `inset 0px 11px 3px -10px #CCC`;
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);
logo.setAttribute('company', 'Bankist');
// console.log(logo.getAttribute('designer'));

const linkTwitter = document.querySelector('.twitter-link');
const navLink1 = document.querySelector('.nav__link');
console.log(navLink1);
console.log(navLink1.href);
console.log(navLink1.getAttribute('href'));
console.log(linkTwitter.href);
console.log(linkTwitter.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// document.body.style.background = '#222';
