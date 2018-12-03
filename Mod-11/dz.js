"use strict";
/*
Реализуйте форму фильтра товаров в каталоге и список отфильтрованных товаров.
Используйте шаблонизацию для создания карточек товаров.
Есть массив объектов (дальше в задании), каждый из которых описывает
ноутбук с определенными характеристиками.
Поля объекта по которым необходимо производить фильтрацию: size, color, release_date.
Поля объекта для отображения в карточке: name, img, descr, color, price, release_date.
Изначально есть форма с 3-мя секциями, состоящими из заголовка и группы
чекбоксов (разметка дальше в задании). После того как пользователь выбрал
какие либо чекбоксы и нажал кнопку Filter, необходимо собрать значения чекбоксов по группам.
🔔 Подсказка: составьте объект формата
const filter = { size: [], color: [], release_date: [] }
После чего выберите из массива только те объекты, которые подходят
под выбраные пользователем критерии и отрендерите список карточек товаров.
🔔 Каждый раз когда пользователь фильтрует товары, список карточек товаров очищается,
после чего в нем рендерятся новые карточки товаров, соответствующих текущим критериям фильтра.
*/
const laptops = [
  {
  size: 13,
  color: 'white',
  price: 28000,
  release_date: 2015,
  name: 'Macbook Air White 13"',
  img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
  descr:
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
  size: 13,
  color: 'gray',
  price: 32000,
  release_date: 2016,
  name: 'Macbook Air Gray 13"',
  img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
  descr:
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
  size: 13,
  color: 'black',
  price: 35000,
  release_date: 2017,
  name: 'Macbook Air Black 13"',
  img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
  descr:
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
  size: 15,
  color: 'white',
  price: 45000,
  release_date: 2015,
  name: 'Macbook Air White 15"',
  img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
  descr:
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
  size: 15,
  color: 'gray',
  price: 55000,
  release_date: 2016,
  name: 'Macbook Pro Gray 15"',
  img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
  descr:
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
  size: 15,
  color: 'black',
  price: 45000,
  release_date: 2017,
  name: 'Macbook Pro Black 15"',
  img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
  descr:
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
  size: 17,
  color: 'white',
  price: 65000,
  release_date: 2015,
  name: 'Macbook Air White 17"',
  img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
  descr:
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
  size: 17,
  color: 'gray',
  price: 75000,
  release_date: 2016,
  name: 'Macbook Pro Gray 17"',
  img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
  descr:
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
  size: 17,
  color: 'black',
  price: 80000,
  release_date: 2017,
  name: 'Macbook Pro Black 17"',
  img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
  descr:
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  ];

  const form = document.querySelector('.js-form');
  
  class FormValidate {
    constructor (form, allData) {
      this.form = form;
      // this.filterBtn = null;
      this.filterData = {},
      this.inputs = null,
      this.allData = allData,
      this.container = null,
      this.source = null,
      this.template = null;
    }

//Add listeners
  addListeners() {
    window.addEventListener('load', this.makeCards(laptops));
    // this.filterBtn = document.querySelector('button[type=submit]');
    this.resetBtn = document.querySelector('button[type=reset]');
    this.form.addEventListener('submit', this.showCards.bind(this));
    this.form.addEventListener('reset', this.resetFilter.bind(this));
  }

   //Main function - HANDLER
  showCards() {
    event.preventDefault();
    this.collectCheckedValues();
    let  filteredLaptops = this.compareCheckedValues(this.filterData, this.allData);
    this.makeFilteredCard(filteredLaptops);
  }

  //Collect data from inputs
  collectCheckedValues() {
    this.inputs = Array.from(document.querySelectorAll('input'));
    this.filterData = {
    size: [],
    color: [], 
    release_date: [],
  };
    this.inputs.map(input => { if (input.checked) {
      switch(input.name) {
        case 'size': if (!this.filterData.size.includes(input.value)) this.filterData.size.push(input.value);
          break;
        case 'color': if (!this.filterData.color.includes(input.value)) this.filterData.color.push(input.value);
          break;
        case 'release_date': if (!this.filterData.release_date.includes(input.value)) this.filterData.release_date.push(input.value);
          break;
      }
    }
  });
  return this.filterData
  }

//Compare data from inputs with all data 
compareCheckedValues(filterData, allData) {

  let filteredLaptops = allData;

  if (filterData.size.length) {
    filteredLaptops = filteredLaptops.filter(laptop =>
      filterData.size.includes(`${laptop.size}`)
      );
  }
  if (filterData.color.length) {
    filteredLaptops = filteredLaptops.filter(laptop =>
      filterData.color.includes(`${laptop.color}`)
    );
  }
  if (filterData.release_date.length) {
    filteredLaptops = filteredLaptops.filter(laptop =>
      filterData.release_date.includes(`${laptop.release_date}`)
    );
  }
  
  return filteredLaptops;
}
//Make all cards using template
makeCards(arr) {
  this.container = document.querySelector('.js-container');
  this.source = document.querySelector('#laptop-card').innerHTML.trim();
  this.template = Handlebars.compile(this.source);
  const markup = this.template(arr);
  this.container.innerHTML = markup;
}
//Make filtered cards using template
makeFilteredCard(arr) {
  if (arr.length === 0) {
    this.container.innerHTML = '<p>No such laptops</p>';
  } else {
  const markup = this.template(arr);
  this.container.innerHTML = markup;
  }
}
//Reser filter, show all cards - HANDLER
resetFilter() {
this.makeCards(laptops)
}
}

const formValidator = new FormValidate(form, laptops);
formValidator.addListeners();
  