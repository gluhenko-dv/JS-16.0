"strict";

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopup from "./modules/togglePopup";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import toggleCommandImg from "./modules/toggleCommandImg";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";

//hero timer
countTimer("1 jan 2021");

//главное меню
toggleMenu();

//popup
togglePopup();

//табы
tabs();

//слайдер
slider();

//изменение картинок наша команда
toggleCommandImg();

//калькулятор

calc(100);

//отправка ajax
sendForm();
