"use strict";

let num = 266219,
  prod = 1;

console.log(num.toString().split('').reduce(((acc, i) => acc * Number.parseInt(i, 10)), 1));

while (num > 0) {
  prod *= num % 10;
  num = Math.floor(num / 10);
}
console.log(prod);