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
    this._tasksModel = tasksModel;
    this._showedTaskControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._noTasksComponent = new NoTasks();
    this._sortComponent = new BoardSort();
    this._boradTasksListComponent = new BoardTaskList();
    this._loadMoreButtonComponent = new BtnMore();

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render() {
    const tasks = this._tasksModel.getTasks();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    const container = this._container.getElement();

    if (!tasks.length || isAllTasksArchived) {
      render(container, this._noTasksComponent);
      return;
    }
    render(container, this._sortComponent);
    render(container, this._boradTasksListComponent);

    const newTasks = this._renderTasks(tasks, SHOWING_TASKS_COUNT_ON_ITERATION);
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
    const tasks = this._tasksModel.getTasks();
    if (tasks.length <= SHOWING_TASKS_COUNT_ON_ITERATION) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      let balanseTasks = tasks.length - tasksOnBoard;
      if (balanseTasks) {
        if (balanseTasks - SHOWING_TASKS_COUNT_ON_ITERATION >= 1) {
          const newTasks = this._renderTasks(tasks, SHOWING_TASKS_COUNT_ON_ITERATION);
          this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
        } else {
          const newTasks = this._renderTasks(tasks, balanseTasks);
          this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
          remove(this._loadMoreButtonComponent);
        }
      }
    });
  }

  _onSortTypeChange(sortType) {
    let sortedTasks = [];
    const tasks = this._tasksModel.getTasks();

    switch (sortType) {
      case SortType.DATE_UP:
        sortedTasks = tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        sortedTasks = tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        sortedTasks = tasks.slice(0, SHOWING_TASKS_COUNT_ON_ITERATION);
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
}
