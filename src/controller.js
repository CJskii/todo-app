import { drop, isEqual } from "lodash";
import { components } from "./components";
import { element } from "./elements";
import { listeners } from "./listeners";
import { todo } from "./todo";
// App
let myArray = [];
export const controller = {
  init: function () {
    // initiate application
    components.header();
    components.buttons();
    components.emptyTodos();
    listeners.init();
    /*
    todo.newTask(
      "Take bins out",
      "Bins are full",
      "1",
      "25/10",
      "Notes",
      "Work"
    );
    /*
    todo.newTask("Shopping", "Go to ASDA", "2", "25/10", "Notes", "Shopping");
    todo.newTask("Shopping", "Go to ASDA", "3", "25/10", "Notes", "Shopping");
    */
    //todo.newTask("Shopping", "Go to ASDA", "4", "25/10", "Notes", "Shopping");
    //todo.newTask("Shopping", "Go to ASDA", "5", "25/10", "Notes", "General");
  },
  document: function () {
    const main = document.querySelector(".main");
    return main;
  },
  inputs: function () {
    let input = element.search(".input");
    const parent = controller.document();
    console.log(parent);
    //this.categoryInputCheck();
    if (input === null) {
      const container = element.create("div", "inputs");
      const input = element.create("input", "input");
      element.classAdd(container, "todo-inputs");
      element.classAdd(input, "titleInput");
      element.placeholder(input, "Title");
      element.append(container, input);
      element.append(parent, container);
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
      const main = element.search(".inputs");
      const todoBtn = element.search(".btn");
      element.addText(todoBtn, "New Todo");
      main.remove();
      controller.gridArea("3 / 1 / 6 / 6");
      //this.removeDropdown();
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
      const list = element.search(".drop-select");
      const listValue = list.value;
      myArray.push({ list: listValue });
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
    const list = myObject[5].list;
    return todo.newTask(title, description, priority, date, notes, list);
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
  priorityTask: function (taskTitle, value, data) {
    const task = taskTitle;
    const tasks = todo.tasks;
    for (let i = 0; i < tasks.length; i++) {
      if (task == tasks[i].title) {
        let priority = Number(tasks[i].priority);
        if (value == "up" && priority < 5) {
          priority++;
          tasks[i].priority = priority;
          this.priorityChange(priority, tasks[i].priority);
          this.renderPriority(data, priority);
        } else if (value == "down" && priority <= 5 && priority > 1) {
          priority--;
          tasks[i].priority = priority;
          this.priorityChange(priority, tasks[i].priority);
          this.renderPriority(data, priority);
        } else {
          console.log("Priority should be between 1 and 5");
        }
        break;
      } else {
        continue;
      }
    }
  },
  priorityChange: function (priority, task) {
    if (priority <= 5) {
      task = priority;
    } else {
      return;
    }
  },
  renderPriority: function (data, priority) {
    const prio = data.querySelector(".list-priority");
    element.addText(prio, `Priority: ${priority}`);
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
    if (!todoContainer) {
      return;
    } else {
      todoContainer.style.gridArea = area;
    }
  },
  render: function () {
    const container = document.querySelector(".todo-container");
    let lists = todo.getList();
    if (lists <= 1) {
      if (container) {
        container.remove();
      }
      const tasks = todo.tasks;
      tasks.forEach((key) => {
        components.cardData(key);
      });
    } else if (lists > 1) {
      lista.init();
    }
  },
  renderCheck: function () {
    const tasks = todo.tasks;
    const lists = todo.category;
    let taskArray = [];
    let listArray = [];
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      listArray.push(list);
      for (let j = 0; j < tasks.length; j++) {
        const task = tasks[j].list;
        taskArray.push(task);
      }
    }
    console.log(taskArray);
    console.log(listArray);
    //console.log(isEqual(taskArray, listArray));
  },
};

const lista = {
  init: function () {
    const lists = todo.category;
    const tasks = todo.tasks;
    const todos = element.search(".cards");
    const header = element.search(".cardsHeader");
    if (todos != null) {
      todos.remove();
      header.remove();
    }
    //console.log(lists.length);
    this.container();
    lists.forEach((list) => {
      const task = tasks.filter(function (task) {
        return task.list == list;
      });
      console.log(task);
      if (task.length > 0) {
        components.list(list);
        //this.styles(task.length);
        this.taskData(list);
      }
    });
  },
  container: function () {
    const container = element.search(".todo-container");
    const lists = element.search(".lists");
    if (lists != null) {
      lists.remove();
      const listsContainer = element.create("div", "lists");
      element.append(container, listsContainer);
    } else {
      const listsContainer = element.create("div", "lists");
      element.append(container, listsContainer);
    }
  },
  taskData: function (list) {
    const tasks = todo.tasks;
    tasks.forEach((task) => {
      if (task.list == list) {
        const title = task.title;
        const date = task.date;
        const priority = task.priority;
        this.appendTask({ title, date, priority }, list);
      } else {
        return;
      }
    });
  },
  appendTask: function (obj, list) {
    const container = element.search(`.${list}`);
    const taskContainer = element.create("div", "list-card");
    const data = element.create("div", "list-data");
    const title = element.create("span", "list-title");
    const priority = element.create("span", "list-priority");
    const date = element.create("span", "list-date");
    const buttons = element.create("div", "icons");
    const completeBtn = element.create("i", "list-complete");
    const deleteBtn = element.create("i", "list-delete");
    const priorityBtns = element.create("div", "priorityBtns");
    const priorityUp = element.create("i", "priority-btn");
    const priorityDown = element.create("i", "priority-btn");
    element.classAdd(priorityUp, "priorityUp");
    element.classAdd(priorityDown, "priorityDown");
    listeners.listListeners(completeBtn, deleteBtn, priorityUp, priorityDown);
    element.append(buttons, completeBtn);
    element.append(buttons, deleteBtn);
    element.append(buttons, priorityBtns);
    element.append(priorityBtns, priorityUp);
    element.append(priorityBtns, priorityDown);
    element.addText(title, obj.title);
    element.addText(priority, "Priority: " + obj.priority);
    element.addText(date, "Date: " + obj.date);
    element.append(data, title);
    element.append(taskContainer, data);
    element.append(taskContainer, buttons);
    element.append(data, priority);
    element.append(data, date);
    element.append(container, taskContainer);
  },
};

export const listButton = {
  render: function () {
    this.remove();
    controller.gridArea("4 / 1 / 6 / 6");
    const lists = todo.category;
    lists.forEach((list) => {
      this.createComponent(list);
    });
  },
  remove: function () {
    const inputs = element.search(".inputs");
    const categoryInput = element.search(".categoryInput");
    if (inputs) {
      inputs.remove();
    } else if (categoryInput) {
      categoryInput.remove();
    }
  },
  createComponent: function (list) {
    const inputs = element.search(".inputs");
    console.log(inputs);
    if (!inputs) {
      const inputs = element.create("div", "inputs");
      this.componentTemplate(inputs, list);
    } else if (inputs) {
      this.componentTemplate(inputs, list);
    }
  },
  componentTemplate: function (inputs, list) {
    const main = element.search(".main");
    const listcontainer = element.create("div", "list");
    const paragraph = element.create("p", "list-name");
    const deleteBtn = element.create("i", "list-delete");
    element.classAdd(inputs, "myLists");
    deleteBtn.addEventListener("click", (e) => this.delete(e));
    element.addText(paragraph, list);
    element.append(listcontainer, paragraph);
    element.append(listcontainer, deleteBtn);
    element.append(inputs, listcontainer);
    element.append(main, inputs);
    //element.append(todo, container);
  },
  delete: function (e) {
    // listener to list delete button
    const data = e.path[1];
    const list = data.firstChild.textContent;
    const lists = todo.category;
    if (list == "General") {
      console.log("Cannot delete default list");
      return;
    } else {
      for (let i = 0; i < lists.length; i++) {
        if (lists[i] == list) {
          todo.deleteCategory(i);
          data.remove();
        }
      }
    }
  },
};
