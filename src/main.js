import Menu from "./components/menu";
import Filter from "./components/filter";
import Board from "./components/board";
import BoardSort from "./components/board-filtter";
import NoTasks from "./components/no-tasks";
import Task from "./components/task";
import TaskEdit from "./components/task-edit";
import BtnMore from "./components/btn-more";
import {render, remove, replace} from "./utils/render";
import {generateTasks} from "./mock/tasks";
import {generateFilters} from "./mock/filter";
import BoardTaskList from "./components/board-tasks-list";


const COUNT_TASKS = 22;
const SHOWING_TASKS_COUNT_ON_ITERATION = 8;
const ALL_TASKS = generateTasks(COUNT_TASKS);
let tasksOnBoard = 0;
const isAllTasksArchived = ALL_TASKS.every((task) => task.isArchive);

const mainControlElement = document.querySelector(`.main__control`);
const mainElement = document.querySelector(`.main`);

render(mainControlElement, new Menu());

const filters = generateFilters(ALL_TASKS);
render(mainElement, new Filter(filters));

render(mainElement, new Board());
const boardElement = document.querySelector(`.board`);

const createTask = (task) => {
  const taskComponent = new Task(task);
  const taskEditComponent = new TaskEdit(task);

  const boardTask = document.querySelector(`.board__tasks`);

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

  taskComponent.setEditButtonClickHandler(()=> {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setSubmitHandler(replaceEditToTask);

  render(boardTask, taskComponent);
};

const renderTasks = (count) => {
  const itaration = Math.round(tasksOnBoard / SHOWING_TASKS_COUNT_ON_ITERATION);
  const start = (itaration * SHOWING_TASKS_COUNT_ON_ITERATION);
  const end = start + count;
  ALL_TASKS.slice(start, end).forEach((task) => {
    createTask(task);
  });
  tasksOnBoard += count;
};

if (!ALL_TASKS.length || isAllTasksArchived) {
  render(boardElement, new NoTasks());
} else {
  render(boardElement, new BoardSort());
  render(boardElement, new BoardTaskList());
  renderTasks(SHOWING_TASKS_COUNT_ON_ITERATION);

  const board = document.querySelector(`.board`);

  const btnMore = new BtnMore();
  render(board, btnMore);

  btnMore.setClickHandler(() => {
    let balanseTasks = COUNT_TASKS - tasksOnBoard;
    if (balanseTasks) {
      if (balanseTasks - SHOWING_TASKS_COUNT_ON_ITERATION >= 1) {
        renderTasks(SHOWING_TASKS_COUNT_ON_ITERATION);
      } else {
        renderTasks(balanseTasks);
        remove(btnMore);
      }
    }
  });
}
