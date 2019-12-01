const createFiltersCount = (tasks) => {
  const today = new Date();

  const allCount = tasks.length;
  const overdueCount = tasks.filter((task) => task.dueDate instanceof Date && task.dueDate < today).length;
  const todayFilterCount = tasks.filter((task) => task.dueDate instanceof Date && task.dueDate.getDay() === today.getDay() &&
  task.dueDate.getMonth() === today.getMonth()).length;
  const favoritesCount = tasks.filter((task) => !!task.isFavorite).length;
  const repeatingCount = tasks.filter((task) => Object.values(task.repeatingDays).some(Boolean)).length;
  const tagsCount = tasks.filter((task) => task.tags.size).length;
  const archiveCount = tasks.filter((task) => !!task.isArchive).length;

  return [
    {name: `all`, count: allCount},
    {name: `overdue`, count: overdueCount},
    {name: `today`, count: todayFilterCount},
    {name: `favorites`, count: favoritesCount},
    {name: `repating`, count: repeatingCount},
    {name: `tags`, count: tagsCount},
    {name: `archive`, count: archiveCount}
  ];
};

const generateFilters = (tasks) => {
  const filters = createFiltersCount(tasks);
  return filters.map((filterItem) => {
    const {name, count} = filterItem;
    return {
      name,
      count,
    };
  });
};

export {generateFilters};
