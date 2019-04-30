import "@babel/polyfill";

const URL = "http://localhost:8080/api/tasks/";

async function getTasks() {
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  return data;
}

async function getFilteredTasks(isDone) {
    const response = await fetch(`${URL}isDone=${isDone}`);
    const data = await response.json();
    //console.log(data);
    return data;
}

async function deleteTask(id) {
  const response = await fetch(`${URL}id=${id}`, { method: "DELETE" });
  const data = await response.json();
  //console.log(data);
  return data;
}

async function postTask(isDone = false, date = Date.now, text = "") {
  const response = await fetch(URL, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: "POST",
    body: JSON.stringify({
      text: text,
      isDone: isDone,
      date: date
    })
  });
  const data = await response.json();
  //console.log(data);
  return data;
}

async function putTask(id, taskObject) {
    const response = await fetch(`${URL}id=${id}`, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "PUT",
      body: JSON.stringify({
          text: taskObject.text,
          isDone: taskObject.isDone,
          date: taskObject.date
      })
    });
    const data = await response.json();
    //console.log(data);
    return data;
}

export { getTasks, deleteTask, postTask, putTask, getFilteredTasks };
