'use strict';



const strTransform = function(data) {
    if (data.replace(/\d*/, '')) { // убираю все цифры, вставляю пустоту (если пусто значит не строка)
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