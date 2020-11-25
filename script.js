'use strict';

let arr = [];
//Задание 1
for (let i = 0; i < 7; i++) {
    arr[i] = prompt('Введите любое многозначное число');
    if (arr[i][0] === '2' || arr[i][0] === '4') {
        console.log(arr[i]);
    }
}

//Задание 2
param:
    for (let i = 2; i <= 100; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                continue param;
            }
        }
        console.log(i + ' - просто число, делится только на 1 и на ' + i);

    }