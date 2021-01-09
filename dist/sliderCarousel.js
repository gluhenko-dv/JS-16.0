"strict";

class SliderCarousel {
  constructor({
    main,
    wrap,
    next,
    prev,
    position = 0,
    slidesToShow = 4,
    infinity = false,
  }) {

    if(!wrap || !main){
      console.warn('SLIDER: Передай свойства main и wrap!');
    }

    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = document.querySelector(wrap).children;
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    this.infinity = infinity;
    this.option = {
      position,
      widthSlide: Math.floor(100 / this.slidesToShow),
    };
  }

  init() {



    this.addGloClass();
    this.addStyle();
    if (this.next && this.prev) {
      this.controlSlider();
    } else {
      this.addArrow();
      this.controlSlider();
    }
  }

  addGloClass() {
    this.main.classList.add("glo-slider");
    this.wrap.classList.add("glo-slider__wrap");
    for (const item of this.slides) {
      item.classList.add("glo-slider__item");
    }
  }

  addStyle() {
    const style = document.createElement("style");
    style.id = "sliderCarousel-style";

    style.textContent = `
    .glo-slider {
      overflow: hidden !important;
    }
    .glo-slider__wrap {
      display: flex !important;
      transition: transform 0.5s !important;
      will-change: transform !important;
    }
    .glo-slider__item{
      flex: 0 0 ${this.option.widthSlide}% !important;
      margin: auto 0 !important;
    }
    .glo-slider__prev,
    .glo-slider__next{
      margin: 0 10px;
      border: 20px solid transparent;
      background: transparent;
    }
    .glo-slider__prev{
      border-right-color: #19b5fe;
    }
    .glo-slider__next{
      border-left-color: #19b5fe;
    }
    .glo-slider__prev:hover,
    .glo-slider__next:hover,
    .glo-slider__prev:focus,
    .glo-slider__next:focus{
      background: transparent;
    }
    `;
    document.head.appendChild(style);
  }

  controlSlider() {
    this.prev.addEventListener("click", this.prevSlider.bind(this));
    this.next.addEventListener("click", this.nextSlider.bind(this));
  }

  prevSlider() {
    if (this.infinity || this.option.position > 0) {
      --this.option.position;
      if(this.option.position < 0){
        this.option.position = this.slides.length - this.slidesToShow;
      }
      this.wrap.style.transform = `translateX(-${
        this.option.position * this.option.widthSlide
      }%)`;
    }
  }

  nextSlider() {
    if ( this.infinity || this.option.position < this.slides.length - this.slidesToShow) {
      ++this.option.position;
      if(this.option.position > this.slides.length - this.slidesToShow){
        this.option.position = 0
      }
      this.wrap.style.transform = `translateX(-${
        this.option.position * this.option.widthSlide
      }%)`;
    }
  }

  addArrow(){

    this.prev = document.createElement('button');
    this.next = document.createElement('button');

    this.prev.className = 'glo-slider__prev';
    this.next.className = 'glo-slider__next';

    this.main.appendChild(this.prev);
    this.main.appendChild(this.next);

  }
}
