import AbstractComponent from "./abstract-component";

const createBoardTaskListTemplate = () => {
  return `<div class="board__tasks"></div>`;
};

export default class BoardTaskList extends AbstractComponent {
  getTemplate() {
    return createBoardTaskListTemplate();
  }
}
