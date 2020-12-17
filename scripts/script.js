/* eslint-disable arrow-parens */
"use sctrict";
window.addEventListener("DOMContentLoaded", () => {
  //hero timer
  const countTimer = (deadline) => {
    const timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");
    //расчеты таймера
    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60) % 24;
      return { timeRemaining, hours, minutes, seconds };
    };
    //возвращение час/мин/сек с 0
    const returnWithZero = (num) => {
      if (num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    };
    //обновление таймера на странице
    const updateClock = () => {
      const timer = getTimeRemaining();
      if (timer.timeRemaining > 0) {
        timerHours.innerHTML = returnWithZero(timer.hours);
        timerMinutes.innerHTML = returnWithZero(timer.minutes);
        timerSeconds.innerHTML = returnWithZero(timer.seconds);
      } else {
        timerHours.innerHTML = `00`;
        timerMinutes.innerHTML = `00`;
        timerSeconds.innerHTML = `00`;
        clearInterval(1);
      }
    };
    updateClock();
    setInterval(() => updateClock(), 1000);
  };
  //конец hero timer
  countTimer("16 dec 2020");

  //главное меню
  const toggleMenu = () => {
    const menu = document.querySelector("menu"),
      body = document.querySelector("body");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };

    //menu scrollIntoView
    const smoothScroll = (target) => {
      console.log("target: ", target);

      const blockId = target.getAttribute("href");
      console.log("blockId: ", blockId);

      document.querySelector("" + blockId).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    body.addEventListener("click", (event) => {
      let target = event.target;

      if (target.closest(".menu")) {
        handlerMenu();
      } else if (target.closest(".close-btn")) {
        handlerMenu();
      } else if (target.closest("menu>ul>li")) {
        handlerMenu();
        event.preventDefault();
        smoothScroll(target);
      } else if (target.closest("main>a")) {
        target = target.closest("main>a");
        event.preventDefault();
        smoothScroll(target);
      } else if (
        !target.closest(".active-menu") &&
        menu.classList.contains("active-menu")
      ) {
        handlerMenu();
      }
    });
  };
  toggleMenu();

  //popup

  const togglePopup = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn");
    //popup animate

    let animate,
      opacity = 0.01;
    const popupAnimate = () => {
      animate = requestAnimationFrame(popupAnimate);
      if (opacity < 1) {
        popup.style.opacity = opacity;
        opacity += 0.05;
      } else {
        cancelAnimationFrame(animate);
      }
    };

    popupBtn.forEach((element) => {
      element.addEventListener("click", () => {
        popup.style.display = "block";
        if (screen.width > 768) {
          animate = requestAnimationFrame(popupAnimate);
        }
      });
    });
    popup.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".popup-content");
      if (!target || event.target.matches(".popup-close")) {
        popup.style.display = "none";
        opacity = 0;
      }
    });
  };

  togglePopup();

  //табы
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");
    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tabContent[i].classList.add("d-none");
          tab[i].classList.remove("active");
        }
      }
    };
    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab");
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  //слайдер
  const slider = () => {
    const slide = document.querySelectorAll(".portfolio-item"),
      slider = document.querySelector(".portfolio-content"),
      portfolioDots = document.querySelector(".portfolio-dots");
    let currentSlide = 0,
      interval = null,
      dot = null;

    const addSlideDots = () => {
      slide.forEach(() => {
        portfolioDots.innerHTML += `<li class='dot'></li>`;
      });
      dot = document.querySelectorAll(".dot");
      dot[0].classList.add("dot-active");
    };

    addSlideDots();
    //слайд вперед
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    //слайд назад
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };
    //автопереключение слайда
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };
    //старт слайдера
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    //стоп слайдера
    const stopSlide = () => {
      clearInterval(interval);
    };
    //обработчик событи для переключеня слайдов на кнопки
    slider.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.target;
      if (!target.matches(".portfolio-btn, .dot")) return;

      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });
    startSlide(1500);
    slider.addEventListener("mouseover", (event) => {
      if (event.target.matches(".portfolio-btn, .dot")) {
        stopSlide();
      }
    });
    slider.addEventListener("mouseout", (event) => {
      if (event.target.matches(".portfolio-btn, .dot")) {
        startSlide(1500);
      }
    });
  };
  slider();
});
