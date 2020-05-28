//Chosing fron HTML  Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
//Event Listener
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteTodo);
filterOption.addEventListener('click',filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv);
    todoInput.value = " ";
}

function deleteTodo(event) {
    const item = event.target;
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function () {
           todo.remove(); 
        });
    }
    if(item.classList[0] === "complete-btn")
    {
        const todo = item.parentElement;
        todo.classList.add("completed");
    } 
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(element) {
        switch (event.target.value) {
            case "all":
                element.style.display = "flex";
                break;
            case "completed":
                if(element.classList.contains("completed")){
                    element.style.display = "flex";
                }
                else{
                     element.style.display  = "none";
                }
                break;
            case "uncompleted":
                if(!element.classList.contains("completed")){
                    element.style.display = "flex";
                }
                else{
                     element.style.display  = "none";
                }
                break;
            default:
                break;
        }
    });    
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIdnex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIdnex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}