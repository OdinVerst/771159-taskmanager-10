import {getRandomItem} from "../utils";

const DescriptionItems = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const ColorItems = [`black`, `yellow`, `blue`, `green`, `pink`];

export const generateTask = () => {
  return {
    description: getRandomItem(DescriptionItems),
    dueDate: 1,
    repeatingDays: 1,
    tags: true,
    color: getRandomItem(ColorItems),
    isFavorite: true,
    isArchive: false
  };
};
