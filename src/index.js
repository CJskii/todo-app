import _, { property } from 'lodash'
import './style.css';


function App() {
    const element = document.createElement('div');
    element.classList.add('main')
    const header = document.createElement('h1')
    header.textContent = "Todo App"
    element.appendChild(header)

    return element;
  }
  
  document.body.appendChild(App());

  // TODO app methods

  const todo = {
    tasks: [],
    newTask: function (title, description, priority) {
      this.tasks.push({title, description, priority})
    }, 
    getTasks: function () {
        return this.tasks
    },
    delete: function (index) {
        this.tasks.splice(index, 1)
    }
  }

  // Components factory

  const element = {
    create: function (type, elClass) {
      const element = document.createElement(type)
      element.classList.add(elClass)
      return element
    },
    append: function (parent, element) {
      parent.appendChild(element)
    },
    remove: function (parent, element) {
      parent.removeChild(element)
    }
  }

  // Text factory

  const text = {
    add: function (element, text) {
      element.textContent = text
    },
    clear: function (element) {
      element.textContent = ""
    }
  }

