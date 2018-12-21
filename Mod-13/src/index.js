import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';
import EventEmitter from './services/event-emitter';
import './sass/style.scss';

const view = new View();
const model = new Model();
const controller = new Controller(model, view);

