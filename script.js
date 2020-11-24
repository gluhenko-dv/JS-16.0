'use strict';

let money = 76500,
    income = 'Фриланс',
    addExpenses = 'Бенизин, Интернет, Коммуналка',
    deposit = true,
    mission = 1000000,
    period = 5;

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Бенизин, Интернет, Коммуналка');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите еще одну обязательную статью расходов'),
    amount2 = +prompt('Во сколько это обойдется?');

const showTypeOf = function(data) {
    console.log(typeof(data));
};

const getExpensesMonth = function(amount1, amount2) {
    return amount1 + amount2;
};

const getAccumulatedMonth = function(money, callback) {
    return money - callback;
};

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

const getTargetMonth = function(mission, accumulatedMonth) {
    return mission / accumulatedMonth;
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


console.log('Расходы за месяц: ' + getExpensesMonth(amount1, amount2));

console.log('Возможные расходы: ', addExpenses.toLowerCase().split(", "));

console.log('Цель будет достигнута за: ' + Math.ceil(mission / accumulatedMonth) + ' месяцев');

console.log('Бюджет на день: ', Math.floor(budgetDay));

console.log(getStatusIncome(budgetDay));