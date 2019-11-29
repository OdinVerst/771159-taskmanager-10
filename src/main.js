import {templateFilter} from './components/filter';
import {templateBoard} from './components/board';
import {templateTask} from './components/task';
import {templateBtnMore} from './components/btn-more';
import {templateMenu} from './components/menu';
import {templateCreateTask} from './components/task-add';
import {generateTask} from './mock/tasks';


const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

const mainControl = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);

render(mainControl, templateMenu());
render(main, templateFilter());
render(main, templateBoard());

const boardTask = document.querySelector(`.board__tasks`);

render(boardTask, templateCreateTask());

const COUNT_TASKS = 3;

[...new Array(COUNT_TASKS)].forEach(() => {
  render(boardTask, templateTask());
});

const board = document.querySelector(`.board`);

render(board, templateBtnMore());

console.log(generateTask());
console.log(generateTask());
console.log(generateTask());
