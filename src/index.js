import _, { property } from 'lodash'
import './style.css';


function component() {
    const element = document.createElement('div');
    element.classList.add('main')
    const header = document.createElement('h1')
    header.textContent = "Todo App"
    element.appendChild(header)

    return element;
  }
  

  document.body.appendChild(component());

  const todo = {
    tasks: [],
    newTask: function(title, description, priority) {
      let index = todo.tasks.length
      //const arrayCheck = todo.tasks.filter((obj) => obj.index === index)
      //console.log(index)
      this.tasks.push({index, title, description, priority})
      return //component(title,description,priority)
  }, 
    getTasks: function () {
        this.tasks.forEach((key) => {
            console.log(key)
        })
    },
    render: function(title,description,priority) {
        // call component to render
    },
    delete: function(index){
      todo.tasks.forEach((key =>{
        if (key.index == index){
          todo.tasks.splice(index, 1)
          console.log(todo.tasks)
        }
      }))
    },
    edit: function(){

    }
  }

  todo.newTask('Rubbish', "Take bin out", "1")
  todo.newTask('Shopping', "Go to ASDA ", "2")
  todo.newTask('Shopping', "Go to ASDA ", "2")
  todo.newTask('Shopping', "Go to ASDA ", "2")
  todo.newTask('Shopping', "Go to ASDA ", "2")
  todo.newTask('Shopping', "Go to ASDA ", "2")
  todo.newTask('Shopping', "Go to ASDA ", "2")
  todo.newTask('Shopping', "Go to ASDA ", "2")
  todo.newTask('Shopping', "Go to ASDA ", "2")
  //todo.getTasks()
  todo.delete(4)
  todo.delete(2)
  todo.delete(5)
  todo.newTask('Shopping', "Go to ASDA ", "2")
  //todo.getTasks()


  /*const obj = todo.tasks.filter((object) =>{
        return object.index === index
      })
      delete this.obj
      todo.getTasks()
      return console.log(obj)


      console.log(this.tasks)
      this.tasks = todo.tasks.filter(i => i.index === index)
      console.log(todo.tasks)*/