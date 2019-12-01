const filterNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`
];

const createFilters = (tasks) => {
  const today = new Date();

  const all = tasks.length;
  const overdue = tasks.filter((task) => task.dueDate instanceof Date && task.dueDate < today).length;
  const todayFilter = tasks.filter((task) => task.dueDate instanceof Date && task.dueDate.getDay() === today.getDay() &&
  task.dueDate.getMonth() === today.getMonth()).length;
  return [{name: `all`, count: all}, {name: `overdue`, count: overdue}, {name: `today`, count: todayFilter}];
};

const generateFilters = (tasks) => {
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
