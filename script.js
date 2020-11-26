'use strict';

let gameStart = function () {
  let gameNumber = Math.floor((Math.random() * 100) + 1),
    userNumber,
    attNumber = 10,
    restart;

  let gameRestart = function () {
    if (restart) {
      return gameStart();
    } else {
      return alert('C тобой было круто! Пока-пока!');
    }
  };

  let gameCheckNumber = function () {
    userNumber = prompt('Угадай число от 1 до 100');
    if (attNumber <= 10 && attNumber > 1) {
      if (userNumber === null) {
        restart = confirm('Сыграем еще разок?');
        gameRestart();
      } else if (userNumber.replace(/\d/g, '') || !userNumber) {
        alert('Введи число! А не кракозябру!!!');
        gameCheckNumber();
      } else if (userNumber > 100) {
        alert('Ты не борщи! Твоё число больше 100! Давай по новой!');
        gameCheckNumber();
      } else if (userNumber < 1) {
        alert('Ну ты чего? Твоё число меньше 1! Я так не играю! Давай по новой!');
        gameCheckNumber();
      } else if (userNumber > gameNumber) {
        attNumber--;
        alert('Многовато предлагаешь! Число меньше! Кол-во попыток: ' + attNumber);
        gameCheckNumber();
      } else if (userNumber < gameNumber) {
        attNumber--;
        alert('Маловато! Я загадал число больше! Кол-во попыток: ' + attNumber);
        gameCheckNumber();
      } else {
        alert('ОПА! А ты угадал!!! Моё почтение :) Еще разок?');
        gameStart();
      }
    } else {
      restart = confirm('Попытки кончились! Сыграем еще разок?');
      gameRestart();
    }
  };
  console.dir(gameCheckNumber);
  gameCheckNumber();

};

gameStart();