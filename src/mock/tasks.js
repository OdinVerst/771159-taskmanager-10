import {getRandomArrayElement, getRandomInteger} from "../utils/common";
import {COLOR_ITEMS} from "../const";

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const DefaultRepeatingDays = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false
};

const Tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

const BoolVals = [true, false];

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getRandomArrayElement(BoolVals) ? 1 : -1;
  const diffValue = sign * getRandomInteger(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  const days = Object.keys(DefaultRepeatingDays);
  const randomRepeet = {};
  days.forEach((day) => {
    randomRepeet[day] = getRandomArrayElement(BoolVals);
  });
  return Object.assign({}, DefaultRepeatingDays, randomRepeet);
};

const generateTags = (tags) => {
  return tags
    .filter(() => Math.random() > 0.5)
    .slice(0, 3);
};

export const generateTask = () => {
  const dueDate = getRandomArrayElement(BoolVals) ? null : getRandomDate();

  return {
    id: String(new Date() + Math.random()),
    description: getRandomArrayElement(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(Tags)),
    color: getRandomArrayElement(COLOR_ITEMS),
    isFavorite: getRandomArrayElement(BoolVals),
    isArchive: getRandomArrayElement(BoolVals)
  };
};

export const generateTasks = (countTasks) => {
  return [...new Array(countTasks)]
    .map(generateTask);
};
