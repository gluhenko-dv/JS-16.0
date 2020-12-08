'use strict';



const body = document.querySelector('body');

function DomElement(selector, height, width, bg, fontSize, text, position) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.text = text;
  this.position = position;
}

DomElement.prototype.createElem = function () {
  switch (true) {
    case (this.selector[0] === '.'):
      body.innerHTML += `<div class="${this.selector.substr(1)}" ></div>`;
      break;
    case (this.selector[0] === '#'):
      body.innerHTML += `<p id="${this.selector.substr(1)}"></p>`;
      break;
    default:
      body.innerHTML += `<div class="${this.selector}" ></div>`;
      break;
  }
  const elem = document.querySelector(this.selector);
  elem.style.height = `${this.height}px`;
  elem.style.width = `${this.width}px`;
  elem.style.backgroundColor = this.bg;
  elem.style.fontSize = `${this.fontSize}px`;
  elem.textContent = this.text;
  elem.style.position = this.position;

};
let obj1 = new DomElement(prompt('Введите selector'), prompt('Введите height'), prompt('Введите width'), prompt('Введите background color'), prompt('Введите fontSize'), prompt('Введите текст для блока'));

obj1.createElem();

let obj2 = new DomElement('.selector', '100', '100', 'red', '14', ' ', 'absolute');

document.addEventListener("DOMContentLoaded", function () {
  obj2.createElem();
});