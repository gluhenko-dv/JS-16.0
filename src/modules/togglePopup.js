const togglePopup = () => {
  const popup = document.querySelector(".popup"),
    popupBtn = document.querySelectorAll(".popup-btn");
  //popup animate

  let animate,
    opacity = 0.01;
  const popupAnimate = () => {
    animate = requestAnimationFrame(popupAnimate);
    if (opacity < 1) {
      popup.style.opacity = opacity;
      opacity += 0.05;
    } else {
      cancelAnimationFrame(animate);
    }
  };

  popupBtn.forEach((element) => {
    element.addEventListener("click", () => {
      popup.style.display = "block";
      if (screen.width > 768) {
        animate = requestAnimationFrame(popupAnimate);
      }
    });
  });
  popup.addEventListener("click", (event) => {
    let target = event.target;
    target = target.closest(".popup-content");
    if (!target || event.target.matches(".popup-close")) {
      popup.style.display = "none";
      opacity = 0;
    }
  });
};


export default togglePopup;