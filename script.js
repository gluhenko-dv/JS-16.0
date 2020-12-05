'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

let todoData;

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData = localStorage.todoData ? JSON.parse(localStorage.todoData) : [];

  todoData.forEach(function (item, ) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `
    <span class="text-todo">${item.value}</span>
    <div class="todo-buttons">
      <button class="todo-remove"></button>
      <button class="todo-complete"></button>
    </div>
    `;
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const todoCompletedBtn = li.querySelector('.todo-complete');
    todoCompletedBtn.addEventListener('click', function () {
      item.completed = !item.completed;
      let json = JSON.stringify(todoData);
      localStorage.todoData = json;
      render();
    });
    const todoRemovedBtn = li.querySelector('.todo-remove');
    todoRemovedBtn.addEventListener('click', function () {
      todoData.splice(todoData.indexOf(item), 1);
      let json = JSON.stringify(todoData);
      localStorage.todoData = json;
      render();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();
  if (!headerInput.value) {
    alert('Заполни поле ввода');
    return;
  }
  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  todoData.push(newTodo);
  let json = JSON.stringify(todoData);
  localStorage.todoData = json;
  render();
  todoControl.reset();
});

render();