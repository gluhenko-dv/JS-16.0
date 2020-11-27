'use strict';

const gameStart = function () {
  let gameNumber = Math.floor((Math.random() * 100) + 1),
    userNumber,
    count = 10,
    restart;

  const gameRestart = function () {
    if (restart) {
      return gameStart();
    } else {
      return alert('C тобой было круто! Пока-пока!');
    }
  };

  const gameCheckNumber = function () {
    userNumber = prompt('Угадай число от 1 до 100');
    if (count <= 10 && count > 1) {
      switch (true) {
        case (userNumber === null):
          restart = confirm('Сыграем еще разок? :)');
          gameRestart();
          break;
        case (isNaN(Number(userNumber)) || !userNumber):
          alert('Введи число! А не кракозябру!!!');
          gameCheckNumber();/* falls through */
        case (Number(userNumber) > 100):
          alert('Ты не борщи! Твоё число больше 100! Давай по новой!');
          gameCheckNumber();/* falls through */
        case (Number(userNumber) < 1):
          alert('Ну ты чего? Твоё число меньше 1! Я так не играю! Давай по новой!');
          gameCheckNumber();/* falls through */
        case (Number(userNumber) > gameNumber):
          count--;
          alert('Многовато предлагаешь! Число меньше! Кол-во попыток: ' + count);
          gameCheckNumber();/* falls through */
        case (Number(userNumber) < gameNumber):
          count--;
          alert('Маловато! Я загадал число больше! Кол-во попыток: ' + count);
          gameCheckNumber();/* falls through */
        case (Number(userNumber) === gameNumber):
          restart = confirm('ОПА! А ты угадал!!! Моё почтение :) Еще разок?');
          gameRestart();
          break;
      }
    } else {
      restart = confirm('Попытки кончились! Сыграем еще разок?');
      gameRestart();
    }
  };

  gameCheckNumber();

};

gameStart();