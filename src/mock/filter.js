const filterNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`
];

const createFilters = (tasks) => {
  const today = new Date();

  const all = tasks.length;
  const overdue = tasks.filter((task) => task.dueDate instanceof Date && task.dueDate < today).length;
  const todayFilter = tasks.filter((task) => task.dueDate instanceof Date && task.dueDate.getDay() === today.getDay() &&
  task.dueDate.getMonth() === today.getMonth()).length;
  const favorites = tasks.filter((task) => !!task.isFavorite).length;
  // Переделать
  const repeating = tasks.filter((task) => !!task.repeatingDays).length;
  const tags = tasks.filter((task) => task.tags.size).length;
  const archive = tasks.filter((task) => !!task.isArchive).length;
  return [{name: `all`, count: all}, {name: `overdue`, count: overdue},
  {name: `today`, count: todayFilter}, {name: `favorites`, count: favorites},
  {name: `repating`, count: repeating}, {name: `tags`, count: tags}, {name: `archive`, count: archive}];
};

const generateFilters = (tasks) => {
  console.log(tasks);
  const filters = createFilters(tasks);

  return filters.map((filterItem) => {
    const {name, count} = filterItem;
    return {
      name,
      count,
    };
  });
};

export {generateFilters};
