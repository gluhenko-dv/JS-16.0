"use sctrict";

window.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector(".progress"),
    btn = document.querySelector(".btn"),
    reset = document.querySelector(".reset");
  let animate,
    checkAnimate = false;
  let width = 1;
  const load = () => {
    animate = requestAnimationFrame(load);
    if (width < 100) {
      progress.style.width = `${width}%`;
      width++;
    } else {
      cancelAnimationFrame(animate);
    }
  };

  btn.addEventListener("click", () => {
    if (!checkAnimate) {
      checkAnimate = true;
      animate = requestAnimationFrame(load);
    } else {
      checkAnimate = false;
      cancelAnimationFrame(animate);
    }
  });
  reset.addEventListener("click", () => {
    width = 1;
    progress.style.width = `${width}%`;
  });
});
