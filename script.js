"use strict";
let userData;
const startBtn = document.getElementById("start"),
  cancelBtn = document.getElementById("cancel"),
  incomeAddBtn = document.getElementsByTagName("button")[0],
  expensesAddBtn = document.getElementsByTagName("button")[1],
  depositCheckBox = document.querySelector("#deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
  budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
  expensesMonthValue = document.getElementsByClassName("expenses_month-value")[0],
  additionalIncomeValue = document.getElementsByClassName("additional_income-value")[0],
  additionalExpensesValue = document.getElementsByClassName("additional_expenses-value")[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMontValue = document.getElementsByClassName("target_month-value")[0],
  periodSelect = document.querySelector(".period-select"),
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelector('input[class="income-title"]'),
  incomeAmount = document.querySelector('input[class="income-amount"]'),
  expensesTitle = document.querySelector('input[class="expenses-title"]'),
  targetAmount = document.querySelector('input[class="target-amount"]'),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  income = document.querySelector(".income"),
  allInputs = document.querySelectorAll("input"),
  depositСheck = document.querySelector("#deposit-check"),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');
let incomeItem = document.querySelectorAll(".income-items"),
  expensesItems = document.querySelectorAll(".expenses-items");
startBtn.disabled = true;

class AppData {
  constructor() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.depositPercent = 0;
    this.depositMoney = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.accumulatedMonth = 0;
  }
  reset() {
    localStorage.clear();
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.depositPercent = 0;
    this.depositMoney = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.accumulatedMonth = 0;
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent.style.display = 'none';
    const inputs = document.querySelectorAll("input");
    inputs.forEach(function (item) {
      item.disabled = false;
      item.value = "";
    });
    expensesAddBtn.disabled = false;
    incomeAddBtn.disabled = false;
    startBtn.style.display = "block";
    cancelBtn.style.display = "none";
    this.showResult();
    periodSelect.value = 1;
    document.querySelector(".period-amount").innerHTML = 1;
    depositСheck.checked = false;
    startBtn.disabled = true;

    incomeItem.forEach(function (item, index, array) {
      item.length = array[index];
      if (item === array[1] || item === array[2]) {
        array[index].remove();
      }
    });
    expensesItems.forEach(function (item, index, array) {
      item.length = array[index];
      if (item === array[1] || item === array[2]) {
        array[index].remove();
      }
    });
    incomeAddBtn.style.display = "block";
    expensesAddBtn.style.display = "block";
    targetMontValue.value = 0;
    this.CookiesDelete();
  }
  start() {
    expensesAddBtn.disabled = true;
    incomeAddBtn.disabled = true;
    const inputs = document.querySelectorAll("input");
    inputs.forEach(function (item) {
      item.disabled = true;
    });
    startBtn.style.display = "none";
    cancelBtn.style.display = "block";
    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpInc();
    this.getInfoDeposit();
    this.getBudget();
    this.saveUserInfo();
    this.showResult();
  }
  showResult() {
    if (localStorage.userData) {
      userData = localStorage.userData ? JSON.parse(localStorage.userData) : '';
      userData.forEach(item => {
        budgetMonthValue.value = item.budgetMonthValue;
        budgetDayValue.value = item.budgetDayValue;
        expensesMonthValue.value = item.expensesMonthValue;
        additionalExpensesValue.value = item.additionalExpensesValue;
        additionalIncomeValue.value = item.additionalIncomeValue;
        targetMontValue.value = item.targetMontValue;
        incomePeriodValue.value = item.incomePeriodValue;
      });
      startBtn.style.display = "none";
      cancelBtn.style.display = "block";
      const inputs = document.querySelectorAll("input");
      inputs.forEach(function (item) {
        item.disabled = true;
      });
    }
  }
  addExpIncBlock() {
    const btn = document.querySelector(`.${event.target.className.split(' ')[1]}`),
      startStr = event.target.className.split(' ')[1].split('_')[0];

    let cloneItem = document.querySelectorAll(`.${startStr}-items`)[0],
      clone = cloneItem.cloneNode(true);

    clone.querySelectorAll('input').forEach(item => {
      item.value = '';
    });

    btn.before(clone);

    incomeItem = document.querySelectorAll('.income-items');
    expensesItems = document.querySelectorAll('.expenses-items');
    this.validation();

    if (expensesItems.length === 3) {
      expensesAddBtn.style.display = 'none';
    }

    if (incomeItem.length === 3) {
      incomeAddBtn.style.display = 'none';
    }
  }
  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split("-")[0],
        itemTitle = item.querySelector(`.${startStr}-title`).value,
        itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== "" && itemAmount !== "") {
        this[startStr][itemTitle] = itemAmount;
      }
    };
    incomeItem.forEach(count);
    expensesItems.forEach(count);
    for (const key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpInc() {
    const createString = item => {
      const classItem = item.className;

      if (classItem === 'additional_income-item') {
        item = item.value;
      }

      item = item.trim();

      if (item !== '') {
        if (classItem === 'additional_income-item') {
          this.addIncome.push(item);
        } else {
          this.addExpenses.push(item);
        }
      }
    };

    additionalIncomeItem.forEach(createString);

    additionalExpensesItem.value.split(',').forEach(createString);
  }
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100) || 0;
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
  }
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }
  getStatusIncome(data) {
    if (data >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (data >= 600 && data < 1200) {
      return "У вас средний уровень дохода";
    } else if (data < 600 && data > 0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else {
      return "Что то пошло не так";
    }
  }
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.addEventListener('input', () => {
        if (depositPercent.value > 100 || !Number(depositPercent.value)) {
          alert('Введите корректное значение в поле проценты');
          depositPercent.value = '';
        }
      });

    } else {
      depositPercent.value = valueSelect;
    }
  }
  depositHandler() {
    if (depositСheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  validation() {
    const inputName = document.querySelectorAll('[placeholder="Наименование"]'),
      inputSumm = document.querySelectorAll('[placeholder="Сумма"]');

    inputName.forEach((item) => {
      item.addEventListener("input", function () {
        item.value = item.value.replace(/[^А-Яа-яЁё,.!? ]/i, "");
      });
    });

    inputSumm.forEach((item) => {
      item.addEventListener("input", function () {
        if (item.value === "0") {
          item.value = item.value.replace(/[^1-9]/i, "");
        }
        item.value = item.value.replace(/[^0-9]/i, "");
      });
    });
  }

  changePeriodSelectTitle(event) {
    document.querySelector(".period-amount").innerHTML = event.target.value;
  }
  eventListeners() {
    startBtn.addEventListener('click', () => this.start());
    cancelBtn.addEventListener('click', () => this.reset());
    expensesAddBtn.addEventListener('click', this.addExpIncBlock.bind(this));
    incomeAddBtn.addEventListener('click', this.addExpIncBlock.bind(this));
    periodSelect.addEventListener('input', this.changePeriodSelectTitle);
    salaryAmount.addEventListener('input', function () {
      if (!salaryAmount.value) {
        startBtn.disabled = true;
      } else {
        startBtn.disabled = false;
      }
    });
    depositСheck.addEventListener('change', this.depositHandler.bind(this));
  }
  saveUserInfo() {
    userData = [{
      budgetMonthValue: this.budgetMonth,
      budgetDayValue: this.budgetDay,
      expensesMonthValue: this.expensesMonth,
      additionalExpensesValue: this.addExpenses.join(", "),
      additionalIncomeValue: this.addIncome.join(", "),
      targetMontValue: Math.ceil(this.getTargetMonth()),
      incomePeriodValue: this.calcPeriod()
    }];
    let json = JSON.stringify(userData);
    localStorage.userData = json;
    let date = new Date(Date.now() + 86400e3);
    document.cookie = `budgetMonthValue = ${this.budgetMonth}; expires=${date}`;
    document.cookie = `budgetDayValue = ${this.budgetDay}; expires=${date}`;
    document.cookie = `expensesMonthValue = ${this.expensesMonth}; expires=${date}`;
    document.cookie = `additionalExpensesValue = ${this.addExpenses.join("; ")}; expires=${date}`;
    document.cookie = `additionalIncomeValue = ${this.addIncome.join("; ")}; expires=${date}`;
    document.cookie = `targetMontValue = ${Math.ceil(this.getTargetMonth())}; expires=${date}`;
    document.cookie = `incomePeriodValue = ${this.calcPeriod()}; expires=${date}`;
  }
  CookiesDelete() {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }
  checkCookies() {
    userData = localStorage.userData ? JSON.parse(localStorage.userData) : '';
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let name = cookie.split("=");
      let key = name[0].trim();
      if ( cookies.length !== 7 || !(key in userData[0])) {
        this.reset();
      }

    }
  }
}

const appData = new AppData();

appData.validation();
appData.eventListeners();
appData.showResult();
appData.checkCookies();