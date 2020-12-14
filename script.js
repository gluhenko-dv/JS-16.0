"use sctrict";

window.addEventListener("DOMContentLoaded", () => {
  const paragraph = document.querySelector(".paragraph"),
    input = document.querySelector(".input");
  const output = () => {
    paragraph.textContent = input.value;
  };
  input.addEventListener("keydown", (event) => {
    if (event.code === 'Space') {
      setTimeout(output, 300);
    }

  });
});
