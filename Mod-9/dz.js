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
/*
⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Выполните домашнее задание используя класс с полями и методами.
  
  На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет 
  динамически создана вся разметка для секундомера.
  
  Должна быть возможность создать сколько угодно экземпляров секундоментов 
  на странице и все они будут работать независимо.
  
  К примеру:
  
  new Stopwatch(parentA);
  new Stopwatch(parentB);
  new Stopwatch(parentC);
  
  Где parent* это существующий DOM-узел. 
*/

class Stopwatch {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.startTime = null,
    this.id = null,
    this.isActive = false,
    this.timeArr = [],
    this.clockface = document.createElement('p');
    this.startBtn = document.createElement('button');
    this.resetBtn = document.createElement('button');
    this.lapBtn = document.createElement('button');
    this.laps = document.createElement('ul');

    this.createTimer()
  }

  createTimer() {
    //==Create layout

    //==Add classes
    this.clockface.classList.add("js-time", "time", "clockface");
    this.startBtn.classList.add("btn", "js-start");
    this.lapBtn.classList.add('btn', 'js-take-lap');
    this.resetBtn.classList.add('btn', 'js-reset');
    this.laps.classList.add('laps', 'js-laps');
    //==Add atributes
    this.resetBtn.setAttribute('disabled', 'disabled');
    //==Add text
    this.clockface.textContent = '00:00.0';
    this.startBtn.textContent = 'start';
    this.lapBtn.textContent = 'lap';
    this.resetBtn.textContent = 'reset'
    //==Insert into parent
    this.parentNode.append(this.clockface);
    this.parentNode.append(this.startBtn);
    this.parentNode.append(this.lapBtn);
    this.parentNode.append(this.resetBtn);
    this.parentNode.append(this.laps);
    //==Add listeners
    this.startBtn.addEventListener('click', this.startTimer.bind(this));
    this.resetBtn.addEventListener('click', this.resetTimer.bind(this));
    this.lapBtn.addEventListener('click', this.takeLap.bind(this));
  }
  //======Methods:

  //==Handlers:

  //======Handler: Start + Add listener Pause
  startTimer() {
    if (this.isActive === false) {
      this.id = setInterval(this.updateClockface.bind(this), 100);
      this.isActive = true;
      this.startBtn.textContent = 'Pause';
      this.resetBtn.removeAttribute('disabled');
    }
    if (this.isActive === true) {
      this.startBtn.textContent = 'Pause';
      this.startBtn.removeEventListener('click', this.startTimer.bind(this));
      this.startBtn.addEventListener('click', this.pauseTimer.bind(this));
    }
  }
  //======Handler: Pause
  pauseTimer() {
    if (this.isActive === true) {
      clearInterval(this.id);
      this.isActive = false;
      this.startBtn.textContent = 'Continue';
      if (this.isActive === false) {
        this.startBtn.addEventListener('click', this.startTimer.bind(this));
      }
    }
  }
  //======Handler: Reset
  resetTimer() {
    clearInterval(this.id);
    this.startTime = null;
    this.updateClockface();
    this.startBtn.textContent = 'Start';
    this.resetBtn.setAttribute('disabled', 'disabled');
    this.startBtn.addEventListener('click', this.startTimer.bind(this));
    this.timeArr = [];
    while (this.laps.firstChild) {
      this.laps.removeChild(this.laps.firstChild);
    }
  }
  //====Handler: Lap (data record)
  takeLap() {
    const li = document.createElement('li');
    li.textContent = this.getFormattedTime(this.startTime);
    this.timeArr.unshift(li);
    this.laps.append(this.timeArr[0])
  }

//==Assistant methods

  //====Update timer
  updateClockface() {
    this.startTime += 99;
    this.clockface.textContent = this.getFormattedTime(this.startTime);
  }
  //====Convert time from Unix
  getFormattedTime(time) {
    let ms = Math.floor((time % 1000) / 100);
    let sec = Math.floor(time / 1000 % 60);
    let min = Math.floor(time / 1000 / 60 % 60);
    min = min >= 10 ? min : `0${min}`;
    sec = sec >= 10 ? sec : `0${sec}`;
    return `${min}:${sec}.${ms}`;
  }
}

const stopwatchDiv = document.querySelector('.stopwatch');
const stopwatch = new Stopwatch(stopwatchDiv);
