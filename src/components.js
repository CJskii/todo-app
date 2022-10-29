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
    const cards = document.querySelector(".cards");
    const main = document.querySelector(".main");
    if (condition == null) {
      const container = element.create("div", "todo-container");
      const category = element.create("h6", "cardsHeader");
      const cards = element.create("div", "cards");
      element.addText(category, "General");
      element.append(container, category);
      element.append(container, cards);
      element.append(cards, component);
      element.append(main, container);
    } else {
      element.append(cards, component);
    }
  },
  category: function () {
    const main = document.querySelector(".main");
    const category = categoryTemplate("General");
    element.append(main, category);
  },
  myDropdown: function () {
    const main = element.search(".main");
    const label = labelTemplate();
    const select = selectTemplate();
    element.append(main, label);
    element.append(main, select);
    controller.dropdownContent();
  },
  header: function () {
    const element = document.createElement("div");
    element.classList.add("main");
    const header = document.createElement("h1");
    header.textContent = "Todo App";
    element.appendChild(header);
    document.body.appendChild(element);
  },
  buttons: function () {
    const parent = controller.document();
    const container = element.create("div", "buttons");
    const newBtn = element.create("button", "btn");
    const categoryBtn = element.create("button", "btn");
    const listBtn = element.create("button", "btn");
    element.classAdd(categoryBtn, "btn-category");
    element.classAdd(listBtn, "btn-list");
    element.addText(newBtn, "New Todo");
    element.addText(categoryBtn, "New List");
    element.addText(listBtn, "My Lists");
    element.append(container, newBtn);
    element.append(container, categoryBtn);
    element.append(container, listBtn);
    element.append(parent, container);
    return container;
  },
  emptyTodos: function () {
    const main = document.querySelector(".main");
    const container = element.create("div", "todo-container");
    element.append(main, container);
  },
  list: function (list) {
    const container = element.search(`.${list}`);
    if (container == null) {
      const todoContainer = element.search(".lists");
      const listContainer = element.create("div", list);
      element.classAdd(listContainer, "category");
      const header = element.create("h6", "header");
      element.addText(header, list);
      element.append(listContainer, header);
      element.append(todoContainer, listContainer);
      //this.appendTask(listTasks);
    } else if (container != null) {
      return;
    }
    // if no container create container and append tasks
    // if container with list exist append tasks
    //
  },
  appendTask: function (list, listTasks) {},
};

function labelTemplate() {
  const label = element.create("label", "drop-label");
  element.addText(label, "List: ");
  label.setAttribute("for", "list");
  return label;
}

function selectTemplate() {
  const select = element.create("select", "drop-select");
  select.setAttribute("id", "list");
  return select;
}

function cardTemplate(tit, desc, prio, duedate, note) {
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

function categoryTemplate(category) {
  const container = element.create("div", "categoryContainer");
  const header = element.create("h6", "category");
  element.addText(header, category);
  element.append(container, header);
  return container;
}
