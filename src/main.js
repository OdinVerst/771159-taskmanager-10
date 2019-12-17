import Menu from "./components/menu";
import Board from "./components/board";
import BoardController from "./controllers/board";
import FilterController from "./controllers/filter";
import TasksModel from "./models/tasks";
import {render} from "./utils/render";
import {generateTasks} from "./mock/tasks";

const COUNT_TASKS = 22;
const ALL_TASKS = generateTasks(COUNT_TASKS);

const taskModel = new TasksModel();
taskModel.setTasks(ALL_TASKS);

const mainControlElement = document.querySelector(`.main__control`);
const mainElement = document.querySelector(`.main`);

render(mainControlElement, new Menu());

const filterController = new FilterController(mainElement, taskModel);
filterController.render();

const boardComponent = new Board();
render(mainElement, boardComponent);
const boardController = new BoardController(boardComponent, taskModel);
boardController.render();


