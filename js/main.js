"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var slider = document.querySelector('.about-slider-news');
  if (!slider) return;
  var track = slider.querySelector('.about-slider-news__track');
  var cards = slider.querySelectorAll('.about-slider-news__card');
  var prevBtn = slider.querySelector('.about-slider-news__nav-btn--prev');
  var nextBtn = slider.querySelector('.about-slider-news__nav-btn--next');
  var sliderContainer = slider.querySelector('.about-slider-news__container');
  if (!track || !cards.length || !prevBtn || !nextBtn || !sliderContainer) return;
  var cardWidth = 330;
  var gap = 22;
  var slideStep = cardWidth + gap;
  var totalSlides = cards.length;
  var breakpoint = 1024;
  var mobileBreakpoint = 360;
  var currentStep = 0;
  var maxSteps = 0;
  var isSliderActive = false;
  var touchStartX = 0;
  var touchEndX = 0;
  var touchStartY = 0;
  var touchEndY = 0;
  var isMouseDown = false;
  var minSwipeDistance = 50;
  function updateCardDimensions() {
    if (window.innerWidth <= mobileBreakpoint) {
      cardWidth = 270;
    } else {
      cardWidth = 330;
    }
    slideStep = cardWidth + gap;
  }
  function checkSliderActive() {
    return window.innerWidth < breakpoint;
  }
  function resetSlider() {
    track.style.transform = '';
    currentStep = 0;
  }
  function calculateMaxSteps() {
    if (!isSliderActive) {
      maxSteps = 0;
      return;
    }
    var containerWidth = sliderContainer.offsetWidth;
    var totalSlidesWidth = totalSlides * slideStep - gap;
    if (containerWidth >= totalSlidesWidth) {
      maxSteps = 0;
    } else {
      var visibleSlides = Math.floor(containerWidth / slideStep);
      maxSteps = totalSlides - visibleSlides;
    }
    if (currentStep > maxSteps) {
      currentStep = maxSteps;
    }
  }
  function updateSliderPosition() {
    if (!isSliderActive) {
      resetSlider();
      return;
    }
    var translateX;
    if (currentStep === maxSteps && maxSteps > 0) {
      var containerWidth = sliderContainer.offsetWidth;
      var totalSlidesWidth = totalSlides * slideStep - gap;
      translateX = -(totalSlidesWidth - containerWidth);
    } else {
      translateX = -currentStep * slideStep;
    }
    track.style.transform = "translateX(".concat(translateX, "px)");
    prevBtn.disabled = currentStep === 0;
    prevBtn.style.opacity = currentStep === 0 ? '0.3' : '1';
    nextBtn.disabled = currentStep >= maxSteps;
    nextBtn.style.opacity = currentStep >= maxSteps ? '0.3' : '1';
  }
  function nextSlide() {
    if (!isSliderActive) return;
    if (currentStep < maxSteps) {
      currentStep++;
      updateSliderPosition();
    }
  }
  function prevSlide() {
    if (!isSliderActive) return;
    if (currentStep > 0) {
      currentStep--;
      updateSliderPosition();
    }
  }
  function handleTouchStart(e) {
    if (!isSliderActive) return;
    var touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }
  function handleTouchMove(e) {
    if (!isSliderActive) return;
    var touch = e.touches[0];
    var deltaX = Math.abs(touch.clientX - touchStartX);
    var deltaY = Math.abs(touch.clientY - touchStartY);
    if (deltaX > deltaY) {
      e.preventDefault();
    }
  }
  function handleTouchEnd(e) {
    if (!isSliderActive) return;
    var touch = e.changedTouches[0];
    touchEndX = touch.clientX;
    touchEndY = touch.clientY;
    handleSwipe();
  }
  function handleSwipe() {
    var deltaX = touchEndX - touchStartX;
    var deltaY = touchEndY - touchStartY;
    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  }
  function handleMouseDown(e) {
    if (!isSliderActive) return;
    isMouseDown = true;
    touchStartX = e.clientX;
    touchStartY = e.clientY;
    e.preventDefault();
  }
  function handleMouseMove(e) {
    if (!isSliderActive || !isMouseDown) return;
    var deltaX = Math.abs(e.clientX - touchStartX);
    var deltaY = Math.abs(e.clientY - touchStartY);
    if (deltaX > deltaY) {
      e.preventDefault();
    }
  }
  function handleMouseUp(e) {
    if (!isSliderActive || !isMouseDown) return;
    isMouseDown = false;
    touchEndX = e.clientX;
    touchEndY = e.clientY;
    handleSwipe();
  }
  function initSlider() {
    updateCardDimensions();
    var shouldBeActive = checkSliderActive();
    if (shouldBeActive && !isSliderActive) {
      isSliderActive = true;
      currentStep = 0;
      calculateMaxSteps();
      updateSliderPosition();
    } else if (!shouldBeActive && isSliderActive) {
      isSliderActive = false;
      resetSlider();
    } else if (isSliderActive) {
      calculateMaxSteps();
      updateSliderPosition();
    }
  }

  // Event listeners для кнопок
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Touch events
  sliderContainer.addEventListener('touchstart', handleTouchStart, {
    passive: false
  });
  sliderContainer.addEventListener('touchmove', handleTouchMove, {
    passive: false
  });
  sliderContainer.addEventListener('touchend', handleTouchEnd, {
    passive: false
  });

  // Mouse events
  sliderContainer.addEventListener('mousedown', handleMouseDown);
  sliderContainer.addEventListener('mousemove', handleMouseMove);
  sliderContainer.addEventListener('mouseup', handleMouseUp);
  sliderContainer.addEventListener('mouseleave', function () {
    if (isMouseDown) {
      isMouseDown = false;
    }
  });

  // Keyboard support
  slider.addEventListener('keydown', function (e) {
    if (!isSliderActive) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  });

  // Resize handler
  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      initSlider();
    }, 200);
  });

  // Ініціалізація
  initSlider();
});
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var slider = document.querySelector('.about-slider-team');
  if (!slider) return;
  var track = slider.querySelector('.about-slider-team__track');
  var cards = slider.querySelectorAll('.about-slider-team__card');
  var prevBtn = slider.querySelector('.about-slider-team__nav-btn--prev');
  var nextBtn = slider.querySelector('.about-slider-team__nav-btn--next');
  var sliderContainer = slider.querySelector('.about-slider-team__container');
  if (!track || !cards.length || !prevBtn || !nextBtn || !sliderContainer) return;
  var cardWidth = 330;
  var gap = 22;
  var slideStep = cardWidth + gap;
  var totalSlides = cards.length;
  var breakpoint = 1024;
  var mobileBreakpoint = 360;
  var currentStep = 0;
  var maxSteps = 0;
  var isSliderActive = false;
  var touchStartX = 0;
  var touchEndX = 0;
  var touchStartY = 0;
  var touchEndY = 0;
  var isMouseDown = false;
  var minSwipeDistance = 50;
  function updateCardDimensions() {
    if (window.innerWidth <= mobileBreakpoint) {
      cardWidth = 270;
    } else {
      cardWidth = 330;
    }
    slideStep = cardWidth + gap;
  }
  function checkSliderActive() {
    return window.innerWidth < breakpoint;
  }
  function resetSlider() {
    track.style.transform = '';
    currentStep = 0;
  }
  function calculateMaxSteps() {
    if (!isSliderActive) {
      maxSteps = 0;
      return;
    }
    var containerWidth = sliderContainer.offsetWidth;
    var totalSlidesWidth = totalSlides * slideStep - gap;
    if (containerWidth >= totalSlidesWidth) {
      maxSteps = 0;
    } else {
      var visibleSlides = Math.floor(containerWidth / slideStep);
      maxSteps = totalSlides - visibleSlides;
    }
    if (currentStep > maxSteps) {
      currentStep = maxSteps;
    }
  }
  function updateSliderPosition() {
    if (!isSliderActive) {
      resetSlider();
      return;
    }
    var translateX;
    if (currentStep === maxSteps && maxSteps > 0) {
      var containerWidth = sliderContainer.offsetWidth;
      var totalSlidesWidth = totalSlides * slideStep - gap;
      translateX = -(totalSlidesWidth - containerWidth);
    } else {
      translateX = -currentStep * slideStep;
    }
    track.style.transform = "translateX(".concat(translateX, "px)");
    prevBtn.disabled = currentStep === 0;
    prevBtn.style.opacity = currentStep === 0 ? '0.3' : '1';
    nextBtn.disabled = currentStep >= maxSteps;
    nextBtn.style.opacity = currentStep >= maxSteps ? '0.3' : '1';
  }
  function nextSlide() {
    if (!isSliderActive) return;
    if (currentStep < maxSteps) {
      currentStep++;
      updateSliderPosition();
    }
  }
  function prevSlide() {
    if (!isSliderActive) return;
    if (currentStep > 0) {
      currentStep--;
      updateSliderPosition();
    }
  }
  function handleTouchStart(e) {
    if (!isSliderActive) return;
    var touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }
  function handleTouchMove(e) {
    if (!isSliderActive) return;
    var touch = e.touches[0];
    var deltaX = Math.abs(touch.clientX - touchStartX);
    var deltaY = Math.abs(touch.clientY - touchStartY);
    if (deltaX > deltaY) {
      e.preventDefault();
    }
  }
  function handleTouchEnd(e) {
    if (!isSliderActive) return;
    var touch = e.changedTouches[0];
    touchEndX = touch.clientX;
    touchEndY = touch.clientY;
    handleSwipe();
  }
  function handleSwipe() {
    var deltaX = touchEndX - touchStartX;
    var deltaY = touchEndY - touchStartY;
    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  }
  function handleMouseDown(e) {
    if (!isSliderActive) return;
    isMouseDown = true;
    touchStartX = e.clientX;
    touchStartY = e.clientY;
    e.preventDefault();
  }
  function handleMouseMove(e) {
    if (!isSliderActive || !isMouseDown) return;
    var deltaX = Math.abs(e.clientX - touchStartX);
    var deltaY = Math.abs(e.clientY - touchStartY);
    if (deltaX > deltaY) {
      e.preventDefault();
    }
  }
  function handleMouseUp(e) {
    if (!isSliderActive || !isMouseDown) return;
    isMouseDown = false;
    touchEndX = e.clientX;
    touchEndY = e.clientY;
    handleSwipe();
  }
  function initSlider() {
    updateCardDimensions();
    var shouldBeActive = checkSliderActive();
    if (shouldBeActive && !isSliderActive) {
      isSliderActive = true;
      currentStep = 0;
      calculateMaxSteps();
      updateSliderPosition();
    } else if (!shouldBeActive && isSliderActive) {
      isSliderActive = false;
      resetSlider();
    } else if (isSliderActive) {
      calculateMaxSteps();
      updateSliderPosition();
    }
  }

  // Event listeners для кнопок
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Touch events
  sliderContainer.addEventListener('touchstart', handleTouchStart, {
    passive: false
  });
  sliderContainer.addEventListener('touchmove', handleTouchMove, {
    passive: false
  });
  sliderContainer.addEventListener('touchend', handleTouchEnd, {
    passive: false
  });

  // Mouse events
  sliderContainer.addEventListener('mousedown', handleMouseDown);
  sliderContainer.addEventListener('mousemove', handleMouseMove);
  sliderContainer.addEventListener('mouseup', handleMouseUp);
  sliderContainer.addEventListener('mouseleave', function () {
    if (isMouseDown) {
      isMouseDown = false;
    }
  });

  // Keyboard support
  slider.addEventListener('keydown', function (e) {
    if (!isSliderActive) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  });

  // Resize handler
  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      initSlider();
    }, 200);
  });

  // Ініціалізація
  initSlider();
});
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var sliderContainer = document.querySelector('.article-slider');
  if (!sliderContainer) return;
  var mainImage = sliderContainer.querySelector('.article-slider__main-image-img');
  var thumbnails = sliderContainer.querySelectorAll('.article-slider__thumbnail');
  var prevBtn = sliderContainer.querySelector('.article-slider__nav-btn--prev');
  var nextBtn = sliderContainer.querySelector('.article-slider__nav-btn--next');
  var thumbnailsContainer = sliderContainer.querySelector('.article-slider__thumbnails-container');
  if (!mainImage || !thumbnails.length || !prevBtn || !nextBtn) return;
  var currentSlide = 0;
  var totalSlides = thumbnails.length;
  var slides = Array.from(thumbnails).map(function (thumbnail) {
    var img = thumbnail.querySelector('img');
    return img ? img.src : '';
  }).filter(function (src) {
    return src !== '';
  });
  if (slides.length === 0) return;
  function updateSlider() {
    if (slides[currentSlide]) {
      mainImage.src = slides[currentSlide];
    }
    thumbnails.forEach(function (thumbnail, index) {
      if (index === currentSlide) {
        thumbnail.classList.add('article-slider__thumbnail--active');
      } else {
        thumbnail.classList.remove('article-slider__thumbnail--active');
      }
    });
    if (thumbnailsContainer && thumbnails[currentSlide]) {
      var activeThumbnail = thumbnails[currentSlide];
      var containerWidth = thumbnailsContainer.offsetWidth;
      var thumbnailWidth = activeThumbnail.offsetWidth;
      var thumbnailLeft = activeThumbnail.offsetLeft;
      var currentScrollLeft = thumbnailsContainer.scrollLeft;
      var scrollLeft;
      if (currentSlide === 0) {
        scrollLeft = 0;
      } else {
        var thumbnailRight = thumbnailLeft + thumbnailWidth;
        var containerRight = currentScrollLeft + containerWidth;
        var isFullyVisible = thumbnailLeft >= currentScrollLeft && thumbnailRight <= containerRight;
        if (!isFullyVisible) {
          if (thumbnailLeft < currentScrollLeft) {
            scrollLeft = thumbnailLeft;
          } else if (thumbnailRight > containerRight) {
            scrollLeft = thumbnailRight - containerWidth;
          }
        }
      }
      if (scrollLeft !== undefined) {
        thumbnailsContainer.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }
  function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
      currentSlide = index;
      updateSlider();
    }
  }

  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Thumbnail clicks
  thumbnails.forEach(function (thumbnail, index) {
    thumbnail.addEventListener('click', function () {
      goToSlide(index);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (sliderContainer.contains(document.activeElement) || sliderContainer.matches(':hover')) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    }
  });
  updateSlider();
});
"use strict";

var faqItems = document.querySelectorAll('.FaqPage__item');
var closeAllFaqItems = function closeAllFaqItems() {
  faqItems.forEach(function (item) {
    var trigger = item.querySelector('.FaqPage__trigger');
    var icon = trigger ? trigger.querySelector('.FaqPage__icon img') : null;
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
    }
    if (icon) {
      icon.setAttribute('alt', 'Показати відповідь');
    }
    item.classList.remove('FaqPage__item--active');
  });
};
var toggleFaqItem = function toggleFaqItem(item) {
  var isActive = item.classList.contains('FaqPage__item--active');
  closeAllFaqItems();
  if (!isActive) {
    var trigger = item.querySelector('.FaqPage__trigger');
    var icon = trigger ? trigger.querySelector('.FaqPage__icon img') : null;
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'true');
    }
    if (icon) {
      icon.setAttribute('alt', 'Приховати відповідь');
    }
    item.classList.add('FaqPage__item--active');
  }
};
if (faqItems.length) {
  faqItems.forEach(function (item) {
    var trigger = item.querySelector('.FaqPage__trigger');
    if (trigger) {
      trigger.addEventListener('click', function () {
        toggleFaqItem(item);
      });
    }
  });
}
"use strict";

var header = document.querySelector('.header');
var burgerButton = document.querySelector('.header__burger');
var mobileWrapper = document.querySelector('.header__wrapperMobile');
var langButtons = document.querySelectorAll('.header__lang-button');
var langButtonsMobile = document.querySelectorAll('.header__langButtonMobile');
var burger = document.querySelector('.header__burger');
var burgerText = document.querySelector('.header__burger-text');

// Функція для закриття мобільного меню
var closeMobileMenu = function closeMobileMenu() {
  if (header) {
    header.classList.remove('header--menu-open');
  }
  if (burger) {
    burger.classList.remove('activeBurgerButton');
  }
  if (burgerText) {
    burgerText.textContent = 'Меню';
  }
  if (document.body) {
    document.body.style.overflow = '';
  }
};
if (burger && burgerText) {
  burger.addEventListener('click', function () {
    burger.classList.toggle('activeBurgerButton');
    if (burger.classList.contains('activeBurgerButton')) {
      burgerText.textContent = 'Закрити';
    } else {
      burgerText.textContent = 'Меню';
    }
  });
}
if (langButtonsMobile.length) {
  langButtonsMobile.forEach(function (button) {
    button.addEventListener('click', function () {
      langButtonsMobile.forEach(function (item) {
        return item.classList.remove('header__langButtonMobile--active');
      });
      button.classList.add('header__langButtonMobile--active');
    });
  });
}
if (langButtons.length) {
  langButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      langButtons.forEach(function (item) {
        return item.classList.remove('header__lang-button--active');
      });
      button.classList.add('header__lang-button--active');
    });
  });
}
if (burgerButton && header && mobileWrapper) {
  burgerButton.addEventListener('click', function () {
    header.classList.toggle('header--menu-open');
  });
}
var headerBackgroundClass = 'header--scrolled';
var headerBackgroundThreshold = 20;
var setHeaderBackground = function setHeaderBackground() {
  if (!header) return;
  if (window.scrollY > headerBackgroundThreshold) {
    header.classList.add(headerBackgroundClass);
  } else {
    header.classList.remove(headerBackgroundClass);
  }
};
setHeaderBackground();
window.addEventListener('scroll', setHeaderBackground);
var setActivePage = function setActivePage() {
  var currentPath = window.location.pathname;
  var currentPage = currentPath.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.header__nav a, .header__menuMobile-link');
  var navItems = document.querySelectorAll('.header__nav li');
  navLinks.forEach(function (link) {
    link.classList.remove('header__nav-link--active');
  });
  navItems.forEach(function (item) {
    item.classList.remove('header__nav-item--active');
  });
  var activeLink = document.querySelector(".header__nav a[href=\"".concat(currentPage, "\"], .header__menuMobile-link[href=\"").concat(currentPage, "\"]"));
  if (activeLink) {
    activeLink.classList.add('header__nav-link--active');
    var parentLi = activeLink.closest('.header__nav li');
    if (parentLi) {
      parentLi.classList.add('header__nav-item--active');
    }
  }
  if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
    var indexLink = document.querySelector('.header__nav a[href="index.html"], .header__menuMobile-link[href="index.html"]');
    if (indexLink) {
      indexLink.classList.add('header__nav-link--active');
      var _parentLi = indexLink.closest('.header__nav li');
      if (_parentLi) {
        _parentLi.classList.add('header__nav-item--active');
      }
    }
  }
};

// Обробка зміни розміру вікна - закрити меню при ширині > 880px
var handleResize = function handleResize() {
  if (window.innerWidth > 880) {
    closeMobileMenu();
  }
};

// Додати обробник resize з debounce для оптимізації
var resizeTimer;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(handleResize, 100);
});

// Закрити мобільне меню при кліку на посилання
var mobileMenuLinks = document.querySelectorAll('.header__menuMobile-link');
if (mobileMenuLinks.length) {
  mobileMenuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });
}

// Initialize active page on DOM load and close mobile menu
document.addEventListener('DOMContentLoaded', function () {
  closeMobileMenu(); // Закрити меню при завантаженні
  setActivePage();
  handleResize(); // Перевірити розмір вікна
});
"use strict";

var helpPopup = document.getElementById('helpPopup');
var helpPopupClose = document.getElementById('helpPopupClose');
var helpForm = document.getElementById('helpForm');
var helpFileUpload = document.getElementById('helpFileUpload');
var helpPopupContainer = helpPopup ? helpPopup.querySelector('.helpPopup__container') : null;
var helpFormState = document.querySelector('.helpPopup__formState');
var helpSuccessState = document.querySelector('.helpPopup__success');

// Функція для очищення помилок
var clearAllErrors = function clearAllErrors() {
  // Очистити помилки email
  var emailInput = document.getElementById('email');
  var emailErrorMessage = document.querySelector('.helpPopup__errorMessage--email');
  if (emailInput) {
    emailInput.classList.remove('error');
  }
  if (emailErrorMessage) {
    emailErrorMessage.classList.remove('active');
    emailErrorMessage.textContent = '';
  }

  // Очистити помилки файлу
  var uploadContainer = document.querySelector('.helpPopup__upload');
  var uploadSubtitle = document.querySelector('.helpPopup__uploadSubtitle');
  if (uploadContainer) {
    uploadContainer.classList.remove('error');
  }
  if (uploadSubtitle) {
    uploadSubtitle.textContent = 'Максимальний розмір 5 МБ';
  }

  // Очистити ім'я файлу
  var fileNameElement = document.querySelector('.helpPopup__fileName');
  if (fileNameElement) {
    fileNameElement.classList.remove('active');
    fileNameElement.textContent = '';
  }
};

// Функція для відкриття попапу
var openHelpPopup = function openHelpPopup() {
  if (helpPopup) {
    if (helpFormState) {
      helpFormState.classList.remove('hidden');
    }
    if (helpSuccessState) {
      helpSuccessState.classList.remove('active');
    }
    if (helpPopupContainer) {
      helpPopupContainer.classList.remove('helpPopup__container--success');
    }

    // Очистити всі помилки при відкритті
    clearAllErrors();
    helpPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

// Функція для закриття попапу
var closeHelpPopup = function closeHelpPopup() {
  if (helpPopup) {
    helpPopup.classList.remove('active');
    document.body.style.overflow = '';
    if (helpFormState) {
      helpFormState.classList.remove('hidden');
    }
    if (helpSuccessState) {
      helpSuccessState.classList.remove('active');
    }
    if (helpPopupContainer) {
      helpPopupContainer.classList.remove('helpPopup__container--success');
    }
  }
};

// Закриття по кліку на хрестик
if (helpPopupClose) {
  helpPopupClose.addEventListener('click', closeHelpPopup);
}

// Закриття по кліку на overlay
if (helpPopup) {
  var overlay = helpPopup.querySelector('.helpPopup__overlay');
  if (overlay) {
    overlay.addEventListener('click', closeHelpPopup);
  }
}

// Закриття по клавіші Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && helpPopup && helpPopup.classList.contains('active')) {
    closeHelpPopup();
  }
});

// Обробка завантаження файлу
if (helpFileUpload) {
  helpFileUpload.addEventListener('change', function (e) {
    var file = e.target.files[0];
    var fileNameElement = document.querySelector('.helpPopup__fileName');
    var uploadContainer = document.querySelector('.helpPopup__upload');
    var uploadSubtitle = document.querySelector('.helpPopup__uploadSubtitle');

    // Очистити попередні помилки
    if (uploadContainer) {
      uploadContainer.classList.remove('error');
    }
    if (uploadSubtitle) {
      uploadSubtitle.textContent = 'Максимальний розмір 5 МБ';
    }
    if (file) {
      var maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        // Показати помилку
        if (uploadContainer) {
          uploadContainer.classList.add('error');
        }
        if (uploadSubtitle) {
          uploadSubtitle.textContent = 'Файл більше 5 МБ';
        }
        e.target.value = '';
        if (fileNameElement) {
          fileNameElement.classList.remove('active');
          fileNameElement.textContent = '';
        }
        return;
      }
      if (fileNameElement) {
        fileNameElement.classList.add('active');
        fileNameElement.textContent = file.name;
      }
    } else {
      if (fileNameElement) {
        fileNameElement.classList.remove('active');
        fileNameElement.textContent = '';
      }
    }
  });
}

// Валідація email з floating label
var emailInput = document.getElementById('email');
var emailErrorMessage = document.querySelector('.helpPopup__errorMessage--email');
if (emailInput && emailErrorMessage) {
  // Обробка фокусу для floating label
  emailInput.addEventListener('focus', function (e) {
    // Очистити помилки при фокусі
    emailInput.classList.remove('error');
    emailErrorMessage.classList.remove('active');
    emailErrorMessage.textContent = '';
  });
  emailInput.addEventListener('blur', function (e) {
    var email = e.target.value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Очистити попередні помилки
    emailInput.classList.remove('error');
    emailErrorMessage.classList.remove('active');
    emailErrorMessage.textContent = '';
    if (email && !emailRegex.test(email)) {
      emailInput.classList.add('error');
      emailErrorMessage.classList.add('active');
      emailErrorMessage.textContent = 'Невірний формат email';
    }
  });
  emailInput.addEventListener('input', function (e) {
    // Очистити помилки при введенні
    emailInput.classList.remove('error');
    emailErrorMessage.classList.remove('active');
    emailErrorMessage.textContent = '';
  });
}

// Обробка відправки форми
if (helpForm) {
  helpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(helpForm);
    var submitButton = helpForm.querySelector('.helpPopup__submit');
    var fileNameElement = helpForm.querySelector('.helpPopup__fileName');
    var emailInput = document.getElementById('email');
    var emailErrorMessage = document.querySelector('.helpPopup__errorMessage--email');

    // Валідація email перед відправкою
    var hasErrors = false;
    if (emailInput && emailErrorMessage) {
      var email = emailInput.value;
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        emailInput.classList.add('error');
        emailErrorMessage.classList.add('active');
        emailErrorMessage.textContent = 'Невірний формат email';
        hasErrors = true;
      }
    }
    if (hasErrors) {
      return;
    }
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Відправка...';
    }

    // Тут має бути код для відправки даних на сервер
    setTimeout(function () {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Надіслати звернення';
      }
      helpForm.reset();
      if (fileNameElement) {
        fileNameElement.classList.remove('active');
        fileNameElement.textContent = '';
      }
      if (helpFormState) {
        helpFormState.classList.add('hidden');
      }
      if (helpSuccessState) {
        helpSuccessState.classList.add('active');
      }
      if (helpPopupContainer) {
        helpPopupContainer.classList.add('helpPopup__container--success');
      }
    }, 1000);
  });
}

// Експортуємо функцію відкриття для використання в інших файлах
window.openHelpPopup = openHelpPopup;

// Підключення кнопок відкриття попапу з header
document.addEventListener('DOMContentLoaded', function () {
  var helpButton = document.querySelector('.header__helpButton');
  var helpButtonMobile = document.querySelector('.header__helpButtonMobile');
  if (helpButton) {
    helpButton.addEventListener('click', openHelpPopup);
  }
  if (helpButtonMobile) {
    helpButtonMobile.addEventListener('click', openHelpPopup);
  }
});
// Main entry point - файли будуть конкатенуватись в алфавітному порядку через gulp
// Порядок: aboutSlider.js, articleSlider.js, faq.js, header.js, helpPopup.js, main.js, news.js
"use strict";
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var NewsPage = /*#__PURE__*/function () {
  function NewsPage() {
    _classCallCheck(this, NewsPage);
    this.currentPage = 1;
    this.itemsPerPage = 4;
    this.currentCategory = 'all';
    this.allNewsItems = [];
    this.filteredNewsItems = [];
    this.init();
  }
  _createClass(NewsPage, [{
    key: "init",
    value: function init() {
      this.getAllNewsItems();
      this.bindEvents();
      this.filterAndShowNews();
      this.renderPagination();
    }
  }, {
    key: "getAllNewsItems",
    value: function getAllNewsItems() {
      this.allNewsItems = Array.from(document.querySelectorAll('.NewsPage__newsItem'));
      this.filteredNewsItems = _toConsumableArray(this.allNewsItems);
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;
      var categoryItems = document.querySelectorAll('.NewsPage__categoriesList-item');
      categoryItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
          _this.handleCategoryClick(e);
        });
      });
    }
  }, {
    key: "handleCategoryClick",
    value: function handleCategoryClick(e) {
      var category = e.target.dataset.category;
      document.querySelectorAll('.NewsPage__categoriesList-item').forEach(function (item) {
        item.classList.remove('NewsPage__categoriesList-item--active');
      });
      e.target.classList.add('NewsPage__categoriesList-item--active');
      this.currentCategory = category;
      this.currentPage = 1;
      this.filterAndShowNews();
      this.renderPagination();
    }
  }, {
    key: "filterAndShowNews",
    value: function filterAndShowNews() {
      var _this2 = this;
      if (this.currentCategory === 'all') {
        this.filteredNewsItems = _toConsumableArray(this.allNewsItems);
      } else {
        this.filteredNewsItems = this.allNewsItems.filter(function (item) {
          return item.dataset.category === _this2.currentCategory;
        });
      }
      this.showCurrentPageNews();
    }
  }, {
    key: "showCurrentPageNews",
    value: function showCurrentPageNews() {
      this.allNewsItems.forEach(function (item) {
        item.style.display = 'none';
      });
      var startIndex = (this.currentPage - 1) * this.itemsPerPage;
      var endIndex = startIndex + this.itemsPerPage;
      var currentPageItems = this.filteredNewsItems.slice(startIndex, endIndex);
      currentPageItems.forEach(function (item) {
        item.style.display = 'flex';
      });
    }
  }, {
    key: "renderPagination",
    value: function renderPagination() {
      var pagination = document.getElementById('pagination');
      if (!pagination) return;
      var totalPages = Math.ceil(this.filteredNewsItems.length / this.itemsPerPage);
      if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
      }
      var paginationHTML = '';

      // Previous button
      paginationHTML += "\n            <button class=\"NewsPage__pagination-arrow ".concat(this.currentPage === 1 ? 'NewsPage__pagination-arrow--disabled' : '', "\" \n                    ").concat(this.currentPage === 1 ? 'disabled' : '', " \n                    onclick=\"newsPage.goToPage(").concat(this.currentPage - 1, ")\">\n                <img src=\"img/NewsPage/arrow-left.png\" alt=\"arrow-left\">\n            </button>\n        ");

      // Always show first page
      if (this.currentPage > 3) {
        paginationHTML += "<button class=\"NewsPage__pagination-button\" onclick=\"newsPage.goToPage(1)\">1</button>";
        if (this.currentPage > 4) {
          paginationHTML += "<span class=\"NewsPage__pagination-dots\">...</span>";
        }
      }

      // Show pages around current page
      var startPage = Math.max(1, this.currentPage - 1);
      var endPage = Math.min(totalPages, this.currentPage + 1);
      for (var i = startPage; i <= endPage; i++) {
        paginationHTML += "\n                <button class=\"NewsPage__pagination-button ".concat(i === this.currentPage ? 'NewsPage__pagination-button--active' : '', "\" \n                        onclick=\"newsPage.goToPage(").concat(i, ")\">\n                    ").concat(i, "\n                </button>\n            ");
      }

      // Always show last page
      if (this.currentPage < totalPages - 2) {
        if (this.currentPage < totalPages - 3) {
          paginationHTML += "<span class=\"NewsPage__pagination-dots\">...</span>";
        }
        paginationHTML += "<button class=\"NewsPage__pagination-button\" onclick=\"newsPage.goToPage(".concat(totalPages, ")\">").concat(totalPages, "</button>");
      }

      // Next button
      paginationHTML += "\n            <button class=\"NewsPage__pagination-arrow ".concat(this.currentPage === totalPages ? 'NewsPage__pagination-arrow--disabled' : '', "\" \n                    ").concat(this.currentPage === totalPages ? 'disabled' : '', " \n                    onclick=\"newsPage.goToPage(").concat(this.currentPage + 1, ")\">\n                <img src=\"img/NewsPage/arrow-right.png\" alt=\"arrow-right\">\n            </button>\n        ");
      pagination.innerHTML = paginationHTML;
    }
  }, {
    key: "goToPage",
    value: function goToPage(page) {
      var totalPages = Math.ceil(this.filteredNewsItems.length / this.itemsPerPage);
      if (page >= 1 && page <= totalPages) {
        this.currentPage = page;
        this.showCurrentPageNews();
        this.renderPagination();
        document.getElementById('newsList').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }]);
  return NewsPage;
}();
var newsPage;
document.addEventListener('DOMContentLoaded', function () {
  newsPage = new NewsPage();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0U2xpZGVyTmV3cy5qcyIsImFib3V0U2xpZGVyVGVhbS5qcyIsImFydGljbGVTbGlkZXIuanMiLCJmYXEuanMiLCJoZWFkZXIuanMiLCJoZWxwUG9wdXAuanMiLCJtYWluLmpzIiwibmV3cy5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzbGlkZXIiLCJxdWVyeVNlbGVjdG9yIiwidHJhY2siLCJjYXJkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwcmV2QnRuIiwibmV4dEJ0biIsInNsaWRlckNvbnRhaW5lciIsImxlbmd0aCIsImNhcmRXaWR0aCIsImdhcCIsInNsaWRlU3RlcCIsInRvdGFsU2xpZGVzIiwiYnJlYWtwb2ludCIsIm1vYmlsZUJyZWFrcG9pbnQiLCJjdXJyZW50U3RlcCIsIm1heFN0ZXBzIiwiaXNTbGlkZXJBY3RpdmUiLCJ0b3VjaFN0YXJ0WCIsInRvdWNoRW5kWCIsInRvdWNoU3RhcnRZIiwidG91Y2hFbmRZIiwiaXNNb3VzZURvd24iLCJtaW5Td2lwZURpc3RhbmNlIiwidXBkYXRlQ2FyZERpbWVuc2lvbnMiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiY2hlY2tTbGlkZXJBY3RpdmUiLCJyZXNldFNsaWRlciIsInN0eWxlIiwidHJhbnNmb3JtIiwiY2FsY3VsYXRlTWF4U3RlcHMiLCJjb250YWluZXJXaWR0aCIsIm9mZnNldFdpZHRoIiwidG90YWxTbGlkZXNXaWR0aCIsInZpc2libGVTbGlkZXMiLCJNYXRoIiwiZmxvb3IiLCJ1cGRhdGVTbGlkZXJQb3NpdGlvbiIsInRyYW5zbGF0ZVgiLCJkaXNhYmxlZCIsIm9wYWNpdHkiLCJuZXh0U2xpZGUiLCJwcmV2U2xpZGUiLCJoYW5kbGVUb3VjaFN0YXJ0IiwiZSIsInRvdWNoIiwidG91Y2hlcyIsImNsaWVudFgiLCJjbGllbnRZIiwiaGFuZGxlVG91Y2hNb3ZlIiwiZGVsdGFYIiwiYWJzIiwiZGVsdGFZIiwicHJldmVudERlZmF1bHQiLCJoYW5kbGVUb3VjaEVuZCIsImNoYW5nZWRUb3VjaGVzIiwiaGFuZGxlU3dpcGUiLCJoYW5kbGVNb3VzZURvd24iLCJoYW5kbGVNb3VzZU1vdmUiLCJoYW5kbGVNb3VzZVVwIiwiaW5pdFNsaWRlciIsInNob3VsZEJlQWN0aXZlIiwicGFzc2l2ZSIsImtleSIsInJlc2l6ZVRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwibWFpbkltYWdlIiwidGh1bWJuYWlscyIsInRodW1ibmFpbHNDb250YWluZXIiLCJjdXJyZW50U2xpZGUiLCJzbGlkZXMiLCJBcnJheSIsImZyb20iLCJtYXAiLCJ0aHVtYm5haWwiLCJpbWciLCJzcmMiLCJmaWx0ZXIiLCJ1cGRhdGVTbGlkZXIiLCJmb3JFYWNoIiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJhY3RpdmVUaHVtYm5haWwiLCJ0aHVtYm5haWxXaWR0aCIsInRodW1ibmFpbExlZnQiLCJvZmZzZXRMZWZ0IiwiY3VycmVudFNjcm9sbExlZnQiLCJzY3JvbGxMZWZ0IiwidGh1bWJuYWlsUmlnaHQiLCJjb250YWluZXJSaWdodCIsImlzRnVsbHlWaXNpYmxlIiwidW5kZWZpbmVkIiwic2Nyb2xsVG8iLCJsZWZ0IiwiYmVoYXZpb3IiLCJnb1RvU2xpZGUiLCJjb250YWlucyIsImFjdGl2ZUVsZW1lbnQiLCJtYXRjaGVzIiwiZmFxSXRlbXMiLCJjbG9zZUFsbEZhcUl0ZW1zIiwiaXRlbSIsInRyaWdnZXIiLCJpY29uIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlRmFxSXRlbSIsImlzQWN0aXZlIiwiaGVhZGVyIiwiYnVyZ2VyQnV0dG9uIiwibW9iaWxlV3JhcHBlciIsImxhbmdCdXR0b25zIiwibGFuZ0J1dHRvbnNNb2JpbGUiLCJidXJnZXIiLCJidXJnZXJUZXh0IiwiY2xvc2VNb2JpbGVNZW51IiwidGV4dENvbnRlbnQiLCJib2R5Iiwib3ZlcmZsb3ciLCJ0b2dnbGUiLCJidXR0b24iLCJoZWFkZXJCYWNrZ3JvdW5kQ2xhc3MiLCJoZWFkZXJCYWNrZ3JvdW5kVGhyZXNob2xkIiwic2V0SGVhZGVyQmFja2dyb3VuZCIsInNjcm9sbFkiLCJzZXRBY3RpdmVQYWdlIiwiY3VycmVudFBhdGgiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiY3VycmVudFBhZ2UiLCJzcGxpdCIsInBvcCIsIm5hdkxpbmtzIiwibmF2SXRlbXMiLCJsaW5rIiwiYWN0aXZlTGluayIsInBhcmVudExpIiwiY2xvc2VzdCIsImluZGV4TGluayIsImhhbmRsZVJlc2l6ZSIsInJlc2l6ZVRpbWVyIiwibW9iaWxlTWVudUxpbmtzIiwiaGVscFBvcHVwIiwiZ2V0RWxlbWVudEJ5SWQiLCJoZWxwUG9wdXBDbG9zZSIsImhlbHBGb3JtIiwiaGVscEZpbGVVcGxvYWQiLCJoZWxwUG9wdXBDb250YWluZXIiLCJoZWxwRm9ybVN0YXRlIiwiaGVscFN1Y2Nlc3NTdGF0ZSIsImNsZWFyQWxsRXJyb3JzIiwiZW1haWxJbnB1dCIsImVtYWlsRXJyb3JNZXNzYWdlIiwidXBsb2FkQ29udGFpbmVyIiwidXBsb2FkU3VidGl0bGUiLCJmaWxlTmFtZUVsZW1lbnQiLCJvcGVuSGVscFBvcHVwIiwiY2xvc2VIZWxwUG9wdXAiLCJvdmVybGF5IiwiZmlsZSIsInRhcmdldCIsImZpbGVzIiwibWF4U2l6ZSIsInNpemUiLCJ2YWx1ZSIsIm5hbWUiLCJlbWFpbCIsImVtYWlsUmVnZXgiLCJ0ZXN0IiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsInN1Ym1pdEJ1dHRvbiIsImhhc0Vycm9ycyIsInJlc2V0IiwiaGVscEJ1dHRvbiIsImhlbHBCdXR0b25Nb2JpbGUiLCJOZXdzUGFnZSIsIml0ZW1zUGVyUGFnZSIsImN1cnJlbnRDYXRlZ29yeSIsImFsbE5ld3NJdGVtcyIsImZpbHRlcmVkTmV3c0l0ZW1zIiwiaW5pdCIsImdldEFsbE5ld3NJdGVtcyIsImJpbmRFdmVudHMiLCJmaWx0ZXJBbmRTaG93TmV3cyIsInJlbmRlclBhZ2luYXRpb24iLCJjYXRlZ29yeUl0ZW1zIiwiaGFuZGxlQ2F0ZWdvcnlDbGljayIsImNhdGVnb3J5IiwiZGF0YXNldCIsInNob3dDdXJyZW50UGFnZU5ld3MiLCJkaXNwbGF5Iiwic3RhcnRJbmRleCIsImVuZEluZGV4IiwiY3VycmVudFBhZ2VJdGVtcyIsInNsaWNlIiwicGFnaW5hdGlvbiIsInRvdGFsUGFnZXMiLCJjZWlsIiwiaW5uZXJIVE1MIiwicGFnaW5hdGlvbkhUTUwiLCJzdGFydFBhZ2UiLCJtYXgiLCJlbmRQYWdlIiwibWluIiwiaSIsInBhZ2UiLCJzY3JvbGxJbnRvVmlldyIsImJsb2NrIiwibmV3c1BhZ2UiXSwibWFwcGluZ3MiOiI7O0FBQUFBLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBVztFQUN2RCxJQUFNQyxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLG9CQUFvQixDQUFDO0VBQzNELElBQUksQ0FBQ0QsTUFBTSxFQUFFO0VBRWIsSUFBTUUsS0FBSyxHQUFHRixNQUFNLENBQUNDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQztFQUMvRCxJQUFNRSxLQUFLLEdBQUdILE1BQU0sQ0FBQ0ksZ0JBQWdCLENBQUMsMEJBQTBCLENBQUM7RUFDakUsSUFBTUMsT0FBTyxHQUFHTCxNQUFNLENBQUNDLGFBQWEsQ0FBQyxtQ0FBbUMsQ0FBQztFQUN6RSxJQUFNSyxPQUFPLEdBQUdOLE1BQU0sQ0FBQ0MsYUFBYSxDQUFDLG1DQUFtQyxDQUFDO0VBQ3pFLElBQU1NLGVBQWUsR0FBR1AsTUFBTSxDQUFDQyxhQUFhLENBQUMsK0JBQStCLENBQUM7RUFFN0UsSUFBSSxDQUFDQyxLQUFLLElBQUksQ0FBQ0MsS0FBSyxDQUFDSyxNQUFNLElBQUksQ0FBQ0gsT0FBTyxJQUFJLENBQUNDLE9BQU8sSUFBSSxDQUFDQyxlQUFlLEVBQUU7RUFFekUsSUFBSUUsU0FBUyxHQUFHLEdBQUc7RUFDbkIsSUFBTUMsR0FBRyxHQUFHLEVBQUU7RUFDZCxJQUFJQyxTQUFTLEdBQUdGLFNBQVMsR0FBR0MsR0FBRztFQUMvQixJQUFNRSxXQUFXLEdBQUdULEtBQUssQ0FBQ0ssTUFBTTtF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cyIsInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0LXNsaWRlci1uZXdzJyk7XG4gIGlmICghc2xpZGVyKSByZXR1cm47XG4gIFxuICBjb25zdCB0cmFjayA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuYWJvdXQtc2xpZGVyLW5ld3NfX3RyYWNrJyk7XG4gIGNvbnN0IGNhcmRzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hYm91dC1zbGlkZXItbmV3c19fY2FyZCcpO1xuICBjb25zdCBwcmV2QnRuID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5hYm91dC1zbGlkZXItbmV3c19fbmF2LWJ0bi0tcHJldicpO1xuICBjb25zdCBuZXh0QnRuID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5hYm91dC1zbGlkZXItbmV3c19fbmF2LWJ0bi0tbmV4dCcpO1xuICBjb25zdCBzbGlkZXJDb250YWluZXIgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignLmFib3V0LXNsaWRlci1uZXdzX19jb250YWluZXInKTtcbiAgXG4gIGlmICghdHJhY2sgfHwgIWNhcmRzLmxlbmd0aCB8fCAhcHJldkJ0biB8fCAhbmV4dEJ0biB8fCAhc2xpZGVyQ29udGFpbmVyKSByZXR1cm47XG4gIFxuICBsZXQgY2FyZFdpZHRoID0gMzMwO1xuICBjb25zdCBnYXAgPSAyMjtcbiAgbGV0IHNsaWRlU3RlcCA9IGNhcmRXaWR0aCArIGdhcDtcbiAgY29uc3QgdG90YWxTbGlkZXMgPSBjYXJkcy5sZW5ndGg7XG4gIGNvbnN0IGJyZWFrcG9pbnQgPSAxMDI0O1xuICBjb25zdCBtb2JpbGVCcmVha3BvaW50ID0gMzYwO1xuICBcbiAgbGV0IGN1cnJlbnRTdGVwID0gMDtcbiAgbGV0IG1heFN0ZXBzID0gMDtcbiAgbGV0IGlzU2xpZGVyQWN0aXZlID0gZmFsc2U7XG4gIFxuICBsZXQgdG91Y2hTdGFydFggPSAwO1xuICBsZXQgdG91Y2hFbmRYID0gMDtcbiAgbGV0IHRvdWNoU3RhcnRZID0gMDtcbiAgbGV0IHRvdWNoRW5kWSA9IDA7XG4gIGxldCBpc01vdXNlRG93biA9IGZhbHNlO1xuICBjb25zdCBtaW5Td2lwZURpc3RhbmNlID0gNTA7XG4gIFxuICBmdW5jdGlvbiB1cGRhdGVDYXJkRGltZW5zaW9ucygpIHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gbW9iaWxlQnJlYWtwb2ludCkge1xuICAgICAgY2FyZFdpZHRoID0gMjcwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYXJkV2lkdGggPSAzMzA7XG4gICAgfVxuICAgIHNsaWRlU3RlcCA9IGNhcmRXaWR0aCArIGdhcDtcbiAgfVxuICBcbiAgZnVuY3Rpb24gY2hlY2tTbGlkZXJBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIDwgYnJlYWtwb2ludDtcbiAgfVxuICBcbiAgZnVuY3Rpb24gcmVzZXRTbGlkZXIoKSB7XG4gICAgdHJhY2suc3R5bGUudHJhbnNmb3JtID0gJyc7XG4gICAgY3VycmVudFN0ZXAgPSAwO1xuICB9XG4gIFxuICBmdW5jdGlvbiBjYWxjdWxhdGVNYXhTdGVwcygpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSB7XG4gICAgICBtYXhTdGVwcyA9IDA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gc2xpZGVyQ29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IHRvdGFsU2xpZGVzV2lkdGggPSB0b3RhbFNsaWRlcyAqIHNsaWRlU3RlcCAtIGdhcDtcbiAgICBcbiAgICBpZiAoY29udGFpbmVyV2lkdGggPj0gdG90YWxTbGlkZXNXaWR0aCkge1xuICAgICAgbWF4U3RlcHMgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB2aXNpYmxlU2xpZGVzID0gTWF0aC5mbG9vcihjb250YWluZXJXaWR0aCAvIHNsaWRlU3RlcCk7XG4gICAgICBtYXhTdGVwcyA9IHRvdGFsU2xpZGVzIC0gdmlzaWJsZVNsaWRlcztcbiAgICB9XG4gICAgXG4gICAgaWYgKGN1cnJlbnRTdGVwID4gbWF4U3RlcHMpIHtcbiAgICAgIGN1cnJlbnRTdGVwID0gbWF4U3RlcHM7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiB1cGRhdGVTbGlkZXJQb3NpdGlvbigpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSB7XG4gICAgICByZXNldFNsaWRlcigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBsZXQgdHJhbnNsYXRlWDtcbiAgICBcbiAgICBpZiAoY3VycmVudFN0ZXAgPT09IG1heFN0ZXBzICYmIG1heFN0ZXBzID4gMCkge1xuICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSBzbGlkZXJDb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgICBjb25zdCB0b3RhbFNsaWRlc1dpZHRoID0gdG90YWxTbGlkZXMgKiBzbGlkZVN0ZXAgLSBnYXA7XG4gICAgICB0cmFuc2xhdGVYID0gLSh0b3RhbFNsaWRlc1dpZHRoIC0gY29udGFpbmVyV2lkdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFuc2xhdGVYID0gLWN1cnJlbnRTdGVwICogc2xpZGVTdGVwO1xuICAgIH1cbiAgICBcbiAgICB0cmFjay5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3RyYW5zbGF0ZVh9cHgpYDtcbiAgICBcbiAgICBwcmV2QnRuLmRpc2FibGVkID0gY3VycmVudFN0ZXAgPT09IDA7XG4gICAgcHJldkJ0bi5zdHlsZS5vcGFjaXR5ID0gY3VycmVudFN0ZXAgPT09IDAgPyAnMC4zJyA6ICcxJztcbiAgICBcbiAgICBuZXh0QnRuLmRpc2FibGVkID0gY3VycmVudFN0ZXAgPj0gbWF4U3RlcHM7XG4gICAgbmV4dEJ0bi5zdHlsZS5vcGFjaXR5ID0gY3VycmVudFN0ZXAgPj0gbWF4U3RlcHMgPyAnMC4zJyA6ICcxJztcbiAgfVxuICBcbiAgZnVuY3Rpb24gbmV4dFNsaWRlKCkge1xuICAgIGlmICghaXNTbGlkZXJBY3RpdmUpIHJldHVybjtcbiAgICBcbiAgICBpZiAoY3VycmVudFN0ZXAgPCBtYXhTdGVwcykge1xuICAgICAgY3VycmVudFN0ZXArKztcbiAgICAgIHVwZGF0ZVNsaWRlclBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBwcmV2U2xpZGUoKSB7XG4gICAgaWYgKCFpc1NsaWRlckFjdGl2ZSkgcmV0dXJuO1xuICAgIFxuICAgIGlmIChjdXJyZW50U3RlcCA+IDApIHtcbiAgICAgIGN1cnJlbnRTdGVwLS07XG4gICAgICB1cGRhdGVTbGlkZXJQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gaGFuZGxlVG91Y2hTdGFydChlKSB7XG4gICAgaWYgKCFpc1NsaWRlckFjdGl2ZSkgcmV0dXJuO1xuICAgIFxuICAgIGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgIHRvdWNoU3RhcnRYID0gdG91Y2guY2xpZW50WDtcbiAgICB0b3VjaFN0YXJ0WSA9IHRvdWNoLmNsaWVudFk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGhhbmRsZVRvdWNoTW92ZShlKSB7XG4gICAgaWYgKCFpc1NsaWRlckFjdGl2ZSkgcmV0dXJuO1xuICAgIFxuICAgIGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgIGNvbnN0IGRlbHRhWCA9IE1hdGguYWJzKHRvdWNoLmNsaWVudFggLSB0b3VjaFN0YXJ0WCk7XG4gICAgY29uc3QgZGVsdGFZID0gTWF0aC5hYnModG91Y2guY2xpZW50WSAtIHRvdWNoU3RhcnRZKTtcbiAgICBcbiAgICBpZiAoZGVsdGFYID4gZGVsdGFZKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVUb3VjaEVuZChlKSB7XG4gICAgaWYgKCFpc1NsaWRlckFjdGl2ZSkgcmV0dXJuO1xuICAgIFxuICAgIGNvbnN0IHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICB0b3VjaEVuZFggPSB0b3VjaC5jbGllbnRYO1xuICAgIHRvdWNoRW5kWSA9IHRvdWNoLmNsaWVudFk7XG4gICAgXG4gICAgaGFuZGxlU3dpcGUoKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gaGFuZGxlU3dpcGUoKSB7XG4gICAgY29uc3QgZGVsdGFYID0gdG91Y2hFbmRYIC0gdG91Y2hTdGFydFg7XG4gICAgY29uc3QgZGVsdGFZID0gdG91Y2hFbmRZIC0gdG91Y2hTdGFydFk7XG4gICAgXG4gICAgaWYgKE1hdGguYWJzKGRlbHRhWCkgPiBtaW5Td2lwZURpc3RhbmNlICYmIE1hdGguYWJzKGRlbHRhWCkgPiBNYXRoLmFicyhkZWx0YVkpKSB7XG4gICAgICBpZiAoZGVsdGFYID4gMCkge1xuICAgICAgICBwcmV2U2xpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRTbGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gaGFuZGxlTW91c2VEb3duKGUpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSByZXR1cm47XG4gICAgXG4gICAgaXNNb3VzZURvd24gPSB0cnVlO1xuICAgIHRvdWNoU3RhcnRYID0gZS5jbGllbnRYO1xuICAgIHRvdWNoU3RhcnRZID0gZS5jbGllbnRZO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gaGFuZGxlTW91c2VNb3ZlKGUpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlIHx8ICFpc01vdXNlRG93bikgcmV0dXJuO1xuICAgIFxuICAgIGNvbnN0IGRlbHRhWCA9IE1hdGguYWJzKGUuY2xpZW50WCAtIHRvdWNoU3RhcnRYKTtcbiAgICBjb25zdCBkZWx0YVkgPSBNYXRoLmFicyhlLmNsaWVudFkgLSB0b3VjaFN0YXJ0WSk7XG4gICAgXG4gICAgaWYgKGRlbHRhWCA+IGRlbHRhWSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gaGFuZGxlTW91c2VVcChlKSB7XG4gICAgaWYgKCFpc1NsaWRlckFjdGl2ZSB8fCAhaXNNb3VzZURvd24pIHJldHVybjtcbiAgICBcbiAgICBpc01vdXNlRG93biA9IGZhbHNlO1xuICAgIHRvdWNoRW5kWCA9IGUuY2xpZW50WDtcbiAgICB0b3VjaEVuZFkgPSBlLmNsaWVudFk7XG4gICAgXG4gICAgaGFuZGxlU3dpcGUoKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gaW5pdFNsaWRlcigpIHtcbiAgICB1cGRhdGVDYXJkRGltZW5zaW9ucygpO1xuICAgIGNvbnN0IHNob3VsZEJlQWN0aXZlID0gY2hlY2tTbGlkZXJBY3RpdmUoKTtcbiAgICBcbiAgICBpZiAoc2hvdWxkQmVBY3RpdmUgJiYgIWlzU2xpZGVyQWN0aXZlKSB7XG4gICAgICBpc1NsaWRlckFjdGl2ZSA9IHRydWU7XG4gICAgICBjdXJyZW50U3RlcCA9IDA7XG4gICAgICBjYWxjdWxhdGVNYXhTdGVwcygpO1xuICAgICAgdXBkYXRlU2xpZGVyUG9zaXRpb24oKTtcbiAgICB9IGVsc2UgaWYgKCFzaG91bGRCZUFjdGl2ZSAmJiBpc1NsaWRlckFjdGl2ZSkge1xuICAgICAgaXNTbGlkZXJBY3RpdmUgPSBmYWxzZTtcbiAgICAgIHJlc2V0U2xpZGVyKCk7XG4gICAgfSBlbHNlIGlmIChpc1NsaWRlckFjdGl2ZSkge1xuICAgICAgY2FsY3VsYXRlTWF4U3RlcHMoKTtcbiAgICAgIHVwZGF0ZVNsaWRlclBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG4gIFxuICAvLyBFdmVudCBsaXN0ZW5lcnMg0LTQu9GPINC60L3QvtC/0L7QulxuICBwcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJldlNsaWRlKTtcbiAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG5leHRTbGlkZSk7XG4gIFxuICAvLyBUb3VjaCBldmVudHNcbiAgc2xpZGVyQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBoYW5kbGVUb3VjaFN0YXJ0LCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICBzbGlkZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgaGFuZGxlVG91Y2hNb3ZlLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICBzbGlkZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBoYW5kbGVUb3VjaEVuZCwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgXG4gIC8vIE1vdXNlIGV2ZW50c1xuICBzbGlkZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlTW91c2VEb3duKTtcbiAgc2xpZGVyQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG4gIHNsaWRlckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2VVcCk7XG4gIHNsaWRlckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKGlzTW91c2VEb3duKSB7XG4gICAgICBpc01vdXNlRG93biA9IGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIFxuICAvLyBLZXlib2FyZCBzdXBwb3J0XG4gIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgIGlmICghaXNTbGlkZXJBY3RpdmUpIHJldHVybjtcbiAgICBcbiAgICBpZiAoZS5rZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBwcmV2U2xpZGUoKTtcbiAgICB9IGVsc2UgaWYgKGUua2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG5leHRTbGlkZSgpO1xuICAgIH1cbiAgfSk7XG4gIFxuICAvLyBSZXNpemUgaGFuZGxlclxuICBsZXQgcmVzaXplVGltZW91dDtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgIGNsZWFyVGltZW91dChyZXNpemVUaW1lb3V0KTtcbiAgICByZXNpemVUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGluaXRTbGlkZXIoKTtcbiAgICB9LCAyMDApO1xuICB9KTtcbiAgXG4gIC8vINCG0L3RltGG0ZbQsNC70ZbQt9Cw0YbRltGPXG4gIGluaXRTbGlkZXIoKTtcbn0pO1xuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXQtc2xpZGVyLXRlYW0nKTtcbiAgaWYgKCFzbGlkZXIpIHJldHVybjtcbiAgXG4gIGNvbnN0IHRyYWNrID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5hYm91dC1zbGlkZXItdGVhbV9fdHJhY2snKTtcbiAgY29uc3QgY2FyZHMgPSBzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnLmFib3V0LXNsaWRlci10ZWFtX19jYXJkJyk7XG4gIGNvbnN0IHByZXZCdG4gPSBzbGlkZXIucXVlcnlTZWxlY3RvcignLmFib3V0LXNsaWRlci10ZWFtX19uYXYtYnRuLS1wcmV2Jyk7XG4gIGNvbnN0IG5leHRCdG4gPSBzbGlkZXIucXVlcnlTZWxlY3RvcignLmFib3V0LXNsaWRlci10ZWFtX19uYXYtYnRuLS1uZXh0Jyk7XG4gIGNvbnN0IHNsaWRlckNvbnRhaW5lciA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuYWJvdXQtc2xpZGVyLXRlYW1fX2NvbnRhaW5lcicpO1xuICBcbiAgaWYgKCF0cmFjayB8fCAhY2FyZHMubGVuZ3RoIHx8ICFwcmV2QnRuIHx8ICFuZXh0QnRuIHx8ICFzbGlkZXJDb250YWluZXIpIHJldHVybjtcbiAgXG4gIGxldCBjYXJkV2lkdGggPSAzMzA7XG4gIGNvbnN0IGdhcCA9IDIyO1xuICBsZXQgc2xpZGVTdGVwID0gY2FyZFdpZHRoICsgZ2FwO1xuICBjb25zdCB0b3RhbFNsaWRlcyA9IGNhcmRzLmxlbmd0aDtcbiAgY29uc3QgYnJlYWtwb2ludCA9IDEwMjQ7XG4gIGNvbnN0IG1vYmlsZUJyZWFrcG9pbnQgPSAzNjA7XG4gIFxuICBsZXQgY3VycmVudFN0ZXAgPSAwO1xuICBsZXQgbWF4U3RlcHMgPSAwO1xuICBsZXQgaXNTbGlkZXJBY3RpdmUgPSBmYWxzZTtcbiAgXG4gIGxldCB0b3VjaFN0YXJ0WCA9IDA7XG4gIGxldCB0b3VjaEVuZFggPSAwO1xuICBsZXQgdG91Y2hTdGFydFkgPSAwO1xuICBsZXQgdG91Y2hFbmRZID0gMDtcbiAgbGV0IGlzTW91c2VEb3duID0gZmFsc2U7XG4gIGNvbnN0IG1pblN3aXBlRGlzdGFuY2UgPSA1MDtcbiAgXG4gIGZ1bmN0aW9uIHVwZGF0ZUNhcmREaW1lbnNpb25zKCkge1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSBtb2JpbGVCcmVha3BvaW50KSB7XG4gICAgICBjYXJkV2lkdGggPSAyNzA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhcmRXaWR0aCA9IDMzMDtcbiAgICB9XG4gICAgc2xpZGVTdGVwID0gY2FyZFdpZHRoICsgZ2FwO1xuICB9XG4gIFxuICBmdW5jdGlvbiBjaGVja1NsaWRlckFjdGl2ZSgpIHtcbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggPCBicmVha3BvaW50O1xuICB9XG4gIFxuICBmdW5jdGlvbiByZXNldFNsaWRlcigpIHtcbiAgICB0cmFjay5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICBjdXJyZW50U3RlcCA9IDA7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZU1heFN0ZXBzKCkge1xuICAgIGlmICghaXNTbGlkZXJBY3RpdmUpIHtcbiAgICAgIG1heFN0ZXBzID0gMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgY29udGFpbmVyV2lkdGggPSBzbGlkZXJDb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgdG90YWxTbGlkZXNXaWR0aCA9IHRvdGFsU2xpZGVzICogc2xpZGVTdGVwIC0gZ2FwO1xuICAgIFxuICAgIGlmIChjb250YWluZXJXaWR0aCA+PSB0b3RhbFNsaWRlc1dpZHRoKSB7XG4gICAgICBtYXhTdGVwcyA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZpc2libGVTbGlkZXMgPSBNYXRoLmZsb29yKGNvbnRhaW5lcldpZHRoIC8gc2xpZGVTdGVwKTtcbiAgICAgIG1heFN0ZXBzID0gdG90YWxTbGlkZXMgLSB2aXNpYmxlU2xpZGVzO1xuICAgIH1cbiAgICBcbiAgICBpZiAoY3VycmVudFN0ZXAgPiBtYXhTdGVwcykge1xuICAgICAgY3VycmVudFN0ZXAgPSBtYXhTdGVwcztcbiAgICB9XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHVwZGF0ZVNsaWRlclBvc2l0aW9uKCkge1xuICAgIGlmICghaXNTbGlkZXJBY3RpdmUpIHtcbiAgICAgIHJlc2V0U2xpZGVyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGxldCB0cmFuc2xhdGVYO1xuICAgIFxuICAgIGlmIChjdXJyZW50U3RlcCA9PT0gbWF4U3RlcHMgJiYgbWF4U3RlcHMgPiAwKSB7XG4gICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHNsaWRlckNvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgICAgIGNvbnN0IHRvdGFsU2xpZGVzV2lkdGggPSB0b3RhbFNsaWRlcyAqIHNsaWRlU3RlcCAtIGdhcDtcbiAgICAgIHRyYW5zbGF0ZVggPSAtKHRvdGFsU2xpZGVzV2lkdGggLSBjb250YWluZXJXaWR0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zbGF0ZVggPSAtY3VycmVudFN0ZXAgKiBzbGlkZVN0ZXA7XG4gICAgfVxuICAgIFxuICAgIHRyYWNrLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7dHJhbnNsYXRlWH1weClgO1xuICAgIFxuICAgIHByZXZCdG4uZGlzYWJsZWQgPSBjdXJyZW50U3RlcCA9PT0gMDtcbiAgICBwcmV2QnRuLnN0eWxlLm9wYWNpdHkgPSBjdXJyZW50U3RlcCA9PT0gMCA/ICcwLjMnIDogJzEnO1xuICAgIFxuICAgIG5leHRCdG4uZGlzYWJsZWQgPSBjdXJyZW50U3RlcCA+PSBtYXhTdGVwcztcbiAgICBuZXh0QnRuLnN0eWxlLm9wYWNpdHkgPSBjdXJyZW50U3RlcCA+PSBtYXhTdGVwcyA/ICcwLjMnIDogJzEnO1xuICB9XG4gIFxuICBmdW5jdGlvbiBuZXh0U2xpZGUoKSB7XG4gICAgaWYgKCFpc1NsaWRlckFjdGl2ZSkgcmV0dXJuO1xuICAgIFxuICAgIGlmIChjdXJyZW50U3RlcCA8IG1heFN0ZXBzKSB7XG4gICAgICBjdXJyZW50U3RlcCsrO1xuICAgICAgdXBkYXRlU2xpZGVyUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHByZXZTbGlkZSgpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSByZXR1cm47XG4gICAgXG4gICAgaWYgKGN1cnJlbnRTdGVwID4gMCkge1xuICAgICAgY3VycmVudFN0ZXAtLTtcbiAgICAgIHVwZGF0ZVNsaWRlclBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVUb3VjaFN0YXJ0KGUpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgdG91Y2hTdGFydFggPSB0b3VjaC5jbGllbnRYO1xuICAgIHRvdWNoU3RhcnRZID0gdG91Y2guY2xpZW50WTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gaGFuZGxlVG91Y2hNb3ZlKGUpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgY29uc3QgZGVsdGFYID0gTWF0aC5hYnModG91Y2guY2xpZW50WCAtIHRvdWNoU3RhcnRYKTtcbiAgICBjb25zdCBkZWx0YVkgPSBNYXRoLmFicyh0b3VjaC5jbGllbnRZIC0gdG91Y2hTdGFydFkpO1xuICAgIFxuICAgIGlmIChkZWx0YVggPiBkZWx0YVkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGhhbmRsZVRvdWNoRW5kKGUpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgIHRvdWNoRW5kWCA9IHRvdWNoLmNsaWVudFg7XG4gICAgdG91Y2hFbmRZID0gdG91Y2guY2xpZW50WTtcbiAgICBcbiAgICBoYW5kbGVTd2lwZSgpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVTd2lwZSgpIHtcbiAgICBjb25zdCBkZWx0YVggPSB0b3VjaEVuZFggLSB0b3VjaFN0YXJ0WDtcbiAgICBjb25zdCBkZWx0YVkgPSB0b3VjaEVuZFkgLSB0b3VjaFN0YXJ0WTtcbiAgICBcbiAgICBpZiAoTWF0aC5hYnMoZGVsdGFYKSA+IG1pblN3aXBlRGlzdGFuY2UgJiYgTWF0aC5hYnMoZGVsdGFYKSA+IE1hdGguYWJzKGRlbHRhWSkpIHtcbiAgICAgIGlmIChkZWx0YVggPiAwKSB7XG4gICAgICAgIHByZXZTbGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dFNsaWRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZSkge1xuICAgIGlmICghaXNTbGlkZXJBY3RpdmUpIHJldHVybjtcbiAgICBcbiAgICBpc01vdXNlRG93biA9IHRydWU7XG4gICAgdG91Y2hTdGFydFggPSBlLmNsaWVudFg7XG4gICAgdG91Y2hTdGFydFkgPSBlLmNsaWVudFk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZU1vdmUoZSkge1xuICAgIGlmICghaXNTbGlkZXJBY3RpdmUgfHwgIWlzTW91c2VEb3duKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgZGVsdGFYID0gTWF0aC5hYnMoZS5jbGllbnRYIC0gdG91Y2hTdGFydFgpO1xuICAgIGNvbnN0IGRlbHRhWSA9IE1hdGguYWJzKGUuY2xpZW50WSAtIHRvdWNoU3RhcnRZKTtcbiAgICBcbiAgICBpZiAoZGVsdGFYID4gZGVsdGFZKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZVVwKGUpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlIHx8ICFpc01vdXNlRG93bikgcmV0dXJuO1xuICAgIFxuICAgIGlzTW91c2VEb3duID0gZmFsc2U7XG4gICAgdG91Y2hFbmRYID0gZS5jbGllbnRYO1xuICAgIHRvdWNoRW5kWSA9IGUuY2xpZW50WTtcbiAgICBcbiAgICBoYW5kbGVTd2lwZSgpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBpbml0U2xpZGVyKCkge1xuICAgIHVwZGF0ZUNhcmREaW1lbnNpb25zKCk7XG4gICAgY29uc3Qgc2hvdWxkQmVBY3RpdmUgPSBjaGVja1NsaWRlckFjdGl2ZSgpO1xuICAgIFxuICAgIGlmIChzaG91bGRCZUFjdGl2ZSAmJiAhaXNTbGlkZXJBY3RpdmUpIHtcbiAgICAgIGlzU2xpZGVyQWN0aXZlID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRTdGVwID0gMDtcbiAgICAgIGNhbGN1bGF0ZU1heFN0ZXBzKCk7XG4gICAgICB1cGRhdGVTbGlkZXJQb3NpdGlvbigpO1xuICAgIH0gZWxzZSBpZiAoIXNob3VsZEJlQWN0aXZlICYmIGlzU2xpZGVyQWN0aXZlKSB7XG4gICAgICBpc1NsaWRlckFjdGl2ZSA9IGZhbHNlO1xuICAgICAgcmVzZXRTbGlkZXIoKTtcbiAgICB9IGVsc2UgaWYgKGlzU2xpZGVyQWN0aXZlKSB7XG4gICAgICBjYWxjdWxhdGVNYXhTdGVwcygpO1xuICAgICAgdXBkYXRlU2xpZGVyUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEV2ZW50IGxpc3RlbmVycyDQtNC70Y8g0LrQvdC+0L/QvtC6XG4gIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcmV2U2xpZGUpO1xuICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbmV4dFNsaWRlKTtcbiAgXG4gIC8vIFRvdWNoIGV2ZW50c1xuICBzbGlkZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGhhbmRsZVRvdWNoU3RhcnQsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gIHNsaWRlckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBoYW5kbGVUb3VjaE1vdmUsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gIHNsaWRlckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGhhbmRsZVRvdWNoRW5kLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICBcbiAgLy8gTW91c2UgZXZlbnRzXG4gIHNsaWRlckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVNb3VzZURvd24pO1xuICBzbGlkZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKTtcbiAgc2xpZGVyQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgc2xpZGVyQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoaXNNb3VzZURvd24pIHtcbiAgICAgIGlzTW91c2VEb3duID0gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIC8vIEtleWJvYXJkIHN1cHBvcnRcbiAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKCFpc1NsaWRlckFjdGl2ZSkgcmV0dXJuO1xuICAgIFxuICAgIGlmIChlLmtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHByZXZTbGlkZSgpO1xuICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbmV4dFNsaWRlKCk7XG4gICAgfVxuICB9KTtcbiAgXG4gIC8vIFJlc2l6ZSBoYW5kbGVyXG4gIGxldCByZXNpemVUaW1lb3V0O1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVvdXQpO1xuICAgIHJlc2l6ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaW5pdFNsaWRlcigpO1xuICAgIH0sIDIwMCk7XG4gIH0pO1xuICBcbiAgLy8g0IbQvdGW0YbRltCw0LvRltC30LDRhtGW0Y9cbiAgaW5pdFNsaWRlcigpO1xufSk7XG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHNsaWRlckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlLXNsaWRlcicpO1xuICBpZiAoIXNsaWRlckNvbnRhaW5lcikgcmV0dXJuO1xuICBcbiAgY29uc3QgbWFpbkltYWdlID0gc2xpZGVyQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlLXNsaWRlcl9fbWFpbi1pbWFnZS1pbWcnKTtcbiAgY29uc3QgdGh1bWJuYWlscyA9IHNsaWRlckNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuYXJ0aWNsZS1zbGlkZXJfX3RodW1ibmFpbCcpO1xuICBjb25zdCBwcmV2QnRuID0gc2xpZGVyQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlLXNsaWRlcl9fbmF2LWJ0bi0tcHJldicpO1xuICBjb25zdCBuZXh0QnRuID0gc2xpZGVyQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlLXNsaWRlcl9fbmF2LWJ0bi0tbmV4dCcpO1xuICBjb25zdCB0aHVtYm5haWxzQ29udGFpbmVyID0gc2xpZGVyQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlLXNsaWRlcl9fdGh1bWJuYWlscy1jb250YWluZXInKTtcbiAgXG4gIGlmICghbWFpbkltYWdlIHx8ICF0aHVtYm5haWxzLmxlbmd0aCB8fCAhcHJldkJ0biB8fCAhbmV4dEJ0bikgcmV0dXJuO1xuICBcbiAgbGV0IGN1cnJlbnRTbGlkZSA9IDA7XG4gIGNvbnN0IHRvdGFsU2xpZGVzID0gdGh1bWJuYWlscy5sZW5ndGg7XG4gIFxuICBjb25zdCBzbGlkZXMgPSBBcnJheS5mcm9tKHRodW1ibmFpbHMpLm1hcChmdW5jdGlvbih0aHVtYm5haWwpIHtcbiAgICBjb25zdCBpbWcgPSB0aHVtYm5haWwucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gICAgcmV0dXJuIGltZyA/IGltZy5zcmMgOiAnJztcbiAgfSkuZmlsdGVyKGZ1bmN0aW9uKHNyYykge1xuICAgIHJldHVybiBzcmMgIT09ICcnO1xuICB9KTtcbiAgXG4gIGlmIChzbGlkZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gIFxuICBmdW5jdGlvbiB1cGRhdGVTbGlkZXIoKSB7XG4gICAgaWYgKHNsaWRlc1tjdXJyZW50U2xpZGVdKSB7XG4gICAgICBtYWluSW1hZ2Uuc3JjID0gc2xpZGVzW2N1cnJlbnRTbGlkZV07XG4gICAgfVxuICAgIFxuICAgIHRodW1ibmFpbHMuZm9yRWFjaChmdW5jdGlvbih0aHVtYm5haWwsIGluZGV4KSB7XG4gICAgICBpZiAoaW5kZXggPT09IGN1cnJlbnRTbGlkZSkge1xuICAgICAgICB0aHVtYm5haWwuY2xhc3NMaXN0LmFkZCgnYXJ0aWNsZS1zbGlkZXJfX3RodW1ibmFpbC0tYWN0aXZlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHVtYm5haWwuY2xhc3NMaXN0LnJlbW92ZSgnYXJ0aWNsZS1zbGlkZXJfX3RodW1ibmFpbC0tYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRodW1ibmFpbHNDb250YWluZXIgJiYgdGh1bWJuYWlsc1tjdXJyZW50U2xpZGVdKSB7XG4gICAgICBjb25zdCBhY3RpdmVUaHVtYm5haWwgPSB0aHVtYm5haWxzW2N1cnJlbnRTbGlkZV07XG4gICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHRodW1ibmFpbHNDb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgICBjb25zdCB0aHVtYm5haWxXaWR0aCA9IGFjdGl2ZVRodW1ibmFpbC5vZmZzZXRXaWR0aDtcbiAgICAgIGNvbnN0IHRodW1ibmFpbExlZnQgPSBhY3RpdmVUaHVtYm5haWwub2Zmc2V0TGVmdDtcbiAgICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxMZWZ0ID0gdGh1bWJuYWlsc0NvbnRhaW5lci5zY3JvbGxMZWZ0O1xuICAgICAgXG4gICAgICBsZXQgc2Nyb2xsTGVmdDtcbiAgICAgIFxuICAgICAgaWYgKGN1cnJlbnRTbGlkZSA9PT0gMCkge1xuICAgICAgICBzY3JvbGxMZWZ0ID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRodW1ibmFpbFJpZ2h0ID0gdGh1bWJuYWlsTGVmdCArIHRodW1ibmFpbFdpZHRoO1xuICAgICAgICBjb25zdCBjb250YWluZXJSaWdodCA9IGN1cnJlbnRTY3JvbGxMZWZ0ICsgY29udGFpbmVyV2lkdGg7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpc0Z1bGx5VmlzaWJsZSA9IHRodW1ibmFpbExlZnQgPj0gY3VycmVudFNjcm9sbExlZnQgJiYgdGh1bWJuYWlsUmlnaHQgPD0gY29udGFpbmVyUmlnaHQ7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWlzRnVsbHlWaXNpYmxlKSB7XG4gICAgICAgICAgaWYgKHRodW1ibmFpbExlZnQgPCBjdXJyZW50U2Nyb2xsTGVmdCkge1xuICAgICAgICAgICAgc2Nyb2xsTGVmdCA9IHRodW1ibmFpbExlZnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHRodW1ibmFpbFJpZ2h0ID4gY29udGFpbmVyUmlnaHQpIHtcbiAgICAgICAgICAgIHNjcm9sbExlZnQgPSB0aHVtYm5haWxSaWdodCAtIGNvbnRhaW5lcldpZHRoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoc2Nyb2xsTGVmdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRodW1ibmFpbHNDb250YWluZXIuc2Nyb2xsVG8oe1xuICAgICAgICAgIGxlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gbmV4dFNsaWRlKCkge1xuICAgIGN1cnJlbnRTbGlkZSA9IChjdXJyZW50U2xpZGUgKyAxKSAlIHRvdGFsU2xpZGVzO1xuICAgIHVwZGF0ZVNsaWRlcigpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBwcmV2U2xpZGUoKSB7XG4gICAgY3VycmVudFNsaWRlID0gKGN1cnJlbnRTbGlkZSAtIDEgKyB0b3RhbFNsaWRlcykgJSB0b3RhbFNsaWRlcztcbiAgICB1cGRhdGVTbGlkZXIoKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gZ29Ub1NsaWRlKGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0b3RhbFNsaWRlcykge1xuICAgICAgY3VycmVudFNsaWRlID0gaW5kZXg7XG4gICAgICB1cGRhdGVTbGlkZXIoKTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEV2ZW50IGxpc3RlbmVyc1xuICBwcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJldlNsaWRlKTtcbiAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG5leHRTbGlkZSk7XG4gIFxuICAvLyBUaHVtYm5haWwgY2xpY2tzXG4gIHRodW1ibmFpbHMuZm9yRWFjaChmdW5jdGlvbih0aHVtYm5haWwsIGluZGV4KSB7XG4gICAgdGh1bWJuYWlsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBnb1RvU2xpZGUoaW5kZXgpO1xuICAgIH0pO1xuICB9KTtcbiAgXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKHNsaWRlckNvbnRhaW5lci5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB8fCBzbGlkZXJDb250YWluZXIubWF0Y2hlcygnOmhvdmVyJykpIHtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBwcmV2U2xpZGUoKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG5leHRTbGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIFxuICB1cGRhdGVTbGlkZXIoKTtcbn0pO1xuIiwiY29uc3QgZmFxSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuRmFxUGFnZV9faXRlbScpO1xuXG5jb25zdCBjbG9zZUFsbEZhcUl0ZW1zID0gKCkgPT4ge1xuICBmYXFJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgY29uc3QgdHJpZ2dlciA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLkZhcVBhZ2VfX3RyaWdnZXInKTtcbiAgICBjb25zdCBpY29uID0gdHJpZ2dlciA/IHRyaWdnZXIucXVlcnlTZWxlY3RvcignLkZhcVBhZ2VfX2ljb24gaW1nJykgOiBudWxsO1xuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICB0cmlnZ2VyLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgIH1cbiAgICBpZiAoaWNvbikge1xuICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ2FsdCcsICfQn9C+0LrQsNC30LDRgtC4INCy0ZbQtNC/0L7QstGW0LTRjCcpO1xuICAgIH1cbiAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ0ZhcVBhZ2VfX2l0ZW0tLWFjdGl2ZScpO1xuICB9KTtcbn07XG5cbmNvbnN0IHRvZ2dsZUZhcUl0ZW0gPSAoaXRlbSkgPT4ge1xuICBjb25zdCBpc0FjdGl2ZSA9IGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdGYXFQYWdlX19pdGVtLS1hY3RpdmUnKTtcblxuICBjbG9zZUFsbEZhcUl0ZW1zKCk7XG5cbiAgaWYgKCFpc0FjdGl2ZSkge1xuICAgIGNvbnN0IHRyaWdnZXIgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5GYXFQYWdlX190cmlnZ2VyJyk7XG4gICAgY29uc3QgaWNvbiA9IHRyaWdnZXIgPyB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoJy5GYXFQYWdlX19pY29uIGltZycpIDogbnVsbDtcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgdHJpZ2dlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgIH1cbiAgICBpZiAoaWNvbikge1xuICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ2FsdCcsICfQn9GA0LjRhdC+0LLQsNGC0Lgg0LLRltC00L/QvtCy0ZbQtNGMJyk7XG4gICAgfVxuICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnRmFxUGFnZV9faXRlbS0tYWN0aXZlJyk7XG4gIH1cbn07XG5cbmlmIChmYXFJdGVtcy5sZW5ndGgpIHtcbiAgZmFxSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IHRyaWdnZXIgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5GYXFQYWdlX190cmlnZ2VyJyk7XG5cbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdG9nZ2xlRmFxSXRlbShpdGVtKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59XG4iLCJjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XG5jb25zdCBidXJnZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19idXJnZXInKTtcbmNvbnN0IG1vYmlsZVdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX193cmFwcGVyTW9iaWxlJyk7XG5jb25zdCBsYW5nQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfX2xhbmctYnV0dG9uJyk7XG5jb25zdCBsYW5nQnV0dG9uc01vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfX2xhbmdCdXR0b25Nb2JpbGUnKTtcblxuY29uc3QgYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYnVyZ2VyJyk7XG5jb25zdCBidXJnZXJUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYnVyZ2VyLXRleHQnKTtcblxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC30LDQutGA0LjRgtGC0Y8g0LzQvtCx0ZbQu9GM0L3QvtCz0L4g0LzQtdC90Y5cbmNvbnN0IGNsb3NlTW9iaWxlTWVudSA9ICgpID0+IHtcbiAgaWYgKGhlYWRlcikge1xuICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoZWFkZXItLW1lbnUtb3BlbicpO1xuICB9XG4gIGlmIChidXJnZXIpIHtcbiAgICBidXJnZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlQnVyZ2VyQnV0dG9uJyk7XG4gIH1cbiAgaWYgKGJ1cmdlclRleHQpIHtcbiAgICBidXJnZXJUZXh0LnRleHRDb250ZW50ID0gJ9Cc0LXQvdGOJztcbiAgfVxuICBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgfVxufTtcblxuaWYgKGJ1cmdlciAmJiBidXJnZXJUZXh0KSB7XG4gIGJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBidXJnZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlQnVyZ2VyQnV0dG9uJyk7XG5cbiAgICBpZiAoYnVyZ2VyLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlQnVyZ2VyQnV0dG9uJykpIHtcbiAgICAgIGJ1cmdlclRleHQudGV4dENvbnRlbnQgPSAn0JfQsNC60YDQuNGC0LgnO1xuICAgIH0gZWxzZSB7XG4gICAgICBidXJnZXJUZXh0LnRleHRDb250ZW50ID0gJ9Cc0LXQvdGOJztcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuXG5pZiAobGFuZ0J1dHRvbnNNb2JpbGUubGVuZ3RoKSB7XG4gIGxhbmdCdXR0b25zTW9iaWxlLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGxhbmdCdXR0b25zTW9iaWxlLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyX19sYW5nQnV0dG9uTW9iaWxlLS1hY3RpdmUnKSk7XG5cbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoZWFkZXJfX2xhbmdCdXR0b25Nb2JpbGUtLWFjdGl2ZScpO1xuICAgIH0pO1xuICB9KTtcbn1cbmlmIChsYW5nQnV0dG9ucy5sZW5ndGgpIHtcbiAgbGFuZ0J1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbGFuZ0J1dHRvbnMuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoZWFkZXJfX2xhbmctYnV0dG9uLS1hY3RpdmUnKSk7XG5cbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoZWFkZXJfX2xhbmctYnV0dG9uLS1hY3RpdmUnKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmlmIChidXJnZXJCdXR0b24gJiYgaGVhZGVyICYmIG1vYmlsZVdyYXBwZXIpIHtcbiAgYnVyZ2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXItLW1lbnUtb3BlbicpO1xuICB9KTtcbn1cblxuY29uc3QgaGVhZGVyQmFja2dyb3VuZENsYXNzID0gJ2hlYWRlci0tc2Nyb2xsZWQnO1xuY29uc3QgaGVhZGVyQmFja2dyb3VuZFRocmVzaG9sZCA9IDIwO1xuXG5jb25zdCBzZXRIZWFkZXJCYWNrZ3JvdW5kID0gKCkgPT4ge1xuICBpZiAoIWhlYWRlcikgcmV0dXJuO1xuICBpZiAod2luZG93LnNjcm9sbFkgPiBoZWFkZXJCYWNrZ3JvdW5kVGhyZXNob2xkKSB7XG4gICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoaGVhZGVyQmFja2dyb3VuZENsYXNzKTtcbiAgfSBlbHNlIHtcbiAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShoZWFkZXJCYWNrZ3JvdW5kQ2xhc3MpO1xuICB9XG59O1xuXG5zZXRIZWFkZXJCYWNrZ3JvdW5kKCk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2V0SGVhZGVyQmFja2dyb3VuZCk7XG5cbmNvbnN0IHNldEFjdGl2ZVBhZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudFBhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgY29uc3QgY3VycmVudFBhZ2UgPSBjdXJyZW50UGF0aC5zcGxpdCgnLycpLnBvcCgpIHx8ICdpbmRleC5odG1sJztcbiAgICBcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfX25hdiBhLCAuaGVhZGVyX19tZW51TW9iaWxlLWxpbmsnKTtcbiAgICBjb25zdCBuYXZJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfX25hdiBsaScpO1xuICAgIFxuICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyX19uYXYtbGluay0tYWN0aXZlJyk7XG4gICAgfSk7XG4gICAgXG4gICAgbmF2SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoZWFkZXJfX25hdi1pdGVtLS1hY3RpdmUnKTtcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBhY3RpdmVMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmhlYWRlcl9fbmF2IGFbaHJlZj1cIiR7Y3VycmVudFBhZ2V9XCJdLCAuaGVhZGVyX19tZW51TW9iaWxlLWxpbmtbaHJlZj1cIiR7Y3VycmVudFBhZ2V9XCJdYCk7XG4gICAgaWYgKGFjdGl2ZUxpbmspIHtcbiAgICAgICAgYWN0aXZlTGluay5jbGFzc0xpc3QuYWRkKCdoZWFkZXJfX25hdi1saW5rLS1hY3RpdmUnKTtcbiAgICAgICAgY29uc3QgcGFyZW50TGkgPSBhY3RpdmVMaW5rLmNsb3Nlc3QoJy5oZWFkZXJfX25hdiBsaScpO1xuICAgICAgICBpZiAocGFyZW50TGkpIHtcbiAgICAgICAgICAgIHBhcmVudExpLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcl9fbmF2LWl0ZW0tLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gJ2luZGV4Lmh0bWwnIHx8IGN1cnJlbnRQYWdlID09PSAnJyB8fCBjdXJyZW50UGFnZSA9PT0gJy8nKSB7XG4gICAgICAgIGNvbnN0IGluZGV4TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX25hdiBhW2hyZWY9XCJpbmRleC5odG1sXCJdLCAuaGVhZGVyX19tZW51TW9iaWxlLWxpbmtbaHJlZj1cImluZGV4Lmh0bWxcIl0nKTtcbiAgICAgICAgaWYgKGluZGV4TGluaykge1xuICAgICAgICAgICAgaW5kZXhMaW5rLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcl9fbmF2LWxpbmstLWFjdGl2ZScpO1xuICAgICAgICAgICAgY29uc3QgcGFyZW50TGkgPSBpbmRleExpbmsuY2xvc2VzdCgnLmhlYWRlcl9fbmF2IGxpJyk7XG4gICAgICAgICAgICBpZiAocGFyZW50TGkpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRMaS5jbGFzc0xpc3QuYWRkKCdoZWFkZXJfX25hdi1pdGVtLS1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8vINCe0LHRgNC+0LHQutCwINC30LzRltC90Lgg0YDQvtC30LzRltGA0YMg0LLRltC60L3QsCAtINC30LDQutGA0LjRgtC4INC80LXQvdGOINC/0YDQuCDRiNC40YDQuNC90ZYgPiA4ODBweFxuY29uc3QgaGFuZGxlUmVzaXplID0gKCkgPT4ge1xuICBpZiAod2luZG93LmlubmVyV2lkdGggPiA4ODApIHtcbiAgICBjbG9zZU1vYmlsZU1lbnUoKTtcbiAgfVxufTtcblxuLy8g0JTQvtC00LDRgtC4INC+0LHRgNC+0LHQvdC40LogcmVzaXplINC3IGRlYm91bmNlINC00LvRjyDQvtC/0YLQuNC80ZbQt9Cw0YbRltGXXG5sZXQgcmVzaXplVGltZXI7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICBjbGVhclRpbWVvdXQocmVzaXplVGltZXIpO1xuICByZXNpemVUaW1lciA9IHNldFRpbWVvdXQoaGFuZGxlUmVzaXplLCAxMDApO1xufSk7XG5cbi8vINCX0LDQutGA0LjRgtC4INC80L7QsdGW0LvRjNC90LUg0LzQtdC90Y4g0L/RgNC4INC60LvRltC60YMg0L3QsCDQv9C+0YHQuNC70LDQvdC90Y9cbmNvbnN0IG1vYmlsZU1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfX21lbnVNb2JpbGUtbGluaycpO1xuaWYgKG1vYmlsZU1lbnVMaW5rcy5sZW5ndGgpIHtcbiAgbW9iaWxlTWVudUxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNsb3NlTW9iaWxlTWVudSgpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuXG4vLyBJbml0aWFsaXplIGFjdGl2ZSBwYWdlIG9uIERPTSBsb2FkIGFuZCBjbG9zZSBtb2JpbGUgbWVudVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY2xvc2VNb2JpbGVNZW51KCk7IC8vINCX0LDQutGA0LjRgtC4INC80LXQvdGOINC/0YDQuCDQt9Cw0LLQsNC90YLQsNC20LXQvdC90ZZcbiAgc2V0QWN0aXZlUGFnZSgpO1xuICBoYW5kbGVSZXNpemUoKTsgLy8g0J/QtdGA0LXQstGW0YDQuNGC0Lgg0YDQvtC30LzRltGAINCy0ZbQutC90LBcbn0pO1xuIiwiY29uc3QgaGVscFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlbHBQb3B1cCcpO1xuY29uc3QgaGVscFBvcHVwQ2xvc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVscFBvcHVwQ2xvc2UnKTtcbmNvbnN0IGhlbHBGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlbHBGb3JtJyk7XG5jb25zdCBoZWxwRmlsZVVwbG9hZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWxwRmlsZVVwbG9hZCcpO1xuY29uc3QgaGVscFBvcHVwQ29udGFpbmVyID0gaGVscFBvcHVwID8gaGVscFBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5oZWxwUG9wdXBfX2NvbnRhaW5lcicpIDogbnVsbDtcbmNvbnN0IGhlbHBGb3JtU3RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVscFBvcHVwX19mb3JtU3RhdGUnKTtcbmNvbnN0IGhlbHBTdWNjZXNzU3RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVscFBvcHVwX19zdWNjZXNzJyk7XG5cbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtGH0LjRidC10L3QvdGPINC/0L7QvNC40LvQvtC6XG5jb25zdCBjbGVhckFsbEVycm9ycyA9ICgpID0+IHtcbiAgLy8g0J7Rh9C40YHRgtC40YLQuCDQv9C+0LzQuNC70LrQuCBlbWFpbFxuICBjb25zdCBlbWFpbElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtYWlsJyk7XG4gIGNvbnN0IGVtYWlsRXJyb3JNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlbHBQb3B1cF9fZXJyb3JNZXNzYWdlLS1lbWFpbCcpO1xuICBpZiAoZW1haWxJbnB1dCkge1xuICAgIGVtYWlsSW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcbiAgfVxuICBpZiAoZW1haWxFcnJvck1lc3NhZ2UpIHtcbiAgICBlbWFpbEVycm9yTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICBlbWFpbEVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9ICcnO1xuICB9XG4gIFxuICAvLyDQntGH0LjRgdGC0LjRgtC4INC/0L7QvNC40LvQutC4INGE0LDQudC70YNcbiAgY29uc3QgdXBsb2FkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlbHBQb3B1cF9fdXBsb2FkJyk7XG4gIGNvbnN0IHVwbG9hZFN1YnRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlbHBQb3B1cF9fdXBsb2FkU3VidGl0bGUnKTtcbiAgaWYgKHVwbG9hZENvbnRhaW5lcikge1xuICAgIHVwbG9hZENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICB9XG4gIGlmICh1cGxvYWRTdWJ0aXRsZSkge1xuICAgIHVwbG9hZFN1YnRpdGxlLnRleHRDb250ZW50ID0gJ9Cc0LDQutGB0LjQvNCw0LvRjNC90LjQuSDRgNC+0LfQvNGW0YAgNSDQnNCRJztcbiAgfVxuICBcbiAgLy8g0J7Rh9C40YHRgtC40YLQuCDRltC8J9GPINGE0LDQudC70YNcbiAgY29uc3QgZmlsZU5hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlbHBQb3B1cF9fZmlsZU5hbWUnKTtcbiAgaWYgKGZpbGVOYW1lRWxlbWVudCkge1xuICAgIGZpbGVOYW1lRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICBmaWxlTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgfVxufTtcblxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINCy0ZbQtNC60YDQuNGC0YLRjyDQv9C+0L/QsNC/0YNcbmNvbnN0IG9wZW5IZWxwUG9wdXAgPSAoKSA9PiB7XG4gIGlmIChoZWxwUG9wdXApIHtcbiAgICBpZiAoaGVscEZvcm1TdGF0ZSkge1xuICAgICAgaGVscEZvcm1TdGF0ZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBpZiAoaGVscFN1Y2Nlc3NTdGF0ZSkge1xuICAgICAgaGVscFN1Y2Nlc3NTdGF0ZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB9XG5cbiAgICBpZiAoaGVscFBvcHVwQ29udGFpbmVyKSB7XG4gICAgICBoZWxwUG9wdXBDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGVscFBvcHVwX19jb250YWluZXItLXN1Y2Nlc3MnKTtcbiAgICB9XG5cbiAgICAvLyDQntGH0LjRgdGC0LjRgtC4INCy0YHRliDQv9C+0LzQuNC70LrQuCDQv9GA0Lgg0LLRltC00LrRgNC40YLRgtGWXG4gICAgY2xlYXJBbGxFcnJvcnMoKTtcblxuICAgIGhlbHBQb3B1cC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gIH1cbn07XG5cbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQt9Cw0LrRgNC40YLRgtGPINC/0L7Qv9Cw0L/Rg1xuY29uc3QgY2xvc2VIZWxwUG9wdXAgPSAoKSA9PiB7XG4gIGlmIChoZWxwUG9wdXApIHtcbiAgICBoZWxwUG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuXG4gICAgaWYgKGhlbHBGb3JtU3RhdGUpIHtcbiAgICAgIGhlbHBGb3JtU3RhdGUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgaWYgKGhlbHBTdWNjZXNzU3RhdGUpIHtcbiAgICAgIGhlbHBTdWNjZXNzU3RhdGUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgaWYgKGhlbHBQb3B1cENvbnRhaW5lcikge1xuICAgICAgaGVscFBvcHVwQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlbHBQb3B1cF9fY29udGFpbmVyLS1zdWNjZXNzJyk7XG4gICAgfVxuICB9XG59O1xuXG4vLyDQl9Cw0LrRgNC40YLRgtGPINC/0L4g0LrQu9GW0LrRgyDQvdCwINGF0YDQtdGB0YLQuNC6XG5pZiAoaGVscFBvcHVwQ2xvc2UpIHtcbiAgaGVscFBvcHVwQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUhlbHBQb3B1cCk7XG59XG5cbi8vINCX0LDQutGA0LjRgtGC0Y8g0L/QviDQutC70ZbQutGDINC90LAgb3ZlcmxheVxuaWYgKGhlbHBQb3B1cCkge1xuICBjb25zdCBvdmVybGF5ID0gaGVscFBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5oZWxwUG9wdXBfX292ZXJsYXknKTtcbiAgaWYgKG92ZXJsYXkpIHtcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VIZWxwUG9wdXApO1xuICB9XG59XG5cbi8vINCX0LDQutGA0LjRgtGC0Y8g0L/QviDQutC70LDQstGW0YjRliBFc2NhcGVcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIGhlbHBQb3B1cCAmJiBoZWxwUG9wdXAuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgIGNsb3NlSGVscFBvcHVwKCk7XG4gIH1cbn0pO1xuXG4vLyDQntCx0YDQvtCx0LrQsCDQt9Cw0LLQsNC90YLQsNC20LXQvdC90Y8g0YTQsNC50LvRg1xuaWYgKGhlbHBGaWxlVXBsb2FkKSB7XG4gIGhlbHBGaWxlVXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xuICAgIGNvbnN0IGZpbGVOYW1lRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWxwUG9wdXBfX2ZpbGVOYW1lJyk7XG4gICAgY29uc3QgdXBsb2FkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlbHBQb3B1cF9fdXBsb2FkJyk7XG4gICAgY29uc3QgdXBsb2FkU3VidGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVscFBvcHVwX191cGxvYWRTdWJ0aXRsZScpO1xuICAgIFxuICAgIC8vINCe0YfQuNGB0YLQuNGC0Lgg0L/QvtC/0LXRgNC10LTQvdGWINC/0L7QvNC40LvQutC4XG4gICAgaWYgKHVwbG9hZENvbnRhaW5lcikge1xuICAgICAgdXBsb2FkQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XG4gICAgfVxuICAgIGlmICh1cGxvYWRTdWJ0aXRsZSkge1xuICAgICAgdXBsb2FkU3VidGl0bGUudGV4dENvbnRlbnQgPSAn0JzQsNC60YHQuNC80LDQu9GM0L3QuNC5INGA0L7Qt9C80ZbRgCA1INCc0JEnO1xuICAgIH1cbiAgICBcbiAgICBpZiAoZmlsZSkge1xuICAgICAgY29uc3QgbWF4U2l6ZSA9IDUgKiAxMDI0ICogMTAyNDsgLy8gNU1CXG4gICAgICBcbiAgICAgIGlmIChmaWxlLnNpemUgPiBtYXhTaXplKSB7XG4gICAgICAgIC8vINCf0L7QutCw0LfQsNGC0Lgg0L/QvtC80LjQu9C60YNcbiAgICAgICAgaWYgKHVwbG9hZENvbnRhaW5lcikge1xuICAgICAgICAgIHVwbG9hZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGxvYWRTdWJ0aXRsZSkge1xuICAgICAgICAgIHVwbG9hZFN1YnRpdGxlLnRleHRDb250ZW50ID0gJ9Ck0LDQudC7INCx0ZbQu9GM0YjQtSA1INCc0JEnO1xuICAgICAgICB9XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlID0gJyc7XG4gICAgICAgIGlmIChmaWxlTmFtZUVsZW1lbnQpIHtcbiAgICAgICAgICBmaWxlTmFtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgZmlsZU5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoZmlsZU5hbWVFbGVtZW50KSB7XG4gICAgICAgIGZpbGVOYW1lRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgZmlsZU5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gZmlsZS5uYW1lO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZmlsZU5hbWVFbGVtZW50KSB7XG4gICAgICAgIGZpbGVOYW1lRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgZmlsZU5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuLy8g0JLQsNC70ZbQtNCw0YbRltGPIGVtYWlsINC3IGZsb2F0aW5nIGxhYmVsXG5jb25zdCBlbWFpbElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtYWlsJyk7XG5jb25zdCBlbWFpbEVycm9yTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWxwUG9wdXBfX2Vycm9yTWVzc2FnZS0tZW1haWwnKTtcblxuaWYgKGVtYWlsSW5wdXQgJiYgZW1haWxFcnJvck1lc3NhZ2UpIHtcbiAgLy8g0J7QsdGA0L7QsdC60LAg0YTQvtC60YPRgdGDINC00LvRjyBmbG9hdGluZyBsYWJlbFxuICBlbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKGUpID0+IHtcbiAgICAvLyDQntGH0LjRgdGC0LjRgtC4INC/0L7QvNC40LvQutC4INC/0YDQuCDRhNC+0LrRg9GB0ZZcbiAgICBlbWFpbElucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XG4gICAgZW1haWxFcnJvck1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgZW1haWxFcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSAnJztcbiAgfSk7XG4gIFxuICBlbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoZSkgPT4ge1xuICAgIGNvbnN0IGVtYWlsID0gZS50YXJnZXQudmFsdWU7XG4gICAgY29uc3QgZW1haWxSZWdleCA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvO1xuICAgIFxuICAgIC8vINCe0YfQuNGB0YLQuNGC0Lgg0L/QvtC/0LXRgNC10LTQvdGWINC/0L7QvNC40LvQutC4XG4gICAgZW1haWxJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgIGVtYWlsRXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIGVtYWlsRXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gJyc7XG4gICAgXG4gICAgaWYgKGVtYWlsICYmICFlbWFpbFJlZ2V4LnRlc3QoZW1haWwpKSB7XG4gICAgICBlbWFpbElucHV0LmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XG4gICAgICBlbWFpbEVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIGVtYWlsRXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gJ9Cd0LXQstGW0YDQvdC40Lkg0YTQvtGA0LzQsNGCIGVtYWlsJztcbiAgICB9XG4gIH0pO1xuICBcbiAgZW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XG4gICAgLy8g0J7Rh9C40YHRgtC40YLQuCDQv9C+0LzQuNC70LrQuCDQv9GA0Lgg0LLQstC10LTQtdC90L3RllxuICAgIGVtYWlsSW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcbiAgICBlbWFpbEVycm9yTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICBlbWFpbEVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9ICcnO1xuICB9KTtcbn1cblxuLy8g0J7QsdGA0L7QsdC60LAg0LLRltC00L/RgNCw0LLQutC4INGE0L7RgNC80LhcbmlmIChoZWxwRm9ybSkge1xuICBoZWxwRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShoZWxwRm9ybSk7XG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gaGVscEZvcm0ucXVlcnlTZWxlY3RvcignLmhlbHBQb3B1cF9fc3VibWl0Jyk7XG4gICAgY29uc3QgZmlsZU5hbWVFbGVtZW50ID0gaGVscEZvcm0ucXVlcnlTZWxlY3RvcignLmhlbHBQb3B1cF9fZmlsZU5hbWUnKTtcbiAgICBjb25zdCBlbWFpbElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtYWlsJyk7XG4gICAgY29uc3QgZW1haWxFcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVscFBvcHVwX19lcnJvck1lc3NhZ2UtLWVtYWlsJyk7XG4gICAgXG4gICAgLy8g0JLQsNC70ZbQtNCw0YbRltGPIGVtYWlsINC/0LXRgNC10LQg0LLRltC00L/RgNCw0LLQutC+0Y5cbiAgICBsZXQgaGFzRXJyb3JzID0gZmFsc2U7XG4gICAgaWYgKGVtYWlsSW5wdXQgJiYgZW1haWxFcnJvck1lc3NhZ2UpIHtcbiAgICAgIGNvbnN0IGVtYWlsID0gZW1haWxJbnB1dC52YWx1ZTtcbiAgICAgIGNvbnN0IGVtYWlsUmVnZXggPSAvXlteXFxzQF0rQFteXFxzQF0rXFwuW15cXHNAXSskLztcbiAgICAgIFxuICAgICAgaWYgKCFlbWFpbCB8fCAhZW1haWxSZWdleC50ZXN0KGVtYWlsKSkge1xuICAgICAgICBlbWFpbElucHV0LmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XG4gICAgICAgIGVtYWlsRXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICBlbWFpbEVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9ICfQndC10LLRltGA0L3QuNC5INGE0L7RgNC80LDRgiBlbWFpbCc7XG4gICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIGlmIChoYXNFcnJvcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgaWYgKHN1Ym1pdEJ1dHRvbikge1xuICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICfQktGW0LTQv9GA0LDQstC60LAuLi4nO1xuICAgIH1cbiAgICBcbiAgICAvLyDQotGD0YIg0LzQsNGUINCx0YPRgtC4INC60L7QtCDQtNC70Y8g0LLRltC00L/RgNCw0LLQutC4INC00LDQvdC40YUg0L3QsCDRgdC10YDQstC10YBcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChzdWJtaXRCdXR0b24pIHtcbiAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICfQndCw0LTRltGB0LvQsNGC0Lgg0LfQstC10YDQvdC10L3QvdGPJztcbiAgICAgIH1cblxuICAgICAgaGVscEZvcm0ucmVzZXQoKTtcblxuICAgICAgaWYgKGZpbGVOYW1lRWxlbWVudCkge1xuICAgICAgICBmaWxlTmFtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIGZpbGVOYW1lRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGVscEZvcm1TdGF0ZSkge1xuICAgICAgICBoZWxwRm9ybVN0YXRlLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGVscFN1Y2Nlc3NTdGF0ZSkge1xuICAgICAgICBoZWxwU3VjY2Vzc1N0YXRlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGVscFBvcHVwQ29udGFpbmVyKSB7XG4gICAgICAgIGhlbHBQb3B1cENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoZWxwUG9wdXBfX2NvbnRhaW5lci0tc3VjY2VzcycpO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICAgIFxuICB9KTtcbn1cblxuLy8g0JXQutGB0L/QvtGA0YLRg9GU0LzQviDRhNGD0L3QutGG0ZbRjiDQstGW0LTQutGA0LjRgtGC0Y8g0LTQu9GPINCy0LjQutC+0YDQuNGB0YLQsNC90L3RjyDQsiDRltC90YjQuNGFINGE0LDQudC70LDRhVxud2luZG93Lm9wZW5IZWxwUG9wdXAgPSBvcGVuSGVscFBvcHVwO1xuXG4vLyDQn9GW0LTQutC70Y7Rh9C10L3QvdGPINC60L3QvtC/0L7QuiDQstGW0LTQutGA0LjRgtGC0Y8g0L/QvtC/0LDQv9GDINC3IGhlYWRlclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc3QgaGVscEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2hlbHBCdXR0b24nKTtcbiAgY29uc3QgaGVscEJ1dHRvbk1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2hlbHBCdXR0b25Nb2JpbGUnKTtcblxuICBpZiAoaGVscEJ1dHRvbikge1xuICAgIGhlbHBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuSGVscFBvcHVwKTtcbiAgfVxuXG4gIGlmIChoZWxwQnV0dG9uTW9iaWxlKSB7XG4gICAgaGVscEJ1dHRvbk1vYmlsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5IZWxwUG9wdXApO1xuICB9XG59KTtcblxuIiwiLy8gTWFpbiBlbnRyeSBwb2ludCAtINGE0LDQudC70Lgg0LHRg9C00YPRgtGMINC60L7QvdC60LDRgtC10L3Rg9Cy0LDRgtC40YHRjCDQsiDQsNC70YTQsNCy0ZbRgtC90L7QvNGDINC/0L7RgNGP0LTQutGDINGH0LXRgNC10LcgZ3VscFxuLy8g0J/QvtGA0Y/QtNC+0Lo6IGFib3V0U2xpZGVyLmpzLCBhcnRpY2xlU2xpZGVyLmpzLCBmYXEuanMsIGhlYWRlci5qcywgaGVscFBvcHVwLmpzLCBtYWluLmpzLCBuZXdzLmpzXG5cbiIsImNsYXNzIE5ld3NQYWdlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDE7XG4gICAgICAgIHRoaXMuaXRlbXNQZXJQYWdlID0gNDtcbiAgICAgICAgdGhpcy5jdXJyZW50Q2F0ZWdvcnkgPSAnYWxsJztcbiAgICAgICAgdGhpcy5hbGxOZXdzSXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5maWx0ZXJlZE5ld3NJdGVtcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIFxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZ2V0QWxsTmV3c0l0ZW1zKCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLmZpbHRlckFuZFNob3dOZXdzKCk7XG4gICAgICAgIHRoaXMucmVuZGVyUGFnaW5hdGlvbigpO1xuICAgIH1cbiAgICBcbiAgICBnZXRBbGxOZXdzSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuYWxsTmV3c0l0ZW1zID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuTmV3c1BhZ2VfX25ld3NJdGVtJykpO1xuICAgICAgICB0aGlzLmZpbHRlcmVkTmV3c0l0ZW1zID0gWy4uLnRoaXMuYWxsTmV3c0l0ZW1zXTtcbiAgICB9XG4gICAgXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5OZXdzUGFnZV9fY2F0ZWdvcmllc0xpc3QtaXRlbScpO1xuICAgICAgICBjYXRlZ29yeUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNhdGVnb3J5Q2xpY2soZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGhhbmRsZUNhdGVnb3J5Q2xpY2soZSkge1xuICAgICAgICBjb25zdCBjYXRlZ29yeSA9IGUudGFyZ2V0LmRhdGFzZXQuY2F0ZWdvcnk7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuTmV3c1BhZ2VfX2NhdGVnb3JpZXNMaXN0LWl0ZW0nKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdOZXdzUGFnZV9fY2F0ZWdvcmllc0xpc3QtaXRlbS0tYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdOZXdzUGFnZV9fY2F0ZWdvcmllc0xpc3QtaXRlbS0tYWN0aXZlJyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmN1cnJlbnRDYXRlZ29yeSA9IGNhdGVnb3J5O1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZmlsdGVyQW5kU2hvd05ld3MoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJQYWdpbmF0aW9uKCk7XG4gICAgfVxuICAgIFxuICAgIGZpbHRlckFuZFNob3dOZXdzKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50Q2F0ZWdvcnkgPT09ICdhbGwnKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkTmV3c0l0ZW1zID0gWy4uLnRoaXMuYWxsTmV3c0l0ZW1zXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyZWROZXdzSXRlbXMgPSB0aGlzLmFsbE5ld3NJdGVtcy5maWx0ZXIoaXRlbSA9PiBcbiAgICAgICAgICAgICAgICBpdGVtLmRhdGFzZXQuY2F0ZWdvcnkgPT09IHRoaXMuY3VycmVudENhdGVnb3J5XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNob3dDdXJyZW50UGFnZU5ld3MoKTtcbiAgICB9XG4gICAgXG4gICAgc2hvd0N1cnJlbnRQYWdlTmV3cygpIHtcbiAgICAgICAgdGhpcy5hbGxOZXdzSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gKHRoaXMuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuaXRlbXNQZXJQYWdlO1xuICAgICAgICBjb25zdCBlbmRJbmRleCA9IHN0YXJ0SW5kZXggKyB0aGlzLml0ZW1zUGVyUGFnZTtcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2VJdGVtcyA9IHRoaXMuZmlsdGVyZWROZXdzSXRlbXMuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICAgICAgICBcbiAgICAgICAgY3VycmVudFBhZ2VJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyUGFnaW5hdGlvbigpIHtcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdpbmF0aW9uJyk7XG4gICAgICAgIGlmICghcGFnaW5hdGlvbikgcmV0dXJuOyBcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwodGhpcy5maWx0ZXJlZE5ld3NJdGVtcy5sZW5ndGggLyB0aGlzLml0ZW1zUGVyUGFnZSk7XG4gICAgICAgIFxuICAgICAgICBpZiAodG90YWxQYWdlcyA8PSAxKSB7XG4gICAgICAgICAgICBwYWdpbmF0aW9uLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcGFnaW5hdGlvbkhUTUwgPSAnJztcbiAgICAgICAgXG4gICAgICAgIC8vIFByZXZpb3VzIGJ1dHRvblxuICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSBgXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiTmV3c1BhZ2VfX3BhZ2luYXRpb24tYXJyb3cgJHt0aGlzLmN1cnJlbnRQYWdlID09PSAxID8gJ05ld3NQYWdlX19wYWdpbmF0aW9uLWFycm93LS1kaXNhYmxlZCcgOiAnJ31cIiBcbiAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmN1cnJlbnRQYWdlID09PSAxID8gJ2Rpc2FibGVkJyA6ICcnfSBcbiAgICAgICAgICAgICAgICAgICAgb25jbGljaz1cIm5ld3NQYWdlLmdvVG9QYWdlKCR7dGhpcy5jdXJyZW50UGFnZSAtIDF9KVwiPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaW1nL05ld3NQYWdlL2Fycm93LWxlZnQucG5nXCIgYWx0PVwiYXJyb3ctbGVmdFwiPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIGA7XG4gICAgICAgIFxuICAgICAgICAvLyBBbHdheXMgc2hvdyBmaXJzdCBwYWdlXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlID4gMykge1xuICAgICAgICAgICAgcGFnaW5hdGlvbkhUTUwgKz0gYDxidXR0b24gY2xhc3M9XCJOZXdzUGFnZV9fcGFnaW5hdGlvbi1idXR0b25cIiBvbmNsaWNrPVwibmV3c1BhZ2UuZ29Ub1BhZ2UoMSlcIj4xPC9idXR0b24+YDtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlID4gNCkge1xuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MICs9IGA8c3BhbiBjbGFzcz1cIk5ld3NQYWdlX19wYWdpbmF0aW9uLWRvdHNcIj4uLi48L3NwYW4+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gU2hvdyBwYWdlcyBhcm91bmQgY3VycmVudCBwYWdlXG4gICAgICAgIGNvbnN0IHN0YXJ0UGFnZSA9IE1hdGgubWF4KDEsIHRoaXMuY3VycmVudFBhZ2UgLSAxKTtcbiAgICAgICAgY29uc3QgZW5kUGFnZSA9IE1hdGgubWluKHRvdGFsUGFnZXMsIHRoaXMuY3VycmVudFBhZ2UgKyAxKTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydFBhZ2U7IGkgPD0gZW5kUGFnZTsgaSsrKSB7XG4gICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSBgXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIk5ld3NQYWdlX19wYWdpbmF0aW9uLWJ1dHRvbiAke2kgPT09IHRoaXMuY3VycmVudFBhZ2UgPyAnTmV3c1BhZ2VfX3BhZ2luYXRpb24tYnV0dG9uLS1hY3RpdmUnIDogJyd9XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPVwibmV3c1BhZ2UuZ29Ub1BhZ2UoJHtpfSlcIj5cbiAgICAgICAgICAgICAgICAgICAgJHtpfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgYDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQWx3YXlzIHNob3cgbGFzdCBwYWdlXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlIDwgdG90YWxQYWdlcyAtIDIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlIDwgdG90YWxQYWdlcyAtIDMpIHtcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSBgPHNwYW4gY2xhc3M9XCJOZXdzUGFnZV9fcGFnaW5hdGlvbi1kb3RzXCI+Li4uPC9zcGFuPmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSBgPGJ1dHRvbiBjbGFzcz1cIk5ld3NQYWdlX19wYWdpbmF0aW9uLWJ1dHRvblwiIG9uY2xpY2s9XCJuZXdzUGFnZS5nb1RvUGFnZSgke3RvdGFsUGFnZXN9KVwiPiR7dG90YWxQYWdlc308L2J1dHRvbj5gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBOZXh0IGJ1dHRvblxuICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSBgXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiTmV3c1BhZ2VfX3BhZ2luYXRpb24tYXJyb3cgJHt0aGlzLmN1cnJlbnRQYWdlID09PSB0b3RhbFBhZ2VzID8gJ05ld3NQYWdlX19wYWdpbmF0aW9uLWFycm93LS1kaXNhYmxlZCcgOiAnJ31cIiBcbiAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmN1cnJlbnRQYWdlID09PSB0b3RhbFBhZ2VzID8gJ2Rpc2FibGVkJyA6ICcnfSBcbiAgICAgICAgICAgICAgICAgICAgb25jbGljaz1cIm5ld3NQYWdlLmdvVG9QYWdlKCR7dGhpcy5jdXJyZW50UGFnZSArIDF9KVwiPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaW1nL05ld3NQYWdlL2Fycm93LXJpZ2h0LnBuZ1wiIGFsdD1cImFycm93LXJpZ2h0XCI+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgYDtcbiAgICAgICAgXG4gICAgICAgIHBhZ2luYXRpb24uaW5uZXJIVE1MID0gcGFnaW5hdGlvbkhUTUw7XG4gICAgfVxuICAgIFxuICAgIGdvVG9QYWdlKHBhZ2UpIHtcbiAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCh0aGlzLmZpbHRlcmVkTmV3c0l0ZW1zLmxlbmd0aCAvIHRoaXMuaXRlbXNQZXJQYWdlKTtcbiAgICAgICAgaWYgKHBhZ2UgPj0gMSAmJiBwYWdlIDw9IHRvdGFsUGFnZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlO1xuICAgICAgICAgICAgdGhpcy5zaG93Q3VycmVudFBhZ2VOZXdzKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclBhZ2luYXRpb24oKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld3NMaXN0Jykuc2Nyb2xsSW50b1ZpZXcoeyBcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsIFxuICAgICAgICAgICAgICAgIGJsb2NrOiAnc3RhcnQnIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmxldCBuZXdzUGFnZTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgbmV3c1BhZ2UgPSBuZXcgTmV3c1BhZ2UoKTtcbn0pO1xuIl19
