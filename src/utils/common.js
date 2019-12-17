import moment from 'moment';

export const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomInteger = (min, max) => {
  return min + Math.floor(max * Math.random());
};

export const formatTime = (date) => {
  return moment(date).format(`hh:mm A`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

export const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

export const isOverdueDate = (dueDate, date) => {
  return new Date(dueDate) < new Date(date) && !isOneDay(date, dueDate);
};

export const isOneDay = (dateA, dateB) => {
  const firstDate = moment(dateA);
  const secondDate = moment(dateB);
  return firstDate.diff(secondDate, `days`) === 0 && dateA.getDate() === dateB.getDate();
};
