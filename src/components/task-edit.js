import {Days, ColorItems, MonthNames} from "../const";
import {formatTime} from "../utils";

const createColorsMarkup = (colors, checkColor) => {
  return colors
    .map((color) => {
      const isCheck = color === checkColor;
      return `<input
        type="radio"
        id="color-${color}-4"
        class="card__color-input card__color-input--${color} visually-hidden"
        name="color"
        value="${color}"
        ${isCheck ? `checked` : ``}
      />
      <label
        for="color-${color}-4"
        class="card__color card__color--${color}"
        >${color}</label
    >`;
    })
    .join(`\n`);
};

const createHashtagsMarkup = (hashtags) => {
  return hashtags
    .map((hashtag) => {
      return `<span class="card__hashtag-inner">
        <input
          type="hidden"
          name="hashtag"
          value="${hashtag}"
          class="card__hashtag-hidden-input"
        />
        <p class="card__hashtag-name">
          #${hashtag}
        </p>
        <button type="button" class="card__hashtag-delete">
          delete
        </button>
    </span>`;
    })
    .join(`\n`);
};

const createDaysRepeat = (days, repeatingDays) => {
  return days
    .map((day) => {
      const isCheck = repeatingDays[day];
      return `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-4"
        name="repeat"
        value="${day}"
        ${isCheck ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${day}-4"
        >${day}</label
    >`;
    })
    .join(`\n`);
};

export const templateEditTask = (task) => {
  const {description, tags, dueDate, color, repeatingDays} = task;

  const hashtagMarkup = createHashtagsMarkup(Array.from(tags));
  const colorsMarkup = createColorsMarkup(ColorItems, color);
  const repeatingDaysMarkup = createDaysRepeat(Days, repeatingDays);

  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingTask
    ? `card--repeat`
    : ``;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  const date = isDateShowing
    ? `${dueDate.getDate()} ${MonthNames[dueDate.getMonth()]}`
    : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  return `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${description}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${isDateShowing ? `Yes` : `No`}</span>
              </button>
              ${isDateShowing ? `
              <fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="${date} ${time}"
                  />
                </label>
              </fieldset>` : ``}

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${isRepeatingTask ? `Yes` : `No`}</span>
              </button>
              ${isRepeatingTask ? `
              <fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                  ${repeatingDaysMarkup}
                </div>
              </fieldset>` : ``}
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${hashtagMarkup}
              </div>

              <label>
                <input
                  type="text"
                  class="card__hashtag-input"
                  name="hashtag-input"
                  placeholder="Type new hashtag here"
                />
              </label>
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${colorsMarkup}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`;
};