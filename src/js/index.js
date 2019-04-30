// Main js file

// another js file (example)
import "./serverSide";
//import "./calendar.js";
import "@babel/polyfill";
import "./addTask.js";


//Przyklady wykorzystania polaczen z serwerem
import { getTasks, deleteTask, postTask, putTask, getFilteredTasks } from "./requests";

//Obiekt do updateu
const taskObj = {
  text: "changed text",
  isDone: true,
  date: "",
  //id: "5cc4d22ba7a94003e91a385a"
};


// GET
async function fetchTasks() {
    const results = await getTasks();
    //console.log(results);
    return results;
}
//DELETE
async function deleteTasks(id) {
    const results = await deleteTask(id);
    //console.log(results);
    return results;
}
//POST
async function postTasks(isDone, date, text) {
    const results = await postTask(isDone, date, text);
    return results;
}
//PUT
async function putTasks(id, taskObject) {
    const results = await putTask(id, taskObject);
    return results;
}
//GET DONE/UNDONE
async function getFilteredTasksList(isDone) {
    const results = await getFilteredTasks(isDone);
    return results;
}

//getFilteredTasksList(false);
//putTasks(taskObj);
//postTasks(false, Date.now, "finish requests2");
//deleteTasks("5cc1fd241c9d440000e3993e");
//fetchTasks();

// KONIEC PRZYKLADU
