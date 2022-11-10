const openModal = function(event) { // не было реализовано закрытие модального окна при клике на иконку после открытия модального окна
    const container = document.querySelector(".container")
    const icons = document.querySelector('.icons') //Выбираем иконку
    if (container.classList.contains("is-open")) {
      container.classList.remove("is-open")
      icons.style.fill = "black";
    } else {
      container.classList.add("is-open")
      icons.style.fill = "#f6bf54"; 
    }
  }

  export default openModal