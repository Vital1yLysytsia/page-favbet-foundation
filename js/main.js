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
  var FirstCardMarginLeft = 24;
  var slideStep = cardWidth + gap + FirstCardMarginLeft;
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
    slideStep = cardWidth + gap + FirstCardMarginLeft;
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
  var FirstCardMarginLeft = 24;
  var slideStep = cardWidth + gap + FirstCardMarginLeft;
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
    slideStep = cardWidth + gap + FirstCardMarginLeft;
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

// Обробка кліку на кнопку "Напишіть нам"
document.addEventListener('DOMContentLoaded', function () {
  var contactButton = document.querySelector('.ContactPage__button');
  if (contactButton) {
    contactButton.addEventListener('click', function () {
      // Викликаємо функцію openHelpPopup з helpPopup.js
      if (typeof openHelpPopup === 'function') {
        openHelpPopup();
      }
    });
  }
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

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var HeaderMenu = /*#__PURE__*/function () {
  function HeaderMenu() {
    _classCallCheck(this, HeaderMenu);
    this.header = document.querySelector('.header');
    this.burgerButton = document.querySelector('.header__burger');
    this.mobileWrapper = document.querySelector('.header__wrapperMobile');
    this.langButtons = document.querySelectorAll('.header__lang-button');
    this.langButtonsMobile = document.querySelectorAll('.header__langButtonMobile');
    this.burgerText = document.querySelector('.header__burger-text');
    this.headerBackgroundClass = 'header--scrolled';
    this.headerBackgroundThreshold = 20;
    this.init();
  }
  _createClass(HeaderMenu, [{
    key: "init",
    value: function init() {
      this.initBurgerToggle();
      this.initLanguageButtons();
      this.initMenuToggle();
      this.initHeaderBackground();
      this.initAutoCloseMenuOnResize();
      this.initActivePageHighlight();
    }

    // --- Бургер ---
  }, {
    key: "initBurgerToggle",
    value: function initBurgerToggle() {
      var _this = this;
      if (!this.burgerButton || !this.burgerText) return;
      this.burgerButton.addEventListener('click', function () {
        _this.burgerButton.classList.toggle('activeBurgerButton');
        var isActive = _this.burgerButton.classList.contains('activeBurgerButton');
        _this.burgerText.textContent = isActive ? 'Закрити' : 'Меню';
      });
    }

    // --- Кнопки мов ---
  }, {
    key: "initLanguageButtons",
    value: function initLanguageButtons() {
      var activateButtons = function activateButtons(buttons, activeClass) {
        buttons.forEach(function (button) {
          button.addEventListener('click', function () {
            buttons.forEach(function (b) {
              return b.classList.remove(activeClass);
            });
            button.classList.add(activeClass);
          });
        });
      };
      if (this.langButtons.length) activateButtons(this.langButtons, 'header__lang-button--active');
      if (this.langButtonsMobile.length) activateButtons(this.langButtonsMobile, 'header__langButtonMobile--active');
    }

    // --- Відкриття мобільного меню ---
  }, {
    key: "initMenuToggle",
    value: function initMenuToggle() {
      var _this2 = this;
      if (!this.burgerButton || !this.header || !this.mobileWrapper) return;
      this.burgerButton.addEventListener('click', function () {
        _this2.header.classList.toggle('header--menu-open');
      });
    }

    // --- Фон шапки при скролі ---
  }, {
    key: "initHeaderBackground",
    value: function initHeaderBackground() {
      var _this3 = this;
      var setBackground = function setBackground() {
        if (!_this3.header) return;
        if (window.scrollY > _this3.headerBackgroundThreshold) {
          _this3.header.classList.add(_this3.headerBackgroundClass);
        } else {
          _this3.header.classList.remove(_this3.headerBackgroundClass);
        }
      };
      setBackground();
      window.addEventListener('scroll', setBackground);
    }

    // --- Автоматичне закриття меню при ресайзі ---
  }, {
    key: "initAutoCloseMenuOnResize",
    value: function initAutoCloseMenuOnResize() {
      var _this4 = this;
      if (!this.header || !this.burgerButton) return;
      var handleResize = function handleResize() {
        if (window.innerWidth > 880) {
          // Якщо ширина вікна більше 880px, закриваємо мобільне меню
          if (_this4.header.classList.contains('header--menu-open')) {
            _this4.header.classList.remove('header--menu-open');
            _this4.burgerButton.classList.remove('activeBurgerButton');
            if (_this4.burgerText) {
              _this4.burgerText.textContent = 'Меню';
            }
          }
        }
      };
      window.addEventListener('resize', handleResize);
    }

    // --- Активна сторінка ---
  }, {
    key: "initActivePageHighlight",
    value: function initActivePageHighlight() {
      var setActivePage = function setActivePage() {
        var currentPath = window.location.pathname;
        var currentPage = currentPath.split('/').pop() || 'index.html';
        var navLinks = document.querySelectorAll('.header__nav a, .header__menuMobile-link');
        var navItems = document.querySelectorAll('.header__nav li');
        navLinks.forEach(function (link) {
          return link.classList.remove('header__nav-link--active');
        });
        navItems.forEach(function (item) {
          return item.classList.remove('header__nav-item--active');
        });
        var activeLink = document.querySelector(".header__nav a[href=\"".concat(currentPage, "\"], .header__menuMobile-link[href=\"").concat(currentPage, "\"]"));
        if (activeLink) {
          activeLink.classList.add('header__nav-link--active');
          var parentLi = activeLink.closest('.header__nav li');
          if (parentLi) parentLi.classList.add('header__nav-item--active');
        }
        if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
          var indexLink = document.querySelector('.header__nav a[href="index.html"], .header__menuMobile-link[href="index.html"]');
          if (indexLink) {
            indexLink.classList.add('header__nav-link--active');
            var _parentLi = indexLink.closest('.header__nav li');
            if (_parentLi) _parentLi.classList.add('header__nav-item--active');
          }
        }
      };

      // Виконуємо відразу при завантаженні
      setActivePage();

      // Також слухаємо на випадок динамічної зміни URL
      document.addEventListener('DOMContentLoaded', setActivePage);
    }
  }]);
  return HeaderMenu;
}(); // --- Ініціалізація ---
document.addEventListener('DOMContentLoaded', function () {
  new HeaderMenu();
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
  var uploadTitle = document.querySelector('.helpPopup__uploadTitle');
  if (uploadContainer) {
    uploadContainer.classList.remove('error');
  }
  if (uploadSubtitle) {
    uploadSubtitle.textContent = 'Максимальний розмір 5 МБ';
  }
  if (uploadTitle) {
    uploadTitle.textContent = 'Завантажити файл (pdf, jpg, word)';
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
    var uploadTitle = document.querySelector('.helpPopup__uploadTitle');
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
        if (uploadTitle) {
          uploadTitle.textContent = 'Завантажити файл (pdf, jpg, word)';
        }
        e.target.value = '';
        return;
      }

      // Показати назву файлу в заголовку
      if (uploadTitle) {
        uploadTitle.textContent = file.name;
      }
    } else {
      // Повернути початковий текст
      if (uploadTitle) {
        uploadTitle.textContent = 'Завантажити файл (pdf, jpg, word)';
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

      // Повернути початковий текст файлу
      var uploadTitle = document.querySelector('.helpPopup__uploadTitle');
      if (uploadTitle) {
        uploadTitle.textContent = 'Завантажити файл (pdf, jpg, word)';
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
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
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
"use strict";

var parthnerPopup = document.getElementById('parthnerPopup');
var parthnerPopupClose = document.getElementById('parthnerPopupClose');

// Функція для відкриття попапу
var openParthnerPopup = function openParthnerPopup() {
  if (parthnerPopup) {
    parthnerPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

// Функція для закриття попапу
var closeParthnerPopup = function closeParthnerPopup() {
  if (parthnerPopup) {
    parthnerPopup.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// Закриття по кліку на хрестик
if (parthnerPopupClose) {
  parthnerPopupClose.addEventListener('click', closeParthnerPopup);
}

// Закриття по кліку на overlay
if (parthnerPopup) {
  var overlay = parthnerPopup.querySelector('.parthnerPopup__overlay');
  if (overlay) {
    overlay.addEventListener('click', closeParthnerPopup);
  }
}

// Закриття по клавіші Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && parthnerPopup && parthnerPopup.classList.contains('active')) {
    closeParthnerPopup();
  }
});

// Експортуємо функцію відкриття для використання в інших файлах
window.openParthnerPopup = openParthnerPopup;

// Підключення кліків на партнерів
document.addEventListener('DOMContentLoaded', function () {
  var parthnerItems = document.querySelectorAll('.HomePage__parthners-item');
  parthnerItems.forEach(function (item) {
    item.style.cursor = 'pointer';
    item.addEventListener('click', openParthnerPopup);
  });
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var subscribePopup = document.getElementById('subscribePopup');
var subscribePopupClose = document.getElementById('subscribePopupClose');
var subscribeForm = document.getElementById('subscribeForm');

// Функція для відкриття попапу
var openSubscribePopup = function openSubscribePopup() {
  if (subscribePopup) {
    subscribePopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

// Функція для закриття попапу
var closeSubscribePopup = function closeSubscribePopup() {
  if (subscribePopup) {
    subscribePopup.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// Закриття по кліку на хрестик
if (subscribePopupClose) {
  subscribePopupClose.addEventListener('click', closeSubscribePopup);
}

// Закриття по кліку на overlay
if (subscribePopup) {
  var overlay = subscribePopup.querySelector('.subscribePopup__overlay');
  if (overlay) {
    overlay.addEventListener('click', closeSubscribePopup);
  }
}

// Закриття по клавіші Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && subscribePopup && subscribePopup.classList.contains('active')) {
    closeSubscribePopup();
  }
});

// Обробка надсилання форми
if (subscribeForm) {
  subscribeForm.addEventListener('submit', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      var email;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            email = document.getElementById('subscribeEmail').value; // Базова валідація email
            if (!(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
              _context.next = 5;
              break;
            }
            console.error('Invalid email');
            return _context.abrupt("return");
          case 5:
            try {
              // Відправити дані на сервер (якщо є backend)
              // const response = await fetch('/api/subscribe', {
              //   method: 'POST',
              //   headers: { 'Content-Type': 'application/json' },
              //   body: JSON.stringify({ email })
              // });

              // Якщо backend не є, просто показуємо попап
              openSubscribePopup();

              // Очистити форму
              subscribeForm.reset();

              // Автоматично закрити попап через 4 секунди
              setTimeout(function () {
                closeSubscribePopup();
              }, 4000);
            } catch (error) {
              console.error('Error subscribing:', error);
            }
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}
"use strict";

// Функція для показу успішного екранчика
var showSuccessScreen = function showSuccessScreen() {
  var helpPopup = document.getElementById('helpPopup');
  var helpFormState = document.querySelector('.helpPopup__formState');
  var helpSuccessState = document.querySelector('.helpPopup__success');
  var helpPopupContainer = helpPopup ? helpPopup.querySelector('.helpPopup__container') : null;
  if (helpPopup) {
    // Приховати форму
    if (helpFormState) {
      helpFormState.classList.add('hidden');
    }

    // Показати успішний екранчик
    if (helpSuccessState) {
      helpSuccessState.classList.add('active');
    }

    // Додати клас для контейнера
    if (helpPopupContainer) {
      helpPopupContainer.classList.add('helpPopup__container--success');
    }

    // Відкрити попап
    helpPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

// Ініціалізація кнопки
document.addEventListener('DOMContentLoaded', function () {
  var successButton = document.getElementById('successButton');
  if (successButton) {
    successButton.addEventListener('click', showSuccessScreen);
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0U2xpZGVyTmV3cy5qcyIsImFib3V0U2xpZGVyVGVhbS5qcyIsImFydGljbGVTbGlkZXIuanMiLCJjb250YWN0LmpzIiwiZmFxLmpzIiwiaGVhZGVyLmpzIiwiaGVscFBvcHVwLmpzIiwibWFpbi5qcyIsIm5ld3MuanMiLCJwYXJ0aG5lclBvcHVwLmpzIiwic3Vic2NyaWJlUG9wdXAuanMiLCJzdWNjZXNzQnV0dG9uLmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNsaWRlciIsInF1ZXJ5U2VsZWN0b3IiLCJ0cmFjayIsImNhcmRzIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZCdG4iLCJuZXh0QnRuIiwic2xpZGVyQ29udGFpbmVyIiwibGVuZ3RoIiwiY2FyZFdpZHRoIiwiZ2FwIiwiRmlyc3RDYXJkTWFyZ2luTGVmdCIsInNsaWRlU3RlcCIsInRvdGFsU2xpZGVzIiwiYnJlYWtwb2ludCIsIm1vYmlsZUJyZWFrcG9pbnQiLCJjdXJyZW50U3RlcCIsIm1heFN0ZXBzIiwiaXNTbGlkZXJBY3RpdmUiLCJ0b3VjaFN0YXJ0WCIsInRvdWNoRW5kWCIsInRvdWNoU3RhcnRZIiwidG91Y2hFbmRZIiwiaXNNb3VzZURvd24iLCJtaW5Td2lwZURpc3RhbmNlIiwidXBkYXRlQ2FyZERpbWVuc2lvbnMiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiY2hlY2tTbGlkZXJBY3RpdmUiLCJyZXNldFNsaWRlciIsInN0eWxlIiwidHJhbnNmb3JtIiwiY2FsY3VsYXRlTWF4U3RlcHMiLCJjb250YWluZXJXaWR0aCIsIm9mZnNldFdpZHRoIiwidG90YWxTbGlkZXNXaWR0aCIsInZpc2libGVTbGlkZXMiLCJNYXRoIiwiZmxvb3IiLCJ1cGRhdGVTbGlkZXJQb3NpdGlvbiIsInRyYW5zbGF0ZVgiLCJkaXNhYmxlZCIsIm9wYWNpdHkiLCJuZXh0U2xpZGUiLCJwcmV2U2xpZGUiLCJoYW5kbGVUb3VjaFN0YXJ0IiwiZSIsInRvdWNoIiwidG91Y2hlcyIsImNsaWVudFgiLCJjbGllbnRZIiwiaGFuZGxlVG91Y2hNb3ZlIiwiZGVsdGFYIiwiYWJzIiwiZGVsdGFZIiwicHJldmVudERlZmF1bHQiLCJoYW5kbGVUb3VjaEVuZCIsImNoYW5nZWRUb3VjaGVzIiwiaGFuZGxlU3dpcGUiLCJoYW5kbGVNb3VzZURvd24iLCJoYW5kbGVNb3VzZU1vdmUiLCJoYW5kbGVNb3VzZVVwIiwiaW5pdFNsaWRlciIsInNob3VsZEJlQWN0aXZlIiwicGFzc2l2ZSIsImtleSIsInJlc2l6ZVRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwibWFpbkltYWdlIiwidGh1bWJuYWlscyIsInRodW1ibmFpbHNDb250YWluZXIiLCJjdXJyZW50U2xpZGUiLCJzbGlkZXMiLCJBcnJheSIsImZyb20iLCJtYXAiLCJ0aHVtYm5haWwiLCJpbWciLCJzcmMiLCJmaWx0ZXIiLCJ1cGRhdGVTbGlkZXIiLCJmb3JFYWNoIiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJhY3RpdmVUaHVtYm5haWwiLCJ0aHVtYm5haWxXaWR0aCIsInRodW1ibmFpbExlZnQiLCJvZmZzZXRMZWZ0IiwiY3VycmVudFNjcm9sbExlZnQiLCJzY3JvbGxMZWZ0IiwidGh1bWJuYWlsUmlnaHQiLCJjb250YWluZXJSaWdodCIsImlzRnVsbHlWaXNpYmxlIiwidW5kZWZpbmVkIiwic2Nyb2xsVG8iLCJsZWZ0IiwiYmVoYXZpb3IiLCJnb1RvU2xpZGUiLCJjb250YWlucyIsImFjdGl2ZUVsZW1lbnQiLCJtYXRjaGVzIiwiY29udGFjdEJ1dHRvbiIsIm9wZW5IZWxwUG9wdXAiLCJmYXFJdGVtcyIsImNsb3NlQWxsRmFxSXRlbXMiLCJpdGVtIiwidHJpZ2dlciIsImljb24iLCJzZXRBdHRyaWJ1dGUiLCJ0b2dnbGVGYXFJdGVtIiwiaXNBY3RpdmUiLCJIZWFkZXJNZW51IiwiaGVhZGVyIiwiYnVyZ2VyQnV0dG9uIiwibW9iaWxlV3JhcHBlciIsImxhbmdCdXR0b25zIiwibGFuZ0J1dHRvbnNNb2JpbGUiLCJidXJnZXJUZXh0IiwiaGVhZGVyQmFja2dyb3VuZENsYXNzIiwiaGVhZGVyQmFja2dyb3VuZFRocmVzaG9sZCIsImluaXQiLCJpbml0QnVyZ2VyVG9nZ2xlIiwiaW5pdExhbmd1YWdlQnV0dG9ucyIsImluaXRNZW51VG9nZ2xlIiwiaW5pdEhlYWRlckJhY2tncm91bmQiLCJpbml0QXV0b0Nsb3NlTWVudU9uUmVzaXplIiwiaW5pdEFjdGl2ZVBhZ2VIaWdobGlnaHQiLCJ0b2dnbGUiLCJ0ZXh0Q29udGVudCIsImFjdGl2YXRlQnV0dG9ucyIsImJ1dHRvbnMiLCJhY3RpdmVDbGFzcyIsImJ1dHRvbiIsImIiLCJzZXRCYWNrZ3JvdW5kIiwic2Nyb2xsWSIsImhhbmRsZVJlc2l6ZSIsInNldEFjdGl2ZVBhZ2UiLCJjdXJyZW50UGF0aCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJjdXJyZW50UGFnZSIsInNwbGl0IiwicG9wIiwibmF2TGlua3MiLCJuYXZJdGVtcyIsImxpbmsiLCJhY3RpdmVMaW5rIiwicGFyZW50TGkiLCJjbG9zZXN0IiwiaW5kZXhMaW5rIiwiaGVscFBvcHVwIiwiZ2V0RWxlbWVudEJ5SWQiLCJoZWxwUG9wdXBDbG9zZSIsImhlbHBGb3JtIiwiaGVscEZpbGVVcGxvYWQiLCJoZWxwUG9wdXBDb250YWluZXIiLCJoZWxwRm9ybVN0YXRlIiwiaGVscFN1Y2Nlc3NTdGF0ZSIsImNsZWFyQWxsRXJyb3JzIiwiZW1haWxJbnB1dCIsImVtYWlsRXJyb3JNZXNzYWdlIiwidXBsb2FkQ29udGFpbmVyIiwidXBsb2FkU3VidGl0bGUiLCJ1cGxvYWRUaXRsZSIsImJvZHkiLCJvdmVyZmxvdyIsImNsb3NlSGVscFBvcHVwIiwib3ZlcmxheSIsImZpbGUiLCJ0YXJnZXQiLCJmaWxlcyIsIm1heFNpemUiLCJzaXplIiwidmFsdWUiLCJuYW1lIiwiZW1haWwiLCJlbWFpbFJlZ2V4IiwidGVzdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJzdWJtaXRCdXR0b24iLCJoYXNFcnJvcnMiLCJyZXNldCIsImhlbHBCdXR0b24iLCJoZWxwQnV0dG9uTW9iaWxlIiwiTmV3c1BhZ2UiLCJpdGVtc1BlclBhZ2UiLCJjdXJyZW50Q2F0ZWdvcnkiLCJhbGxOZXdzSXRlbXMiLCJmaWx0ZXJlZE5ld3NJdGVtcyIsImdldEFsbE5ld3NJdGVtcyIsImJpbmRFdmVudHMiLCJmaWx0ZXJBbmRTaG93TmV3cyIsInJlbmRlclBhZ2luYXRpb24iLCJjYXRlZ29yeUl0ZW1zIiwiaGFuZGxlQ2F0ZWdvcnlDbGljayIsImNhdGVnb3J5IiwiZGF0YXNldCIsInNob3dDdXJyZW50UGFnZU5ld3MiLCJkaXNwbGF5Iiwic3RhcnRJbmRleCIsImVuZEluZGV4IiwiY3VycmVudFBhZ2VJdGVtcyIsInNsaWNlIiwicGFnaW5hdGlvbiIsInRvdGFsUGFnZXMiLCJjZWlsIiwiaW5uZXJIVE1MIiwicGFnaW5hdGlvbkhUTUwiLCJzdGFydFBhZ2UiLCJtYXgiLCJlbmRQYWdlIiwibWluIiwiaSIsInBhZ2UiLCJ0b3AiLCJuZXdzUGFnZSIsInBhcnRobmVyUG9wdXAiLCJwYXJ0aG5lclBvcHVwQ2xvc2UiLCJvcGVuUGFydGhuZXJQb3B1cCIsImNsb3NlUGFydGhuZXJQb3B1cCIsInBhcnRobmVySXRlbXMiLCJjdXJzb3IiLCJzdWJzY3JpYmVQb3B1cCIsInN1YnNjcmliZVBvcHVwQ2xvc2UiLCJzdWJzY3JpYmVGb3JtIiwib3BlblN1YnNjcmliZVBvcHVwIiwiY2xvc2VTdWJzY3JpYmVQb3B1cCIsImNvbnNvbGUiLCJlcnJvciIsInNob3dTdWNjZXNzU2NyZWVuIiwic3VjY2Vzc0J1dHRvbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3ZELElBQU1DLE1BQU0sR0FBR0YsUUFBUSxDQUFDRyxhQUFhLENBQUMsb0JBQW9CLENBQUM7RUFDM0QsSUFBSSxDQUFDRCxNQUFNLEVBQUU7RUFFYixJQUFNRSxLQUFLLEdBQUdGLE1BQU0sQ0FBQ0MsYUFBYSxDQUFDLDJC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QUFRO0VBQ3pDO0FBQ0YsQ0FBQzs7QUFFRDtBQUNBM0ssUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0VBQ2xELElBQU00TyxhQUFhLEdBQUc3TyxRQUFRLENBQUM2SixjQUFjLENBQUMsZUFBZSxDQUFDO0VBRTlELElBQUlnRixhQUFhLEVBQUU7SUFDakJBLGFBQWEsQ0FBQzVPLGdCQUFnQixDQUFDLE9BQU8sRUFBRTJPLGlCQUFpQixDQUFDO0VBQzVEO0FBQ0YsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dC1zbGlkZXItbmV3cycpO1xuICBpZiAoIXNsaWRlcikgcmV0dXJuO1xuICBcbiAgY29uc3QgdHJhY2sgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignLmFib3V0LXNsaWRlci1uZXdzX190cmFjaycpO1xuICBjb25zdCBjYXJkcyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCcuYWJvdXQtc2xpZGVyLW5ld3NfX2NhcmQnKTtcbiAgY29uc3QgcHJldkJ0biA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuYWJvdXQtc2xpZGVyLW5ld3NfX25hdi1idG4tLXByZXYnKTtcbiAgY29uc3QgbmV4dEJ0biA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuYWJvdXQtc2xpZGVyLW5ld3NfX25hdi1idG4tLW5leHQnKTtcbiAgY29uc3Qgc2xpZGVyQ29udGFpbmVyID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5hYm91dC1zbGlkZXItbmV3c19fY29udGFpbmVyJyk7XG4gIFxuICBpZiAoIXRyYWNrIHx8ICFjYXJkcy5sZW5ndGggfHwgIXByZXZCdG4gfHwgIW5leHRCdG4gfHwgIXNsaWRlckNvbnRhaW5lcikgcmV0dXJuO1xuICBcbiAgbGV0IGNhcmRXaWR0aCA9IDMzMDtcbiAgY29uc3QgZ2FwID0gMjI7XG4gIGNvbnN0IEZpcnN0Q2FyZE1hcmdpbkxlZnQgPSAyNDtcbiAgbGV0IHNsaWRlU3RlcCA9IGNhcmRXaWR0aCArIGdhcCArIEZpcnN0Q2FyZE1hcmdpbkxlZnQ7XG4gIGNvbnN0IHRvdGFsU2xpZGVzID0gY2FyZHMubGVuZ3RoO1xuICBjb25zdCBicmVha3BvaW50ID0gMTAyNDtcbiAgY29uc3QgbW9iaWxlQnJlYWtwb2ludCA9IDM2MDtcbiAgXG4gIGxldCBjdXJyZW50U3RlcCA9IDA7XG4gIGxldCBtYXhTdGVwcyA9IDA7XG4gIGxldCBpc1NsaWRlckFjdGl2ZSA9IGZhbHNlO1xuICBcbiAgbGV0IHRvdWNoU3RhcnRYID0gMDtcbiAgbGV0IHRvdWNoRW5kWCA9IDA7XG4gIGxldCB0b3VjaFN0YXJ0WSA9IDA7XG4gIGxldCB0b3VjaEVuZFkgPSAwO1xuICBsZXQgaXNNb3VzZURvd24gPSBmYWxzZTtcbiAgY29uc3QgbWluU3dpcGVEaXN0YW5jZSA9IDUwO1xuICBcbiAgZnVuY3Rpb24gdXBkYXRlQ2FyZERpbWVuc2lvbnMoKSB7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IG1vYmlsZUJyZWFrcG9pbnQpIHtcbiAgICAgIGNhcmRXaWR0aCA9IDI3MDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FyZFdpZHRoID0gMzMwO1xuICAgIH1cbiAgICBzbGlkZVN0ZXAgPSBjYXJkV2lkdGggKyBnYXAgKyBGaXJzdENhcmRNYXJnaW5MZWZ0O1xuICB9XG4gIFxuICBmdW5jdGlvbiBjaGVja1NsaWRlckFjdGl2ZSgpIHtcbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggPCBicmVha3BvaW50O1xuICB9XG4gIFxuICBmdW5jdGlvbiByZXNldFNsaWRlcigpIHtcbiAgICB0cmFjay5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICBjdXJyZW50U3RlcCA9IDA7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZU1heFN0ZXBzKCkge1xuICAgIGlmICghaXNTbGlkZXJBY3RpdmUpIHtcbiAgICAgIG1heFN0ZXBzID0gMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgY29udGFpbmVyV2lkdGggPSBzbGlkZXJDb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgdG90YWxTbGlkZXNXaWR0aCA9IHRvdGFsU2xpZGVzICogc2xpZGVTdGVwIC0gZ2FwO1xuICAgIFxuICAgIGlmIChjb250YWluZXJXaWR0aCA+PSB0b3RhbFNsaWRlc1dpZHRoKSB7XG4gICAgICBtYXhTdGVwcyA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZpc2libGVTbGlkZXMgPSBNYXRoLmZsb29yKGNvbnRhaW5lcldpZHRoIC8gc2xpZGVTdGVwKTtcbiAgICAgIG1heFN0ZXBzID0gdG90YWxTbGlkZXMgLSB2aXNpYmxlU2xpZGVzO1xuICAgIH1cbiAgICBcbiAgICBpZiAoY3VycmVudFN0ZXAgPiBtYXhTdGVwcykge1xuICAgICAgY3VycmVudFN0ZXAgPSBtYXhTdGVwcztcbiAgICB9XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHVwZGF0ZVNsaWRlclBvc2l0aW9uKCkge1xuICAgIGlmICghaXNTbGlkZXJBY3RpdmUpIHtcbiAgICAgIHJlc2V0U2xpZGVyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGxldCB0cmFuc2xhdGVYO1xuICAgIFxuICAgIGlmIChjdXJyZW50U3RlcCA9PT0gbWF4U3RlcHMgJiYgbWF4U3RlcHMgPiAwKSB7XG4gICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHNsaWRlckNvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgICAgIGNvbnN0IHRvdGFsU2xpZGVzV2lkdGggPSB0b3RhbFNsaWRlcyAqIHNsaWRlU3RlcCAtIGdhcDtcbiAgICAgIHRyYW5zbGF0ZVggPSAtKHRvdGFsU2xpZGVzV2lkdGggLSBjb250YWluZXJXaWR0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zbGF0ZVggPSAtY3VycmVudFN0ZXAgKiBzbGlkZVN0ZXA7XG4gICAgfVxuICAgIFxuICAgIHRyYWNrLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7dHJhbnNsYXRlWH1weClgO1xuICAgIFxuICAgIHByZXZCdG4uZGlzYWJsZWQgPSBjdXJyZW50U3RlcCA9PT0gMDtcbiAgICBwcmV2QnRuLnN0eWxlLm9wYWNpdHkgPSBjdXJyZW50U3RlcCA9PT0gMCA/ICcwLjMnIDogJzEnO1xuICAgIFxuICAgIG5leHRCdG4uZGlzYWJsZWQgPSBjdXJyZW50U3RlcCA+PSBtYXhTdGVwcztcbiAgICBuZXh0QnRuLnN0eWxlLm9wYWNpdHkgPSBjdXJyZW50U3RlcCA+PSBtYXhTdGVwcyA/ICcwLjMnIDogJzEnO1xuICB9XG4gIFxuICBmdW5jdGlvbiBuZXh0U2xpZGUoKSB7XG4gICAgaWYgKCFpc1NsaWRlckFjdGl2ZSkgcmV0dXJuO1xuICAgIFxuICAgIGlmIChjdXJyZW50U3RlcCA8IG1heFN0ZXBzKSB7XG4gICAgICBjdXJyZW50U3RlcCsrO1xuICAgICAgdXBkYXRlU2xpZGVyUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHByZXZTbGlkZSgpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSByZXR1cm47XG4gICAgXG4gICAgaWYgKGN1cnJlbnRTdGVwID4gMCkge1xuICAgICAgY3VycmVudFN0ZXAtLTtcbiAgICAgIHVwZGF0ZVNsaWRlclBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVUb3VjaFN0YXJ0KGUpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgdG91Y2hTdGFydFggPSB0b3VjaC5jbGllbnRYO1xuICAgIHRvdWNoU3RhcnRZID0gdG91Y2guY2xpZW50WTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gaGFuZGxlVG91Y2hNb3ZlKGUpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgY29uc3QgZGVsdGFYID0gTWF0aC5hYnModG91Y2guY2xpZW50WCAtIHRvdWNoU3RhcnRYKTtcbiAgICBjb25zdCBkZWx0YVkgPSBNYXRoLmFicyh0b3VjaC5jbGllbnRZIC0gdG91Y2hTdGFydFkpO1xuICAgIFxuICAgIGlmIChkZWx0YVggPiBkZWx0YVkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGhhbmRsZVRvdWNoRW5kKGUpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgIHRvdWNoRW5kWCA9IHRvdWNoLmNsaWVudFg7XG4gICAgdG91Y2hFbmRZID0gdG91Y2guY2xpZW50WTtcbiAgICBcbiAgICBoYW5kbGVTd2lwZSgpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVTd2lwZSgpIHtcbiAgICBjb25zdCBkZWx0YVggPSB0b3VjaEVuZFggLSB0b3VjaFN0YXJ0WDtcbiAgICBjb25zdCBkZWx0YVkgPSB0b3VjaEVuZFkgLSB0b3VjaFN0YXJ0WTtcbiAgICBcbiAgICBpZiAoTWF0aC5hYnMoZGVsdGFYKSA+IG1pblN3aXBlRGlzdGFuY2UgJiYgTWF0aC5hYnMoZGVsdGFYKSA+IE1hdGguYWJzKGRlbHRhWSkpIHtcbiAgICAgIGlmIChkZWx0YVggPiAwKSB7XG4gICAgICAgIHByZXZTbGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dFNsaWRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZSkge1xuICAgIGlmICghaXNTbGlkZXJBY3RpdmUpIHJldHVybjtcbiAgICBcbiAgICBpc01vdXNlRG93biA9IHRydWU7XG4gICAgdG91Y2hTdGFydFggPSBlLmNsaWVudFg7XG4gICAgdG91Y2hTdGFydFkgPSBlLmNsaWVudFk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZU1vdmUoZSkge1xuICAgIGlmICghaXNTbGlkZXJBY3RpdmUgfHwgIWlzTW91c2VEb3duKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgZGVsdGFYID0gTWF0aC5hYnMoZS5jbGllbnRYIC0gdG91Y2hTdGFydFgpO1xuICAgIGNvbnN0IGRlbHRhWSA9IE1hdGguYWJzKGUuY2xpZW50WSAtIHRvdWNoU3RhcnRZKTtcbiAgICBcbiAgICBpZiAoZGVsdGFYID4gZGVsdGFZKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZVVwKGUpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlIHx8ICFpc01vdXNlRG93bikgcmV0dXJuO1xuICAgIFxuICAgIGlzTW91c2VEb3duID0gZmFsc2U7XG4gICAgdG91Y2hFbmRYID0gZS5jbGllbnRYO1xuICAgIHRvdWNoRW5kWSA9IGUuY2xpZW50WTtcbiAgICBcbiAgICBoYW5kbGVTd2lwZSgpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBpbml0U2xpZGVyKCkge1xuICAgIHVwZGF0ZUNhcmREaW1lbnNpb25zKCk7XG4gICAgY29uc3Qgc2hvdWxkQmVBY3RpdmUgPSBjaGVja1NsaWRlckFjdGl2ZSgpO1xuICAgIFxuICAgIGlmIChzaG91bGRCZUFjdGl2ZSAmJiAhaXNTbGlkZXJBY3RpdmUpIHtcbiAgICAgIGlzU2xpZGVyQWN0aXZlID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRTdGVwID0gMDtcbiAgICAgIGNhbGN1bGF0ZU1heFN0ZXBzKCk7XG4gICAgICB1cGRhdGVTbGlkZXJQb3NpdGlvbigpO1xuICAgIH0gZWxzZSBpZiAoIXNob3VsZEJlQWN0aXZlICYmIGlzU2xpZGVyQWN0aXZlKSB7XG4gICAgICBpc1NsaWRlckFjdGl2ZSA9IGZhbHNlO1xuICAgICAgcmVzZXRTbGlkZXIoKTtcbiAgICB9IGVsc2UgaWYgKGlzU2xpZGVyQWN0aXZlKSB7XG4gICAgICBjYWxjdWxhdGVNYXhTdGVwcygpO1xuICAgICAgdXBkYXRlU2xpZGVyUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEV2ZW50IGxpc3RlbmVycyDQtNC70Y8g0LrQvdC+0L/QvtC6XG4gIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcmV2U2xpZGUpO1xuICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbmV4dFNsaWRlKTtcbiAgXG4gIC8vIFRvdWNoIGV2ZW50c1xuICBzbGlkZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGhhbmRsZVRvdWNoU3RhcnQsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gIHNsaWRlckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBoYW5kbGVUb3VjaE1vdmUsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gIHNsaWRlckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGhhbmRsZVRvdWNoRW5kLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICBcbiAgLy8gTW91c2UgZXZlbnRzXG4gIHNsaWRlckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVNb3VzZURvd24pO1xuICBzbGlkZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKTtcbiAgc2xpZGVyQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgc2xpZGVyQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoaXNNb3VzZURvd24pIHtcbiAgICAgIGlzTW91c2VEb3duID0gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIC8vIEtleWJvYXJkIHN1cHBvcnRcbiAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKCFpc1NsaWRlckFjdGl2ZSkgcmV0dXJuO1xuICAgIFxuICAgIGlmIChlLmtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHByZXZTbGlkZSgpO1xuICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbmV4dFNsaWRlKCk7XG4gICAgfVxuICB9KTtcbiAgXG4gIC8vIFJlc2l6ZSBoYW5kbGVyXG4gIGxldCByZXNpemVUaW1lb3V0O1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVvdXQpO1xuICAgIHJlc2l6ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaW5pdFNsaWRlcigpO1xuICAgIH0sIDIwMCk7XG4gIH0pO1xuICBcbiAgLy8g0IbQvdGW0YbRltCw0LvRltC30LDRhtGW0Y9cbiAgaW5pdFNsaWRlcigpO1xufSk7XG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dC1zbGlkZXItdGVhbScpO1xuICBpZiAoIXNsaWRlcikgcmV0dXJuO1xuICBcbiAgY29uc3QgdHJhY2sgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignLmFib3V0LXNsaWRlci10ZWFtX190cmFjaycpO1xuICBjb25zdCBjYXJkcyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCcuYWJvdXQtc2xpZGVyLXRlYW1fX2NhcmQnKTtcbiAgY29uc3QgcHJldkJ0biA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuYWJvdXQtc2xpZGVyLXRlYW1fX25hdi1idG4tLXByZXYnKTtcbiAgY29uc3QgbmV4dEJ0biA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuYWJvdXQtc2xpZGVyLXRlYW1fX25hdi1idG4tLW5leHQnKTtcbiAgY29uc3Qgc2xpZGVyQ29udGFpbmVyID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5hYm91dC1zbGlkZXItdGVhbV9fY29udGFpbmVyJyk7XG4gIFxuICBpZiAoIXRyYWNrIHx8ICFjYXJkcy5sZW5ndGggfHwgIXByZXZCdG4gfHwgIW5leHRCdG4gfHwgIXNsaWRlckNvbnRhaW5lcikgcmV0dXJuO1xuICBcbiAgbGV0IGNhcmRXaWR0aCA9IDMzMDtcbiAgY29uc3QgZ2FwID0gMjI7XG4gIGNvbnN0IEZpcnN0Q2FyZE1hcmdpbkxlZnQgPSAyNDtcbiAgbGV0IHNsaWRlU3RlcCA9IGNhcmRXaWR0aCArIGdhcCArIEZpcnN0Q2FyZE1hcmdpbkxlZnQ7XG4gIGNvbnN0IHRvdGFsU2xpZGVzID0gY2FyZHMubGVuZ3RoO1xuICBjb25zdCBicmVha3BvaW50ID0gMTAyNDtcbiAgY29uc3QgbW9iaWxlQnJlYWtwb2ludCA9IDM2MDtcbiAgXG4gIGxldCBjdXJyZW50U3RlcCA9IDA7XG4gIGxldCBtYXhTdGVwcyA9IDA7XG4gIGxldCBpc1NsaWRlckFjdGl2ZSA9IGZhbHNlO1xuICBcbiAgbGV0IHRvdWNoU3RhcnRYID0gMDtcbiAgbGV0IHRvdWNoRW5kWCA9IDA7XG4gIGxldCB0b3VjaFN0YXJ0WSA9IDA7XG4gIGxldCB0b3VjaEVuZFkgPSAwO1xuICBsZXQgaXNNb3VzZURvd24gPSBmYWxzZTtcbiAgY29uc3QgbWluU3dpcGVEaXN0YW5jZSA9IDUwO1xuICBcbiAgZnVuY3Rpb24gdXBkYXRlQ2FyZERpbWVuc2lvbnMoKSB7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IG1vYmlsZUJyZWFrcG9pbnQpIHtcbiAgICAgIGNhcmRXaWR0aCA9IDI3MDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FyZFdpZHRoID0gMzMwO1xuICAgIH1cbiAgICBzbGlkZVN0ZXAgPSBjYXJkV2lkdGggKyBnYXAgKyBGaXJzdENhcmRNYXJnaW5MZWZ0O1xuICB9XG4gIFxuICBmdW5jdGlvbiBjaGVja1NsaWRlckFjdGl2ZSgpIHtcbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggPCBicmVha3BvaW50O1xuICB9XG4gIFxuICBmdW5jdGlvbiByZXNldFNsaWRlcigpIHtcbiAgICB0cmFjay5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICBjdXJyZW50U3RlcCA9IDA7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZU1heFN0ZXBzKCkge1xuICAgIGlmICghaXNTbGlkZXJBY3RpdmUpIHtcbiAgICAgIG1heFN0ZXBzID0gMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgY29udGFpbmVyV2lkdGggPSBzbGlkZXJDb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgdG90YWxTbGlkZXNXaWR0aCA9IHRvdGFsU2xpZGVzICogc2xpZGVTdGVwIC0gZ2FwO1xuICAgIFxuICAgIGlmIChjb250YWluZXJXaWR0aCA+PSB0b3RhbFNsaWRlc1dpZHRoKSB7XG4gICAgICBtYXhTdGVwcyA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZpc2libGVTbGlkZXMgPSBNYXRoLmZsb29yKGNvbnRhaW5lcldpZHRoIC8gc2xpZGVTdGVwKTtcbiAgICAgIG1heFN0ZXBzID0gdG90YWxTbGlkZXMgLSB2aXNpYmxlU2xpZGVzO1xuICAgIH1cbiAgICBcbiAgICBpZiAoY3VycmVudFN0ZXAgPiBtYXhTdGVwcykge1xuICAgICAgY3VycmVudFN0ZXAgPSBtYXhTdGVwcztcbiAgICB9XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHVwZGF0ZVNsaWRlclBvc2l0aW9uKCkge1xuICAgIGlmICghaXNTbGlkZXJBY3RpdmUpIHtcbiAgICAgIHJlc2V0U2xpZGVyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGxldCB0cmFuc2xhdGVYO1xuICAgIFxuICAgIGlmIChjdXJyZW50U3RlcCA9PT0gbWF4U3RlcHMgJiYgbWF4U3RlcHMgPiAwKSB7XG4gICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHNsaWRlckNvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgICAgIGNvbnN0IHRvdGFsU2xpZGVzV2lkdGggPSB0b3RhbFNsaWRlcyAqIHNsaWRlU3RlcCAtIGdhcDtcbiAgICAgIHRyYW5zbGF0ZVggPSAtKHRvdGFsU2xpZGVzV2lkdGggLSBjb250YWluZXJXaWR0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zbGF0ZVggPSAtY3VycmVudFN0ZXAgKiBzbGlkZVN0ZXA7XG4gICAgfVxuICAgIFxuICAgIHRyYWNrLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7dHJhbnNsYXRlWH1weClgO1xuICAgIFxuICAgIHByZXZCdG4uZGlzYWJsZWQgPSBjdXJyZW50U3RlcCA9PT0gMDtcbiAgICBwcmV2QnRuLnN0eWxlLm9wYWNpdHkgPSBjdXJyZW50U3RlcCA9PT0gMCA/ICcwLjMnIDogJzEnO1xuICAgIFxuICAgIG5leHRCdG4uZGlzYWJsZWQgPSBjdXJyZW50U3RlcCA+PSBtYXhTdGVwcztcbiAgICBuZXh0QnRuLnN0eWxlLm9wYWNpdHkgPSBjdXJyZW50U3RlcCA+PSBtYXhTdGVwcyA/ICcwLjMnIDogJzEnO1xuICB9XG4gIFxuICBmdW5jdGlvbiBuZXh0U2xpZGUoKSB7XG4gICAgaWYgKCFpc1NsaWRlckFjdGl2ZSkgcmV0dXJuO1xuICAgIFxuICAgIGlmIChjdXJyZW50U3RlcCA8IG1heFN0ZXBzKSB7XG4gICAgICBjdXJyZW50U3RlcCsrO1xuICAgICAgdXBkYXRlU2xpZGVyUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHByZXZTbGlkZSgpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSByZXR1cm47XG4gICAgXG4gICAgaWYgKGN1cnJlbnRTdGVwID4gMCkge1xuICAgICAgY3VycmVudFN0ZXAtLTtcbiAgICAgIHVwZGF0ZVNsaWRlclBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVUb3VjaFN0YXJ0KGUpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgdG91Y2hTdGFydFggPSB0b3VjaC5jbGllbnRYO1xuICAgIHRvdWNoU3RhcnRZID0gdG91Y2guY2xpZW50WTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gaGFuZGxlVG91Y2hNb3ZlKGUpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgY29uc3QgZGVsdGFYID0gTWF0aC5hYnModG91Y2guY2xpZW50WCAtIHRvdWNoU3RhcnRYKTtcbiAgICBjb25zdCBkZWx0YVkgPSBNYXRoLmFicyh0b3VjaC5jbGllbnRZIC0gdG91Y2hTdGFydFkpO1xuICAgIFxuICAgIGlmIChkZWx0YVggPiBkZWx0YVkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGhhbmRsZVRvdWNoRW5kKGUpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgIHRvdWNoRW5kWCA9IHRvdWNoLmNsaWVudFg7XG4gICAgdG91Y2hFbmRZID0gdG91Y2guY2xpZW50WTtcbiAgICBcbiAgICBoYW5kbGVTd2lwZSgpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVTd2lwZSgpIHtcbiAgICBjb25zdCBkZWx0YVggPSB0b3VjaEVuZFggLSB0b3VjaFN0YXJ0WDtcbiAgICBjb25zdCBkZWx0YVkgPSB0b3VjaEVuZFkgLSB0b3VjaFN0YXJ0WTtcbiAgICBcbiAgICBpZiAoTWF0aC5hYnMoZGVsdGFYKSA+IG1pblN3aXBlRGlzdGFuY2UgJiYgTWF0aC5hYnMoZGVsdGFYKSA+IE1hdGguYWJzKGRlbHRhWSkpIHtcbiAgICAgIGlmIChkZWx0YVggPiAwKSB7XG4gICAgICAgIHByZXZTbGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dFNsaWRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZSkge1xuICAgIGlmICghaXNTbGlkZXJBY3RpdmUpIHJldHVybjtcbiAgICBcbiAgICBpc01vdXNlRG93biA9IHRydWU7XG4gICAgdG91Y2hTdGFydFggPSBlLmNsaWVudFg7XG4gICAgdG91Y2hTdGFydFkgPSBlLmNsaWVudFk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZU1vdmUoZSkge1xuICAgIGlmICghaXNTbGlkZXJBY3RpdmUgfHwgIWlzTW91c2VEb3duKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgZGVsdGFYID0gTWF0aC5hYnMoZS5jbGllbnRYIC0gdG91Y2hTdGFydFgpO1xuICAgIGNvbnN0IGRlbHRhWSA9IE1hdGguYWJzKGUuY2xpZW50WSAtIHRvdWNoU3RhcnRZKTtcbiAgICBcbiAgICBpZiAoZGVsdGFYID4gZGVsdGFZKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZVVwKGUpIHtcbiAgICBpZiAoIWlzU2xpZGVyQWN0aXZlIHx8ICFpc01vdXNlRG93bikgcmV0dXJuO1xuICAgIFxuICAgIGlzTW91c2VEb3duID0gZmFsc2U7XG4gICAgdG91Y2hFbmRYID0gZS5jbGllbnRYO1xuICAgIHRvdWNoRW5kWSA9IGUuY2xpZW50WTtcbiAgICBcbiAgICBoYW5kbGVTd2lwZSgpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBpbml0U2xpZGVyKCkge1xuICAgIHVwZGF0ZUNhcmREaW1lbnNpb25zKCk7XG4gICAgY29uc3Qgc2hvdWxkQmVBY3RpdmUgPSBjaGVja1NsaWRlckFjdGl2ZSgpO1xuICAgIFxuICAgIGlmIChzaG91bGRCZUFjdGl2ZSAmJiAhaXNTbGlkZXJBY3RpdmUpIHtcbiAgICAgIGlzU2xpZGVyQWN0aXZlID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRTdGVwID0gMDtcbiAgICAgIGNhbGN1bGF0ZU1heFN0ZXBzKCk7XG4gICAgICB1cGRhdGVTbGlkZXJQb3NpdGlvbigpO1xuICAgIH0gZWxzZSBpZiAoIXNob3VsZEJlQWN0aXZlICYmIGlzU2xpZGVyQWN0aXZlKSB7XG4gICAgICBpc1NsaWRlckFjdGl2ZSA9IGZhbHNlO1xuICAgICAgcmVzZXRTbGlkZXIoKTtcbiAgICB9IGVsc2UgaWYgKGlzU2xpZGVyQWN0aXZlKSB7XG4gICAgICBjYWxjdWxhdGVNYXhTdGVwcygpO1xuICAgICAgdXBkYXRlU2xpZGVyUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEV2ZW50IGxpc3RlbmVycyDQtNC70Y8g0LrQvdC+0L/QvtC6XG4gIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcmV2U2xpZGUpO1xuICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbmV4dFNsaWRlKTtcbiAgXG4gIC8vIFRvdWNoIGV2ZW50c1xuICBzbGlkZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGhhbmRsZVRvdWNoU3RhcnQsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gIHNsaWRlckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBoYW5kbGVUb3VjaE1vdmUsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gIHNsaWRlckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGhhbmRsZVRvdWNoRW5kLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICBcbiAgLy8gTW91c2UgZXZlbnRzXG4gIHNsaWRlckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVNb3VzZURvd24pO1xuICBzbGlkZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKTtcbiAgc2xpZGVyQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgc2xpZGVyQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoaXNNb3VzZURvd24pIHtcbiAgICAgIGlzTW91c2VEb3duID0gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIC8vIEtleWJvYXJkIHN1cHBvcnRcbiAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKCFpc1NsaWRlckFjdGl2ZSkgcmV0dXJuO1xuICAgIFxuICAgIGlmIChlLmtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHByZXZTbGlkZSgpO1xuICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbmV4dFNsaWRlKCk7XG4gICAgfVxuICB9KTtcbiAgXG4gIC8vIFJlc2l6ZSBoYW5kbGVyXG4gIGxldCByZXNpemVUaW1lb3V0O1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVvdXQpO1xuICAgIHJlc2l6ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaW5pdFNsaWRlcigpO1xuICAgIH0sIDIwMCk7XG4gIH0pO1xuICBcbiAgLy8g0IbQvdGW0YbRltCw0LvRltC30LDRhtGW0Y9cbiAgaW5pdFNsaWRlcigpO1xufSk7XG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHNsaWRlckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlLXNsaWRlcicpO1xuICBpZiAoIXNsaWRlckNvbnRhaW5lcikgcmV0dXJuO1xuICBcbiAgY29uc3QgbWFpbkltYWdlID0gc2xpZGVyQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlLXNsaWRlcl9fbWFpbi1pbWFnZS1pbWcnKTtcbiAgY29uc3QgdGh1bWJuYWlscyA9IHNsaWRlckNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuYXJ0aWNsZS1zbGlkZXJfX3RodW1ibmFpbCcpO1xuICBjb25zdCBwcmV2QnRuID0gc2xpZGVyQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlLXNsaWRlcl9fbmF2LWJ0bi0tcHJldicpO1xuICBjb25zdCBuZXh0QnRuID0gc2xpZGVyQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlLXNsaWRlcl9fbmF2LWJ0bi0tbmV4dCcpO1xuICBjb25zdCB0aHVtYm5haWxzQ29udGFpbmVyID0gc2xpZGVyQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlLXNsaWRlcl9fdGh1bWJuYWlscy1jb250YWluZXInKTtcbiAgXG4gIGlmICghbWFpbkltYWdlIHx8ICF0aHVtYm5haWxzLmxlbmd0aCB8fCAhcHJldkJ0biB8fCAhbmV4dEJ0bikgcmV0dXJuO1xuICBcbiAgbGV0IGN1cnJlbnRTbGlkZSA9IDA7XG4gIGNvbnN0IHRvdGFsU2xpZGVzID0gdGh1bWJuYWlscy5sZW5ndGg7XG4gIFxuICBjb25zdCBzbGlkZXMgPSBBcnJheS5mcm9tKHRodW1ibmFpbHMpLm1hcChmdW5jdGlvbih0aHVtYm5haWwpIHtcbiAgICBjb25zdCBpbWcgPSB0aHVtYm5haWwucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gICAgcmV0dXJuIGltZyA/IGltZy5zcmMgOiAnJztcbiAgfSkuZmlsdGVyKGZ1bmN0aW9uKHNyYykge1xuICAgIHJldHVybiBzcmMgIT09ICcnO1xuICB9KTtcbiAgXG4gIGlmIChzbGlkZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gIFxuICBmdW5jdGlvbiB1cGRhdGVTbGlkZXIoKSB7XG4gICAgaWYgKHNsaWRlc1tjdXJyZW50U2xpZGVdKSB7XG4gICAgICBtYWluSW1hZ2Uuc3JjID0gc2xpZGVzW2N1cnJlbnRTbGlkZV07XG4gICAgfVxuICAgIFxuICAgIHRodW1ibmFpbHMuZm9yRWFjaChmdW5jdGlvbih0aHVtYm5haWwsIGluZGV4KSB7XG4gICAgICBpZiAoaW5kZXggPT09IGN1cnJlbnRTbGlkZSkge1xuICAgICAgICB0aHVtYm5haWwuY2xhc3NMaXN0LmFkZCgnYXJ0aWNsZS1zbGlkZXJfX3RodW1ibmFpbC0tYWN0aXZlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHVtYm5haWwuY2xhc3NMaXN0LnJlbW92ZSgnYXJ0aWNsZS1zbGlkZXJfX3RodW1ibmFpbC0tYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRodW1ibmFpbHNDb250YWluZXIgJiYgdGh1bWJuYWlsc1tjdXJyZW50U2xpZGVdKSB7XG4gICAgICBjb25zdCBhY3RpdmVUaHVtYm5haWwgPSB0aHVtYm5haWxzW2N1cnJlbnRTbGlkZV07XG4gICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHRodW1ibmFpbHNDb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgICBjb25zdCB0aHVtYm5haWxXaWR0aCA9IGFjdGl2ZVRodW1ibmFpbC5vZmZzZXRXaWR0aDtcbiAgICAgIGNvbnN0IHRodW1ibmFpbExlZnQgPSBhY3RpdmVUaHVtYm5haWwub2Zmc2V0TGVmdDtcbiAgICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxMZWZ0ID0gdGh1bWJuYWlsc0NvbnRhaW5lci5zY3JvbGxMZWZ0O1xuICAgICAgXG4gICAgICBsZXQgc2Nyb2xsTGVmdDtcbiAgICAgIFxuICAgICAgaWYgKGN1cnJlbnRTbGlkZSA9PT0gMCkge1xuICAgICAgICBzY3JvbGxMZWZ0ID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRodW1ibmFpbFJpZ2h0ID0gdGh1bWJuYWlsTGVmdCArIHRodW1ibmFpbFdpZHRoO1xuICAgICAgICBjb25zdCBjb250YWluZXJSaWdodCA9IGN1cnJlbnRTY3JvbGxMZWZ0ICsgY29udGFpbmVyV2lkdGg7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpc0Z1bGx5VmlzaWJsZSA9IHRodW1ibmFpbExlZnQgPj0gY3VycmVudFNjcm9sbExlZnQgJiYgdGh1bWJuYWlsUmlnaHQgPD0gY29udGFpbmVyUmlnaHQ7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWlzRnVsbHlWaXNpYmxlKSB7XG4gICAgICAgICAgaWYgKHRodW1ibmFpbExlZnQgPCBjdXJyZW50U2Nyb2xsTGVmdCkge1xuICAgICAgICAgICAgc2Nyb2xsTGVmdCA9IHRodW1ibmFpbExlZnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHRodW1ibmFpbFJpZ2h0ID4gY29udGFpbmVyUmlnaHQpIHtcbiAgICAgICAgICAgIHNjcm9sbExlZnQgPSB0aHVtYm5haWxSaWdodCAtIGNvbnRhaW5lcldpZHRoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoc2Nyb2xsTGVmdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRodW1ibmFpbHNDb250YWluZXIuc2Nyb2xsVG8oe1xuICAgICAgICAgIGxlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gbmV4dFNsaWRlKCkge1xuICAgIGN1cnJlbnRTbGlkZSA9IChjdXJyZW50U2xpZGUgKyAxKSAlIHRvdGFsU2xpZGVzO1xuICAgIHVwZGF0ZVNsaWRlcigpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBwcmV2U2xpZGUoKSB7XG4gICAgY3VycmVudFNsaWRlID0gKGN1cnJlbnRTbGlkZSAtIDEgKyB0b3RhbFNsaWRlcykgJSB0b3RhbFNsaWRlcztcbiAgICB1cGRhdGVTbGlkZXIoKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gZ29Ub1NsaWRlKGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0b3RhbFNsaWRlcykge1xuICAgICAgY3VycmVudFNsaWRlID0gaW5kZXg7XG4gICAgICB1cGRhdGVTbGlkZXIoKTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEV2ZW50IGxpc3RlbmVyc1xuICBwcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJldlNsaWRlKTtcbiAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG5leHRTbGlkZSk7XG4gIFxuICAvLyBUaHVtYm5haWwgY2xpY2tzXG4gIHRodW1ibmFpbHMuZm9yRWFjaChmdW5jdGlvbih0aHVtYm5haWwsIGluZGV4KSB7XG4gICAgdGh1bWJuYWlsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBnb1RvU2xpZGUoaW5kZXgpO1xuICAgIH0pO1xuICB9KTtcbiAgXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKHNsaWRlckNvbnRhaW5lci5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB8fCBzbGlkZXJDb250YWluZXIubWF0Y2hlcygnOmhvdmVyJykpIHtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBwcmV2U2xpZGUoKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG5leHRTbGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIFxuICB1cGRhdGVTbGlkZXIoKTtcbn0pO1xuIiwiLy8g0J7QsdGA0L7QsdC60LAg0LrQu9GW0LrRgyDQvdCwINC60L3QvtC/0LrRgyBcItCd0LDQv9C40YjRltGC0Ywg0L3QsNC8XCJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IGNvbnRhY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQ29udGFjdFBhZ2VfX2J1dHRvbicpO1xuICBcbiAgaWYgKGNvbnRhY3RCdXR0b24pIHtcbiAgICBjb250YWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgLy8g0JLQuNC60LvQuNC60LDRlNC80L4g0YTRg9C90LrRhtGW0Y4gb3BlbkhlbHBQb3B1cCDQtyBoZWxwUG9wdXAuanNcbiAgICAgIGlmICh0eXBlb2Ygb3BlbkhlbHBQb3B1cCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvcGVuSGVscFBvcHVwKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pO1xuIiwiY29uc3QgZmFxSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuRmFxUGFnZV9faXRlbScpO1xuXG5jb25zdCBjbG9zZUFsbEZhcUl0ZW1zID0gKCkgPT4ge1xuICBmYXFJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgY29uc3QgdHJpZ2dlciA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLkZhcVBhZ2VfX3RyaWdnZXInKTtcbiAgICBjb25zdCBpY29uID0gdHJpZ2dlciA/IHRyaWdnZXIucXVlcnlTZWxlY3RvcignLkZhcVBhZ2VfX2ljb24gaW1nJykgOiBudWxsO1xuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICB0cmlnZ2VyLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgIH1cbiAgICBpZiAoaWNvbikge1xuICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ2FsdCcsICfQn9C+0LrQsNC30LDRgtC4INCy0ZbQtNC/0L7QstGW0LTRjCcpO1xuICAgIH1cbiAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ0ZhcVBhZ2VfX2l0ZW0tLWFjdGl2ZScpO1xuICB9KTtcbn07XG5cbmNvbnN0IHRvZ2dsZUZhcUl0ZW0gPSAoaXRlbSkgPT4ge1xuICBjb25zdCBpc0FjdGl2ZSA9IGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdGYXFQYWdlX19pdGVtLS1hY3RpdmUnKTtcblxuICBjbG9zZUFsbEZhcUl0ZW1zKCk7XG5cbiAgaWYgKCFpc0FjdGl2ZSkge1xuICAgIGNvbnN0IHRyaWdnZXIgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5GYXFQYWdlX190cmlnZ2VyJyk7XG4gICAgY29uc3QgaWNvbiA9IHRyaWdnZXIgPyB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoJy5GYXFQYWdlX19pY29uIGltZycpIDogbnVsbDtcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgdHJpZ2dlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgIH1cbiAgICBpZiAoaWNvbikge1xuICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ2FsdCcsICfQn9GA0LjRhdC+0LLQsNGC0Lgg0LLRltC00L/QvtCy0ZbQtNGMJyk7XG4gICAgfVxuICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnRmFxUGFnZV9faXRlbS0tYWN0aXZlJyk7XG4gIH1cbn07XG5cbmlmIChmYXFJdGVtcy5sZW5ndGgpIHtcbiAgZmFxSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IHRyaWdnZXIgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5GYXFQYWdlX190cmlnZ2VyJyk7XG5cbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdG9nZ2xlRmFxSXRlbShpdGVtKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59XG4iLCJjbGFzcyBIZWFkZXJNZW51IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XG4gICAgdGhpcy5idXJnZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19idXJnZXInKTtcbiAgICB0aGlzLm1vYmlsZVdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX193cmFwcGVyTW9iaWxlJyk7XG4gICAgdGhpcy5sYW5nQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfX2xhbmctYnV0dG9uJyk7XG4gICAgdGhpcy5sYW5nQnV0dG9uc01vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfX2xhbmdCdXR0b25Nb2JpbGUnKTtcbiAgICB0aGlzLmJ1cmdlclRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19idXJnZXItdGV4dCcpO1xuXG4gICAgdGhpcy5oZWFkZXJCYWNrZ3JvdW5kQ2xhc3MgPSAnaGVhZGVyLS1zY3JvbGxlZCc7XG4gICAgdGhpcy5oZWFkZXJCYWNrZ3JvdW5kVGhyZXNob2xkID0gMjA7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5pbml0QnVyZ2VyVG9nZ2xlKCk7XG4gICAgdGhpcy5pbml0TGFuZ3VhZ2VCdXR0b25zKCk7XG4gICAgdGhpcy5pbml0TWVudVRvZ2dsZSgpO1xuICAgIHRoaXMuaW5pdEhlYWRlckJhY2tncm91bmQoKTtcbiAgICB0aGlzLmluaXRBdXRvQ2xvc2VNZW51T25SZXNpemUoKTtcbiAgICB0aGlzLmluaXRBY3RpdmVQYWdlSGlnaGxpZ2h0KCk7XG4gIH1cblxuICAvLyAtLS0g0JHRg9GA0LPQtdGAIC0tLVxuICBpbml0QnVyZ2VyVG9nZ2xlKCkge1xuICAgIGlmICghdGhpcy5idXJnZXJCdXR0b24gfHwgIXRoaXMuYnVyZ2VyVGV4dCkgcmV0dXJuO1xuXG4gICAgdGhpcy5idXJnZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmVCdXJnZXJCdXR0b24nKTtcblxuICAgICAgY29uc3QgaXNBY3RpdmUgPSB0aGlzLmJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZUJ1cmdlckJ1dHRvbicpO1xuICAgICAgdGhpcy5idXJnZXJUZXh0LnRleHRDb250ZW50ID0gaXNBY3RpdmUgPyAn0JfQsNC60YDQuNGC0LgnIDogJ9Cc0LXQvdGOJztcbiAgICB9KTtcbiAgfVxuXG4gIC8vIC0tLSDQmtC90L7Qv9C60Lgg0LzQvtCyIC0tLVxuICBpbml0TGFuZ3VhZ2VCdXR0b25zKCkge1xuICAgIGNvbnN0IGFjdGl2YXRlQnV0dG9ucyA9IChidXR0b25zLCBhY3RpdmVDbGFzcykgPT4ge1xuICAgICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBidXR0b25zLmZvckVhY2goYiA9PiBiLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlQ2xhc3MpKTtcbiAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZChhY3RpdmVDbGFzcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGlmICh0aGlzLmxhbmdCdXR0b25zLmxlbmd0aClcbiAgICAgIGFjdGl2YXRlQnV0dG9ucyh0aGlzLmxhbmdCdXR0b25zLCAnaGVhZGVyX19sYW5nLWJ1dHRvbi0tYWN0aXZlJyk7XG5cbiAgICBpZiAodGhpcy5sYW5nQnV0dG9uc01vYmlsZS5sZW5ndGgpXG4gICAgICBhY3RpdmF0ZUJ1dHRvbnModGhpcy5sYW5nQnV0dG9uc01vYmlsZSwgJ2hlYWRlcl9fbGFuZ0J1dHRvbk1vYmlsZS0tYWN0aXZlJyk7XG4gIH1cblxuICAvLyAtLS0g0JLRltC00LrRgNC40YLRgtGPINC80L7QsdGW0LvRjNC90L7Qs9C+INC80LXQvdGOIC0tLVxuICBpbml0TWVudVRvZ2dsZSgpIHtcbiAgICBpZiAoIXRoaXMuYnVyZ2VyQnV0dG9uIHx8ICF0aGlzLmhlYWRlciB8fCAhdGhpcy5tb2JpbGVXcmFwcGVyKSByZXR1cm47XG5cbiAgICB0aGlzLmJ1cmdlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hlYWRlci0tbWVudS1vcGVuJyk7XG4gICAgfSk7XG4gIH1cblxuICAvLyAtLS0g0KTQvtC9INGI0LDQv9C60Lgg0L/RgNC4INGB0LrRgNC+0LvRliAtLS1cbiAgaW5pdEhlYWRlckJhY2tncm91bmQoKSB7XG4gICAgY29uc3Qgc2V0QmFja2dyb3VuZCA9ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5oZWFkZXIpIHJldHVybjtcbiAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA+IHRoaXMuaGVhZGVyQmFja2dyb3VuZFRocmVzaG9sZCkge1xuICAgICAgICB0aGlzLmhlYWRlci5jbGFzc0xpc3QuYWRkKHRoaXMuaGVhZGVyQmFja2dyb3VuZENsYXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5oZWFkZXJCYWNrZ3JvdW5kQ2xhc3MpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBzZXRCYWNrZ3JvdW5kKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNldEJhY2tncm91bmQpO1xuICB9XG5cbiAgLy8gLS0tINCQ0LLRgtC+0LzQsNGC0LjRh9C90LUg0LfQsNC60YDQuNGC0YLRjyDQvNC10L3RjiDQv9GA0Lgg0YDQtdGB0LDQudC30ZYgLS0tXG4gIGluaXRBdXRvQ2xvc2VNZW51T25SZXNpemUoKSB7XG4gICAgaWYgKCF0aGlzLmhlYWRlciB8fCAhdGhpcy5idXJnZXJCdXR0b24pIHJldHVybjtcblxuICAgIGNvbnN0IGhhbmRsZVJlc2l6ZSA9ICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDg4MCkge1xuICAgICAgICAvLyDQr9C60YnQviDRiNC40YDQuNC90LAg0LLRltC60L3QsCDQsdGW0LvRjNGI0LUgODgwcHgsINC30LDQutGA0LjQstCw0ZTQvNC+INC80L7QsdGW0LvRjNC90LUg0LzQtdC90Y5cbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5jb250YWlucygnaGVhZGVyLS1tZW51LW9wZW4nKSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlci0tbWVudS1vcGVuJyk7XG4gICAgICAgICAgdGhpcy5idXJnZXJCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlQnVyZ2VyQnV0dG9uJyk7XG4gICAgICAgICAgaWYgKHRoaXMuYnVyZ2VyVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5idXJnZXJUZXh0LnRleHRDb250ZW50ID0gJ9Cc0LXQvdGOJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSk7XG4gIH1cblxuICAvLyAtLS0g0JDQutGC0LjQstC90LAg0YHRgtC+0YDRltC90LrQsCAtLS1cbiAgaW5pdEFjdGl2ZVBhZ2VIaWdobGlnaHQoKSB7XG4gICAgY29uc3Qgc2V0QWN0aXZlUGFnZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSBjdXJyZW50UGF0aC5zcGxpdCgnLycpLnBvcCgpIHx8ICdpbmRleC5odG1sJztcbiAgICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcl9fbmF2IGEsIC5oZWFkZXJfX21lbnVNb2JpbGUtbGluaycpO1xuICAgICAgY29uc3QgbmF2SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGVhZGVyX19uYXYgbGknKTtcblxuICAgICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyX19uYXYtbGluay0tYWN0aXZlJykpO1xuICAgICAgbmF2SXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyX19uYXYtaXRlbS0tYWN0aXZlJykpO1xuXG4gICAgICBjb25zdCBhY3RpdmVMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYC5oZWFkZXJfX25hdiBhW2hyZWY9XCIke2N1cnJlbnRQYWdlfVwiXSwgLmhlYWRlcl9fbWVudU1vYmlsZS1saW5rW2hyZWY9XCIke2N1cnJlbnRQYWdlfVwiXWBcbiAgICAgICk7XG5cbiAgICAgIGlmIChhY3RpdmVMaW5rKSB7XG4gICAgICAgIGFjdGl2ZUxpbmsuY2xhc3NMaXN0LmFkZCgnaGVhZGVyX19uYXYtbGluay0tYWN0aXZlJyk7XG4gICAgICAgIGNvbnN0IHBhcmVudExpID0gYWN0aXZlTGluay5jbG9zZXN0KCcuaGVhZGVyX19uYXYgbGknKTtcbiAgICAgICAgaWYgKHBhcmVudExpKSBwYXJlbnRMaS5jbGFzc0xpc3QuYWRkKCdoZWFkZXJfX25hdi1pdGVtLS1hY3RpdmUnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGN1cnJlbnRQYWdlID09PSAnaW5kZXguaHRtbCcgfHwgY3VycmVudFBhZ2UgPT09ICcnIHx8IGN1cnJlbnRQYWdlID09PSAnLycpIHtcbiAgICAgICAgY29uc3QgaW5kZXhMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAnLmhlYWRlcl9fbmF2IGFbaHJlZj1cImluZGV4Lmh0bWxcIl0sIC5oZWFkZXJfX21lbnVNb2JpbGUtbGlua1tocmVmPVwiaW5kZXguaHRtbFwiXSdcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGluZGV4TGluaykge1xuICAgICAgICAgIGluZGV4TGluay5jbGFzc0xpc3QuYWRkKCdoZWFkZXJfX25hdi1saW5rLS1hY3RpdmUnKTtcbiAgICAgICAgICBjb25zdCBwYXJlbnRMaSA9IGluZGV4TGluay5jbG9zZXN0KCcuaGVhZGVyX19uYXYgbGknKTtcbiAgICAgICAgICBpZiAocGFyZW50TGkpIHBhcmVudExpLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcl9fbmF2LWl0ZW0tLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vINCS0LjQutC+0L3Rg9GU0LzQviDQstGW0LTRgNCw0LfRgyDQv9GA0Lgg0LfQsNCy0LDQvdGC0LDQttC10L3QvdGWXG4gICAgc2V0QWN0aXZlUGFnZSgpO1xuICAgIFxuICAgIC8vINCi0LDQutC+0LYg0YHQu9GD0YXQsNGU0LzQviDQvdCwINCy0LjQv9Cw0LTQvtC6INC00LjQvdCw0LzRltGH0L3QvtGXINC30LzRltC90LggVVJMXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHNldEFjdGl2ZVBhZ2UpO1xuICB9XG59XG5cbi8vIC0tLSDQhtC90ZbRhtGW0LDQu9GW0LfQsNGG0ZbRjyAtLS1cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIG5ldyBIZWFkZXJNZW51KCk7XG59KTtcbiIsImNvbnN0IGhlbHBQb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWxwUG9wdXAnKTtcbmNvbnN0IGhlbHBQb3B1cENsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlbHBQb3B1cENsb3NlJyk7XG5jb25zdCBoZWxwRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWxwRm9ybScpO1xuY29uc3QgaGVscEZpbGVVcGxvYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVscEZpbGVVcGxvYWQnKTtcbmNvbnN0IGhlbHBQb3B1cENvbnRhaW5lciA9IGhlbHBQb3B1cCA/IGhlbHBQb3B1cC5xdWVyeVNlbGVjdG9yKCcuaGVscFBvcHVwX19jb250YWluZXInKSA6IG51bGw7XG5jb25zdCBoZWxwRm9ybVN0YXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlbHBQb3B1cF9fZm9ybVN0YXRlJyk7XG5jb25zdCBoZWxwU3VjY2Vzc1N0YXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlbHBQb3B1cF9fc3VjY2VzcycpO1xuXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7Rh9C40YnQtdC90L3RjyDQv9C+0LzQuNC70L7QulxuY29uc3QgY2xlYXJBbGxFcnJvcnMgPSAoKSA9PiB7XG4gIC8vINCe0YfQuNGB0YLQuNGC0Lgg0L/QvtC80LjQu9C60LggZW1haWxcbiAgY29uc3QgZW1haWxJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbWFpbCcpO1xuICBjb25zdCBlbWFpbEVycm9yTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWxwUG9wdXBfX2Vycm9yTWVzc2FnZS0tZW1haWwnKTtcbiAgaWYgKGVtYWlsSW5wdXQpIHtcbiAgICBlbWFpbElucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XG4gIH1cbiAgaWYgKGVtYWlsRXJyb3JNZXNzYWdlKSB7XG4gICAgZW1haWxFcnJvck1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgZW1haWxFcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSAnJztcbiAgfVxuICBcbiAgLy8g0J7Rh9C40YHRgtC40YLQuCDQv9C+0LzQuNC70LrQuCDRhNCw0LnQu9GDXG4gIGNvbnN0IHVwbG9hZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWxwUG9wdXBfX3VwbG9hZCcpO1xuICBjb25zdCB1cGxvYWRTdWJ0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWxwUG9wdXBfX3VwbG9hZFN1YnRpdGxlJyk7XG4gIGNvbnN0IHVwbG9hZFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlbHBQb3B1cF9fdXBsb2FkVGl0bGUnKTtcbiAgaWYgKHVwbG9hZENvbnRhaW5lcikge1xuICAgIHVwbG9hZENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICB9XG4gIGlmICh1cGxvYWRTdWJ0aXRsZSkge1xuICAgIHVwbG9hZFN1YnRpdGxlLnRleHRDb250ZW50ID0gJ9Cc0LDQutGB0LjQvNCw0LvRjNC90LjQuSDRgNC+0LfQvNGW0YAgNSDQnNCRJztcbiAgfVxuICBpZiAodXBsb2FkVGl0bGUpIHtcbiAgICB1cGxvYWRUaXRsZS50ZXh0Q29udGVudCA9ICfQl9Cw0LLQsNC90YLQsNC20LjRgtC4INGE0LDQudC7IChwZGYsIGpwZywgd29yZCknO1xuICB9XG59O1xuXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0LLRltC00LrRgNC40YLRgtGPINC/0L7Qv9Cw0L/Rg1xuY29uc3Qgb3BlbkhlbHBQb3B1cCA9ICgpID0+IHtcbiAgaWYgKGhlbHBQb3B1cCkge1xuICAgIGlmIChoZWxwRm9ybVN0YXRlKSB7XG4gICAgICBoZWxwRm9ybVN0YXRlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIGlmIChoZWxwU3VjY2Vzc1N0YXRlKSB7XG4gICAgICBoZWxwU3VjY2Vzc1N0YXRlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH1cblxuICAgIGlmIChoZWxwUG9wdXBDb250YWluZXIpIHtcbiAgICAgIGhlbHBQb3B1cENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoZWxwUG9wdXBfX2NvbnRhaW5lci0tc3VjY2VzcycpO1xuICAgIH1cblxuICAgIC8vINCe0YfQuNGB0YLQuNGC0Lgg0LLRgdGWINC/0L7QvNC40LvQutC4INC/0YDQuCDQstGW0LTQutGA0LjRgtGC0ZZcbiAgICBjbGVhckFsbEVycm9ycygpO1xuXG4gICAgaGVscFBvcHVwLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgfVxufTtcblxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC30LDQutGA0LjRgtGC0Y8g0L/QvtC/0LDQv9GDXG5jb25zdCBjbG9zZUhlbHBQb3B1cCA9ICgpID0+IHtcbiAgaWYgKGhlbHBQb3B1cCkge1xuICAgIGhlbHBQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG5cbiAgICBpZiAoaGVscEZvcm1TdGF0ZSkge1xuICAgICAgaGVscEZvcm1TdGF0ZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBpZiAoaGVscFN1Y2Nlc3NTdGF0ZSkge1xuICAgICAgaGVscFN1Y2Nlc3NTdGF0ZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB9XG5cbiAgICBpZiAoaGVscFBvcHVwQ29udGFpbmVyKSB7XG4gICAgICBoZWxwUG9wdXBDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGVscFBvcHVwX19jb250YWluZXItLXN1Y2Nlc3MnKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vINCX0LDQutGA0LjRgtGC0Y8g0L/QviDQutC70ZbQutGDINC90LAg0YXRgNC10YHRgtC40LpcbmlmIChoZWxwUG9wdXBDbG9zZSkge1xuICBoZWxwUG9wdXBDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlSGVscFBvcHVwKTtcbn1cblxuLy8g0JfQsNC60YDQuNGC0YLRjyDQv9C+INC60LvRltC60YMg0L3QsCBvdmVybGF5XG5pZiAoaGVscFBvcHVwKSB7XG4gIGNvbnN0IG92ZXJsYXkgPSBoZWxwUG9wdXAucXVlcnlTZWxlY3RvcignLmhlbHBQb3B1cF9fb3ZlcmxheScpO1xuICBpZiAob3ZlcmxheSkge1xuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUhlbHBQb3B1cCk7XG4gIH1cbn1cblxuLy8g0JfQsNC60YDQuNGC0YLRjyDQv9C+INC60LvQsNCy0ZbRiNGWIEVzY2FwZVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgaGVscFBvcHVwICYmIGhlbHBQb3B1cC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgY2xvc2VIZWxwUG9wdXAoKTtcbiAgfVxufSk7XG5cbi8vINCe0LHRgNC+0LHQutCwINC30LDQstCw0L3RgtCw0LbQtdC90L3RjyDRhNCw0LnQu9GDXG5pZiAoaGVscEZpbGVVcGxvYWQpIHtcbiAgaGVscEZpbGVVcGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF07XG4gICAgY29uc3QgdXBsb2FkVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVscFBvcHVwX191cGxvYWRUaXRsZScpO1xuICAgIGNvbnN0IHVwbG9hZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWxwUG9wdXBfX3VwbG9hZCcpO1xuICAgIGNvbnN0IHVwbG9hZFN1YnRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlbHBQb3B1cF9fdXBsb2FkU3VidGl0bGUnKTtcbiAgICBcbiAgICAvLyDQntGH0LjRgdGC0LjRgtC4INC/0L7Qv9C10YDQtdC00L3RliDQv9C+0LzQuNC70LrQuFxuICAgIGlmICh1cGxvYWRDb250YWluZXIpIHtcbiAgICAgIHVwbG9hZENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgIH1cbiAgICBpZiAodXBsb2FkU3VidGl0bGUpIHtcbiAgICAgIHVwbG9hZFN1YnRpdGxlLnRleHRDb250ZW50ID0gJ9Cc0LDQutGB0LjQvNCw0LvRjNC90LjQuSDRgNC+0LfQvNGW0YAgNSDQnNCRJztcbiAgICB9XG4gICAgXG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIGNvbnN0IG1heFNpemUgPSA1ICogMTAyNCAqIDEwMjQ7IC8vIDVNQlxuICAgICAgXG4gICAgICBpZiAoZmlsZS5zaXplID4gbWF4U2l6ZSkge1xuICAgICAgICAvLyDQn9C+0LrQsNC30LDRgtC4INC/0L7QvNC40LvQutGDXG4gICAgICAgIGlmICh1cGxvYWRDb250YWluZXIpIHtcbiAgICAgICAgICB1cGxvYWRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBsb2FkU3VidGl0bGUpIHtcbiAgICAgICAgICB1cGxvYWRTdWJ0aXRsZS50ZXh0Q29udGVudCA9ICfQpNCw0LnQuyDQsdGW0LvRjNGI0LUgNSDQnNCRJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBsb2FkVGl0bGUpIHtcbiAgICAgICAgICB1cGxvYWRUaXRsZS50ZXh0Q29udGVudCA9ICfQl9Cw0LLQsNC90YLQsNC20LjRgtC4INGE0LDQudC7IChwZGYsIGpwZywgd29yZCknO1xuICAgICAgICB9XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlID0gJyc7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8g0J/QvtC60LDQt9Cw0YLQuCDQvdCw0LfQstGDINGE0LDQudC70YMg0LIg0LfQsNCz0L7Qu9C+0LLQutGDXG4gICAgICBpZiAodXBsb2FkVGl0bGUpIHtcbiAgICAgICAgdXBsb2FkVGl0bGUudGV4dENvbnRlbnQgPSBmaWxlLm5hbWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vINCf0L7QstC10YDQvdGD0YLQuCDQv9C+0YfQsNGC0LrQvtCy0LjQuSDRgtC10LrRgdGCXG4gICAgICBpZiAodXBsb2FkVGl0bGUpIHtcbiAgICAgICAgdXBsb2FkVGl0bGUudGV4dENvbnRlbnQgPSAn0JfQsNCy0LDQvdGC0LDQttC40YLQuCDRhNCw0LnQuyAocGRmLCBqcGcsIHdvcmQpJztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG4vLyDQktCw0LvRltC00LDRhtGW0Y8gZW1haWwg0LcgZmxvYXRpbmcgbGFiZWxcbmNvbnN0IGVtYWlsSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW1haWwnKTtcbmNvbnN0IGVtYWlsRXJyb3JNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlbHBQb3B1cF9fZXJyb3JNZXNzYWdlLS1lbWFpbCcpO1xuXG5pZiAoZW1haWxJbnB1dCAmJiBlbWFpbEVycm9yTWVzc2FnZSkge1xuICAvLyDQntCx0YDQvtCx0LrQsCDRhNC+0LrRg9GB0YMg0LTQu9GPIGZsb2F0aW5nIGxhYmVsXG4gIGVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoZSkgPT4ge1xuICAgIC8vINCe0YfQuNGB0YLQuNGC0Lgg0L/QvtC80LjQu9C60Lgg0L/RgNC4INGE0L7QutGD0YHRllxuICAgIGVtYWlsSW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcbiAgICBlbWFpbEVycm9yTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICBlbWFpbEVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9ICcnO1xuICB9KTtcbiAgXG4gIGVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChlKSA9PiB7XG4gICAgY29uc3QgZW1haWwgPSBlLnRhcmdldC52YWx1ZTtcbiAgICBjb25zdCBlbWFpbFJlZ2V4ID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87XG4gICAgXG4gICAgLy8g0J7Rh9C40YHRgtC40YLQuCDQv9C+0L/QtdGA0LXQtNC90ZYg0L/QvtC80LjQu9C60LhcbiAgICBlbWFpbElucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XG4gICAgZW1haWxFcnJvck1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgZW1haWxFcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSAnJztcbiAgICBcbiAgICBpZiAoZW1haWwgJiYgIWVtYWlsUmVnZXgudGVzdChlbWFpbCkpIHtcbiAgICAgIGVtYWlsSW5wdXQuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcbiAgICAgIGVtYWlsRXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgZW1haWxFcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSAn0J3QtdCy0ZbRgNC90LjQuSDRhNC+0YDQvNCw0YIgZW1haWwnO1xuICAgIH1cbiAgfSk7XG4gIFxuICBlbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcbiAgICAvLyDQntGH0LjRgdGC0LjRgtC4INC/0L7QvNC40LvQutC4INC/0YDQuCDQstCy0LXQtNC10L3QvdGWXG4gICAgZW1haWxJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgIGVtYWlsRXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIGVtYWlsRXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gJyc7XG4gIH0pO1xufVxuXG4vLyDQntCx0YDQvtCx0LrQsCDQstGW0LTQv9GA0LDQstC60Lgg0YTQvtGA0LzQuFxuaWYgKGhlbHBGb3JtKSB7XG4gIGhlbHBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGhlbHBGb3JtKTtcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBoZWxwRm9ybS5xdWVyeVNlbGVjdG9yKCcuaGVscFBvcHVwX19zdWJtaXQnKTtcbiAgICBjb25zdCBlbWFpbElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtYWlsJyk7XG4gICAgY29uc3QgZW1haWxFcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVscFBvcHVwX19lcnJvck1lc3NhZ2UtLWVtYWlsJyk7XG4gICAgXG4gICAgLy8g0JLQsNC70ZbQtNCw0YbRltGPIGVtYWlsINC/0LXRgNC10LQg0LLRltC00L/RgNCw0LLQutC+0Y5cbiAgICBsZXQgaGFzRXJyb3JzID0gZmFsc2U7XG4gICAgaWYgKGVtYWlsSW5wdXQgJiYgZW1haWxFcnJvck1lc3NhZ2UpIHtcbiAgICAgIGNvbnN0IGVtYWlsID0gZW1haWxJbnB1dC52YWx1ZTtcbiAgICAgIGNvbnN0IGVtYWlsUmVnZXggPSAvXlteXFxzQF0rQFteXFxzQF0rXFwuW15cXHNAXSskLztcbiAgICAgIFxuICAgICAgaWYgKCFlbWFpbCB8fCAhZW1haWxSZWdleC50ZXN0KGVtYWlsKSkge1xuICAgICAgICBlbWFpbElucHV0LmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XG4gICAgICAgIGVtYWlsRXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICBlbWFpbEVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9ICfQndC10LLRltGA0L3QuNC5INGE0L7RgNC80LDRgiBlbWFpbCc7XG4gICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIGlmIChoYXNFcnJvcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgaWYgKHN1Ym1pdEJ1dHRvbikge1xuICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICfQktGW0LTQv9GA0LDQstC60LAuLi4nO1xuICAgIH1cbiAgICBcbiAgICAvLyDQotGD0YIg0LzQsNGUINCx0YPRgtC4INC60L7QtCDQtNC70Y8g0LLRltC00L/RgNCw0LLQutC4INC00LDQvdC40YUg0L3QsCDRgdC10YDQstC10YBcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChzdWJtaXRCdXR0b24pIHtcbiAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICfQndCw0LTRltGB0LvQsNGC0Lgg0LfQstC10YDQvdC10L3QvdGPJztcbiAgICAgIH1cblxuICAgICAgaGVscEZvcm0ucmVzZXQoKTtcblxuICAgICAgLy8g0J/QvtCy0LXRgNC90YPRgtC4INC/0L7Rh9Cw0YLQutC+0LLQuNC5INGC0LXQutGB0YIg0YTQsNC50LvRg1xuICAgICAgY29uc3QgdXBsb2FkVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVscFBvcHVwX191cGxvYWRUaXRsZScpO1xuICAgICAgaWYgKHVwbG9hZFRpdGxlKSB7XG4gICAgICAgIHVwbG9hZFRpdGxlLnRleHRDb250ZW50ID0gJ9CX0LDQstCw0L3RgtCw0LbQuNGC0Lgg0YTQsNC50LsgKHBkZiwganBnLCB3b3JkKSc7XG4gICAgICB9XG5cbiAgICAgIGlmIChoZWxwRm9ybVN0YXRlKSB7XG4gICAgICAgIGhlbHBGb3JtU3RhdGUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChoZWxwU3VjY2Vzc1N0YXRlKSB7XG4gICAgICAgIGhlbHBTdWNjZXNzU3RhdGUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChoZWxwUG9wdXBDb250YWluZXIpIHtcbiAgICAgICAgaGVscFBvcHVwQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hlbHBQb3B1cF9fY29udGFpbmVyLS1zdWNjZXNzJyk7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gICAgXG4gIH0pO1xufVxuXG4vLyDQldC60YHQv9C+0YDRgtGD0ZTQvNC+INGE0YPQvdC60YbRltGOINCy0ZbQtNC60YDQuNGC0YLRjyDQtNC70Y8g0LLQuNC60L7RgNC40YHRgtCw0L3QvdGPINCyINGW0L3RiNC40YUg0YTQsNC50LvQsNGFXG53aW5kb3cub3BlbkhlbHBQb3B1cCA9IG9wZW5IZWxwUG9wdXA7XG5cbi8vINCf0ZbQtNC60LvRjtGH0LXQvdC90Y8g0LrQvdC+0L/QvtC6INCy0ZbQtNC60YDQuNGC0YLRjyDQv9C+0L/QsNC/0YMg0LcgaGVhZGVyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zdCBoZWxwQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9faGVscEJ1dHRvbicpO1xuICBjb25zdCBoZWxwQnV0dG9uTW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9faGVscEJ1dHRvbk1vYmlsZScpO1xuXG4gIGlmIChoZWxwQnV0dG9uKSB7XG4gICAgaGVscEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5IZWxwUG9wdXApO1xuICB9XG5cbiAgaWYgKGhlbHBCdXR0b25Nb2JpbGUpIHtcbiAgICBoZWxwQnV0dG9uTW9iaWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbkhlbHBQb3B1cCk7XG4gIH1cbn0pO1xuXG4iLCIvLyBNYWluIGVudHJ5IHBvaW50IC0g0YTQsNC50LvQuCDQsdGD0LTRg9GC0Ywg0LrQvtC90LrQsNGC0LXQvdGD0LLQsNGC0LjRgdGMINCyINCw0LvRhNCw0LLRltGC0L3QvtC80YMg0L/QvtGA0Y/QtNC60YMg0YfQtdGA0LXQtyBndWxwXG4vLyDQn9C+0YDRj9C00L7QujogYWJvdXRTbGlkZXIuanMsIGFydGljbGVTbGlkZXIuanMsIGZhcS5qcywgaGVhZGVyLmpzLCBoZWxwUG9wdXAuanMsIG1haW4uanMsIG5ld3MuanNcblxuIiwiY2xhc3MgTmV3c1BhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMTtcbiAgICAgICAgdGhpcy5pdGVtc1BlclBhZ2UgPSA0O1xuICAgICAgICB0aGlzLmN1cnJlbnRDYXRlZ29yeSA9ICdhbGwnO1xuICAgICAgICB0aGlzLmFsbE5ld3NJdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLmZpbHRlcmVkTmV3c0l0ZW1zID0gW107XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5nZXRBbGxOZXdzSXRlbXMoKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuZmlsdGVyQW5kU2hvd05ld3MoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJQYWdpbmF0aW9uKCk7XG4gICAgfVxuICAgIFxuICAgIGdldEFsbE5ld3NJdGVtcygpIHtcbiAgICAgICAgdGhpcy5hbGxOZXdzSXRlbXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5OZXdzUGFnZV9fbmV3c0l0ZW0nKSk7XG4gICAgICAgIHRoaXMuZmlsdGVyZWROZXdzSXRlbXMgPSBbLi4udGhpcy5hbGxOZXdzSXRlbXNdO1xuICAgIH1cbiAgICBcbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICBjb25zdCBjYXRlZ29yeUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLk5ld3NQYWdlX19jYXRlZ29yaWVzTGlzdC1pdGVtJyk7XG4gICAgICAgIGNhdGVnb3J5SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2F0ZWdvcnlDbGljayhlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgaGFuZGxlQ2F0ZWdvcnlDbGljayhlKSB7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gZS50YXJnZXQuZGF0YXNldC5jYXRlZ29yeTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5OZXdzUGFnZV9fY2F0ZWdvcmllc0xpc3QtaXRlbScpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ05ld3NQYWdlX19jYXRlZ29yaWVzTGlzdC1pdGVtLS1hY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ05ld3NQYWdlX19jYXRlZ29yaWVzTGlzdC1pdGVtLS1hY3RpdmUnKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY3VycmVudENhdGVnb3J5ID0gY2F0ZWdvcnk7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSAxO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5maWx0ZXJBbmRTaG93TmV3cygpO1xuICAgICAgICB0aGlzLnJlbmRlclBhZ2luYXRpb24oKTtcbiAgICB9XG4gICAgXG4gICAgZmlsdGVyQW5kU2hvd05ld3MoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRDYXRlZ29yeSA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyZWROZXdzSXRlbXMgPSBbLi4udGhpcy5hbGxOZXdzSXRlbXNdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZE5ld3NJdGVtcyA9IHRoaXMuYWxsTmV3c0l0ZW1zLmZpbHRlcihpdGVtID0+IFxuICAgICAgICAgICAgICAgIGl0ZW0uZGF0YXNldC5jYXRlZ29yeSA9PT0gdGhpcy5jdXJyZW50Q2F0ZWdvcnlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2hvd0N1cnJlbnRQYWdlTmV3cygpO1xuICAgIH1cbiAgICBcbiAgICBzaG93Q3VycmVudFBhZ2VOZXdzKCkge1xuICAgICAgICB0aGlzLmFsbE5ld3NJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSAodGhpcy5jdXJyZW50UGFnZSAtIDEpICogdGhpcy5pdGVtc1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IGVuZEluZGV4ID0gc3RhcnRJbmRleCArIHRoaXMuaXRlbXNQZXJQYWdlO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZUl0ZW1zID0gdGhpcy5maWx0ZXJlZE5ld3NJdGVtcy5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleCk7XG4gICAgICAgIFxuICAgICAgICBjdXJyZW50UGFnZUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJQYWdpbmF0aW9uKCkge1xuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhZ2luYXRpb24nKTtcbiAgICAgICAgaWYgKCFwYWdpbmF0aW9uKSByZXR1cm47IFxuICAgICAgICBcbiAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCh0aGlzLmZpbHRlcmVkTmV3c0l0ZW1zLmxlbmd0aCAvIHRoaXMuaXRlbXNQZXJQYWdlKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0b3RhbFBhZ2VzIDw9IDEpIHtcbiAgICAgICAgICAgIHBhZ2luYXRpb24uaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwYWdpbmF0aW9uSFRNTCA9ICcnO1xuICAgICAgICBcbiAgICAgICAgLy8gUHJldmlvdXMgYnV0dG9uXG4gICAgICAgIHBhZ2luYXRpb25IVE1MICs9IGBcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJOZXdzUGFnZV9fcGFnaW5hdGlvbi1hcnJvdyAke3RoaXMuY3VycmVudFBhZ2UgPT09IDEgPyAnTmV3c1BhZ2VfX3BhZ2luYXRpb24tYXJyb3ctLWRpc2FibGVkJyA6ICcnfVwiIFxuICAgICAgICAgICAgICAgICAgICAke3RoaXMuY3VycmVudFBhZ2UgPT09IDEgPyAnZGlzYWJsZWQnIDogJyd9IFxuICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPVwibmV3c1BhZ2UuZ29Ub1BhZ2UoJHt0aGlzLmN1cnJlbnRQYWdlIC0gMX0pXCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWcvTmV3c1BhZ2UvYXJyb3ctbGVmdC5wbmdcIiBhbHQ9XCJhcnJvdy1sZWZ0XCI+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgYDtcbiAgICAgICAgXG4gICAgICAgIC8vIEFsd2F5cyBzaG93IGZpcnN0IHBhZ2VcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2UgPiAzKSB7XG4gICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSBgPGJ1dHRvbiBjbGFzcz1cIk5ld3NQYWdlX19wYWdpbmF0aW9uLWJ1dHRvblwiIG9uY2xpY2s9XCJuZXdzUGFnZS5nb1RvUGFnZSgxKVwiPjE8L2J1dHRvbj5gO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2UgPiA0KSB7XG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkhUTUwgKz0gYDxzcGFuIGNsYXNzPVwiTmV3c1BhZ2VfX3BhZ2luYXRpb24tZG90c1wiPi4uLjwvc3Bhbj5gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBTaG93IHBhZ2VzIGFyb3VuZCBjdXJyZW50IHBhZ2VcbiAgICAgICAgY29uc3Qgc3RhcnRQYWdlID0gTWF0aC5tYXgoMSwgdGhpcy5jdXJyZW50UGFnZSAtIDEpO1xuICAgICAgICBjb25zdCBlbmRQYWdlID0gTWF0aC5taW4odG90YWxQYWdlcywgdGhpcy5jdXJyZW50UGFnZSArIDEpO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0UGFnZTsgaSA8PSBlbmRQYWdlOyBpKyspIHtcbiAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MICs9IGBcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiTmV3c1BhZ2VfX3BhZ2luYXRpb24tYnV0dG9uICR7aSA9PT0gdGhpcy5jdXJyZW50UGFnZSA/ICdOZXdzUGFnZV9fcGFnaW5hdGlvbi1idXR0b24tLWFjdGl2ZScgOiAnJ31cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s9XCJuZXdzUGFnZS5nb1RvUGFnZSgke2l9KVwiPlxuICAgICAgICAgICAgICAgICAgICAke2l9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICBgO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBBbHdheXMgc2hvdyBsYXN0IHBhZ2VcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2UgPCB0b3RhbFBhZ2VzIC0gMikge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2UgPCB0b3RhbFBhZ2VzIC0gMykge1xuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MICs9IGA8c3BhbiBjbGFzcz1cIk5ld3NQYWdlX19wYWdpbmF0aW9uLWRvdHNcIj4uLi48L3NwYW4+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MICs9IGA8YnV0dG9uIGNsYXNzPVwiTmV3c1BhZ2VfX3BhZ2luYXRpb24tYnV0dG9uXCIgb25jbGljaz1cIm5ld3NQYWdlLmdvVG9QYWdlKCR7dG90YWxQYWdlc30pXCI+JHt0b3RhbFBhZ2VzfTwvYnV0dG9uPmA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIE5leHQgYnV0dG9uXG4gICAgICAgIHBhZ2luYXRpb25IVE1MICs9IGBcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJOZXdzUGFnZV9fcGFnaW5hdGlvbi1hcnJvdyAke3RoaXMuY3VycmVudFBhZ2UgPT09IHRvdGFsUGFnZXMgPyAnTmV3c1BhZ2VfX3BhZ2luYXRpb24tYXJyb3ctLWRpc2FibGVkJyA6ICcnfVwiIFxuICAgICAgICAgICAgICAgICAgICAke3RoaXMuY3VycmVudFBhZ2UgPT09IHRvdGFsUGFnZXMgPyAnZGlzYWJsZWQnIDogJyd9IFxuICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPVwibmV3c1BhZ2UuZ29Ub1BhZ2UoJHt0aGlzLmN1cnJlbnRQYWdlICsgMX0pXCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWcvTmV3c1BhZ2UvYXJyb3ctcmlnaHQucG5nXCIgYWx0PVwiYXJyb3ctcmlnaHRcIj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICBgO1xuICAgICAgICBcbiAgICAgICAgcGFnaW5hdGlvbi5pbm5lckhUTUwgPSBwYWdpbmF0aW9uSFRNTDtcbiAgICB9XG4gICAgXG4gICAgZ29Ub1BhZ2UocGFnZSkge1xuICAgICAgICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMuZmlsdGVyZWROZXdzSXRlbXMubGVuZ3RoIC8gdGhpcy5pdGVtc1BlclBhZ2UpO1xuICAgICAgICBpZiAocGFnZSA+PSAxICYmIHBhZ2UgPD0gdG90YWxQYWdlcykge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2U7XG4gICAgICAgICAgICB0aGlzLnNob3dDdXJyZW50UGFnZU5ld3MoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5sZXQgbmV3c1BhZ2U7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIG5ld3NQYWdlID0gbmV3IE5ld3NQYWdlKCk7XG59KTtcbiIsImNvbnN0IHBhcnRobmVyUG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFydGhuZXJQb3B1cCcpO1xuY29uc3QgcGFydGhuZXJQb3B1cENsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcnRobmVyUG9wdXBDbG9zZScpO1xuXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0LLRltC00LrRgNC40YLRgtGPINC/0L7Qv9Cw0L/Rg1xuY29uc3Qgb3BlblBhcnRobmVyUG9wdXAgPSAoKSA9PiB7XG4gIGlmIChwYXJ0aG5lclBvcHVwKSB7XG4gICAgcGFydGhuZXJQb3B1cC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gIH1cbn07XG5cbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQt9Cw0LrRgNC40YLRgtGPINC/0L7Qv9Cw0L/Rg1xuY29uc3QgY2xvc2VQYXJ0aG5lclBvcHVwID0gKCkgPT4ge1xuICBpZiAocGFydGhuZXJQb3B1cCkge1xuICAgIHBhcnRobmVyUG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICB9XG59O1xuXG4vLyDQl9Cw0LrRgNC40YLRgtGPINC/0L4g0LrQu9GW0LrRgyDQvdCwINGF0YDQtdGB0YLQuNC6XG5pZiAocGFydGhuZXJQb3B1cENsb3NlKSB7XG4gIHBhcnRobmVyUG9wdXBDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUGFydGhuZXJQb3B1cCk7XG59XG5cbi8vINCX0LDQutGA0LjRgtGC0Y8g0L/QviDQutC70ZbQutGDINC90LAgb3ZlcmxheVxuaWYgKHBhcnRobmVyUG9wdXApIHtcbiAgY29uc3Qgb3ZlcmxheSA9IHBhcnRobmVyUG9wdXAucXVlcnlTZWxlY3RvcignLnBhcnRobmVyUG9wdXBfX292ZXJsYXknKTtcbiAgaWYgKG92ZXJsYXkpIHtcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQYXJ0aG5lclBvcHVwKTtcbiAgfVxufVxuXG4vLyDQl9Cw0LrRgNC40YLRgtGPINC/0L4g0LrQu9Cw0LLRltGI0ZYgRXNjYXBlXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgaWYgKGUua2V5ID09PSAnRXNjYXBlJyAmJiBwYXJ0aG5lclBvcHVwICYmIHBhcnRobmVyUG9wdXAuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgIGNsb3NlUGFydGhuZXJQb3B1cCgpO1xuICB9XG59KTtcblxuLy8g0JXQutGB0L/QvtGA0YLRg9GU0LzQviDRhNGD0L3QutGG0ZbRjiDQstGW0LTQutGA0LjRgtGC0Y8g0LTQu9GPINCy0LjQutC+0YDQuNGB0YLQsNC90L3RjyDQsiDRltC90YjQuNGFINGE0LDQudC70LDRhVxud2luZG93Lm9wZW5QYXJ0aG5lclBvcHVwID0gb3BlblBhcnRobmVyUG9wdXA7XG5cbi8vINCf0ZbQtNC60LvRjtGH0LXQvdC90Y8g0LrQu9GW0LrRltCyINC90LAg0L/QsNGA0YLQvdC10YDRltCyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zdCBwYXJ0aG5lckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLkhvbWVQYWdlX19wYXJ0aG5lcnMtaXRlbScpO1xuICBcbiAgcGFydGhuZXJJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaXRlbS5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5QYXJ0aG5lclBvcHVwKTtcbiAgfSk7XG59KTtcbiIsImNvbnN0IHN1YnNjcmliZVBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YnNjcmliZVBvcHVwJyk7XG5jb25zdCBzdWJzY3JpYmVQb3B1cENsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YnNjcmliZVBvcHVwQ2xvc2UnKTtcbmNvbnN0IHN1YnNjcmliZUZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3Vic2NyaWJlRm9ybScpO1xuXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0LLRltC00LrRgNC40YLRgtGPINC/0L7Qv9Cw0L/Rg1xuY29uc3Qgb3BlblN1YnNjcmliZVBvcHVwID0gKCkgPT4ge1xuICBpZiAoc3Vic2NyaWJlUG9wdXApIHtcbiAgICBzdWJzY3JpYmVQb3B1cC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gIH1cbn07XG5cbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQt9Cw0LrRgNC40YLRgtGPINC/0L7Qv9Cw0L/Rg1xuY29uc3QgY2xvc2VTdWJzY3JpYmVQb3B1cCA9ICgpID0+IHtcbiAgaWYgKHN1YnNjcmliZVBvcHVwKSB7XG4gICAgc3Vic2NyaWJlUG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICB9XG59O1xuXG4vLyDQl9Cw0LrRgNC40YLRgtGPINC/0L4g0LrQu9GW0LrRgyDQvdCwINGF0YDQtdGB0YLQuNC6XG5pZiAoc3Vic2NyaWJlUG9wdXBDbG9zZSkge1xuICBzdWJzY3JpYmVQb3B1cENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VTdWJzY3JpYmVQb3B1cCk7XG59XG5cbi8vINCX0LDQutGA0LjRgtGC0Y8g0L/QviDQutC70ZbQutGDINC90LAgb3ZlcmxheVxuaWYgKHN1YnNjcmliZVBvcHVwKSB7XG4gIGNvbnN0IG92ZXJsYXkgPSBzdWJzY3JpYmVQb3B1cC5xdWVyeVNlbGVjdG9yKCcuc3Vic2NyaWJlUG9wdXBfX292ZXJsYXknKTtcbiAgaWYgKG92ZXJsYXkpIHtcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VTdWJzY3JpYmVQb3B1cCk7XG4gIH1cbn1cblxuLy8g0JfQsNC60YDQuNGC0YLRjyDQv9C+INC60LvQsNCy0ZbRiNGWIEVzY2FwZVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgc3Vic2NyaWJlUG9wdXAgJiYgc3Vic2NyaWJlUG9wdXAuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgIGNsb3NlU3Vic2NyaWJlUG9wdXAoKTtcbiAgfVxufSk7XG5cbi8vINCe0LHRgNC+0LHQutCwINC90LDQtNGB0LjQu9Cw0L3QvdGPINGE0L7RgNC80LhcbmlmIChzdWJzY3JpYmVGb3JtKSB7XG4gIHN1YnNjcmliZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJzY3JpYmVFbWFpbCcpLnZhbHVlO1xuXG4gICAgLy8g0JHQsNC30L7QstCwINCy0LDQu9GW0LTQsNGG0ZbRjyBlbWFpbFxuICAgIGlmICghZW1haWwgfHwgIS9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvLnRlc3QoZW1haWwpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdJbnZhbGlkIGVtYWlsJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vINCS0ZbQtNC/0YDQsNCy0LjRgtC4INC00LDQvdGWINC90LAg0YHQtdGA0LLQtdGAICjRj9C60YnQviDRlCBiYWNrZW5kKVxuICAgICAgLy8gY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9zdWJzY3JpYmUnLCB7XG4gICAgICAvLyAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgLy8gICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIC8vICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBlbWFpbCB9KVxuICAgICAgLy8gfSk7XG5cbiAgICAgIC8vINCv0LrRidC+IGJhY2tlbmQg0L3QtSDRlCwg0L/RgNC+0YHRgtC+INC/0L7QutCw0LfRg9GU0LzQviDQv9C+0L/QsNC/XG4gICAgICBvcGVuU3Vic2NyaWJlUG9wdXAoKTtcblxuICAgICAgLy8g0J7Rh9C40YHRgtC40YLQuCDRhNC+0YDQvNGDXG4gICAgICBzdWJzY3JpYmVGb3JtLnJlc2V0KCk7XG5cbiAgICAgIC8vINCQ0LLRgtC+0LzQsNGC0LjRh9C90L4g0LfQsNC60YDQuNGC0Lgg0L/QvtC/0LDQvyDRh9C10YDQtdC3IDQg0YHQtdC60YPQvdC00LhcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjbG9zZVN1YnNjcmliZVBvcHVwKCk7XG4gICAgICB9LCA0MDAwKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc3Vic2NyaWJpbmc6JywgZXJyb3IpO1xuICAgIH1cbiAgfSk7XG59XG4iLCIvLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0L/QvtC60LDQt9GDINGD0YHQv9GW0YjQvdC+0LPQviDQtdC60YDQsNC90YfQuNC60LBcbmNvbnN0IHNob3dTdWNjZXNzU2NyZWVuID0gKCkgPT4ge1xuICBjb25zdCBoZWxwUG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVscFBvcHVwJyk7XG4gIGNvbnN0IGhlbHBGb3JtU3RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVscFBvcHVwX19mb3JtU3RhdGUnKTtcbiAgY29uc3QgaGVscFN1Y2Nlc3NTdGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWxwUG9wdXBfX3N1Y2Nlc3MnKTtcbiAgY29uc3QgaGVscFBvcHVwQ29udGFpbmVyID0gaGVscFBvcHVwID8gaGVscFBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5oZWxwUG9wdXBfX2NvbnRhaW5lcicpIDogbnVsbDtcblxuICBpZiAoaGVscFBvcHVwKSB7XG4gICAgLy8g0J/RgNC40YXQvtCy0LDRgtC4INGE0L7RgNC80YNcbiAgICBpZiAoaGVscEZvcm1TdGF0ZSkge1xuICAgICAgaGVscEZvcm1TdGF0ZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICAvLyDQn9C+0LrQsNC30LDRgtC4INGD0YHQv9GW0YjQvdC40Lkg0LXQutGA0LDQvdGH0LjQulxuICAgIGlmIChoZWxwU3VjY2Vzc1N0YXRlKSB7XG4gICAgICBoZWxwU3VjY2Vzc1N0YXRlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cblxuICAgIC8vINCU0L7QtNCw0YLQuCDQutC70LDRgSDQtNC70Y8g0LrQvtC90YLQtdC50L3QtdGA0LBcbiAgICBpZiAoaGVscFBvcHVwQ29udGFpbmVyKSB7XG4gICAgICBoZWxwUG9wdXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGVscFBvcHVwX19jb250YWluZXItLXN1Y2Nlc3MnKTtcbiAgICB9XG5cbiAgICAvLyDQktGW0LTQutGA0LjRgtC4INC/0L7Qv9Cw0L9cbiAgICBoZWxwUG9wdXAuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICB9XG59O1xuXG4vLyDQhtC90ZbRhtGW0LDQu9GW0LfQsNGG0ZbRjyDQutC90L7Qv9C60LhcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IHN1Y2Nlc3NCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VjY2Vzc0J1dHRvbicpO1xuXG4gIGlmIChzdWNjZXNzQnV0dG9uKSB7XG4gICAgc3VjY2Vzc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dTdWNjZXNzU2NyZWVuKTtcbiAgfVxufSk7XG4iXX0=
