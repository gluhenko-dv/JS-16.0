'use strict';
document.addEventListener("DOMContentLoaded", function () {


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
        this.selector = this.selector.substr(1);
        body.innerHTML = `<div class="${this.selector}" ></div>`;
        const div = document.querySelector('.' + this.selector);
        div.style.height = `${this.height}px`;
        div.style.width = `${this.width}px`;
        div.style.backgroundColor = this.bg;
        div.style.fontSize = `${this.fontSize}px`;
        div.textContent = this.text;
        break;
      case (this.selector[0] === '#'):
        this.selector = this.selector.substr(1);
        body.innerHTML = `<p id="${this.selector}"></p>`;
        const p = document.querySelector('#' + this.selector);
        p.style.height = `${this.height}px`;
        p.style.width = `${this.width}px`;
        p.style.backgroundColor = this.bg;
        p.style.fontSize = `${this.fontSize}px`;
        p.textContent = this.text;
        break;
    }


  };
  let obj1 = new DomElement(prompt('Введите selector'), prompt('Введите height'), prompt('Введите width'), prompt('Введите background color'), prompt('Введите fontSize'), prompt('Введите текст для блока'));

  obj1.createElem();

  let obj2 = new DomElement({width: '100px'}, {height: '100px'}, {color: 'red'}, {position: 'absolute'});

  obj2.createElem();

});