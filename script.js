"use sctrict";

window.addEventListener("DOMContentLoaded", () => {
  const paragraph = document.querySelector(".paragraph"),
    input = document.querySelector(".input");
  const output = () => {
    paragraph.textContent = input.value;
  };
  input.addEventListener("change", () => {
    setTimeout(output, 300);
  });
});
