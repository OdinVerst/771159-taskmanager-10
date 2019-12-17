import {getTasksByFilter} from "../utils/filter";
import {FilterType} from "../const";

export default class Tasks {
  constructor() {
    this._tasks = [];
    this._activeTypeFilter = FilterType.ALL;

    this._filterChangeHandlers = [];
  }

  getTasks() {
    return getTasksByFilter(this._tasks, this._activeTypeFilter);
  }

  getTasksAll() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = Array.from(tasks);
  }

  setFilter(filter) {
    this._activeTypeFilter = filter;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  updateTask(id, task) {
    const index = this._tasks.map((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), task, this._tasks.slice(index + 1));
    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }
}
