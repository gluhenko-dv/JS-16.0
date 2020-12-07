'use strict';

const body = document.querySelector('body'),
  title = document.querySelector('.title'),
  startBtn = document.querySelector('.start');

const randColor = function () {
  let hex = '#';
  let range = 'ABCDEF0123456789';

  for (let i = 0; i < 6; i++) {
    hex += range.charAt(Math.floor(Math.random() * range.length));
  }
  title.textContent = hex;
  body.style.background = hex;
  startBtn.style.color = hex;
};

startBtn.addEventListener('click', randColor);

randColor();