export default function Todos(){
    const element = document.createElement('div')
    element.classList.add('todos')
    const header = document.createElement('h4')
    header.textContent = "My Todo List"
    element.appendChild(header)
    element.appendChild(Tasks())
    element.appendChild(Task())
    return element
}


function Tasks(){
    const element = document.createElement('div')
    element.classList.add('tasks')
    const title = document.createElement('span')
    title.textContent = "Title"
    const description = document.createElement('span')
    description.textContent = "Description"
    const date = document.createElement('span')
    date.textContent = "Due Date"
    const priority = document.createElement('span')
    priority.textContent = "Priority"
    const notes = document.createElement('span')
    notes.textContent = "Notes"


    element.appendChild(title)
    element.appendChild(description)
    element.appendChild(priority)
    element.appendChild(date)
    element.appendChild(notes)
    

    return element
}

function Task(){
    const element = document.createElement('div')
    element.classList.add('task')
    const title = document.createElement('span')
    title.textContent = "Rubbish bin"
    const description = document.createElement('span')
    description.textContent = "Take bins out"
    const date = document.createElement('span')
    date.textContent = "15th of October"
    const priority = document.createElement('span')
    priority.textContent = "1"
    const notes = document.createElement('span')
    notes.textContent = "Cardboard bin is full"

    element.appendChild(title)
    element.appendChild(description)
    element.appendChild(priority)
    element.appendChild(date)
    element.appendChild(notes)

    return element
}
