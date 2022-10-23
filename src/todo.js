import { controller } from "./controller";
// Todo methods
export const todo = {
  tasks: [],
  category: ["General", "Work", "Shopping"],
  newTask: function (title, description, priority, date, notes, list) {
    this.tasks.push({ title, description, priority, date, notes, list });
    controller.resetData();
    this.render();
  },
  getTasks: function () {
    return this.tasks;
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
  getList: function () {
    return this.category.length;
  },
};
