export default function newTodo(){
    const element = document.createElement('div')
    element.classList.add('new-todo')
    const p = document.createElement('p')
    p.textContent = "Title"
    element.appendChild(p)
    const input = document.createElement('input')
    element.appendChild(input)
    const main = document.querySelector('.todos')
    main.appendChild(element)
    console.log("new Todo")
    return element
}