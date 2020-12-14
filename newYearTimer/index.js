"use sctrict";
window.addEventListener("DOMContentLoaded", () => {
  const timer = (deadline) => {
    const body = document.querySelector("body");
    const date = new Date();

    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        days = Math.floor(timeRemaining / 60 / 60 / 24);
      console.log("days: ", days);

      return days;
    };

    const switchTimeOfDay = (time) => {
      switch (true) {
        case time > 0 && time < 6:
          return "Доброй ночи!";
        case time > 6 && time < 12:
          return "Доброе утро!";
        case time > 12 && time < 18:
          return "Добрый день!";
        case time > 18 && time < 24:
          return "Добрвый вечер!";
      }
    };
    const switchDay = (day) => {
      switch (true) {
        case day === 0:
          return "Воскресенье";
        case day === 1:
          return "Понедельник";
        case day === 2:
          return "Вторник";
        case day === 3:
          return "Среда";
        case day === 4:
          return "Четверг";
        case day === 5:
          return "Пятница";
        case day === 6:
          return "Суббота";
      }
    };
    const render = () => {
      body.innerHTML = `
      <div class="timer">
      ${switchTimeOfDay(date.getHours())} <br>
      Сегодня: ${switchDay(date.getDay())} <br>
      Текущее время: ${date.toLocaleTimeString("en")}<br>
      До нового года осталось ${getTimeRemaining()} дней <br>
      </div>
      `;
    };
    render();
  };
  timer("1 jan 2021");
});
