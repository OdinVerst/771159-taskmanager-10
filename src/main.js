import {templateFilter} from "./components/filter";
import {templateBoard} from "./components/board";
import {templateTask} from "./components/task";
import {templateBtnMore} from "./components/btn-more";
import {templateMenu} from "./components/menu";
import {templateEditTask} from "./components/task-edit";

import {generateTask, generateTasks} from "./mock/tasks";
import {generateFilters} from "./mock/filter";

const COUNT_TASKS = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON_CLICK = 8;

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

const mainControl = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);

render(mainControl, templateMenu());

const filters = generateFilters(generateTasks(COUNT_TASKS));
render(main, templateFilter(filters), `beforeend`);
render(main, templateBoard());

const boardTask = document.querySelector(`.board__tasks`);

render(boardTask, templateEditTask(generateTask()));

let tasksOnBoard = 1;

const createTasks = (count) => {
  [...new Array(count)].forEach(() => {
    render(boardTask, templateTask(generateTask()));
  });
  tasksOnBoard += count;
};

createTasks(SHOWING_TASKS_COUNT_ON_START - 1);

const board = document.querySelector(`.board`);

render(board, templateBtnMore());

const loadMoreButton = main.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  let balanseTasks = COUNT_TASKS - tasksOnBoard;
  if (balanseTasks) {
    if (balanseTasks - SHOWING_TASKS_COUNT_BY_BUTTON_CLICK >= 1) {
      createTasks(SHOWING_TASKS_COUNT_BY_BUTTON_CLICK);
    } else {
      createTasks(balanseTasks);
      loadMoreButton.remove();
    }
  }
});
