"use strict";

//глобальная переменная (со значениями для проверки работы кода)
let TIME = {
  lastDate: ["Mon", "Jan", "27", "2019"],
  today: 800000,
  week: 23000000,
  mounth: 800000000
};

const setToLS = value => {
  localStorage.setItem("time", JSON.stringify(value));
};

const getFromLS = () => {
  const data = localStorage.getItem("time");
  return data ? JSON.parse(data) : null;
};

setToLS(TIME);

document.addEventListener("DOMContentLoaded", loadingHandler);

//Sun Jan 27 2019
//========================================================================
// Проверка даты и данных в ЛС и отрисовка прогресс-баров
function loadingHandler() {
  let currentTime = Date()
    .split(" ")
    .slice(0, 4);
  // let currentTime = ["Tu", "Jan", "27", "2019"]; //для проветки
  console.log(currentTime);
  let timeLS = getFromLS();
  if (!timeLS || !timeLS.lastDate) {
    TIME.lastDate = currentTime;
    setToLS(TIME);
    return;
  } else if (timeLS && timeLS.lastDate) {
    if (
      //совпадает дата
      currentTime[1] === timeLS.lastDate[1] &&
      currentTime[2] === timeLS.lastDate[2] &&
      currentTime[3] === timeLS.lastDate[3]
    ) {
      paintTodayBar(timeLS);
      paintWeekBar(timeLS);
      paintMounthBar(timeLS);
      alert("1");
      return;
    }
    if (currentTime[2] !== timeLS.lastDate[2]) {
      //число не совпадает
      timeLS.lastDate = currentTime;
      timeLS.today = 0;
      paintTodayBar(timeLS);
      alert("2");
    }
    if (
      currentTime[1] === timeLS.lastDate[1] &&
      currentTime[3] === timeLS.lastDate[3]
    ) {
      //совпадает месяц и год
      paintMounthBar(timeLS);
      alert("3");
    }
    if (currentTime[1] !== timeLS.lastDate[1]) {
      //месяц не совпадает
      timeLS.mounth = 0;
      paintMounthBar(timeLS);
      alert("4");
    }
    if (currentTime[0] === "Mon" && timeLS.today == 0) {
      //понедельник первый заход
      alert("5");
      timeLS.week = 0;
      paintWeekBar(timeLS);
    }
    if (currentTime[0] === "Mon" && timeLS.today !== 0) {
      //понедельник последующие заходы
      paintWeekBar(timeLS);
      alert("6");
    }
    if (currentTime[0] !== "Mon") {
      //не понедельник
      paintWeekBar(timeLS);
      alert("7");
    }
  }
  TIME = timeLS;
  setToLS(TIME);
  return TIME;
}
//===================================================================

// глобальная переменная - приходит из блока с видео
let timeFromVideo = 100000;

const closeBtn = document.querySelector("#close-btn");
closeBtn.addEventListener("click", handleGetAndPaintNewTime); //эмитация, что кликнули на закрытие модального окна видео

//получает время с видео и отрисовывает прогресс
function handleGetAndPaintNewTime() {
  let newTime = timeFromVideo;
  let timeFromLS = getFromLS();

  let currentTime = Date()
    .split(" ")
    .slice(0, 4);
  //проверяет не наступил ли новый день, пока смотрели видео
  if (currentTime[2] === timeFromLS.lastDate[2]) {
    addNewTime(timeFromLS, newTime);
    setToLS(TIME);
    paintTodayBar(TIME);
    paintWeekBar(TIME);
    paintMounthBar(TIME);
  } else {
    loadingHandler(); //если наступил новый день снова делаем проверки и обнуляем данные.
    //Наверное, стоит сюда написать отдельную ф-цию, которая будет только делать проверку и не отрисовывать прогресс
    addNewTime(TIME, newTime);
    setToLS(TIME);
    paintTodayBar(TIME);
    paintWeekBar(TIME);
    paintMounthBar(TIME);
  }
}
//добавляет к существующему времени новое
function addNewTime(timeFromLS, newTime) {
  console.log(newTime);
  timeFromLS.today += newTime;
  timeFromLS.week += newTime;
  timeFromLS.mounth += newTime;
  return (TIME = timeFromLS);
}
//===================================================================

function paintTodayBar(timeObj) {
  const elem = document.getElementById("bar-today");
  const text = document.getElementById("bar-text-today");
  const maxTime = 2 * 60 * 60 * 1000; //2 трен по часу, в mc
  countWidthAndCal(timeObj.today, elem, text, maxTime);
}
function paintWeekBar(timeObj) {
  const elem = document.getElementById("bar-week");
  const text = document.getElementById("bar-text-week");
  const maxTime = 2 * 60 * 60 * 1000 * 7; //2 трен по часу каждый день, в mc
  countWidthAndCal(timeObj.week, elem, text, maxTime);
}
function paintMounthBar(timeObj) {
  const elem = document.getElementById("bar-mounth");
  const text = document.getElementById("bar-text-mounth");
  const maxTime = 2 * 60 * 60 * 1000 * 7 * 30; //2 трен по часу каждый день. Сделать проверку на к-во дней в месяце
  countWidthAndCal(timeObj.mounth, elem, text, maxTime);
}
function countWidthAndCal(time, elem1, elem2, maxTime) {
  const width = Math.round((time * 100) / maxTime);
  const maxCal = 1200;
  const ccal = Math.round((time * maxCal) / maxTime);

  elem1.style.width = width + "%";
  elem2.textContent = ccal + "ккал";
}
