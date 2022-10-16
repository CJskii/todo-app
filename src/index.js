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
    },
    render: function () {
      //call controller.render()
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
    },
    classAdd: function (element, elClass) {
      element.classList.add(elClass)
    },
    classRemove: function (element, elClass){
      element.classList.remove(elClass)
    },
    addText: function (element, text) {
      element.textContent = text
    },
    clearText: function (element) {
      element.textContent = ""
    },
    placeholder: function (element, text) {
      element.placeholder = text
    },
    search: function (elClass) {
      const element = document.querySelector(elClass)
      return element
    },
    clearValue: function (element) {
      console.log(element)
      element.value = ""
    }
  }

  todo.getTasks()
  todo.newTask('Rubbish', "Take bin out", "1")
  todo.newTask('Shopping', "Go to ASDA ", "2")


    // Event listeners
    const listeners = {
      // initiate eventListeners
      init: function () {
        this.addButton()
      },
      addButton: function (){
        let buttons = document.querySelectorAll('.btn')
        buttons.forEach((button) => {
          button.addEventListener('click', (e) => listeners.buttons(e))
        })
      },
      addInput: function () {
        let input = document.querySelector('.input')
        input.addEventListener('keyup', (e) => listeners.input(e))
        console.log("listener added")
      },
      buttons: function (e) {
        const input = element.search('.input')
        if (input == null){
          controller.inputs()
          listeners.addInput()
        } else if (input != null){
          let value = input.value
          controller.data(value)
          controller.inputs()
        } else {
          return;
        }
        
      },
      input: function (e) {
        const value = e.target.value
        const button = element.search('.btn')
        if (value == '') {
          element.addText(button, "New Todo")
        } else if (value != null) {
          element.addText(button, "Submit")
        }
      }
    }

    // App controller

    const controller = {
      init: function () {
        // initiate application
        this.buttons()
        listeners.init()
      },
      document: function () {
        const main = document.querySelector('.main')
        return main
      },
      buttons: function () {
        const parent = controller.document()
        const container = element.create("div", "buttons")
        const newBtn = element.create("button", "btn")
        element.addText(newBtn, "New Todo")
        element.append(container, newBtn)
        element.append(parent, container) 
        return container
      },
      
      render: function () {
        // call logic to create component
      }, 
      inputs: function () {
        let input = document.querySelector('.input')
        const parent = controller.document()
        if (input === null) {
          const input = element.create("input", "input")
          element.classAdd(input, "title")
          element.placeholder(input, "Title")
          element.append(parent, input)
        } else if (input.placeholder == "Title") {
          element.classRemove(input, "title")
          element.classAdd(input, "description")
          input.placeholder = "Description"
        } else if (input.placeholder == "Description"){
          element.classRemove(input, "description")
          element.classAdd(input, "priority")
          input.placeholder = "Priority"
        } else if (input.placeholder == "Priority"){
          element.classRemove(input, "priority")
          element.classAdd(input, "date")
          input.placeholder = "Due Date"
          input.type = "date"
        } else if (input.placeholder == "Due Date"){
          element.classRemove(input, "date")
          element.classAdd(input, "notes")
          input.type = "text"
          input.placeholder = "Notes"
        } else if (input.placeholder == "Notes"){
          // reset state
          // call todo.createTask()
          console.log("now it should reset")
        }
        input = element.search(".input")
        element.clearValue(input)
      },
      data: function (value){
        const data = value
        const input = element.search(".input")
        const name = input.placeholder
        return controller.dataStorage({name, data})
      },
      dataStorage: function (obj){
        // here logic for storing data
        let myArray = []
        myArray.push(obj)
        console.log(myArray)
      }
    }
  
    controller.init()

    