import {render, remove} from "../utils/render";
import NoTasks from "../components/no-tasks";
import BoardSort, {SortType} from "../components/board-sort";
import BtnMore from "../components/btn-more";
import BoardTaskList from "../components/board-tasks-list";
import TaskController from "./task";

let tasksOnBoard = 0;
const SHOWING_TASKS_COUNT_ON_ITERATION = 8;

export default class BoardController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasks = [];
    this._tasksModel = tasksModel;
    this._showedTaskControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._noTasksComponent = new NoTasks();
    this._sortComponent = new BoardSort();
    this._boradTasksListComponent = new BoardTaskList();
    this._loadMoreButtonComponent = new BtnMore();

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._tasksModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._tasks = this._tasksModel.getTasks();
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);
    const container = this._container.getElement();

    if (!this._tasks.length || isAllTasksArchived) {
      render(container, this._noTasksComponent);
      return;
    }
    render(container, this._sortComponent);
    render(container, this._boradTasksListComponent);

    const newTasks = this._renderTasks(this._tasks, SHOWING_TASKS_COUNT_ON_ITERATION);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

    this._renderLoadMoreButton();

  }
  _renderTasks(tasks, count = tasks.length) {
    const taskListElement = this._boradTasksListComponent.getElement();

    const itaration = Math.round(tasksOnBoard / SHOWING_TASKS_COUNT_ON_ITERATION);
    const start = itaration * SHOWING_TASKS_COUNT_ON_ITERATION;
    const end = start + count;
    tasksOnBoard += count;

    return tasks.slice(start, end).map((task) => {
      const taskControler = new TaskController(taskListElement, this._onDataChange, this._onViewChange);
      taskControler.render(task);
      return taskControler;
    });
  }

  _onDataChange(taskController, oldData, newData) {
    const isSuccess = this._tasksModel.updateTask(oldData.id, newData);
    if (isSuccess) {
      taskController.render(newData);
    }
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((item) => item.setDefaultView());
  }
  _renderLoadMoreButton() {
    if (this._tasks.length <= SHOWING_TASKS_COUNT_ON_ITERATION) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      let balanseTasks = this._tasks.length - tasksOnBoard;
      if (balanseTasks) {
        if (balanseTasks - SHOWING_TASKS_COUNT_ON_ITERATION >= 1) {
          const newTasks = this._renderTasks(this._tasks, SHOWING_TASKS_COUNT_ON_ITERATION);
          this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
        } else {
          const newTasks = this._renderTasks(this._tasks, balanseTasks);
          this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
          remove(this._loadMoreButtonComponent);
        }
      }
    });
  }

  _onSortTypeChange(sortType) {
    let sortedTasks = [];

    switch (sortType) {
      case SortType.DATE_UP:
        sortedTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        sortedTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        sortedTasks = this._tasks.slice(0, SHOWING_TASKS_COUNT_ON_ITERATION);
        break;
    }

    const taskListElement = this._boradTasksListComponent.getElement();
    tasksOnBoard = 0;
    taskListElement.innerHTML = ``;

    const newTasks = this._renderTasks(sortedTasks);
    this._showedTaskControllers = newTasks;

    if (sortType === SortType.DEFAULT) {
      this._renderLoadMoreButton();
    } else {
      remove(this._loadMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._removeTasks();
    this._tasks = this._tasksModel.getTasks();
    tasksOnBoard = 0;
    this._renderTasks(this._tasks, SHOWING_TASKS_COUNT_ON_ITERATION);
    this._renderLoadMoreButton();
  }

  _removeTasks() {
    const taskListElement = this._boradTasksListComponent.getElement();

    taskListElement.innerHTML = ``;
    this._showedTaskControllers = [];
  }
}
