"use strict";

let num = 266219,
  prod = 1;
//1 способ
console.log(num.toString().split('').reduce((acc, i) => acc * i));

//2 способ
while (num > 0) {
  prod *= num % 10;
  num = Math.floor(num / 10);
}
console.log(prod);

// Возведение в степень
prod **= 3;
console.log('prod: ', prod);

//Вывод первых 2-ух цифр числа
console.log(prod.toString().slice(0, 2));