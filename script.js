'use strict';

let startBtn = document.getElementById('start'),
  incomeAddBtn = document.getElementsByTagName('button')[0],
  expensesAddBtn = document.getElementsByTagName('button')[1],
  depositCheckBox = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMontValue = document.getElementsByClassName('target_month-value')[0],
  periodSelect = document.querySelector('.period-select'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('input[class="income-title"]'),
  incomeAmount = document.querySelector('input[class="income-amount"]'),
  expensesTitle = document.querySelector('input[class="expenses-title"]'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  targetAmount = document.querySelector('input[class="target-amount"]'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  incomeItem = document.querySelectorAll('.income-items'),
  allInputs = document.querySelectorAll('input');
startBtn.disabled = true;

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
  };

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  depositPercent: 0,
  depositMoney: 0,
  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  accumulatedMonth: 0,
  start: function () {
    appData.budget = +salaryAmount.value;
    appData.getIncome();
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMontValue.value = Math.ceil(appData.getTargetMonth());
    periodSelect.addEventListener('input', function () {
      incomePeriodValue.value = appData.calcPeriod();
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input').forEach(function (item) {
      item.value = '';
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesAddBtn.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach(function (item) {
      item.value = '';
    });
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
    incomeItem = document.querySelectorAll('.income-items');
    if (incomeItem.length === 3) {
      incomeAddBtn.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }

    });
  },
  getIncome: function () {
    incomeItem.forEach(function (item) {
      let itemIncome = incomeTitle.value;
      let cashIncome = incomeAmount.value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
      for (let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
      }

    });
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
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
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
  validation: function () {
    let inputName = document.querySelectorAll('[placeholder="Наименование"]'),
      inputSum = document.querySelectorAll('[placeholder="Сумма"]');

    inputName.forEach(function (item) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^А-Яа-яЁё,.!? ]/i, '');
      });
    });

    inputSum.forEach(function (item) {
      item.addEventListener('input', function () {
        if (item.value === '0') {
          item.value = item.value.replace(/[^1-9]/i, '');
        }
        item.value = item.value.replace(/[^0-9]/i, '');
      });
    });
  }
};

appData.validation();


const changePeriodSelectTitle = function (event) {
  document.querySelector('.period-amount').innerHTML = event.target.value;
};

salaryAmount.addEventListener('input', function () {
  if (!salaryAmount.value) {
    startBtn.disabled = true;
  } else {
    startBtn.disabled = false;
  }

});
startBtn.addEventListener('click', appData.start);
expensesAddBtn.addEventListener('click', appData.addExpensesBlock);
incomeAddBtn.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', changePeriodSelectTitle);

appData.getInfoDeposit();


let addExpensesStr = '';
for (let i = 0; i < appData.addExpenses.length; i++) {
  addExpensesStr += appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1) + ', ';
}
addExpensesStr = addExpensesStr.slice(0, addExpensesStr.length - 2);