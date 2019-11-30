import {getRandomItem, getRandomIntegerNumber} from "../utils";

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];
const ColorItems = [`black`, `yellow`, `blue`, `green`, `pink`];

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
  const sign = getRandomItem(BoolVals) ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  const days = Object.keys(DefaultRepeatingDays);
  const randomRepeet = {};
  days.forEach((day) => {
    randomRepeet[day] = getRandomItem(BoolVals);
  });
  return Object.assign({}, DefaultRepeatingDays, randomRepeet);
};

const generateTags = (tags) => {
  return tags
    .filter(() => Math.random() > 0.5)
    .slice(0, 3);
};

export const generateTask = () => {
  const dueDate = getRandomItem(BoolVals) ? null : getRandomDate();

  return {
    description: getRandomItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(Tags)),
    color: getRandomItem(ColorItems),
    isFavorite: getRandomItem(BoolVals),
    isArchive: getRandomItem(BoolVals)
  };
};
