import Menu from "./components/menu";
import Filter from "./components/filter";
import Board from "./components/board";
import Task from "./components/task";
import TaskEdit from "./components/task-edit";
import BtnMore from "./components/btn-more";
import {render, RenderPosition} from "./utils";
import {generateTasks} from "./mock/tasks";
import {generateFilters} from "./mock/filter";

const COUNT_TASKS = 22;
const SHOWING_TASKS_COUNT_ON_ITERATION = 8;
const ALL_TASKS = generateTasks(COUNT_TASKS);
let tasksOnBoard = 0;

const mainControlElement = document.querySelector(`.main__control`);
const mainElement = document.querySelector(`.main`);

render(mainControlElement, new Menu().getElement(), RenderPosition.BEFOREEND);

const filters = generateFilters(ALL_TASKS);
render(mainElement, new Filter(filters).getElement(), RenderPosition.BEFOREEND);

render(mainElement, new Board().getElement(), RenderPosition.BEFOREEND);

const boardTask = document.querySelector(`.board__tasks`);

const createTask = (task) => {
  const taskComponent = new Task(task);
  const taskEditComponent = new TaskEdit(task);

  const editBtn = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editBtn.addEventListener(`click`, () => {
    boardTask.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  });

  const submitEditTask = taskEditComponent.getElement().querySelector(`.card__form`);
  submitEditTask.addEventListener(`click`, () => {
    boardTask.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  });

  render(boardTask, taskComponent.getElement(), RenderPosition.BEFOREEND);
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

renderTasks(SHOWING_TASKS_COUNT_ON_ITERATION);

const board = document.querySelector(`.board`);

const btnMore = new BtnMore();
render(board, btnMore.getElement(), RenderPosition.BEFOREEND);

btnMore.getElement().addEventListener(`click`, () => {
  let balanseTasks = COUNT_TASKS - tasksOnBoard;
  if (balanseTasks) {
    if (balanseTasks - SHOWING_TASKS_COUNT_ON_ITERATION >= 1) {
      renderTasks(SHOWING_TASKS_COUNT_ON_ITERATION);
    } else {
      renderTasks(balanseTasks);
      btnMore.getElement().remove();
      btnMore.removeElement();
    }
  }
});
