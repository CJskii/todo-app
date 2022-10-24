import { element } from "./elements";
import { controller } from "./controller";
import { components } from "./components";
import { todo } from "./todo";
// Event
export const listeners = {
  // initiate eventListeners
  init: function () {
    this.buttonListeners();
  },
  buttonListeners: function () {
    const button = element.search(".btn");
    const buttonCategory = element.search(".btn-category");
    button.addEventListener("click", (e) => this.todoBtn(e));
    buttonCategory.addEventListener("click", (e) => this.categoryBtn(e));
  },
  addInput: function () {
    let input = document.querySelector(".input");
    input.addEventListener("keyup", (e) => this.input(e));
    input.addEventListener("keydown", (e) => this.enterOnInput(e));
  },
  todoBtn: function (e) {
    const input = element.search(".input");
    if (input == null) {
      controller.inputs();
      this.addInput();
      controller.renderDropdown();
      controller.render();
      controller.gridArea("5 / 1 / 6 / 6");
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
    } else if (input != null) {
      controller.removeDropdown();
      console.log("not null");
      input.remove();
      this.categoryInput();
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
  listListeners: function (completeBtn, deleteBtn, priorityUp, priorityDown) {
    completeBtn.addEventListener("click", (e) => this.complete(e));
    deleteBtn.addEventListener("click", (e) => this.delete(e));
    priorityUp.addEventListener("click", (e) => this.priority(e));
    priorityDown.addEventListener("click", (e) => this.priority(e));
  },
  completeList: function () {},
  priority: function () {},
};
