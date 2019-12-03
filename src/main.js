import Menu from "./components/menu";
import Filter from "./components/filter";
import Board from "./components/board";
import Task from "./components/task";
import BtnMore from "./components/btn-more";
import {render} from "./utils";
import {generateTasks} from "./mock/tasks";
import {generateFilters} from "./mock/filter";

const COUNT_TASKS = 22;
const SHOWING_TASKS_COUNT_ON_ITERATION = 8;
const ALL_TASKS = generateTasks(COUNT_TASKS);
let tasksOnBoard = 0;

const mainControlElement = document.querySelector(`.main__control`);
const mainElement = document.querySelector(`.main`);

render(mainControlElement, new Menu().getElement(), `beforeend`);

const filters = generateFilters(ALL_TASKS);
render(mainElement, new Filter(filters).getElement(), `beforeend`);

render(mainElement, new Board().getElement(), `beforeend`);

const boardTask = document.querySelector(`.board__tasks`);

const createTasks = (count) => {
  const itaration = Math.round(tasksOnBoard / SHOWING_TASKS_COUNT_ON_ITERATION);
  const start = (itaration * SHOWING_TASKS_COUNT_ON_ITERATION);
  const end = start + count;
  ALL_TASKS.slice(start, end).forEach((task) => {
    render(boardTask, new Task(task).getElement(), `beforeend`);
  });
  tasksOnBoard += count;
};

createTasks(SHOWING_TASKS_COUNT_ON_ITERATION);

const board = document.querySelector(`.board`);

const btnMore = new BtnMore();
render(board, btnMore.getElement(), `beforeend`);

btnMore.getElement().addEventListener(`click`, () => {
  let balanseTasks = COUNT_TASKS - tasksOnBoard;
  if (balanseTasks) {
    if (balanseTasks - SHOWING_TASKS_COUNT_ON_ITERATION >= 1) {
      createTasks(SHOWING_TASKS_COUNT_ON_ITERATION);
    } else {
      createTasks(balanseTasks);
      btnMore.getElement().remove();
      btnMore.removeElement();
    }
  }
});
