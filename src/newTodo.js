export default function newTodo(){
    //resetTodosDisplay()
    const element = document.createElement('div')
    element.classList.add('new-todo')
    const main = document.querySelector('.todos')
    main.appendChild(element)
    element.appendChild(title())
    element.appendChild(description())
    element.appendChild(priority())
    element.appendChild(dueDate())
    element.appendChild(notes())
    console.log(main)
    return element
}

function title(){
    const element = document.createElement('div')
    const input = document.createElement('input')
    const label = document.createElement('label')
    element.classList.add('title')
    label.textContent = "Title"
    label.htmlFor = "Title"
    input.type = "Title"
    element.appendChild(label)
    element.appendChild(input)
    element.addEventListener('change', function(e){
        console.log(e.target.value)
    })
    return element
}

function description(){
    const element = document.createElement('div')
    const input = document.createElement('input')
    const label = document.createElement('label')
    element.classList.add('description')
    label.textContent = "Description"
    label.htmlFor = "Description"
    input.type = "Description"
    element.appendChild(label)
    element.appendChild(input)
    return element
}

function priority(){
    const element = document.createElement('div')
    const input = document.createElement('input')
    const label = document.createElement('label')
    element.classList.add('priority')
    label.textContent = "Priority"
    label.htmlFor = "Priority"
    input.type = "Range"
    input.max = "10"
    input.min = "1"
    element.appendChild(label)
    element.appendChild(input)
    return element
}

function dueDate(){
    const element = document.createElement('div')
    const input = document.createElement('input')
    const label = document.createElement('label')
    element.classList.add('date')
    label.textContent = "Due Date"
    label.htmlFor = "DueDate"
    input.type = "date"
    element.appendChild(label)
    element.appendChild(input)
    return element
}

function notes(){
    const element = document.createElement('div')
    const input = document.createElement('input')
    const label = document.createElement('label')
    element.classList.add('notes')
    label.textContent = "Notes"
    label.htmlFor = "Notes"
    input.type = "Notes"
    element.appendChild(label)
    element.appendChild(input)
    return element
}


