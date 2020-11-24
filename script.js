'use strict';

const strTransform = function(data) {
    if (typeof data === 'string') {
        data = data.trim();
        if (data.length > 30) {
            return data.substr(0, 30) + '...';
        } else {
            return data;
        }
    } else {
        alert("Ты передал не строку!!!");
    }
};
let str = prompt('Введите строку');
console.log(strTransform(str));