import { controller } from "./controller";
// Todo methods
export const todo = {
  tasks: [],
  category: ["General"],
  newTask: function (title, description, priority, date, notes, list) {
    this.tasks.push({ title, description, priority, date, notes, list });
    this.storeTask({ title, description, priority, date, notes, list });
    controller.resetData();
    this.render();
  },
  newList: function (value) {
    let oldItems = JSON.parse(localStorage.getItem("listsArray")) || [];
    let newItem = value;
    oldItems.push(newItem);
    localStorage.setItem("listsArray", JSON.stringify(oldItems));
  },
  storeTask: function (obj) {
    let oldItems = JSON.parse(localStorage.getItem("itemsArray")) || [];
    let newItem = obj;
    oldItems.push(newItem);
    localStorage.setItem("itemsArray", JSON.stringify(oldItems));
  },
  getTasks: function () {
    return this.tasks;
  },
  getList: function () {
    return JSON.parse(localStorage.getItem("listsArray")) || [];
  },
  getListLength: function () {
    const myLists = JSON.parse(localStorage.getItem("listsArray")) || [];
    return myLists.length;
  },
  delete: function (index) {
    this.tasks.splice(index, 1);
  },
  deleteCategory: function (index) {
    this.category.splice(index, 1);
  },
  render: function () {
    controller.render();
  },
  getLocalStorage: function () {
    return JSON.parse(localStorage.getItem("itemsArray")) || [];
  },
};
