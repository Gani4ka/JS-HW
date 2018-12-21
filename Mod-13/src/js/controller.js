export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

//Listen enents in the view and the model
    view.on('addNewCard', this.addCard.bind(this));
    view.on('paint', this.getLSData.bind(this));
    view.on('delCard', this.delCard.bind(this));
    model.on('changeLS', this.paintCard.bind(this));
  }
//Listener for view event - add new card, the model will check and get data from API, send it to LS
  addCard(inputValue) {
        this.model.getData(inputValue);
      }
//Listener for model event - LS updated, the view will paint data from LS
  paintCard(collection) {
    this.view.createCard(collection)
  }
//Listener for view event - DOMContentLoaded, the model wil get data from LS, the view will paint it
  getLSData() {
    new Promise((res, rej) => {
      res(this.model.fromLS());
    })
    .then(data => {
      if (data) {
      this.view.createCard(data);
      } else {
      throw new Error('Collection in LS is ampty')
      }
    })
    .catch(error => console.log(error))
  }
//Listener for view event - delete card, the model will delete it from LS, the view will delete it from layout
  delCard(id) {
    this.model.delCardfromLS(id);
    this.view.delCard(id);
  }
}