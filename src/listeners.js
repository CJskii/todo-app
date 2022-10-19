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
    let button = element.search(".btn");
    button.addEventListener("click", (e) => listeners.buttons(e));
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
};
