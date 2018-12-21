import EventEmitter from '../services/event-emitter';
import * as template from '../templates/grid-item.hbs';

export default class View extends EventEmitter {
  constructor() {
    super();
    this.container = document.querySelector('.container'),
    this.getBtn = document.querySelector('.button[type="submit"]'),
    this.inputValue = '',
    this.delBtns = [],

    //Add event-listeners
    this.getBtn.addEventListener('click', this.handleAdd.bind(this));
    window.addEventListener('DOMContentLoaded', this.handlePaint.bind(this));
    }

    //METHOD: create card with template and add event listener to del-button
  createCard(data) {
    const markup = template(data); 
    this.container.innerHTML = markup;

    this.delBtns = [...document.querySelectorAll('.del-btn')];
    this.delBtns.map(btn => btn.addEventListener('click', this.handleDeleteCard.bind(this)));
  }

//Handler: get value from input and emit event for controller (model)
  handleAdd() {
      event.preventDefault();
      const input = document.querySelector('.js-input');
      this.inputValue = input.value;
        if (this.inputValue === '') return;
        this.emit('addNewCard', this.inputValue);
        input.value = '';
      }

//Handler: paint layout when page loaded, emit event for controller (model)
  handlePaint() {
    this.emit('paint');
  }

//Handler: get id of a deleted card, emit event for controller (model)
  handleDeleteCard() {
    const cardToDel = event.target.parentNode;
    const cardToDelId = cardToDel.getAttribute('data-id');
    this.emit('delCard', cardToDelId);
  }

//METOD: delete card from layout
  delCard(id) {
    const cardToDel = this.delBtns.map(btn => btn.parentNode)
    .find(parent => parent.dataset.id === id);
    cardToDel.remove();
  }
}