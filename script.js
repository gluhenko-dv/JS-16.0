"use strict";

//let num = 266219;
//nu += ' ';
//
let num = 266219,
    prod = 1,
    prod2 = num + '';


prod2.split('').reduce(((acc, I) => acc * Number.parseInt(I, 10)), 1);

console.log(prod2);

while (num > 0) {
    prod *= num % 10;
    num = Math.floor(num / 10);
}
console.log(prod);