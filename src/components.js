import { element } from "./elements";
export const components = {
  card: function () {
    const main = document.querySelector(".main");
    const container = element.create("div", "card");
    const header = element.create("h5", "header");
    const date = element.create("span", "date");
    const priority = element.create("p", "priority");
    const notes = element.create("p", "notes");
    const buttons = element.create("div", "card-btns");
    const btnCompleted = element.create("button", "card-btn");
    const btnDeleted = element.create("button", "card-btn");
    element.append(container, header);
    element.append(container, date);
    element.append(container, priority);
    element.append(container, notes);
    element.append(buttons, btnCompleted);
    element.append(buttons, btnDeleted);
    element.append(container, buttons);
    element.addText(header, "Hello Card");
    element.append(main, container);
    return container;
  },
};

function elem() {
  const main = document.querySelector(".main");
  const container = document.createElement("div");
  const header = document.createElement("h5");
  const date = document.createElement("span");
  const priority = document.createElement("p");
  const notes = document.createElement("p");
  const buttons = document.createElement("div");
  const btnCompleted = document.createElement("button");
  const btnDeleted = document.createElement("button");
}
