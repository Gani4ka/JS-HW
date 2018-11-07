"use strict";
/*
Добавьте следующий функционал:
  
- При нажатии на кнопку button.js-start, запускается таймер, который считает время 
  со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
  новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).
     
  🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                достаточно повторять не чаще чем 1 раз в 100 мс.
  
- Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', 
  а функционал при клике превращается в оставновку секундомера без сброса 
  значений времени.
  
  🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.

- Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
  меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
  а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
  со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
  с 6 секунд, а не с 16. 
  
  🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его 
                при рассчете текущего времени после возобновления таймера отнимая
                это значение от времени запуска таймера.
  
- Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
  button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
  disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
  
- Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
  в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/
const clockface = document.querySelector(".js-time");
const startBtn = document.querySelector(".js-start");
const resetBtn = document.querySelector(".js-reset");
const lapBtn = document.querySelector(".js-take-lap");
const laps = document.querySelector(".js-laps");

const timer = {
  startTime: null,
  deltaTime: null,
  id: null,
  isActive: false,
  timeArr: [],
};

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', takeLap);

resetBtn.setAttribute('disabled', 'disabled');

function startTimer () {
    if (timer.isActive === false) {
  timer.id = setInterval(updateClockface, 100);
  timer.isActive = true;
  startBtn.textContent = 'Pause';
  resetBtn.removeAttribute('disabled');
    }
  if (timer.isActive === true) {
      startBtn.textContent = 'Pause';
      startBtn.removeEventListener('click', startTimer);
      startBtn.addEventListener('click', pauseTimer);
  }
}
function pauseTimer () {
    if (timer.isActive === true) {
  clearInterval(timer.id);
  timer.isActive = false;
  startBtn.textContent = 'Continue';
    if (timer.isActive === false) {
        startBtn.addEventListener('click', startTimer);
    }
    }
}
function resetTimer () {
    // console.log('hh');
    clearInterval(timer.id);
    timer.startTime = null;
    updateClockface();
    startBtn.textContent = 'Start';
    resetBtn.setAttribute('disabled', 'disabled');
    startBtn.addEventListener('click', startTimer);
}
function takeLap () {
timer.timeArr.unshift(getFormattedTime(timer.startTime));
const li = document.createElement('li');
li.textContent = timer.timeArr[0];
laps.append(li)
}

/*
* Обновляет поле счетчика новым значением при вызове
* аргумент time это кол-во миллисекунд
*/
function updateClockface() {
  timer.startTime += 99;
  clockface.textContent = getFormattedTime(timer.startTime);
}


function getFormattedTime(time) {
  let ms = Math.floor((time % 1000)/100);
  let sec = Math.floor(time/1000 % 60);
  let min = Math.floor(time/1000/60 % 60);
  min = min >= 10 ? min : `0${min}`;
  sec = sec >= 10 ? sec : `0${sec}`;
  
  return `${min}:${sec}.${ms}`;
}
