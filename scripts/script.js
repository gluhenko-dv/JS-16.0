"strict";

const app = () => {
  const appView = document.getElementById("app");

  const renderAppView = () => {
    const userInterface = `
    <input id="currencyInput" type="text" placeholder="введите">
    <select id="currencySelect">
      <option value="USD">USD в RUB</option>
      <option value="RUB">RUB в USD</option>
    </select>
    <div id="result"></div>
    `;

    appView.innerHTML += userInterface;
  };

  const renderResult = (result, currencyName, resultName, currencyInput) => {
    const resultInterface = document.getElementById("result");
    resultInterface.innerHTML = `${currencyInput} ${currencyName} равно ${result} ${resultName}`;
  };



  const appLogic = () => {
    let currencyName = "USD",
      resultName = "RUB";
    const select = document.getElementById("currencySelect");
    const currencyInput = document.getElementById("currencyInput");

    const convertation = (currencyName, resultName) => {
      url = `https://api.exchangeratesapi.io/latest?base=${currencyName}&symbols=${resultName}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const result = currencyInput.value * data.rates[resultName];
          renderResult(result, currencyName, resultName, currencyInput.value);
        })
        .catch((error) => console.error(error));
    };

    currencyInput.addEventListener("input", (e) => {
      convertation(currencyName, resultName);
    });

    select.addEventListener("change", (e) => {
      currencyName = e.target.value;
      resultName = "USD";
      if (currencyName === "USD") {
        resultName = "RUB";
      }
      convertation(currencyName, resultName);
    });
  };
  renderAppView();
  appLogic();
};

app();
