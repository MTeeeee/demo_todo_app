
function getTodos() {
    fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(json => loadTodos(json))
}

function loadTodos(todos) {
    console.log(todos);

    for (let i = 0; i < todos.length; i++) {
        // console.log(todos[i].title);
        taskToHtml(todos[i]);
    }
}

function taskToHtml(todo) {

    console.log(todo)

    let taskContent = todo.description;
    let taskCompleted = todo.completed;

    // listenelement erzeugen
    let listItem = document.createElement('li');

    // checkbox erzeugen
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox'
    if (taskCompleted === true) {
        checkbox.checked = true
    } else {
        checkbox.checked = false
    }

    // Todo text
    let taskText = document.createElement('span')
    taskText.textContent = taskContent + '   ' //böse

    // button erzeugen
    let delButton = document.createElement('button');
    delButton.textContent = "Delete Task";

    // listenelement ergänzen
    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(delButton);

    // listenelement in die html liste hinzufügen
    document.getElementById('task-list').appendChild(listItem);

}


function addTask() {

    let taskContent = document.getElementById('userInput').value;
    document.getElementById('userInput').value = '';

    const fetchConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_id": 1,
            "id": 1,
            "description": taskContent,
            "completed": false
        })
    }

    fetch('http://localhost:3000/todos', fetchConfig)
        .then(response => response.json())
        .then(json => loadTodos(json))
};


// User Registrieren
function registerUser() {
    console.log("Register User")
    const username = document.getElementById("registerUserName").value;
    const password = document.getElementById("registerUserPassword").value;

    // Todo leeres Feld abfangen

    const fetchConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": username,
            "userPassword": password
        })
    }

    fetch('http://localhost:3000/register', fetchConfig)
    .then(response => response.json())
    .then(json => console.log(json))
};

// User Login
function loginUser() {
    console.log("Login User")
    const username = document.getElementById("loginUserName").value;
    const password = document.getElementById("loginUserPassword").value;

    // Todo leeres Feld abfangen

    const fetchConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": username,
            "userPassword": password
        })
    }

    fetch('http://localhost:3000/login', fetchConfig)
    .then(response => response.json())
    .then(json => setSessionToken(json))

    function setSessionToken(resJson) {
        sessionStorage.setItem("sessionToken", resJson.sessionToken)
    }
};

document.getElementById('add-task').addEventListener("click", addTask);
document.getElementById('userRegisterClick').addEventListener("click", registerUser);
document.getElementById('userLoginClick').addEventListener("click", loginUser);


// main

getTodos()
