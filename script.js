'use strict';

const btnRegister = document.querySelector('.btn-register'),
  btnLogin = document.querySelector('.btn-login'),
  list = document.querySelector('.list'),
  listItem = document.querySelector('.list-item'),
  itemTitle = document.querySelector('.item-title'),
  heroTtitle = document.querySelector('.hero-title');

let userData = [];

const requestTime = function () {
  let time = new Date();
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return time.toLocaleString("ru", options);
};

const render = function () {
  list.textContent = '';
  userData = localStorage.userData ? JSON.parse(localStorage.userData) : [];

  userData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.innerHTML = `
    <p class="item-title">Имя: ${item.firstName}, Фамилия: ${item.lastName}, зарегестрирован: ${item.registerTime}</p>
		<button class="item-delete"></button>
    `;
    list.append(li);

    const userDataRemovedBtn = li.querySelector('.item-delete');
    userDataRemovedBtn.addEventListener('click', function () {
      if (!confirm('Вы уверены?')) {
        return;
      }
      userData.splice(userData.indexOf(item), 1);
      let json = JSON.stringify(userData);
      localStorage.userData = json;
      render();
    });
  });
};
const validation = function (data) {
  let question = prompt(data).trim(),
    result = !(question === null || question === '') ? question : validation(data);
  return result;
};
const register = function () {
  let name = prompt('Введите Имя Фамилию');
  while (name.split(/\s/).length !== 2) {
    alert('Введите корректно Имя Фамилию');
    name = prompt('Введите Имя Фамилию');
  }
  name = name.split(' ');
  const newUser = {
    firstName: name[0],
    lastName: name[1],
    login: '',
    password: '',
    registerTime: requestTime(),
  };
  newUser.login = validation('Введите логин');
  newUser.password = validation('Введите пароль');
  if (userData.firstName === '' || userData.login === '' || userData.password === '') {
    alert('Заполни все поля!');
    register();
  }
  if (userData.find(item => item.login === newUser.login)) {
    alert('Такой пользователь уже есть, придумай другой логин!');
    return;
  }
  userData.push(newUser);

  let json = JSON.stringify(userData);
  localStorage.userData = json;
  render();
};

const authorization = function () {
  let login = prompt('Введите логин');
  if (!login) {
    return;
  }
  let password = prompt('Введите ппароль');
  if (!password) {
    return;
  }
  if (userData.find(item => item.login === login && item.password === password)) {
    heroTtitle.innerHTML = `Привет ${login}`;
    console.log(login);
  } else {
    alert('пользователь не найден');
  }
};

btnRegister.addEventListener('click', function (event) {
  event.preventDefault();
  register();
});

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  authorization();
});

render();