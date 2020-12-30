const slider = () => {
  const slide = document.querySelectorAll(".portfolio-item"),
    slider = document.querySelector(".portfolio-content"),
    portfolioDots = document.querySelector(".portfolio-dots");
  let currentSlide = 0,
    interval = null,
    dot = null;

  const addSlideDots = () => {
    slide.forEach(() => {
      portfolioDots.innerHTML += `<li class='dot'></li>`;
    });
    dot = document.querySelectorAll(".dot");
    dot[0].classList.add("dot-active");
  };

  addSlideDots();
  //слайд вперед
  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };
  //слайд назад
  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };
  //автопереключение слайда
  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide, "portfolio-item-active");
    prevSlide(dot, currentSlide, "dot-active");
    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, "portfolio-item-active");
    nextSlide(dot, currentSlide, "dot-active");
  };
  //старт слайдера
  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };
  //стоп слайдера
  const stopSlide = () => {
    clearInterval(interval);
  };
  //обработчик событи для переключеня слайдов на кнопки
  slider.addEventListener("click", (event) => {
    event.preventDefault();
    const target = event.target;
    if (!target.matches(".portfolio-btn, .dot")) return;

    prevSlide(slide, currentSlide, "portfolio-item-active");
    prevSlide(dot, currentSlide, "dot-active");
    if (target.matches("#arrow-right")) {
      currentSlide++;
    } else if (target.matches("#arrow-left")) {
      currentSlide--;
    } else if (target.matches(".dot")) {
      dot.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }
    nextSlide(slide, currentSlide, "portfolio-item-active");
    nextSlide(dot, currentSlide, "dot-active");
  });
  startSlide(1500);
  slider.addEventListener("mouseover", (event) => {
    if (event.target.matches(".portfolio-btn, .dot")) {
      stopSlide();
    }
  });
  slider.addEventListener("mouseout", (event) => {
    if (event.target.matches(".portfolio-btn, .dot")) {
      startSlide(1500);
    }
  });
};

export default slider;