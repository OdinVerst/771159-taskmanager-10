export const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomInteger = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  const interval = date.getHours() > 11 ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
};
