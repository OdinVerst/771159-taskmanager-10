import {getRandomItem} from "../utils";

const DescriptionItems = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];

export const generateTask = () => {
  return {
    description: getRandomItem(DescriptionItems),
  };
};
