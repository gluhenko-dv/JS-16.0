"use sctrict";
window.addEventListener("DOMContentLoaded", () => {
  const countTimer = (deadline) => {
    const timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60) % 24;
      return { timeRemaining, hours, minutes, seconds };
    };

    const returnWithZero = (num) => {
      if (num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    };

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
    setInterval(() => updateClock(), 1000);
  };
  countTimer("15 dec 2020");
});
