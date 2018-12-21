import v4 from 'uuid/v4';
import { EventEmitter } from 'events';

export default class Model extends EventEmitter {
  constructor(collection = []) {
    super();
    this.collection = collection
    this.isUrlNotUnic = null,
    this.isUrlValid = true,
    this.promise = null,
    this.pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  }
    //METHOD: chacking input value and get data from API, save it to LS
    getData(inputValue) {
  
      this.checkUrlforValid(inputValue); //check url with pattern
      if (!this.isUrlValid) {
        return
      }
      this.checkUrlforUnic(inputValue); //check url for uniqueness

      if (this.isUrlNotUnic || !this.isUrlValid) {
        return
      } else {
        this.promise = fetch(`https://api.linkpreview.net/?key=5bffa9274630feb332a1007b6c1d6737cad5b6a59a1e5&q=${inputValue}`)
          .then(response => {
            if (response.ok) return response.json();
            throw new Error(`Error while fetching: maybe this page is not exist`)
          })
          .then(data => {
            this.toLS(data); //save data from API to a local storage
          })
          .then(data => {
            this.emit('changeLS', this.collection);
          })
          .catch(error => {
            alert(error)
          })
          return this.promise
      }
    };

    //METHOD: add data to collection and save it to a local storage
  toLS(obj) {
    obj.id = v4(); //add unique id to object

    this.fromLS();
    if (this.collection) {
      this.collection.unshift(obj);
      localStorage.setItem('urlCollection', JSON.stringify(this.collection));
      return this.collection;
    } else {
      this.collection = [];
      this.collection.unshift(obj);
      localStorage.setItem('urlCollection', JSON.stringify(this.collection));
      return this.collection;
    }
  }
  //METHOD: get data from LS
  fromLS() {
    return this.collection = JSON.parse(localStorage.getItem('urlCollection'));
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
      this.isUrlNotUnic = Boolean(this.collection.find(objCard => objCard.url.match(url)));

      if (this.isUrlNotUnic) {
        alert('This url has been already added');
        return this.isUrlNotUnic
      }
    } else {
      return this.isUrlNotUnic = false
    }
  }

//METHOD: delete card from collection and LS
  delCardfromLS(id) {
    this.collection = JSON.parse(localStorage.getItem('urlCollection'));
    const cardToDelLS = this.collection.find(card => card.id === id);
    const idx = this.collection.indexOf(cardToDelLS);
    this.collection.splice(idx, 1);
    localStorage.setItem('urlCollection', JSON.stringify(this.collection));
  }
}