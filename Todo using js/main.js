let taskListArray = [];
const inputField = document.querySelector("#input");
const addBtn = document.querySelector(".addbtn");
const listWrapper = document.querySelector(".notes-list-wrapper");
const errorMessage = document.querySelector(".error-message");
const isLocalDataPresent = localStorage.getItem("todoTaskList");
if (isLocalDataPresent !== null) {
  taskListArray = JSON.parse(isLocalDataPresent);
  renderTaskList();
}

function saveTask() {
  var taskName = inputField.value;
  var taskObject = {
    taskId: taskListArray.length + 1,
    taskName: taskName,
  };
  taskListArray.push(taskObject);
  localStorage.setItem("todoTaskList", JSON.stringify(taskListArray));
  renderTaskList();
}

function renderTaskList() {
  listWrapper.innerHTML = "";
  inputField.value = "";
  for (let i = 0; i < taskListArray.length; i++) {
    const dynamicLi = document.createElement("li");
    const myPara = document.createElement("p");
    myPara.textContent = taskListArray[i].taskName;
    dynamicLi.appendChild(myPara);
    listWrapper.appendChild(dynamicLi);
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    editBtn.addEventListener("click", editTask);
    editBtn.taskId = taskListArray[i].taskId;

    dynamicLi.appendChild(editBtn);
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("btn", "deleteBtn");
    deleteBtn.addEventListener("click", deleteTask);
    deleteBtn.taskId = taskListArray[i].taskId;
    dynamicLi.appendChild(deleteBtn);
  }
}

addBtn.addEventListener("click", saveTask);

function deleteTask(event) {
  const index = taskListArray.findIndex((a) => a.taskId == event.target.taskId);
  taskListArray.splice(index, 1);
  localStorage.setItem("todoTaskList", JSON.stringify(taskListArray));
  renderTaskList();
}
function editTask(event) {
  const obj = taskListArray.find((m) => m.taskId == event.target.taskId);
  inputField.value = obj.taskName;
  // renderTaskList();
}
