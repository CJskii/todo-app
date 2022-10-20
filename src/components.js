import { controller } from "./controller";
import { element } from "./elements";
import { listeners } from "./listeners";
export const components = {
  cardData: function (key) {
    const title = key.title;
    const description = key.description;
    const priority = key.priority;
    const date = key.date;
    const notes = key.notes;
    const card = cardTemplate(title, description, priority, date, notes);
    this.cardContainer(card);
  },
  cardContainer: function (component) {
    const condition = document.querySelector(".todo-container");
    const main = document.querySelector(".main");
    if (condition == null) {
      const container = element.create("div", "todo-container");
      element.append(container, component);
      element.append(main, container);
    } else {
      element.append(condition, component);
    }
  },
};

function cardTemplate(tit, desc, prio, duedate, note) {
  //const main = document.querySelector(".main");
  const container = element.create("div", "card");
  const header = element.create("h5", "header");
  const description = element.create("p", "description");
  const date = element.create("span", "date");
  const priority = element.create("p", "priority");
  const notes = element.create("p", "notes");
  const buttons = element.create("div", "card-btns");
  const btnComplete = element.create("button", "card-btn");
  const btnDelete = element.create("button", "card-btn");
  element.append(container, header);
  element.append(container, description);
  element.append(container, date);
  element.append(container, priority);
  element.append(container, notes);
  element.append(buttons, btnComplete);
  element.append(buttons, btnDelete);
  element.append(container, buttons);
  element.addText(header, tit);
  element.addText(description, desc);
  element.addText(priority, `Priority: ${prio}`);
  element.addText(date, `Due date: ${duedate}`);
  element.addText(notes, note);
  element.addText(btnComplete, "Complete");
  element.addText(btnDelete, "Delete");
  listeners.cardButton(btnComplete);
  listeners.cardButton(btnDelete);
  return container;
}
