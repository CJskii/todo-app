export default function Buttons(){
    const element = document.createElement('div')
    element.classList.add('buttons')
    const newTask = document.createElement('button')
    const myTasks = document.createElement('button')
    newTask.textContent = "New Task"
    myTasks.textContent = "My List"
    element.appendChild(newTask)
    element.appendChild(myTasks)
    return element
}