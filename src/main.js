import Menu from "./components/menu";
import Filter from "./components/filter";
import Board from "./components/board";
import {render} from "./utils/render";
import {generateTasks} from "./mock/tasks";
import {generateFilters} from "./mock/filter";
import BoardController from "./controllers/board";


const COUNT_TASKS = 22;
const ALL_TASKS = generateTasks(COUNT_TASKS);

const mainControlElement = document.querySelector(`.main__control`);
const mainElement = document.querySelector(`.main`);

render(mainControlElement, new Menu());

const filters = generateFilters(ALL_TASKS);
render(mainElement, new Filter(filters));

const boardComponent = new Board();
render(mainElement, boardComponent);
const boardController = new BoardController(boardComponent);
boardController.render(ALL_TASKS);


