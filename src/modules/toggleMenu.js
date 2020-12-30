const toggleMenu = () => {
  const menu = document.querySelector("menu"),
    body = document.querySelector("body");

  const handlerMenu = () => {
    menu.classList.toggle("active-menu");
  };

  //menu scrollIntoView
  const smoothScroll = (target) => {
    const blockId = target.getAttribute("href");

    document.querySelector("" + blockId).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  body.addEventListener("click", (event) => {
    let target = event.target;

    if (target.closest(".menu")) {
      handlerMenu();
    } else if (target.closest(".close-btn")) {
      handlerMenu();
    } else if (target.closest("menu>ul>li>a")) {
      handlerMenu();
      event.preventDefault();
      smoothScroll(target);
    } else if (target.closest("main>a")) {
      target = target.closest("main>a");
      event.preventDefault();
      smoothScroll(target);
    } else if (
      !target.closest(".active-menu") &&
      menu.classList.contains("active-menu")
    ) {
      handlerMenu();
    }
  });
};


export default toggleMenu;