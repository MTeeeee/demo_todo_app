
function getTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => loadTodos(json))
}

getTodos()


function loadTodos(todos){
    console.log(todos);
    for (let i = 0; i < todos.length; i++) {
        // console.log(todos[i].title);
        taskToHtml(todos[i]);
    }
}

function taskToHtml(todo){

    let taskContent = todo.title;

    // listenelement erzeugen
    let listItem = document.createElement('li');

    // checkbox erzeugen
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox'

    // Todo text
    let taskText = document.createElement('span')
    taskText.textContent = taskContent + '   '

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
    console.log(taskContent)

    // listenelement erzeugen
    let listItem = document.createElement('li');

    // checkbox erzeugen
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox'

    // Todo text
    let taskText = document.createElement('span')
    taskText.textContent = taskContent + '   '

    // button erzeugen
    let delButton = document.createElement('button');
    delButton.textContent = "Delete Task";

    // listenelement ergänzen
    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(delButton);

    // listenelement in die html liste hinzufügen
    document.getElementById('task-list').appendChild(listItem);

    document.getElementById('userInput').value = '';
};

document.getElementById('add-task').addEventListener("click", addTask);


