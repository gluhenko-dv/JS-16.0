document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const select = document.getElementById("cars"),
    output = document.getElementById("output");

  const promise = (url) => {
    return new Promise((resolve, reject) => {
      select.addEventListener("change", () => {
        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.setRequestHeader("Content-type", "application/json");

        request.addEventListener("readystatechange", () => {
          if (request.readyState !== 4) return;
          if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            resolve(data);
          } else {
            reject(request.statusText);
          }
        });
        request.send();
      });
    });
  };

  const outputMsg = (data) => {
    data.cars.forEach((item) => {
      if (item.brand === select.value) {
        const { brand, model, price } = item;
        output.innerHTML = `Тачка ${brand} ${model} <br>
            Цена: ${price}$`;
      }
    });
  };
  const url = "./cars.json";
  promise(url)
    .then(outputMsg)
    .catch((error) => (output.innerHTML = `Произошла ошибка ${error}`));
});
