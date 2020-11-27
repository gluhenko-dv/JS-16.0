'use strict';

let week = ['Понедельник', ' Вторник', ' Среда', ' Четверг', ' Пятница', ' Суббота', ' Воскресенье'];

let date = new Date();

document.body.innerHTML += week + `</br>`;

for (let i = 0; i < week.length; i++){
  if(i + 1 === date.getDay()){
    document.body.innerHTML += `</br> <strong>` + week[i];
  } else if (i === 5 || i === 6) {
  document.body.innerHTML += `</br><i>` + week[i];
  }else{
  document.body.innerHTML += `</br>` + week[i];
  }
}