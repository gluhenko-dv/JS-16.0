'use strict';
//Задание 1
let lang = confirm('Если ваш язык Русский нажмите "ОК", If you languge  English press "cancel"');

if (lang) {
    lang = 'ru';
} else {
    lang = 'en';
}

if (lang === 'ru') {
    console.log('Отработал if');
    console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
} else {
    console.log('Отработал if');
    console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
}

switch (lang) {
    case 'ru':
        console.log('Отработал switch');
        console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
        break;
    case 'en':
        console.log('Отработал switch');
        console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
        break;
}

let weekdays = [];
weekdays.ru = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
weekdays.en = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

console.log('Массив: ' + weekdays[lang]);


//Задание 2

let namePerson = prompt('Введите имя');

let result = (namePerson === 'Артем') ? 'Директор' :
    (namePerson === 'Максим') ? 'Преподаватель' :
    'Cтудент';
console.log('res ', result);