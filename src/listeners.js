import { element } from "./elements";
import { controller } from "./controller";
import { components } from "./components";
import { todo } from "./todo";
import { listButton } from "./controller";
import { validate } from "schema-utils";
// Event
export const listeners = {
  // initiate eventListeners
  init: function () {
    this.buttonListeners();
  },
  buttonListeners: function () {
    const button = element.search(".btn");
    const buttonCategory = element.search(".btn-category");
    const buttonList = element.search(".btn-list");
    button.addEventListener("click", (e) => this.todoBtn(e));
    buttonCategory.addEventListener("click", (e) => this.categoryBtn(e));
    buttonList.addEventListener("click", (e) => this.listBtn(e));
  },
  addInput: function () {
    let input = document.querySelector(".input");
    input.addEventListener("keyup", (e) => this.input(e));
    input.addEventListener("keydown", (e) => this.enterOnInput(e));
  },
  todoBtn: function (e) {
    const input = element.search(".input");
    const myList = element.search(".myLists");
    const categoryinput = element.search(".categoryInput");
    const button = document.querySelector(".btn");
    if (myList) {
      myList.remove();
      this.todoLogic();
    } else if (categoryinput) {
      categoryinput.remove();
      this.todoLogic();
    } else if (input != null) {
      let value = input.value;
      const checker = data.validate(input, value);
      if (checker == false) {
        return;
      } else if (checker == true) {
        value = data.transform(input, value);
        console.log(value);
        button.textContent = "New Todo";
        controller.data(value);
        controller.inputs();
      }
    } else {
      this.todoLogic();
    }
  },
  todoLogic: function () {
    controller.inputs();
    this.addInput();
    controller.renderDropdown();
    controller.render();
    controller.gridArea("4 / 1 / 6 / 6");
  },
  input: function (e) {
    const value = e.target.value;
    const button = document.querySelector(".btn");
    if (value == "") {
      button.textContent = "New Todo";
    } else if (value != null) {
      button.textContent = "Submit";
    }
  },
  enterOnInput: function (e) {
    if (e.key == "Enter") {
      this.todoBtn();
    } else {
      return;
    }
  },
  cardButton: function (btn) {
    if (btn.textContent == "Complete") {
      btn.addEventListener("click", (e) => this.complete(e));
    } else if (btn.textContent == "Delete") {
      btn.addEventListener("click", (e) => this.delete(e));
    }
  },
  complete: function (e) {
    const card = e.path[2];
    for (let i = 0; i < 5; i++) {
      if (card.children[i].style.textDecoration == "") {
        card.children[i].style.textDecoration = "line-through";
      } else {
        card.children[i].style.textDecoration = "";
      }
    }
  },
  delete: function (e) {
    console.log(e.target);
    const card = e.path[2];
    const taskTitle = card.firstChild.textContent;
    controller.deleteTask(taskTitle);
    card.remove();
  },
  categoryBtn: function (e) {
    const input = element.search(".input");
    const categoryInput = element.search(".categoryInput");
    const inputs = element.search(".inputs");
    this.removeInputs(inputs);
    controller.resetData();
    if (categoryInput != null) {
      const value = categoryInput.value;
      const categoryBtn = element.search(".btn-category");
      categoryBtn.textContent = "New List";
      categoryInput.remove();
      controller.gridArea("3 / 1 / 6 / 6");
      console.log(todo.category);
      if (categoryInput.value == "") {
        return;
      } else {
        todo.category.push(value);
      }
    } else if (input == null) {
      this.categoryInput();
    } else if (inputs != null) {
      inputs.remove();
      this.categoryInput();
    }
  },
  removeInputs: function (inputs) {
    if (inputs != null) {
      inputs.remove();
    }
  },
  categoryInput: function () {
    const input = element.create("input", "categoryInput");
    const main = element.search(".main");
    input.placeholder = "List name";
    input.type = "text";
    controller.gridArea("4 / 1 / 6 / 6");
    element.append(main, input);
    this.categoryListener(input);
  },
  categoryListener: function (input) {
    input.addEventListener("keyup", (e) => this.category(e));
    input.addEventListener("keyup", (e) => this.categoryEnter(e));
  },
  category: function (e) {
    let button = element.search(".btn-category");
    let value = e.target.value;
    if (value == "") {
      button.textContent = "New List";
    } else if (value != "") {
      button.textContent = "Submit List";
    }
  },
  categoryEnter: function (e) {
    if (e.key == "Enter") {
      this.categoryBtn();
    } else {
      return;
    }
  },
  listBtn: function (e) {
    const container = element.search(".inputs");
    const lists = element.search(".myLists");
    if (container) {
      container.remove();
      listButton.render();
    } else {
      listButton.render();
    }
  },
  listListeners: function (
    completeBtn,
    deleteBtn,
    priorityUp,
    priorityDown,
    taskContainer
  ) {
    completeBtn.addEventListener("click", (e) => this.completeList(e));
    deleteBtn.addEventListener("click", (e) => this.deleteList(e));
    priorityUp.addEventListener("click", (e) => this.priorityList(e));
    priorityDown.addEventListener("click", (e) => this.priorityList(e));
    taskContainer.addEventListener("click", (e) => this.expandTask(e));
  },
  completeList: function (e) {
    const data = e.path[2].firstChild;
    console.log(data);
    for (let i = 0; i < 5; i++) {
      if (data.children[i].style.textDecoration == "") {
        data.children[i].style.textDecoration = "line-through";
      } else {
        data.children[i].style.textDecoration = "";
      }
    }
  },
  deleteList: function (e) {
    const card = e.path[2];
    const data = e.path[2].firstChild;
    const taskTitle = data.firstChild.textContent;
    controller.deleteTask(taskTitle);
    card.remove();
  },
  priorityList: function (e) {
    const button = e.target.classList.value;
    const data = e.path[3].firstChild;
    const taskTitle = data.firstChild.textContent;
    if (button == "priority-btn priorityUp") {
      console.log("priority up");
      let value = "up";
      controller.priorityTask(taskTitle, value, data);
    } else if (button == "priority-btn priorityDown") {
      console.log("priority down");
      let value = "down";
      controller.priorityTask(taskTitle, value, data);
    }
  },
  expandTask: function (e) {
    const target = e.path[1].classList.value;
    if (target == "list-data") {
      const click = e.path[1];
      const element = click.children;
      const description = element.item(1);
      const notes = element.item(4);
      this.taskDisplay(description, notes);
    } else if (target == "list-card") {
      return;
    }
  },
  taskDisplay: function (description, notes) {
    if (notes == null && description.style.display == "") {
      description.style.display = "none";
    } else if (notes != null && description.style.display == "") {
      description.style.display = "none";
      notes.style.display = "none";
    } else if (notes == null && description.style.display == "none") {
      description.style.display = "";
    } else if (notes != null && description.style.display == "none") {
      description.style.display = "";
      notes.style.display = "";
    }
  },
};

const data = {
  validate: function (input, value) {
    if (value == "" && input.placeholder != "Notes") {
      return false;
    } else if (input.placeholder == "Priority / 1 - 5" && value > 5) {
      return false;
    } else if (input.placeholder == "Due Date" && value.length > 10) {
      return false;
    } else {
      return true;
    }
  },
  transform: function (input, value) {
    const placeholder = input.placeholder;
    let newString;
    if (
      placeholder == "Title" ||
      placeholder == "Description" ||
      placeholder == "Notes"
    ) {
      newString = this.upperCase(value);
      return newString;
    } else if (placeholder == "Due Date") {
      const string = value.split("");
      const newString = string[8] + string[9] + "/" + string[5] + string[6];
      return newString;
    } else {
      return value;
    }
  },
  upperCase: function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
};
