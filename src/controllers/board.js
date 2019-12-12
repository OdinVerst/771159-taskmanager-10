import {render, remove} from "../utils/render";
import NoTasks from "../components/no-tasks";
import BoardSort, {SortType} from "../components/board-sort";
import BtnMore from "../components/btn-more";
import BoardTaskList from "../components/board-tasks-list";
import TaskController from "./task";

let tasksOnBoard = 0;
const SHOWING_TASKS_COUNT_ON_ITERATION = 8;

const renderTasks = (container, tasks, onDataChange, onViewChange, count = tasks.length) => {
  const itaration = Math.round(tasksOnBoard / SHOWING_TASKS_COUNT_ON_ITERATION);
  const start = itaration * SHOWING_TASKS_COUNT_ON_ITERATION;
  const end = start + count;
  tasks.slice(start, end).forEach((task) => {
    const taskControler = new TaskController(container, onDataChange, onViewChange);
    taskControler.render(task);
  });
  tasksOnBoard += count;
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._tasks = [];
    this._showedTaskControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._noTasksComponent = new NoTasks();
    this._sortComponent = new BoardSort();
    this._boradTasksListComponent = new BoardTaskList();
    this._loadMoreButtonComponent = new BtnMore();
  }

  render(tasks) {
    this._tasks = tasks;
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);
    const container = this._container.getElement();

    const renderLoadMoreButton = () => {
      if (this._tasks.length <= SHOWING_TASKS_COUNT_ON_ITERATION) {
        return;
      }
      render(container, this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setClickHandler(() => {
        let balanseTasks = this._tasks.length - tasksOnBoard;
        if (balanseTasks) {
          if (balanseTasks - SHOWING_TASKS_COUNT_ON_ITERATION >= 1) {
            renderTasks(taskListElement, this._tasks, this._onDataChange, this._onViewChange, SHOWING_TASKS_COUNT_ON_ITERATION);
          } else {
            renderTasks(taskListElement, this._tasks, this._onDataChange, this._onViewChange, balanseTasks);
            remove(this._loadMoreButtonComponent);
          }
        }
      });
    };

    if (!this._tasks.length || isAllTasksArchived) {
      render(container, this._noTasksComponent);
      return;
    }
    render(container, this._sortComponent);
    render(container, this._boradTasksListComponent);

    const taskListElement = this._boradTasksListComponent.getElement();

    renderTasks(taskListElement, this._tasks, this._onDataChange, this._onViewChange, SHOWING_TASKS_COUNT_ON_ITERATION);

    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
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
      tasksOnBoard = 0;
      taskListElement.innerHTML = ``;

      renderTasks(taskListElement, sortedTasks, this._onDataChange);

      if (sortType === SortType.DEFAULT) {
        renderLoadMoreButton();
      } else {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((item) => item === oldData);

    if (index === -1) {
      return;
    }

    this._tasks[index] = newData;
    taskController.render(this._tasks[index]);
  }

  _onViewChange() {
    // this._showedTaskControllers.forEach((item) => item.setDefaultView());
  }
  _renderLoadMoreButton() {

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

    const taskListElement = this._tasksComponent.getElement();
    tasksOnBoard = 0;
    taskListElement.innerHTML = ``;

    const newTasks = renderTasks(taskListElement, sortedTasks, this._onDataChange);
    this._showedTaskControllers = newTasks;

    if (sortType === SortType.DEFAULT) {
      this._renderLoadMoreButton();
    } else {
      remove(this._loadMoreButtonComponent);
    }
  }
}
