import Menu from "./components/menu";
import Filter from "./components/filter";
import Board from "./components/board";
import BoardController from "./controllers/board";
import FilterController from "./controllers/filter";
import TasksModel from "./models/tasks";
import {render} from "./utils/render";
import {generateTasks} from "./mock/tasks";
import {generateFilters} from "./mock/filter";


const COUNT_TASKS = 22;
const ALL_TASKS = generateTasks(COUNT_TASKS);

const taskModel = new TasksModel();
taskModel.setTasks(ALL_TASKS);

const mainControlElement = document.querySelector(`.main__control`);
const mainElement = document.querySelector(`.main`);

render(mainControlElement, new Menu());

const filters = generateFilters(ALL_TASKS);
const filterComponent = new Filter(filters);
render(mainElement, filterComponent);

const filterController = new FilterController();
filterController.render();

const boardComponent = new Board();
render(mainElement, boardComponent);
const boardController = new BoardController(boardComponent, taskModel, filterComponent);
boardController.render();


