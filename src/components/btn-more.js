import AbstractComponent from "./abstract-component";

const createBtnMoretemplate = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

export default class BtnMore extends AbstractComponent {
  getTemplate() {
    return createBtnMoretemplate();
  }
}
