
// JS - ./js/index.js
import './js/'
// SCSS
import './scss/main.scss'
// CSS (example)
import './css/main.css'

// Bootstrap (example)
// import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

// add new item

var addButton = document.getElementById('button').addEventListener('click', addButtonClick);

function addButtonClick() {
    var item = document.getElementById("itemek");
    var clone = item.firstElementChild.cloneNode(true);
    item.appendChild(clone);
    
    
    
    
    // var copyDiv = document.getElementsByTagName("li");
    // copyDiv.innerHTML = "";
    // document.getElementById("liItem").appendChild(copyDiv);
};


