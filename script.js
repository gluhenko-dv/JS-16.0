'use strict';

let money = 76500,
    income = 'Фриланс',
    addExpenses = 'Бенизин, Интернет, Коммуналка',
    deposit = true,
    mission = 1000000,
    period = 5;

console.log(typeof money, typeof income, typeof deposit);

console.log('addExpenses.length: ', addExpenses.length);

console.log('Период равен ' + period + ' месяцев' + ' Цель заработать ' + mission + ' рублей/долларов/гривен/юани');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);


money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите еще одну обязательную статью расходов'),
    amount2 = +prompt('Во сколько это обойдется?'),
    budgetMonth = amount1 + amount2;
console.log('Бюджет на месяц: ', budgetMonth);

console.log('Цель будет достигнута за: ' + Math.ceil(mission / (money - budgetMonth)) + 'месяцев');

budgetDay = ((money - budgetMonth) / 30);
console.log('Бюджет на день: ', Math.floor(budgetDay));

if (budgetMonth >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetMonth >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetMonth < 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}