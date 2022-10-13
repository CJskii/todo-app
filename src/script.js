const { getFreePort } = require("webpack-dev-server")

let taskArray = []

// Object constructor
function Todo(title, description, dueDate, priority, notes){
    //this.index = index
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.notes = notes

    // Object prototypes
    Todo.prototype.editTitle = function(newTitle) {
        return this.title = newTitle
    }
    Todo.prototype.editDescription = function(newDescription) {
        return this.description = newDescription
    }
    Todo.prototype.editDueDate = function(newDueDate) {
        return this.dueDate = newDueDate
    }
    Todo.prototype.editPriority = function(newPriority) {
        return this.priority = newPriority
    }
    Todo.prototype.editNotes = function(newNotes) {
        return this.notes = newNotes
    }

    Todo.prototype.remove = function(){    
        delete this.title
        delete this.description
        delete this.dueDate
        delete this.priority
        delete this.notes
    }

}


let task = new Todo("Take rubbish out", "Collection is tomorrow", "Tomorrow", "1", "Next collection in 7 days")
console.log(task)


/*
function createTask(title, description, dueDate, priority, notes){
    const index = "Task #" + (taskArray.length + 1)
    i = taskArray.length
    let task = new Todo(index, title, description, dueDate, priority, notes)
    taskArray.push(task)
}

createTask("Rubbish bin", "Take bin out", "13th of October", "1", "Recycling bin is full")
createTask("Rubbish bin", "Take bin out", "13th of October", "1", "Recycling bin is full")
console.log(taskArray)
*/