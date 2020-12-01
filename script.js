'use strict';



const requestDay = function (data) {
  switch (data) {
    case 1:
      return 'Понедельник';
    case 2:
      return 'Вторник';
    case 3:
      return 'Среда';
    case 4:
      return 'Четверг';
    case 5:
      return 'Пятница';
    case 6:
      return 'Суббота';
    case 0:
      return 'Воскресенье';
  }
};
const requestMonth = function (data) {
  switch (data) {
    case 0:
      return 'Января';
    case 1:
      return 'Февраля';
    case 2:
      return 'Марта';
    case 3:
      return 'Апреля';
    case 4:
      return 'Мая';
    case 5:
      return 'Июня';
    case 6:
      return 'Июля';
    case 7:
      return 'Августа';
    case 8:
      return 'Сентября';
    case 9:
      return 'Октября';
    case 10:
      return 'Ноября';
    case 11:
      return 'Декабря';
  }
};
const requestHour = function (data) {
  if (data === 1 || data === 21) {
    return data + ' час ';
  } else if ((2 <= data >= 4) || (21 <= data >= 24)) {
    return data + ' часа ';
  }
  return data + ' часов ';

};
const requestNumber = function (data) {
  if (data < 10) {
    return '0' + data;
  }
  return data;
};

const app = function () {
  let date = new Date(),
    myDate = {
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      day: date.getDay(),
      hour: date.getHours().toString(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };



  let longDate = 'Сегодня ' + requestDay(myDate.day) + ', ' + myDate.date + ' ' + requestMonth(myDate.month) + ' ' + myDate.year + ' года, ' + requestHour(myDate.hour) + myDate.minute + ' минут ' + myDate.second + ' секунд';

  let shortDate = requestNumber(myDate.date) + '.' + requestNumber(myDate.month) + '.' + myDate.year + ' - ' + requestNumber(myDate.hour) + ':' + requestNumber(myDate.minute) + ':' + requestNumber(myDate.second);
  document.body.innerHTML += `</br>` + longDate;
  document.body.innerHTML += `</br>` + shortDate;

};
app();
setInterval(app, 1000);