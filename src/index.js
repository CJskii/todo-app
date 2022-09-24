import _ from 'lodash'
import './style.css';
///import xxx from './icon.png';
import printMe from './home.js';

function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
  }
  
  document.body.appendChild(component());
  index.html