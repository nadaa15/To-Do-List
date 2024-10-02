let taskInput = document.querySelector(".task-input");
let dateInput = document.querySelector(".date-input");
let addButton = document.getElementById("add-btn");
let updateButton = document.getElementById("update-btn");
let searchInput = document.querySelector(".search-input");
let list = document.querySelector(".list-group");
let All = document.querySelector(".All");
let Active = document.querySelector(".Active");
let Completed = document.querySelector(".Completed");
let alerts = document.querySelector(".alerts")


let updatedIndex;
let tasksArr = [];
//! Alert messages variables
let addMsg = "Successfully Added"
let deleteMsg = "Successfully Deleted"
let updateMsg = "Successfully Updated"

if (!localStorage.getItem("tasks")) {
  tasksArr = [];
} else {
  tasksArr = JSON.parse(localStorage.getItem("tasks"));
  displayTasks(tasksArr);
}

//! Add task
addButton.addEventListener("click", function() {
    addTask();
});

function addTask() {
    let task={
        id: Date.now(),
        title: taskInput.value,
        date: dateInput.value,
        completed:false
    }
    tasksArr.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksArr)),
    clear()
  displayTasks(tasksArr)
  showAlert(addMsg)
}

//! clear inputs

function clear() {
    taskInput.value = "";
    dateInput.value = "";
}


//! Display tasks
function displayTasks(arr) {
    let tasksList = ``
    for (let i = 0; i < arr.length; i++) {
        tasksList += `<li class="w-100 d-md-flex justify-content-between align-items-center mb-4">
                      <div class="list-group-item d-flex justify-content-start align-items-center rounded-0 border-0 bg-transparent">
                      <input onclick="markAsDone(${i})" type="checkbox" name="task" id="check" ${arr[i].completed ? "checked" : ""}>
                        <p class="lead title fw-normal mb-0 ms-2 ${arr[i].completed ? "completed" : ""}">${arr[i].title}</p>
                      </div>
                      <div>
                          <div class="d-flex flex-row justify-content-end mb-3">
                            <i onclick="setFormForUpdate(${i})" type="button" class="fas fa-pencil-alt fa-lg me-3 text-warning"></i>
                            <i onclick="deleteTask(${arr[i].id})" type="button" class="fas fa-trash-alt fa-lg text-danger"></i>
                           </div>
                          <div class="text-end text-muted">
                            <p class="small date mb-0">${arr[i].date}</p>
                          </div>
                      </div>
                      </li>`;
        list.innerHTML = tasksList
    }
}


//! Delete task

function deleteTask(id) {
    tasksArr = tasksArr.filter((task) => task.id != id);
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
    list.innerHTML=""
  displayTasks(tasksArr)
  showAlert(deleteMsg)
}


//! Set form for update

function setFormForUpdate(i) {
    updatedIndex = i
    addButton.classList.add("d-none");
    updateButton.classList.remove("d-none");
    taskInput.value = tasksArr[i].title;
    dateInput.value = tasksArr[i].date;
}

//! Update task
function updateTask() {
    addButton.classList.remove("d-none");
    updateButton.classList.add("d-none");
    tasksArr[updatedIndex].title=taskInput.value
    tasksArr[updatedIndex].date = dateInput.value
    localStorage.setItem("tasks", JSON.stringify(tasksArr)); 
     list.innerHTML = "";
    displayTasks(tasksArr);
  clear()
  showAlert(updateMsg)
  
}

updateButton.addEventListener("click", function () {
    updateTask()
});


//! Search Task

function searchTask() {
    let term = searchInput.value
    let searchArr=[]
    for (let i = 0; i < tasksArr.length; i++) {
        if (tasksArr[i].title.toLowerCase().includes(term.toLowerCase())) {
            searchArr.push(tasksArr[i])
            list.innerHTML = "";
            displayTasks(searchArr)
        }
    }
}

searchInput.addEventListener("input", function () {
    searchTask()
})



//! Change Task Status

function markAsDone(i) {
          tasksArr[i].completed == false
            ? (tasksArr[i].completed = true)
            : (tasksArr[i].completed = false);
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
    displayTasks(tasksArr)
}


//! Show Completed Tasks

Completed.addEventListener("click", function () {
   let completedArr=[]
    for (let i = 0; i < tasksArr.length; i++) {
        if (tasksArr[i].completed == true) {
            completedArr.push(tasksArr[i]);
            list.innerHTML = "";
            displayTasks(completedArr);
        }
        if (completedArr.length == 0) {
            
          list.innerHTML = "";
        }
        
    }
})

//! Show Active Tasks

Active.addEventListener("click", function () {
  let activeArr = [];
  for (let i = 0; i < tasksArr.length; i++) {
    if (tasksArr[i].completed == false) {
        activeArr.push(tasksArr[i]);
        list.innerHTML = "";
        displayTasks(activeArr);

    }
     if (activeArr.length == 0) {
       list.innerHTML = "";
     }
  }
});

//! Show All Tasks

All.addEventListener("click", function () {
  displayTasks(tasksArr)
});


//! Show Alerts
function showAlert(msg) {
  let alert = document.createElement("div");
  alert.classList.add("alert");
  alert.classList.add("alert-success");
  alert.classList.add("mx-auto");
  alert.classList.add("mb-0");
  alert.classList.add("mt-3");
  alert.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`
  alerts.appendChild(alert)
  setTimeout( ()=> {
    alert.remove()
  },3000 )
}

