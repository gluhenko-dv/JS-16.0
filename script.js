'use strict';



const strTransform = function(data) {
    if (data.replace(/\d/g, '')) { // заменяю все цифры на пустоту
        data = data.trim();
        if (data.length > 30) {
            return data.substr(0, 30) + '...';
        } else {
            return data;
        }
    } else {
        return ('Ты передал не строку!!!');
    }
};

let str = prompt('Введите строку');
console.log(strTransform(str));