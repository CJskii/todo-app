import _, { head, property } from "lodash";
import "./style.css";

// Invoke App
(function () {
  let myArray = [];

  const todo = {
    tasks: [],
    newTask: function (title, description, priority, date, notes) {
      this.tasks.push({ title, description, priority, date, notes });
      // call this.render
      controller.resetData();
      this.render();
    },
    getTasks: function () {
      return this.tasks;
    },
    delete: function (index) {
      this.tasks.splice(index, 1);
    },
    render: function () {
      controller.render();
    },
  };

  // Factory
  const element = {
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

  // Event
  const listeners = {
    // initiate eventListeners
    init: function () {
      this.addButton();
    },
    addButton: function () {
      let buttons = document.querySelectorAll(".btn");
      buttons.forEach((button) => {
        button.addEventListener("click", (e) => listeners.buttons(e));
      });
    },
    addInput: function () {
      let input = document.querySelector(".input");
      input.addEventListener("keyup", (e) => listeners.input(e));
      console.log("listener added");
    },
    buttons: function (e) {
      const input = element.search(".input");
      if (input == null) {
        controller.inputs();
        listeners.addInput();
      } else if (input != null) {
        let value = input.value;
        controller.data(value);
        controller.inputs();
      } else {
        return;
      }
    },
    input: function (e) {
      const value = e.target.value;
      const button = element.search(".btn");
      if (value == "") {
        element.addText(button, "New Todo");
      } else if (value != null) {
        element.addText(button, "Submit");
      }
    },
  };

  // App
  const controller = {
    init: function () {
      // initiate application
      this.header();
      this.buttons();
      listeners.init();
    },
    document: function () {
      const main = element.search(".main");
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
      // call logic to create component from todo.tasks
      const tasks = todo.tasks;
      tasks.forEach((key) => {});
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
        // reset state
        let main = element.search(".main");
        element.remove(main, input);
        //components.card();
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
      console.log({ title, description, priority, date, notes });
    },
    resetData: function () {
      myArray = [];
    },
  };
  const components = {
    card: function () {
      const main = element.search(".main");
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
    renderText: function () {},
    buttonsText: function () {},
  };
  controller.init();
  todo.getTasks();
  todo.newTask("Rubbish", "Take bin out", "1");
  todo.newTask("Shopping", "Go to ASDA ", "2");
})();
