const strWithNum = (str) => {
  return str.replace(/\D/g, "");
};

const calc = (price = 100) => {
  const calcSquare = document.querySelector(".calc-square"),
    calcCount = document.querySelector(".calc-count"),
    calcType = document.querySelector(".calc-type"),
    calcDay = document.querySelector(".calc-day"),
    totalValue = document.getElementById("total"),
    calcBlock = document.querySelector(".calc-block");

  calcBlock.addEventListener("input", (e) => {
    const target = e.target;
    const item = target.closest(".calc-item");
    if (!item || target.matches(".calc-type")) return;
    item.value = strWithNum(item.value);
  });

  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1;

    let animate,
      countAnimate = 0;

    const typeValue = calcType.options[calcType.selectedIndex].value;
    const squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = Math.floor(
        price * typeValue * squareValue * countValue * dayValue
      );
    }

    const calcAnimate = () => {
      animate = requestAnimationFrame(calcAnimate);
      if (countAnimate < total) {
        totalValue.textContent = countAnimate;
        switch (true) {
          case total < 1000:
            countAnimate += 11;
            break;
          case total < 10000:
            countAnimate += 111;
            break;
          case total < 100000:
            countAnimate += 1111;
            break;
          case total > 100000:
            countAnimate += 111111;
            break;
        }
      } else {
        cancelAnimationFrame(animate);
        totalValue.textContent = total;
      }
    };
    animate = requestAnimationFrame(calcAnimate);
  };

  calcBlock.addEventListener("change", (e) => {
    const target = e.target;
    if (target.matches("select") || target.matches("input")) {
      if (target.value === "") {
        calcSquare.value = "";
        calcDay.value = "";
        calcCount.value = "";
        totalValue.textContent = "0";
      } else {
        countSum();
      }
    }
  });
};
export default calc;
