import { getTasks, deleteTask } from "./requests";
//import database from "./database";

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addButton = document.getElementById("add");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

let LIST = [0],
    id = 0;

//let data = localStorage.getItem("TODO"); //tutaj wrzucic getter z serwera
//let data = getTasks();

async function generateList() {
    const data = await getTasks();
    //console.log(data)

    if(data) {
        LIST = data;
        id = data.length;
        loadList(data);
    } else {
        LIST = [];
        id = 0;
    }
}

generateList();
//zakomentowane tymczasowo - do wyrzucenia (refactoring na koncu)
/* if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
} */

function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.text, item._id, item.isDone, item.trash);
        console.log(item._id)
    });
}

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do func

//generates content on website
function addToDo(toDo, id, isDone, trash) {

    if (trash) {
        return;
    }

    const DONE = isDone ? CHECK : UNCHECK;
    const LINE = isDone ? LINE_THROUGH : "";

    const item =
        `<li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}"> ${toDo} </p>
        <i class="fas fa-trash-alt de" job="delete" id="${id}"></i>
    </li>`;

    const position = "afterbegin";
    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", addTask);


function addTask(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false)

            LIST.push({
                text: toDo,
                id: id,
                isDone: false,
                trash: false
            });

            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
}


// complete to do

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].isDone = LIST[element.id].isDone ? false : true;
}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

list.addEventListener("click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));

});
