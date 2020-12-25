//создаем функцию filterByType которая принимает 2 аргумента (type, ...values)
const filterByType = (type, ...values) =>
    //создаем новый массив с элементами прошедшими проверку (typeof value === type)
    values.filter((value) => typeof value === type),
  //создаем функцию  hideAllResponseBlocks
  hideAllResponseBlocks = () => {
    //создаем константу responseBlocksArray, присваеваем массив элементов dialog__response-block находящихся в div
    const responseBlocksArray = Array.from(
      document.querySelectorAll("div.dialog__response-block")
    );
    //применяем метод foreach к с массиву responseBlocksArray которые элементу задаст стиль display: none;
    responseBlocksArray.forEach((block) => (block.style.display = "none"));
  },
  //создаем функцию showResponseBlock принимает (blockSelector, msgText, spanSelector)
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    //вызываем функцию hideAllResponseBlocks
    hideAllResponseBlocks();
    //на странице находим элемент с селектором "blockSelector" задаем ему стиль display: block;
    document.querySelector(blockSelector).style.display = "block";
    //если spanSelector === true
    if (spanSelector) {
      //найди на странице элемент с селектором spanSelector и задай ему текст msgText
      document.querySelector(spanSelector).textContent = msgText;
    }
  },
  //создаем фун-ю showError принимает (msgText)
  showError = (msgText) =>
    //вызываем фун-ю showResponseBlock передаем в неё ".dialog__response-block_error", msgText, "#error"
    showResponseBlock(".dialog__response-block_error", msgText, "#error"),
  //вызываю фун-ю	showResults передаю (msgText)
  showResults = (msgText) =>
    //вызываем фун-ю showResponseBlock передаем в неё ".dialog__response-block_ok", msgText, "#ok"
    showResponseBlock(".dialog__response-block_ok", msgText, "#ok"),
  //создаем фун-ю ничего не принимает, вызывает фун-ю showResponseBlock в которую передает класс ".dialog__response-block_no-results"
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"),
  //создаем фун-ю tryFilterByType принимает (type, values)
  tryFilterByType = (type, values) => {
    //начинаем перехват ошибок
    try {
      //задаем константу valuesArray присваиваем выполнение (вызов функции (передаем type и values (разбиваем на элементы после каждой запятой)) )
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      //задаем константу alertMsg определяем её значение если valuesArray.length === true то `Данные с типом ${type}: ${valuesArray}` если false то `Отсутствуют данные типа ${type}`;
      const alertMsg = valuesArray.length
        ? `Данные с типом ${type}: ${valuesArray}`
				: `Отсутствуют данные типа ${type}`;
				//вызываем фун-ю showResults передаем (alertMsg)
			showResults(alertMsg);
			//если в коде были ошибки то срабатывает
    } catch (e) {
			//вызываем фун-ю передаем в неё ошибку
      showError(`Ошибка: ${e}`);
    }
  };
//задаем константу filterButton присваиваем в неё элемент со страницы с id filter-btn
const filterButton = document.querySelector("#filter-btn");
//на filterButton вешаем слушатель событий(слушаем клик, выполняем функцию если был клик)
filterButton.addEventListener("click", (e) => {
	//создаем конст typeInput присваиваем в неё элемент со страницы с id type
	const typeInput = document.querySelector("#type");
	//создаем конст typeInput присваиваем в неё элемент со страницы с id data
  const dataInput = document.querySelector("#data");
//если dataInput.value равно пустоте то
  if (dataInput.value === "") {
//на dataInput вызываем метод setCustomValidity передаем в него текст "Поле не должно быть пустым!"
		dataInput.setCustomValidity("Поле не должно быть пустым!");
		//вызываем фун-ю showNoResults
		showNoResults();
		//если условие выше не сработало ТО
  } else {
		//на dataInput вызываем метод setCustomValidity передаем в него текст ""
		dataInput.setCustomValidity("");
		//отключаем у формы стандартное поведение
		e.preventDefault();
		//вызываем tryFilterByType передаем typeInput.value.trim(), dataInput.value.trim()    //////trim() уберет пробелы
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
});
