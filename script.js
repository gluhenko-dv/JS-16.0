'use strict';

let startBtn = document.getElementById('start'),
  incomeAddBtn = document.getElementsByTagName('button')[0],
  expensesAddBtn = document.getElementsByTagName('button')[1],
  depositCheckBox = document.querySelector('#deposit-check'),
  incomeItem1 = document.querySelectorAll('.additional_income-item')[0],
  incomeItem2 = document.querySelectorAll('.additional_income-item')[1],
  budgetMonthValue = document.getElementsByClassName('budget_month-value'),
  budgetDayValue = document.getElementsByClassName('budget_day-value'),
  expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
  additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
  incomePeriodValue = document.getElementsByClassName('income_period-value'),
  targetMontValue = document.getElementsByClassName('target_month-value'),
  periodSelect = document.querySelector('.period-select'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('input[class="income-title"]'),
  incomeAmount = document.querySelector('input[class="income-amount"]'),
  expensesTitle = document.querySelector('input[class="expenses-title"]'),
  expensesAmount = document.querySelector('input[class="expenses-amount"]'),
  targetAmount = document.querySelector('input[class="target-amount"]');

let money = 76500;
const requestNumber = function (data) {
    let question = prompt(data).trim(),
      result = (question !== null && !isNaN(parseFloat(question)) && isFinite(question)) ? +question : requestNumber(data);
    return +result;
  },
  requestStr = function (data) {
    let question = prompt(data).trim(),
      result = !(question === null || question === '' || question.replace(/\d/g, '') === '') ? question : requestStr(data);
    return result;
  },
  start = function () {
    money = requestNumber('Ваш месячный доход');
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
      let itemIncome = requestStr('Какой у вас доп.доход?');
      let cashIncome = requestNumber('Сколько в месяц доп. заработок?');
      appData.income[itemIncome] = cashIncome;
    }
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Бенизин, Интернет, Коммуналка');
    appData.addExpenses = addExpenses.toLowerCase().replace(/\s/g, '').split(",");
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let expensesName = '',
      expensesAmount = 0;
    for (let i = 0; i < 2; i++) {
      expensesName = requestStr('Введите статью расходов');
      expensesAmount = requestNumber('Во сколько это обойдется?');
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
      appData.depositPercent = requestNumber('Какой у вас годовой процент?');
      appData.depositMoney = requestNumber('Какая сумма заложена?');
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