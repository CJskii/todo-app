import _ from 'lodash'
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