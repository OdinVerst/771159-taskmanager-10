import {templateFilter} from './components/filter';
import {templateBoard} from './components/board';
import {templateTask} from './components/task';
import {templateBtnMore} from './components/btn-more';
import {templateMenu} from './components/menu';
import {templateEditTask} from './components/task-edit';

import {generateTask} from './mock/tasks';
import {generateFilters} from './mock/filter';


const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

const mainControl = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);

render(mainControl, templateMenu());

const filters = generateFilters();
render(main, templateFilter(filters), `beforeend`);
render(main, templateBoard());

const boardTask = document.querySelector(`.board__tasks`);

render(boardTask, templateEditTask(generateTask()));

const COUNT_TASKS = 22;

[...new Array(COUNT_TASKS)].forEach(() => {
  render(boardTask, templateTask(generateTask()));
});

const board = document.querySelector(`.board`);

render(board, templateBtnMore());

