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
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu"),
      btnCloseMenu = document.querySelector(".close-btn"),
      menuItems = menu.querySelectorAll("ul>li");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };

    btnMenu.addEventListener("click", handlerMenu);
    btnCloseMenu.addEventListener("click", handlerMenu);
    menuItems.forEach((element) =>
      element.addEventListener("click", handlerMenu)
    );
  };
  toggleMenu();
  //menu scrollIntoView
  const smoothScroll = () => {
    const anchors = document.querySelectorAll('a[href*="#"');

    anchors.forEach((element) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        const blockId = element.getAttribute("href");
        document.querySelector("" + blockId).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  };
  smoothScroll();
  //popup

  const togglePopup = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn"),
      popUpClose = document.querySelector(".popup-close");

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
    popUpClose.addEventListener("click", () => {
      popup.style.display = "none";
      opacity = 0;
      cancelAnimationFrame(animate);
    });
  };

  togglePopup();
});
