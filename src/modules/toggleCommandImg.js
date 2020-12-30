const toggleCommandImg = () => {
  const command = document.querySelector("#command");
  let imgSrc = "";
  command.onmouseover = (e) => {
    const target = e.target;
    const item = target.closest(".command__photo");
    if (!item) return;
    imgSrc = item.src;
    item.src = item.dataset.img;
  };
  command.onmouseout = (e) => {
    const target = e.target;
    const item = target.closest(".command__photo");
    if (!item) return;
    item.src = imgSrc;
  };
};


export default toggleCommandImg;