import Task from "../components/task";
import TaskEdit from "../components/task-edit";

export default class TaskController {
  constructor(container) {
    this._container = container;
  }

  render(task) {
    this._taskComponent = new Task(task);
    this._taskEditComponent = new TaskEdit(task);
  }
}
