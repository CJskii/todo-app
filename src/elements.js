// Factory
export const element = {
  create: function (type, elClass) {
    const element = document.createElement(type);
    element.classList.add(elClass);
    return element;
  },
  append: function (parent, element) {
    parent.appendChild(element);
  },
  remove: function (parent, element) {
    parent.removeChild(element);
  },
  classAdd: function (element, elClass) {
    element.classList.add(elClass);
  },
  classRemove: function (element, elClass) {
    element.classList.remove(elClass);
  },
  addText: function (element, text) {
    element.textContent = text;
  },
  placeholder: function (element, text) {
    element.placeholder = text;
  },
  search: function (elClass) {
    const element = document.querySelector(elClass);
    return element;
  },
  clearValue: function (element) {
    if (element) {
      element.value = "";
    } else {
      return;
    }
  },
};
