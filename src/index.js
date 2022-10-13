import _ from 'lodash'
import './style.css';
///import xxx from './icon.png';
//import printMe from './home.js';
import Buttons from './buttons';
import Todos from './todos';

function component() {
    const element = document.createElement('div');
    element.classList.add('main')
    const header = document.createElement('h1')
    header.textContent = "Todo App"
    element.appendChild(header)
    element.appendChild(Buttons())
    element.appendChild(Todos())


    return element;
  }
  
  document.body.appendChild(component());