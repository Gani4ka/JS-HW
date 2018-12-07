'use strict'

/* 
  Напишите приложение для хранения url веб-страниц в виде карточек-закладок. 
  
  Реализуйте следующий функционал:
    - Используйте Gulp для сборки проекта, JS обработан транспайлером Babel, ресурсы оптимизированы
    
    - Для добавления новой закладки, в приложении есть форма с элементом input и кнопкой "Добавить"
    
    - В приложении есть список всех добавленных карточек-закладок, располагающийся под формой
    
    - Некоторые элементы интерфейса создаются динамически. Используйте шаблонизатор Handlebars для
      создания списка карточек. Форма уже есть в HTML при загрузке страницы.
      
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходят проверки:
        * на существование закладки с такой ссылкой в текущей коллекции закладок. Если такая закладка есть,
          всплывает диалоговое окно оповещающее пользователя о том, что такая закладка уже есть.
        * при условии валидной, еще не существующей в коллекции ссылки, карточка с такой ссылкой
          добавляется в коллекцию.
          
    - В интерфейсе, новые карточки добавляются наверх списка, а не вниз.
    
    - Каждая карточка-закладка содержит кнопку для удаления карточки из коллекции, при клике 
      на кнопку происходит удаление.
      
    - При повторном посещении страницы с одного и того же устройства и браузера, пользователь видит
      все карточки-закладки которые были во время последнего его посещения. Используйте localStorage
      
  🔔 Оформление интерфейса произвольное
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходи проверка 
      на валидность введенной ссылки: если был введен невалидный url то должно всплывать 
      диалоговое окно, оповещающее пользователя о том, что это невалидный url. Используйте
      регулярные выражения для валидации url.
          
    - Каждая карточка содержит превью изображение и базовую информацию о странице по адресу закладки,
      для получения этой информации воспользуйтесь этим Rest API - https://www.linkpreview.net/
*/


class UrlSaver {
  constructor(container) {
    this.container = container,
    this.collection = [],
    this.template = null,
    this.templateFunc = null,
    this.getBtn = null,
    this.inputValue = '',
    this.isUrlNotUnic = false,
    this.isUrlValid = true,
    this.pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    this.id = null,
    this.iterator = 222
  }

  //METHOD: Main method to start
  mainFunction() {
    this.addListener();
  }

  //METHOD: Add enent listeners
  addListener() {
    this.getBtn = document.querySelector('.button[type="submit"]');
    this.getBtn.addEventListener('click', this.getData.bind(this));

    window.addEventListener('DOMContentLoaded', this.createCardsFromLS.bind(this));
  }

  //METHOD: Get data from API
  getData() {
    event.preventDefault();
    const input = document.querySelector('.js-input');
    this.inputValue = input.value;

    this.checkUrlforValid(this.inputValue); //check url with pattern
    if (!this.isUrlValid) {
      input.value = '';
      return
    }

    this.checkUrlforUnic(this.inputValue); //check url for uniqueness

    input.value = '';

    if (this.isUrlNotUnic || !this.isUrlValid) {
      return
    } else {
      fetch(`http://api.linkpreview.net/?key=5bffa9274630feb332a1007b6c1d6737cad5b6a59a1e5&q=${this.inputValue}`)
        .then(response => {
          if (response.ok) return response.json();
          throw new Error(`Error while fetching: ${response.statusText}`) // А это надо вообще, если есть catch?
        })
        .then(data => {
          console.log(data);
          this.toLS(data); //save data from API to a local storage
        })
        .then(data => {
          this.createCardsFromLS(); //pain layout with template and local starage data
        })
        .catch(error => {
          alert('some error, may be this page is not exist')
        })
    }
    input.value = '';

  };

//METHOD: add data to collection and save it to a local storage
  toLS(obj) {
    this.id = Date.now();
    this.iterator += 1;
    obj.id = this.id + this.iterator; //add unique id to object
    this.collection = JSON.parse(localStorage.getItem('urlCollection'));
    if (this.collection) {
      this.collection.unshift(obj);
      localStorage.setItem('urlCollection', JSON.stringify(this.collection));
    } else {
      this.collection = [];
      this.collection.unshift(obj);
      localStorage.setItem('urlCollection', JSON.stringify(this.collection));
    }
  }

//METHOD: create card with template and add event listener to del-button
  createCard(data) {
    this.template = document.querySelector('#url-card').innerHTML.trim();
    this.templateFunc = Handlebars.compile(this.template);
    const markup = this.templateFunc(data); 
    this.container.innerHTML = markup;

    const delBtns = [...document.querySelectorAll('.del-btn')];
    delBtns.map(btn => btn.addEventListener('click', this.deleteCard.bind(this)));
  }

//METHOD: paint layout with data from local storage (collection)
  createCardsFromLS() {
    const collection = JSON.parse(localStorage.getItem('urlCollection'));
    if (collection) {
      this.createCard(collection);
    }
  }

//METHOD: check url from input for validation using pattern (regular exspresion)
  checkUrlforValid(url) {
    if (url.match(this.pattern)) return this.isUrlValid = true
    else {
      alert('not valid url');
      return this.isUrlValid = false
    }
  }

//METHOD: check url from input for uniqueness (collection doesn't already has this url)
  checkUrlforUnic(url) {
    this.collection = JSON.parse(localStorage.getItem('urlCollection'));
    if (this.collection) {
      // this.isUrlNotUnic = Boolean(this.collection.find(objCard => objCard.url === this.input.value));
      this.isUrlNotUnic = Boolean(this.collection.find(objCard => objCard.url.match(this.inputValue)));
      if (this.isUrlNotUnic) {
        alert('This url has been already added');
        return this.isUrlNotUnic
      }
    } else return this.isUrlNotUnic = false
  }

//METHOD: delete card from DOM and collection in local storage
  deleteCard() {
    const cardToDel = event.target.parentNode;
    const cardToDelId = cardToDel.getAttribute('data-id');
    cardToDel.remove();
    this.collection = JSON.parse(localStorage.getItem('urlCollection'));
    const cardToDelLS = this.collection.find(card => card.id == cardToDelId);
    const idx = this.collection.indexOf(cardToDelLS);
    this.collection.splice(idx, 1);
    localStorage.setItem('urlCollection', JSON.stringify(this.collection));
  }

}
// localStorage.clear();
const container = document.querySelector('.container');
const urlSaver = new UrlSaver(container);
urlSaver.mainFunction();
