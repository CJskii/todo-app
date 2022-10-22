import { drop } from "lodash";
import { components } from "./components";
import { element } from "./elements";
import { listeners } from "./listeners";
import { todo } from "./todo";
// App
let myArray = [];
export const controller = {
  init: function () {
    // initiate application
    this.header();
    this.buttons();
    listeners.init();
    todo.newTask("Take bins out", "Bins are full", "1", "25/10", "Notes");
    todo.newTask("Shopping", "Go to ASDA", "2", "25/10", "Notes");
    todo.newTask("Shopping", "Go to ASDA", "3", "25/10", "Notes");
    todo.newTask("Shopping", "Go to ASDA", "4", "25/10", "Notes");
    todo.newTask("Shopping", "Go to ASDA", "5", "25/10", "Notes");
  },
  document: function () {
    const main = document.querySelector(".main");
    return main;
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
    element.classAdd(categoryBtn, "btn-category");
    element.addText(newBtn, "New Todo");
    element.addText(categoryBtn, "New List");
    element.append(container, newBtn);
    element.append(container, categoryBtn);
    element.append(parent, container);
    return container;
  },

  render: function () {
    const container = document.querySelector(".todo-container");
    if (container) {
      container.remove();
    }
    const tasks = todo.tasks;
    tasks.forEach((key) => {
      components.cardData(key);
    });
  },
  inputs: function () {
    let input = element.search(".input");
    const parent = controller.document();
    this.categoryInputCheck();
    if (input === null) {
      const input = element.create("input", "input");
      element.classAdd(input, "titleInput");
      element.placeholder(input, "Title");
      element.append(parent, input);
    } else if (input.placeholder == "Title") {
      element.classRemove(input, "titleInput");
      element.classAdd(input, "desc");
      input.placeholder = "Description";
    } else if (input.placeholder == "Description") {
      element.classRemove(input, "desc");
      element.classAdd(input, "priorityInput");
      input.type = "number";
      input.placeholder = "Priority / 1 - 5";
    } else if (input.placeholder == "Priority / 1 - 5") {
      element.classRemove(input, "priorityInput");
      element.classAdd(input, "duedate");
      input.placeholder = "Due Date";
      input.type = "date";
    } else if (input.placeholder == "Due Date") {
      element.classRemove(input, "duedate");
      element.classAdd(input, "notesInput");
      input.type = "text";
      input.placeholder = "Notes";
    } else if (input.placeholder == "Notes") {
      let main = element.search(".main");
      element.remove(main, input);
      this.removeDropdown();
    }
    input = element.search(".input");
    element.clearValue(input);
  },
  categoryInputCheck: function () {
    const input = element.search(".categoryInput");
    if (input != null) {
      input.remove();
    }
  },
  data: function (value) {
    const data = value;
    const input = element.search(".input");
    const name = input.placeholder;
    return this.dataStorage({ name, data });
  },
  dataStorage: function (obj) {
    myArray.push(obj);
    if (myArray.length == "5") {
      this.dataHandler(myArray);
    }
  },
  dataHandler: function (myArray) {
    let myObject = Object.assign(myArray);
    const title = myObject[0].data;
    const description = myObject[1].data;
    const priority = myObject[2].data;
    const date = myObject[3].data;
    const notes = myObject[4].data;
    return todo.newTask(title, description, priority, date, notes);
  },
  resetData: function () {
    myArray = [];
  },
  deleteTask: function (taskTitle) {
    const task = taskTitle;
    const tasks = todo.tasks;
    for (let i = 0; i < tasks.length; i++) {
      if (task == tasks[i].title) {
        todo.delete(i);
        break;
      } else {
        continue;
      }
    }
  },
  renderDropdown: function () {
    components.myDropdown();
  },
  removeDropdown: function () {
    const label = element.search(".drop-label");
    const list = element.search(".drop-select");
    label.remove();
    list.remove();
  },
  dropdownContent: function () {
    const myArray = todo.category;
    const content = element.search(".drop-select");
    myArray.forEach((key) => {
      const option = element.create("option", "option");
      element.addText(option, `${key}`);
      option.setAttribute("value", `${key}`);
      element.append(content, option);
    });
  },
  gridArea: function (area) {
    const todoContainer = element.search(".todo-container");
    todoContainer.style.gridArea = area;
  },
};
