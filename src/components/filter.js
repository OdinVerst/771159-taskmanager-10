import AbstractSmartComponent from './abstract-smart-component';

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${isChecked ? `checked` : ``}
      />
      <label for="filter__${name}" class="filter__label">
        ${name} <span class="filter__${name}-count">${count}</span>
      </label>`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((filter, index) => createFilterMarkup(filter, index === 0)).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export default class Filter extends AbstractSmartComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  recoveryListeners() {
    return false;
  }

  updData(filters) {
    this._filters = filters;
    this.rerender();
  }
}
