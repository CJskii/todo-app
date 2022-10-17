import { controller } from "./controller";
// Todo methods
export const todo = {
  tasks: [],
  newTask: function (title, description, priority, date, notes) {
    this.tasks.push({ title, description, priority, date, notes });
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
