/* eslint-disable arrow-parens */
//check
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
      const blockId = target.getAttribute("href");

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
      } else if (target.closest("menu>ul>li>a")) {
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
  //изменение картинок наша команда
  const toggleCommandImg = () => {
    const command = document.querySelector("#command");
    let imgSrc = "";
    command.onmouseover = (e) => {
      target = e.target;
      const item = target.closest(".command__photo");
      if (!item) return;
      imgSrc = item.src;
      item.src = item.dataset.img;
    };
    command.onmouseout = (e) => {
      target = e.target;
      const item = target.closest(".command__photo");
      if (!item) return;
      item.src = imgSrc;
    };
  };
  toggleCommandImg();
  //возврат строки с числами
  const strWithNum = (str) => {
    return str.replace(/\D/g, "");
  };
  //калькулятор
  const calc = (price = 100) => {
    const calcSquare = document.querySelector(".calc-square"),
      calcCount = document.querySelector(".calc-count"),
      calcType = document.querySelector(".calc-type"),
      calcDay = document.querySelector(".calc-day"),
      totalValue = document.getElementById("total"),
      calcBlock = document.querySelector(".calc-block");

    calcBlock.addEventListener("input", (e) => {
      const target = e.target;
      const item = target.closest(".calc-item");
      if (!item || target.matches(".calc-type")) return;
      item.value = strWithNum(item.value);
    });

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;

      let animate,
        countAnimate = 0;

      const typeValue = calcType.options[calcType.selectedIndex].value;
      const squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = Math.floor(
          price * typeValue * squareValue * countValue * dayValue
        );
      }

      const calcAnimate = () => {
        animate = requestAnimationFrame(calcAnimate);
        if (countAnimate < total) {
          totalValue.textContent = countAnimate;
          switch (true) {
            case total < 1000:
              countAnimate += 11;
              break;
            case total < 10000:
              countAnimate += 111;
              break;
            case total < 100000:
              countAnimate += 1111;
              break;
          }
        } else {
          cancelAnimationFrame(animate);
          totalValue.textContent = total;
        }
      };
      animate = requestAnimationFrame(calcAnimate);
    };

    calcBlock.addEventListener("change", (e) => {
      const target = e.target;
      if (target.matches("select") || target.matches("input")) {
        countSum();
      }
    });
  };
  calc(100);
  //отправка ajax
  const sendForm = () => {
    const errorMessage = "Что-то пошло не так...",
      loadMessage = `<div class="spiner">
      <div class="📦"></div>
      <div class="📦"></div>
      <div class="📦"></div>
      <div class="📦"></div>
      <div class="📦"></div>
    </div>`,
      succesMessage = "Спасибо! Мы скоро свяжемся с вами!",
      validMessage = "Заполните поля корректно!";
    const statusMessage = document.createElement("div");
    statusMessage.textContent = "Тут будет сообщение";
    const forms = document.querySelectorAll("form");
    const allInputsForm = document.querySelectorAll("form input");
    allInputsForm.forEach((item) => {
      item.addEventListener("input", (e) => {
        const target = e.target;

        if (target.name === "user_name" || target.name === "user_message") {

          target.value = target.value.replace(/[^а-яёА-ЯЁ\s]/gi, "");
        }
        if (target.name === "user_phone") {
          target.maxLength = 11;
          if(target.value[0] === '+'){
            target.maxLength = 12;
          }
          target.value = target.value.replace(/[^0-9+]/gi, "");
        }
      });
    });
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        form.appendChild(statusMessage);
        statusMessage.innerHTML = loadMessage;
        const formData = new FormData(form);
        let body = {};

        formData.forEach((val, key) => {
          body[key] = val;
        });

        postData(
          body,
          () => {
            statusMessage.textContent = succesMessage;
            form.reset();
          },
          (error) => {
            statusMessage.textContent = errorMessage;
            console.log(error);
          }
        );
      });
    });

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();
      request.addEventListener("readystatechange", () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
        } else {
          errorData();
        }
      });

      request.open("POST", "./server.php");
      request.setRequestHeader("Content-Type", "application/json");

      request.send(JSON.stringify(body));
    };
  };

  sendForm();
});
