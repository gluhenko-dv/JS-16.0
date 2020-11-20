"use strict";

let num = 2,
  prod = 1;

console.log(num.toString().split('').reduce((acc, i) => acc * i));

while (num > 0) {
  prod *= num % 10;
  num = Math.floor(num / 10);
}

console.log(prod);