'use strict';
//Задание 1
let lang = confirm('Если ваш язык Русский нажмите "ОК", If you languge  English press "cancel"'),
    weekdays = [];
weekdays.ru = ['Понедельник', ' Вторник', ' Среда', ' Четверг', ' Пятница', ' Суббота', ' Воскресенье'];
weekdays.en = ['Monday', ' Tuesday', ' Wednesday', ' Thursday', ' Friday', ' Saturday', ' Sunday'];

if (lang) {
    lang = 'ru';
} else {
    lang = 'en';
}

if (lang === 'ru') {
    console.log('Отработал if');
    console.log(String(weekdays.ru));
} else {
    console.log('Отработал if');
    console.log(String(weekdays.en));
}

switch (lang) {
    case 'ru':
        console.log('Отработал switch');
        console.log(String(weekdays.ru));
        break;
    case 'en':
        console.log('Отработал switch');
        console.log(String(weekdays.en));
        break;
}


console.log('Массив: ' + weekdays[lang]);


//Задание 2

let namePerson = prompt('Введите имя');

let whoIs = (namePerson === 'Артем') ? 'Директор' :
    (namePerson === 'Максим') ? 'Преподаватель' :
    'Cтудент';
console.log('Это ', whoIs);