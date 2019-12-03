import {createElement} from '../utils';

const createBtnMoretemplate = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

export default class BtnMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBtnMoretemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
