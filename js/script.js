
class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem("toDoList")));
  }

  /*   animateee = (item) => {
      let opacity = 1;
      let animate = requestAnimationFrame(animateee);
      if (opacity !== 0) {
        item.style.opacity = opacity;
        opacity -= 0.05;
      } else {
        cancelAnimationFrame(animate);
      }
    } */

  addToStorage() {
    localStorage.setItem("toDoList", JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = ``;
    this.todoCompleted.textContent = ``;
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.key = todo.key;
    li.insertAdjacentHTML(
      "beforeend",
      `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-edit"></button>
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
      `
    );
    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();
    const value = this.input.value.trim();
    if (value === "") {
      alert("Введи что ни будь :)");
      return;
    }
    if (value) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
      this.form.reset();
    }
  }

  init() {
    this.form.addEventListener("submit", this.addTodo.bind(this));
    this.render();
  }

  deleteItem(key) {
    this.todoData.delete(key);
    this.addToStorage();
    this.render();
  }

  completedItem(key) {
    const elem = this.todoData.get(key);
    if (elem.completed) {
      elem.completed = false;
    } else {
      elem.completed = true;
    }
    this.addToStorage();
    this.render();
  }

  editItem(item, key) {
    let newValue = prompt("Изменить", item.textContent);
    if (newValue === null || newValue === "") {
      newValue = item.textContent;
    }
    const elem = this.todoData.get(key);
    elem.value = newValue;
    this.addToStorage();
    this.render();
  }

  handler() {
    const todoItem = document.querySelector(".todo-container");

    todoItem.addEventListener("click", e => {
      const target = e.target;
      const itemKey = target.closest(".todo-item").key;
      let item = target.closest(".todo-item");
      item = item.querySelector(".text-todo");
      if (target.closest(".todo-remove")) {
        this.deleteItem(itemKey);
      } else if (target.closest(".todo-complete")) {
        this.completedItem(itemKey);
      } else if (target.closest(".todo-edit")) {
        this.editItem(item, itemKey);
      }
    });
  }

  generateKey() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}

const todo = new Todo(
  ".todo-control",
  ".header-input",
  ".todo-list",
  ".todo-completed"
);
todo.init();
todo.handler();
