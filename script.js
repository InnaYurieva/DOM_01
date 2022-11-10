import colors from "./colors.js";
import openModal from "./modal.js";

const container = document.querySelector(".container"); //Выбираем контейнер
const SQUARES = 35; //количество квадратиков
for (let index = 0; index < SQUARES; index++) {
  const square = document.createElement("div");
  square.classList.add("square"); // Добавляем стили квадратикам
  square.setAttribute("style", `background-color: ${colors[index]};`);
  container.append(square);
}

const icons = document.querySelector(".icons"); //Выбираем иконку
icons.addEventListener("click", openModal);

document.onclick = function (event) {
  //в прошлый раз было реализовано, тольео если нажимала на overlay - переделала
  let a = event.target.className;
  //console.log(a.length);
  if (event.target.className === "overlay") {
    container.classList.remove("is-open");
    icons.style.fill = "#f6bf54";
  } else if (a.length === 0) {
    container.classList.remove("is-open");
  }
};

const input = document.createElement("input");
input.classList.add("input");
input.placeholder = "#000000";
container.append(input);
const divColor = document.createElement("div");
divColor.classList.add("div-color");
input.before(divColor);

const svgIcons = document.querySelector("#svg"); //Галочка
//console.log(svgIcons);
input.after(svgIcons);

const inputChange = function (event) {
  //console.log(event.target.value);
  for (let index = 0; index < colors.length; index++) {
    const element = colors[index];
    if (event.target.value === element) {
      //console.log('Успех!');
      divColor.style.background = element;
    }
  }
};

input.addEventListener("input", inputChange); //в поповере есть цвета и инпут, слева от инпута - квадрат цвета иконки, при введении в инпут валидного цвета, квадрат меняет цвет на тот что ввели. Переделала на событие инпут
const square = document.querySelectorAll(".square"); // нод лист квадратиков

for (const iterator of square) {
  //console.log(iterator);

  const getDivColor = function (event) {
    //console.log(event.target);
    let rgbTarget = event.target.style.backgroundColor;
    //console.log(rgbTarget);
    const rgbToHex = (string) => {
      const rgb = string.split("(")[1].split(")")[0].split(",");
      const hex = rgb.map(function (x) {
        x = parseInt(x).toString(16);
        return x.length === 1 ? "0" + x : x;
      });
      return "#" + hex.join("");
    };
    let rgbHex = rgbToHex(rgbTarget);
    icons.style.fill = rgbHex;
    if (rgbToHex(icons.style.fill) === rgbHex) {
      container.classList.remove("is-open");
    }
  };
  iterator.addEventListener("click", getDivColor); //при клике по цвету, меняется цвет иконки на цвет по которому кликнули и поповер закрывается
}

const getHexOnInput = function (event) {
  let dataLength = input.dataLength;
  dataLength = 7;

  if (
    event.target.value.split("")[0] === "#" &&
    event.target.value.length === dataLength
  ) {
    //console.log('Успех');
    svgIcons.style.stroke = "green";
  } else {
    input.style.borderColor = "red";
  }
};
input.addEventListener("input", getHexOnInput);

const svgGetClose = function () {
  if (svgIcons.style.stroke === "green") {
    container.classList.remove("is-open");
    //input.style.borderColor = "black"
  }
};
svgIcons.addEventListener("click", svgGetClose); //если значение в инпуте соответствует формату hex, галочка подсвечивается зеленым и при клике на галочку  цвет иконки меняется на цвет, который ввели и поповер закрывается

const svgColorGet = function (event) {
  //console.log(icons.style.fill === 'rgb(246, 191, 84)');
  if (icons.style.fill === "rgb(246, 191, 84)") {
    icons.classList.add("svg-colorGet");
    icons.removeAttribute("data-title");
  } else {
    icons.classList.remove("svg-colorGet");
  }
};
icons.addEventListener("mouseout", svgColorGet);
