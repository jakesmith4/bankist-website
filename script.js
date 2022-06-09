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
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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
  dotContainer.classList.toggle('dark');
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
// console.log(cookieBtn);
cookieBtn.addEventListener('click', () => {
  message.remove();
});

// Learn More Scroll TO
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // OLDSCHOOL WAY OF SMOOTH SCROLL
  // window.scrollTo(
  //   s1coords.left + window.pageYOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // OR

  // OLDSCHOOL WAY OF SMOOTH SCROLL
  // window.scrollTo({
  //   left: s1coords.left + window.pageYOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // MODERN SMOOTH SCROLL
  section1.scrollIntoView();
});

// PAGE NAVIGATION

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');

    if (id !== '#')
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// TABBED COMPONENT
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // Guard Clause
  if (!clicked) return;

  // Remove Active Classes From All Btns
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  // Add Active Tab to Clicked Btn
  clicked.classList.add('operations__tab--active');

  // Remove Active Classes From ALl Content Tabs
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  // Activate Content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu Fade Animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "Argument" Into Handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// STICKY NAVIGATION
// OLD WAY OF DOING IT
// const initalCoords = section1.getBoundingClientRect();
// console.log(initalCoords);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (this.window.scrollY > initalCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// STICKY NAVIGATION
// NEW WAY OF DOING IT
// THE INTERSECTION OBSERVIER API
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);

// Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // Guard Cause
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  // Guard Cause
  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

// Create Dots
const createDots = function () {
  slides.forEach((s, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDot(0);

// Go To Slide Function
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

// Next Slide Function
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

//  Prev Slide Function
const prevSlide = function () {
  if (curSlide == 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

// Next Slide
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

// Slide Control With Arrows On Keyboard
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

// Add Click Functionality To Dots
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

// LECTURES //
//////////////////////////////////
/////////////////////////////////
////////////////////////////////
