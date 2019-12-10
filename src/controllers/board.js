import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import {replace, render, remove} from "../utils/render";
import NoTasks from "../components/no-tasks";
import BoardSort, {SortType} from "../components/board-sort";
import BtnMore from "../components/btn-more";
import BoardTaskList from "../components/board-tasks-list";

let tasksOnBoard = 0;
const SHOWING_TASKS_COUNT_ON_ITERATION = 8;

const createTask = (container, task) => {
  const taskComponent = new Task(task);
  const taskEditComponent = new TaskEdit(task);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setSubmitHandler(replaceEditToTask);
  render(container, taskComponent);
};

const renderTasks = (container, tasks, count = tasks.length) => {
  const itaration = Math.round(tasksOnBoard / SHOWING_TASKS_COUNT_ON_ITERATION);
  const start = itaration * SHOWING_TASKS_COUNT_ON_ITERATION;
  const end = start + count;
  tasks.slice(start, end).forEach((task) => {
    createTask(container, task);
  });
  tasksOnBoard += count;
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasks();
    this._sortComponent = new BoardSort();
    this._boradTasksListComponent = new BoardTaskList();
    this._loadMoreButtonComponent = new BtnMore();
  }

  render(tasks) {
    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    const container = this._container.getElement();

    const renderLoadMoreButton = () => {
      if (tasks.length <= SHOWING_TASKS_COUNT_ON_ITERATION) {
        return;
      }
      render(container, this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setClickHandler(() => {
        let balanseTasks = tasks.length - tasksOnBoard;
        if (balanseTasks) {
          if (balanseTasks - SHOWING_TASKS_COUNT_ON_ITERATION >= 1) {
            renderTasks(taskListElement, tasks, SHOWING_TASKS_COUNT_ON_ITERATION);
          } else {
            renderTasks(taskListElement, tasks, balanseTasks);
            remove(this._loadMoreButtonComponent);
          }
        }
      });
    };

    if (!tasks.length || isAllTasksArchived) {
      render(container, this._noTasksComponent);
      return;
    }
    render(container, this._sortComponent);
    render(container, this._boradTasksListComponent);

    const taskListElement = this._boradTasksListComponent.getElement();

    renderTasks(taskListElement, tasks, SHOWING_TASKS_COUNT_ON_ITERATION);


    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedTasks = [];

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
      tasksOnBoard = 0;
      taskListElement.innerHTML = ``;

      renderTasks(taskListElement, sortedTasks);
      if (sortType === SortType.DEFAULT) {
        renderLoadMoreButton();
      } else {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
