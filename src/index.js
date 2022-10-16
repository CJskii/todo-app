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
    },
    placeholder: function (element, text){
      element.placeholder = text
    }
  }


  todo.getTasks()
  todo.newTask('Rubbish', "Take bin out", "1")
  todo.newTask('Shopping', "Go to ASDA ", "2")

    // Event listeners
    const listeners = {
      init: function () {
        this.add()
        // initiate listeners
      },
      add: function (){
        let buttons = document.querySelectorAll('.btn')
        buttons.forEach((button) => {
          button.addEventListener('click', (e) => listeners.buttons(e))
        })
      },
      buttons: function (e) {
        const btnText = e.target.textContent
        // new conditions for buttons
        if (btnText == "New Todo"){
          e.target.textContent = "Submit"
          controller.inputs()
          // pupulate inputs
          //controller.inputs()
        } else if (btnText == "Submit"){
          e.target.textContent = "New Todo"
          controller.inputs()
          // controller.render()
          // take values from inputs and pass to populate components
        }
      },
      data: function () {

      }
    }

    // App controller

    const controller = {
      document: function () {
        const main = document.querySelector('.main')
        return main
      },
      buttons: function () {
        const parent = controller.document()
        const container = element.create("div", "buttons")
        const newBtn = element.create("button", "btn")
        text.add(newBtn, "New Todo")
        element.append(container, newBtn)
        element.append(parent, container) 
        return container
      },
      init: function () {
        this.buttons()
        listeners.init()
        // init application
      },
      render: function () {
  
      }, 
      inputs: function () {
        const inpCheck = document.querySelector('.input')
        const parent = controller.document()
        
        if (inpCheck === null) {
          const input = element.create("input", "input")
          text.placeholder(input, "Title")
          element.append(parent, input)
        } else if (inpCheck.placeholder == "Title") {
          // pass value to data handler 
          console.log(inpCheck.value)
          inpCheck.placeholder = "Description"
        } else if (inpCheck.placeholder == "Description"){
          inpCheck.placeholder = "Priority"
        } else if (inpCheck.placeholder == "Priority"){
          inpCheck.placeholder = "Due Date"
          inpCheck.type = "date"
        } else if (inpCheck.placeholder == "Due Date"){
          inpCheck.type = "text"
          inpCheck.placeholder = "Notes"
        }
        
      }
    }
  
    controller.init()

    