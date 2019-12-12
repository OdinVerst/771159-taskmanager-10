import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import {render, replace} from "../utils/render";

export default class TaskController {
  constructor(container) {
    this._container = container;
    this._taskComponent = [];
    this._taskEditComponent = [];

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
    this._taskComponent = new Task(task);
    this._taskEditComponent = new TaskEdit(task);

    this._taskEditComponent.setSubmitHandler(() => {
      this._replaceEditToTask();
    });
    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    render(this._container, this._taskComponent);
  }

  _replaceEditToTask() {
    replace(this._taskComponent, this._taskEditComponent);
  }

  _replaceTaskToEdit() {
    replace(this._taskEditComponent, this._taskComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
