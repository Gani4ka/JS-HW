'use strict';
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UrlSaver =
/*#__PURE__*/
function () {
  function UrlSaver(container) {
    _classCallCheck(this, UrlSaver);

    this.container = container, this.collection = [], this.template = null, this.templateFunc = null, this.getBtn = null, this.inputValue = '', this.isUrlNotUnic = false, this.isUrlValid = true, this.pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, this.id = null, this.iterator = 222;
  } //METHOD: Main method to start


  _createClass(UrlSaver, [{
    key: "mainFunction",
    value: function mainFunction() {
      this.addListener();
    } //METHOD: Add enent listeners

  }, {
    key: "addListener",
    value: function addListener() {
      this.getBtn = document.querySelector('.button[type="submit"]');
      this.getBtn.addEventListener('click', this.getData.bind(this));
      window.addEventListener('DOMContentLoaded', this.createCardsFromLS.bind(this));
    } //METHOD: Get data from API

  }, {
    key: "getData",
    value: function getData() {
      var _this = this;

      event.preventDefault();
      var input = document.querySelector('.js-input');
      this.inputValue = input.value;
      this.checkUrlforValid(this.inputValue); //check url with pattern

      if (!this.isUrlValid) {
        input.value = '';
        return;
      }

      this.checkUrlforUnic(this.inputValue); //check url for uniqueness

      input.value = '';

      if (this.isUrlNotUnic || !this.isUrlValid) {
        return;
      } else {
        fetch("https://api.linkpreview.net/?key=5bffa9274630feb332a1007b6c1d6737cad5b6a59a1e5&q=".concat(this.inputValue)).then(function (response) {
          if (response.ok) return response.json();
          throw new Error("Error while fetching: ".concat(response.statusText)); // А это надо вообще, если есть catch?
        }).then(function (data) {
          console.log(data);

          _this.toLS(data); //save data from API to a local storage

        }).then(function (data) {
          _this.createCardsFromLS(); //pain layout with template and local starage data

        }).catch(function (error) {
          alert('some error, may be this page is not exist');
        });
      }

      input.value = '';
    }
  }, {
    key: "toLS",
    //METHOD: add data to collection and save it to a local storage
    value: function toLS(obj) {
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
    } //METHOD: create card with template and add event listener to del-button

  }, {
    key: "createCard",
    value: function createCard(data) {
      var _this2 = this;

      this.template = document.querySelector('#url-card').innerHTML.trim();
      this.templateFunc = Handlebars.compile(this.template);
      var markup = this.templateFunc(data);
      this.container.innerHTML = markup;

      var delBtns = _toConsumableArray(document.querySelectorAll('.del-btn'));

      delBtns.map(function (btn) {
        return btn.addEventListener('click', _this2.deleteCard.bind(_this2));
      });
    } //METHOD: paint layout with data from local storage (collection)

  }, {
    key: "createCardsFromLS",
    value: function createCardsFromLS() {
      var collection = JSON.parse(localStorage.getItem('urlCollection'));

      if (collection) {
        this.createCard(collection);
      }
    } //METHOD: check url from input for validation using pattern (regular exspresion)

  }, {
    key: "checkUrlforValid",
    value: function checkUrlforValid(url) {
      if (url.match(this.pattern)) return this.isUrlValid = true;else {
        alert('not valid url');
        return this.isUrlValid = false;
      }
    } //METHOD: check url from input for uniqueness (collection doesn't already has this url)

  }, {
    key: "checkUrlforUnic",
    value: function checkUrlforUnic(url) {
      var _this3 = this;

      this.collection = JSON.parse(localStorage.getItem('urlCollection'));

      if (this.collection) {
        // this.isUrlNotUnic = Boolean(this.collection.find(objCard => objCard.url === this.input.value));
        this.isUrlNotUnic = Boolean(this.collection.find(function (objCard) {
          return objCard.url.match(_this3.inputValue);
        }));

        if (this.isUrlNotUnic) {
          alert('This url has been already added');
          return this.isUrlNotUnic;
        }
      } else return this.isUrlNotUnic = false;
    } //METHOD: delete card from DOM and collection in local storage

  }, {
    key: "deleteCard",
    value: function deleteCard() {
      var cardToDel = event.target.parentNode;
      var cardToDelId = cardToDel.getAttribute('data-id');
      cardToDel.remove();
      this.collection = JSON.parse(localStorage.getItem('urlCollection'));
      var cardToDelLS = this.collection.find(function (card) {
        return card.id == cardToDelId;
      });
      var idx = this.collection.indexOf(cardToDelLS);
      this.collection.splice(idx, 1);
      localStorage.setItem('urlCollection', JSON.stringify(this.collection));
    }
  }]);

  return UrlSaver;
}(); // localStorage.clear();


var container = document.querySelector('.container');
var urlSaver = new UrlSaver(container);
urlSaver.mainFunction();