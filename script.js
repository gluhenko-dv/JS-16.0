'use strict';
let money = 76500;
const isNumber = function (data) {
    let question = prompt(data),
      result = (question !== null && !isNaN(parseFloat(question)) && isFinite(question)) ? +question.trim() : isNumber(data);
    return +result;
  },
  isStr = function (data) {
    let question = prompt(data),
      result = !(question === null || question === '' || question.replace(/\d/g, '') === '') ? question.trim() : isStr(data);
    return +result;
  },
  start = function () {
    money = isNumber('Ваш месячный доход');
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
      let itemIncome = isStr('Какой у вас доп.доход?');
      let cashIncome = isNumber('Сколько в месяц доп. заработок?');
      appData.income[itemIncome] = cashIncome;
    }
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Бенизин, Интернет, Коммуналка');
    appData.addExpenses = addExpenses.toLowerCase().replace(/\s/g, '').split(",");
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let expensesName, expensesAmount;
    for (let i = 0; i < 2; i++) {
      expensesName = isStr('Введите статью расходов');
      expensesAmount = isNumber('Во сколько это обойдется?');
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
      appData.depositPercent = isNumber('Какой у вас годовой процент?');
      appData.depositMoney = isNumber('Какая сумма заложена?');
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