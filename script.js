'use strict';
let money = 76500;
const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  isStr = function (data) {
    return data.replace(/\d/g, '');
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
  depositPercent: 0,
  depositMoney: 0,
  mission: 500000,
  period: 3,
  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  accumulatedMonth: 0,
  asking: function () {

    if (confirm('У вас есть доп. доход?')) {
      let itemIncome = prompt('Какой у вас доп.доход?');
      while (isStr(itemIncome) === '') {
        itemIncome = prompt('Какой у вас доп.доход?');
      }
      let cashIncome = prompt('Сколько в месяц доп. заработок?');
      while (!isNumber(cashIncome)) {
        cashIncome = prompt('Сколько в месяц доп. заработок?');
      }
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Бенизин, Интернет, Коммуналка');
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let expensesName, expensesAmount;
    for (let i = 0; i < 2; i++) {
      expensesName = prompt('Введите статью расходов');
      while (isStr(expensesName) === '') {
        expensesName = prompt('Введите статью расходов');
      }
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
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      appData.depositPercent = +prompt('Какой у вас годовой процент?');
      while (!isNumber(appData.depositPercent)) {
        appData.depositPercent = +prompt('Сколько в месяц доп. заработок?');
      }
      appData.depositMoney = +prompt('Какая сумма заложена?');
      while (!isNumber(appData.depositMoney)) {
        appData.depositMoney = +prompt('Сколько в месяц доп. заработок?');
      }
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();

console.log('Расходы за месяц: ' + appData.getExpensesMonth());

console.log(appData.getTargetMonth());

console.log(appData.getStatusIncome(appData.budgetDay));


for (let key in appData) {
  console.log('Ключ ' + key + ' значение ' + appData[key]);
}

appData.getInfoDeposit();

console.log(appData.depositPercent, appData.depositMoney, appData.calcSavedMoney());

let addExpensesStr = '';
for (let i = 0; i < appData.addExpenses.length; i++) {
  addExpensesStr += appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1) + ', ';
}
addExpensesStr = addExpensesStr.slice(0, addExpensesStr.length - 2);
console.log(addExpensesStr);