"use strict";

/*
  Сеть фастфудов предлагает несколько видов гамбургеров.
  Основа (булочка) гамбургера может быть большой или маленькой (обязательно):
	- маленькая (+30 денег, +50 калорий)
	- большая (+50 денег, +100 калорий)
  Гамбургер может быть с одной из нескольких видов начинок (обязательно):
	- сыром (+15 денег, +20 калорий)
	- салатом (+20 денег, +5 калорий)
	- мясом (+35 денег, +15 калорий)
  Дополнительно, гамбургер можно:
	- посыпать приправой (+10 денег, +0 калорий)
	- полить соусом (+15 денег, +5 калорий)
  Напишите скрипт, расчитывающий стоимость и калорийность гамбургера. Используте ООП подход,
  создайте класс Hamburger, константы, методы для выбора опций и рассчета нужных величин.
  Написанный класс должен соответствовать следующему jsDoc описанию. То есть класс должен содержать
  указанные методы, которые принимают и возвращают данные указанного типа.
*/
/*
  Класс, объекты которого описывают параметры гамбургера.
 */
class Hamburger {
 
  constructor(size, stuffing) {
    this._size = size;
    this._stuffing = stuffing;
    this._toppings = [];
    this._price;
  }
  //  * Добавить topping к гамбургеру. Можно добавить несколько topping, при условии, что они разные.
  addTopping(topping) {
    if (!this.toppings.includes(topping)) this.toppings.push(topping);
  }
  //  * Убрать topping, при условии, что она ранее была добавлена
  removeTopping(RemovedTopping) {
     this._toppings = this.toppings.filter(topping => topping !== RemovedTopping)};

  //  * Получить список toppings
  //  * Попробуйте сделать это геттером чтобы можно было обращаться как obj.toppings и нам вернет массив добавок
  get toppings() {
    return this._toppings;
  }
  //  * Узнать размер гамбургера
  //  * Попробуйте сделать это геттером чтобы можно было обращаться как obj.size и нам вернет размер
  get size() {
    return this._size;
  } 
  //  * Узнать начинку гамбургера
  get stuffing() {
    return this._stuffing;
  }
  //  * Узнать цену гамбургера
  //  * Попробуйте сделать это геттером чтобы можно было обращаться как obj.price и нам вернет сумму.

get price() {
  this._price = Hamburger.SIZES[this.size].price + Hamburger.STUFFINGS[this.stuffing].price;
    if (this.toppings.length > 0) {
     this._price += this.toppings.reduce((acc, topping) => 
        acc + Hamburger.TOPPINGS[topping].price, 0);
    }
    return this._price
};
  
  //  * Узнать калорийность
  calculateCalories() {
    let calories = Hamburger.SIZES[this.size].calories + Hamburger.STUFFINGS[this.stuffing].calories;
    if (this.toppings.length > 0) {
      calories += this.toppings.reduce((acc, topping) => 
         acc + Hamburger.TOPPINGS[topping].calories, 0);
     }
     return calories
  }
  // Размеры, виды добавок и начинок объявите как статические поля класса.
  // Hamburger.SIZE_SMALL = 'SIZE_SMALL';
  static set(size) {
    Hamburger.SIZE_SMALL = size;
  }
  static set(size) {
    Hamburger.SIZE_LARGE = size;
  }
  // Hamburger.STUFFING_CHEESE = 'STUFFING_CHEESE';
  static set(stuff) {
    Hamburger.STUFFING_CHEESE = stuff;
  }
  static set(stuff) {
    Hamburger.STUFFING_SALAD = stuff;
  }
  static set(stuff) {
    Hamburger.STUFFING_MEAT = stuff;
  }
  // Hamburger.TOPPING_SPICE = 'TOPPING_SPICE';
  static set(topping) {
    Hamburger.TOPPING_SPICE = topping;
  }
  static set(topping) {
    Hamburger.TOPPING_SAUSE = topping;
  }
};

Hamburger.SIZE_SMALL = "SIZE_SMALL";
Hamburger.SIZE_LARGE = "SIZE_LARGE";

Hamburger.SIZES = {
  [Hamburger.SIZE_SMALL]: {
    price: 30,
    calories: 50
  },
  [Hamburger.SIZE_LARGE]: {
    price: 50,
    calories: 100
  }
};

Hamburger.STUFFING_CHEESE = "STUFFING_CHEESE";
Hamburger.STUFFING_SALAD = "STUFFING_SALAD";
Hamburger.STUFFING_MEAT = "STUFFING_MEAT";

Hamburger.STUFFINGS = {
  [Hamburger.STUFFING_CHEESE]: {
    price: 15,
    calories: 20
  },
  [Hamburger.STUFFING_SALAD]: {
    price: 20,
    calories: 5
  },
  [Hamburger.STUFFING_MEAT]: {
    price: 35,
    calories: 15
  }
};

Hamburger.TOPPING_SPICE = "TOPPING_SPICE";
Hamburger.TOPPING_SAUCE = "TOPPING_SAUCE";

Hamburger.TOPPINGS = {
  [Hamburger.TOPPING_SPICE]: {
    price: 10,
    calories: 0
  },
  [Hamburger.TOPPING_SAUCE]: {
    price: 15,
    calories: 5
  }
};

/* Вот как может выглядеть использование этого класса */

// Маленький гамбургер с начинкой из сыра
const hamburger = new Hamburger(
  Hamburger.SIZE_SMALL,
  Hamburger.STUFFING_MEAT,
);
console.log(hamburger);

// Добавка из приправы
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// hamburger.addTopping(Hamburger.TOPPING_SAUCE);
// hamburger.addTopping(Hamburger.TOPPING_SAUCE);

console.log(hamburger.toppings);
console.log(hamburger.size);
console.log(hamburger.stuffing);
// Спросим сколько там калорий
console.log("Calories: ", hamburger.calculateCalories());

// Сколько стоит?
// console.log("Price: ", hamburger.calculatePrice());
console.log("Get price: ", hamburger.price);

// Я тут передумал и решил добавить еще соус
hamburger.addTopping(Hamburger.TOPPING_SAUCE);

// А сколько теперь стоит?
// console.log("Price with sauce: ", hamburger.calculatePrice());
console.log("Price with sauce: ", hamburger.price);

console.log("Calories: ", hamburger.calculateCalories());

// Проверить, большой ли гамбургер?
console.log(
  "Is hamburger large: ",
  hamburger.size === Hamburger.SIZE_LARGE
); // -> false
console.log(
  "Is hamburger large: ",
  hamburger.size === Hamburger.SIZE_SMALL
);

// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
// hamburger.removeTopping(Hamburger.TOPPING_SPICE);
// hamburger.removeTopping(Hamburger.TOPPING_SAUCE);

// Смотрим сколько добавок
console.log("Hamburger has %d toppings", hamburger.toppings.length); // 1
console.log("Hamburger has stuffing:", hamburger.stuffing);

/*
  🔔 Обратите внимание на такие моменты:
    	✔️ класс не взаимодействует с внешним миром. Это не его дело, этим занимается
    		другой код, а класс живет в изоляции от мира
    	✔️ обязательные параметры (размер и начинка) мы передаем через конструктор,
		чтобы нельзя было создать объект, не указав их
    	✔️ необязательные (добавка) добавляем через методы
    	✔️ типы начинок обозначены "константами" с понятными именами (на самом деле просто
	    	свойствами, написанным заглавными буквами, которые мы договорились считать "константами")
    	✔️ объект создается через конструктор - функцию, которая задает начальные значения полей.
    	✔️ в свойствах объекта гамбургера логично хранить исходные данные (размер, тип начинки),
      		а не вычисленные из них (цена, число калорий и т.д.). Рассчитывать цену и калории
		логично в тот момент, когда это потребуется, а не заранее.
*/

  
  // // calculatePrice() {
  //   let price = Hamburger.SIZES[this.size].price + Hamburger.STUFFINGS[this.stuffing].price;
  //   if (this.toppings.length > 0) {
  //    price += this.toppings.reduce((acc, topping) => 
  //       acc + Hamburger.TOPPINGS[topping].price, 0);
  //   }
  //   return price
  // };