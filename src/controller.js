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
    /*
    todo.newTask(
      "Rubbish",
      "Take bin out",
      "1",
      "22 / 10",
      "notes notes notes notes notes notes notes notes notes"
    );
    todo.newTask("Shopping", "Go to ASDA ", "2", "22 / 20");
    */
    listeners.init();
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
    element.addText(newBtn, "New Todo");
    element.append(container, newBtn);
    element.append(parent, container);
    return container;
  },

  render: function () {
    const tasks = todo.tasks;

    tasks.forEach((key) => {
      components.cardData(key);
      console.log(tasks);
    });
  },
  inputs: function () {
    let input = element.search(".input");
    const parent = controller.document();
    if (input === null) {
      const input = element.create("input", "input");
      element.classAdd(input, "title");
      element.placeholder(input, "Title");
      element.append(parent, input);
    } else if (input.placeholder == "Title") {
      element.classRemove(input, "title");
      element.classAdd(input, "description");
      input.placeholder = "Description";
    } else if (input.placeholder == "Description") {
      element.classRemove(input, "description");
      element.classAdd(input, "priority");
      input.placeholder = "Priority";
    } else if (input.placeholder == "Priority") {
      element.classRemove(input, "priority");
      element.classAdd(input, "date");
      input.placeholder = "Due Date";
      input.type = "date";
    } else if (input.placeholder == "Due Date") {
      element.classRemove(input, "date");
      element.classAdd(input, "notes");
      input.type = "text";
      input.placeholder = "Notes";
    } else if (input.placeholder == "Notes") {
      // remove input
      let main = element.search(".main");
      element.remove(main, input);
      console.log("now it should reset");
    }
    input = element.search(".input");
    element.clearValue(input);
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
};
