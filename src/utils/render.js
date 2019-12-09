export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (element) => {
  const newElement = document.createElement(`div`);
  newElement.insertAdjacentHTML(RenderPosition.BEFOREEND, element);
  return newElement.firstChild;
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(element.getElement());
      break;
  }
};

export const remove = (element) => {
  element.getElement().remove();
  element.removeElement();
};
