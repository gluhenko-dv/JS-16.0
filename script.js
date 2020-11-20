let money = 76500,
    income = "Фриланс",
    addExpenses = "Бенизин, Интернет, Коммуналка",
    deposit = true,
    mission = 1000000,
    period = 5;

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + " месяцев" + " Цель заработать " + mission + " рублей/долларов/гривен/юани");

console.log(addExpenses.toLowerCase().split(", "));

let budgetDay = money / 30;
console.log(budgetDay);