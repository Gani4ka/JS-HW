"use strict";

/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>   
    
    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
      
      
    Реализуйте функционал:
      
      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.
    
      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.
    
      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются 
        динамически, при загрузке страницы.
        
      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.
        
      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
        
      - Изображений может быть произвольное количество.
      
      - Используйте делегирование для элементов preview.
      
      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
      
      - CSS-оформление и имена классов на свой вкус.
      
      
    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
      размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
      Подберите изображения одинаковых пропорций.
*/

/*
  Массив объектов с данными для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Создайте плагин галлереи используя ES6 класс. Добавьте поля и методы класса так, 
  чтобы можно было создать любое количество галлерей на странице. Функционал плагина 
  аналогичный заданию выше.
  
  При создании экземпляра конструктор получает:
    - items - список элементов для preview
    - parentNode - ссылку на DOM-узел в который будут помещены fullview и preview
    - defaultActiveItem - номер активного элемента preview по умолчанию
    
  Тогда создание экземпляра будет выглядеть следующим образом.
*/
const container = document.querySelector(".js-image-gallery");

const galleryItems = [
  { preview: "img/1-150.jpeg", fullview: "img/1-1920.jpeg", alt: "alt text 1" },
  { preview: "img/2-150.jpeg", fullview: "img/2-1920.jpeg", alt: "alt text 2" },
  { preview: "img/3-150.jpeg", fullview: "img/3-1920.jpeg", alt: "alt text 3" },
  { preview: "img/4-150.jpeg", fullview: "img/4-1920.jpeg", alt: "alt text 4" },
  { preview: "img/5-150.jpeg", fullview: "img/5-1920.jpeg", alt: "alt text 5" },
  { preview: "img/6-150.jpeg", fullview: "img/6-1920.jpeg", alt: "alt text 6" }
];

//==Создаем класс
class Gallery {
//==Конструктор
  constructor(items, parentNode, defaultActiveItem) {
    this.items = items;
    this.parentNode = parentNode;
    this.defaultActiveItem = defaultActiveItem;
  };
//==основная ф-ция
  createGallery() {
    //==Создаем разметку
    const fullview = document.createElement("div");
    const previewList = document.createElement("ul");
    fullview.classList.add("fullview");
    previewList.classList.add("preview");

    let liList = [];

    this.items.map(item => {
      let li = document.createElement("li");
      let img = document.createElement("img");
      img.setAttribute("src", item.preview);
      img.setAttribute("data-fullview", item.fullview);
      img.setAttribute("alt", item.alt);
      img.setAttribute("width", 150);
      li.appendChild(img);
      liList.push(li);
    });
    previewList.append(...liList);

    this.parentNode.append(fullview, previewList);

    fullview.style.backgroundImage = `url(${liList[this.defaultActiveItem - 1].firstElementChild.dataset.fullview})`;
    liList[this.defaultActiveItem - 1].firstElementChild.classList.add("img-active");
    
//==Вешаем слушатели
    previewList.addEventListener("click", makeFullview);
    previewList.addEventListener("click", makeBorder);
//==Хендлер: выводим превью-картинку в большом виде
    function makeFullview() {
      event.preventDefault();
      if (event.target.nodeName !== "IMG") return;
      fullview.style.backgroundImage = `url(${event.target.dataset.fullview})`;
    }
//==Хендлер: оформление активной превью-картинки
    function makeBorder() {
      liList.forEach(li => {
        if (li.firstElementChild === event.target) {
          li.firstElementChild.classList.add("img-active");
        }
         else {
          li.firstElementChild.classList.remove("img-active");
        } 
        
      });
    }
  }
}

const gallery1 = new Gallery(galleryItems, container, 1);
gallery1.createGallery();