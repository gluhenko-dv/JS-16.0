'use strict';

const books = document.querySelector('.books'),
body = document.querySelector('body'),
  book = document.querySelectorAll('.book'),
  add = document.querySelector('.adv'),
  linkBook4 = book[4].querySelector('a'),
  ulBook2 = book[0].querySelector('ul'),
  liBook2 = book[0].querySelectorAll('li'),
  ulBook5 = book[5].querySelector('ul'),
  liBook5 = book[5].querySelectorAll('li'),
  ulBook6 = book[2].querySelector('ul'),
  liBook6 = book[2].querySelectorAll('li');

books.append(book[1], book[0], book[4], book[3], book[5], book[2]);
body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
linkBook4.textContent = 'Книга 3. this и Прототипы Объектов';
add.remove();
ulBook2.append(liBook2[0], liBook2[1], liBook2[3], liBook2[6], liBook2[8], liBook2[4], liBook2[5], liBook2[7], liBook2[9], liBook2[2], liBook2[10]);

ulBook5.append(liBook5[0], liBook5[1], liBook5[9], liBook5[3], liBook5[4], liBook5[2], liBook5[6], liBook5[7], liBook5[8], liBook5[5], liBook5[8], liBook5[10]);

const newChapter = document.createElement('li');
newChapter.textContent = 'Глава 8: За пределами ES6';

liBook6[8].append(newChapter);