'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money = 76500,
    income = 'Фриланс',
    addExpenses = 'Бенизин, Интернет, Коммуналка',
    deposit = true,
    mission = 1000000,
    period = 5,
    expenses = [];

let start = function() {
    do {
        money = prompt('Ваш месячный доход');
    }
    while (!isNumber(money));
};

start();

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Бенизин, Интернет, Коммуналка');
deposit = confirm('Есть ли у вас депозит в банке?');

let getExpensesMonth = function() {
    let sum = 0;
    let amount;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите статью расходов');
        amount = prompt('Во сколько это обойдется?');
        while (!isNumber(amount)) {
            amount = prompt('Во сколько это обойдется?');
        }
        sum += +amount;
    }
    return sum;
};

let expensesAmount = getExpensesMonth();

const showTypeOf = function(data) {
    console.log(typeof(data));
};

const getAccumulatedMonth = function() {
    return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
    if (mission / accumulatedMonth <= 0) {
        return ('Цель не будет достигнута');
    }
    return ('Цель будет достигнута за: ' + Math.ceil(mission / accumulatedMonth) + ' месяцев')
};

let budgetDay = accumulatedMonth / 30;

const getStatusIncome = function(budgetDay) {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay > 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что то пошло не так');
    }
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Расходы за месяц: ' + expensesAmount);

console.log('Возможные расходы: ', addExpenses.toLowerCase().split(", "));

console.log(getTargetMonth());

console.log('Бюджет на день: ', Math.floor(budgetDay));

console.log(getStatusIncome(budgetDay));