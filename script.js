document.addEventListener('DOMContentLoaded', function () {
  // Set current year
  var yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Hero carousel logic with auto-rotate
  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.hero-carousel-dot'));
  var prev = document.querySelector('.hero-carousel-prev');
  var next = document.querySelector('.hero-carousel-next');
  var carousel = document.querySelector('.hero-carousel');

  if (slides.length && dots.length && prev && next && carousel) {
    var current = 0;
    var intervalTime = 6000; // 6 seconds
    var autoRotate;

    function showSlide(index) {
      current = (index + slides.length) % slides.length;

      slides.forEach(function (slide, i) {
        slide.classList.toggle('is-active', i === current);
      });

      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
      });
    }

    function nextSlide() {
      showSlide(current + 1);
    }

    function startAutoRotate() {
      stopAutoRotate();
      autoRotate = setInterval(nextSlide, intervalTime);
    }

    function stopAutoRotate() {
      if (autoRotate) {
        clearInterval(autoRotate);
        autoRotate = null;
      }
    }

    prev.addEventListener('click', function () {
      showSlide(current - 1);
      startAutoRotate();
    });

    next.addEventListener('click', function () {
      showSlide(current + 1);
      startAutoRotate();
    });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        showSlide(i);
        startAutoRotate();
      });
    });

    carousel.addEventListener('mouseenter', stopAutoRotate);
    carousel.addEventListener('mouseleave', startAutoRotate);

    // Start rotation on load
    startAutoRotate();
  }

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('header nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a nav link is clicked (useful on mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          navToggle.classList.remove('is-active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // BACK TO TOP BUTTON
  var backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
