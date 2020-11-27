'use strict';
let money = 76500;
const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  start = function () {
    do {
      money = prompt('Ваш месячный доход');
    }
    while (!isNumber(money));
  };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  accumulatedMonth: 0,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Бенизин, Интернет, Коммуналка');
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let expensesName, expensesAmount;
    for (let i = 0; i < 2; i++) {
      expensesName = prompt('Введите статью расходов');
      expensesAmount = +prompt('Во сколько это обойдется?');
      while (!isNumber(expensesAmount)) {
        expensesAmount = +prompt('Во сколько это обойдется?');
      }
      appData.expenses[expensesName] = expensesAmount;
    }

  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
    return appData.budgetDay;
  },
  getTargetMonth: function () {
    appData.getBudget();
    if (appData.mission / appData.budgetDay <= 0) {
      return ('Цель не будет достигнута');
    }
    return ('Цель будет достигнута за: ' + Math.ceil(appData.mission / appData.budgetDay) + ' месяцев');
  },
  getStatusIncome: function (data) {
    if (data >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (data >= 600 && data < 1200) {
      return ('У вас средний уровень дохода');
    } else if (data < 600 && data > 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  }
};

appData.asking();

console.log('Расходы за месяц: ' + appData.getExpensesMonth());

console.log(appData.getTargetMonth());

console.log(appData.getStatusIncome(appData.budgetDay));


for (let key in appData){
  console.log('Ключ ' + key + ' значение ' + appData[key]);
}