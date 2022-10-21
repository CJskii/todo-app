import { element } from "./elements";
import { controller } from "./controller";
import { components } from "./components";
// Event
export const listeners = {
  // initiate eventListeners
  init: function () {
    this.addButton();
  },
  addButton: function () {
    const button = element.search(".btn");
    const buttonCategory = element.search(".btn-category");
    button.addEventListener("click", (e) => this.todoBtn(e));
    buttonCategory.addEventListener("click", (e) => this.categoryBtn(e));
  },
  addInput: function () {
    let input = document.querySelector(".input");
    input.addEventListener("keyup", (e) => this.input(e));
    input.addEventListener("keydown", (e) => this.enterOnInput(e));
    console.log("listener added");
  },
  todoBtn: function (e) {
    const input = element.search(".input");
    const inputCategory = element.search(".categoryInput");
    if (input == null) {
      controller.inputs();
      this.addInput();
      controller.render();
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
      this.buttons();
    } else {
      return;
    }
  },
  cardButton: function (btn) {
    if (btn.textContent == "Complete") {
      btn.addEventListener("click", (e) => this.complete(e));
      console.log("Complete button listener added");
    } else if (btn.textContent == "Delete") {
      btn.addEventListener("click", (e) => this.delete(e));
      console.log("Delete button listener added");
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
    const card = e.path[2];
    const taskTitle = card.firstChild.textContent;
    controller.deleteTask(taskTitle);
    card.remove();
  },
  categoryBtn: function (e) {
    const input = element.search(".input");
    const categoryInput = element.search(".categoryInput");
    console.log(input);
    if (input == null) {
      if (categoryInput != null) {
        categoryInput.remove();
      }
      this.categoryInput();
    } else if (input != null) {
      console.log("not null");
      input.remove();
      this.categoryInput();
    } else if (categoryInput != null) {
      return;
    }
  },
  categoryInput: function () {
    const input = element.create("input", "categoryInput");
    const main = element.search(".main");
    input.placeholder = "Category";
    element.append(main, input);
  },
};
