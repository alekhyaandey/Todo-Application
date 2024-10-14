let todoItemsContainer = document.getElementById("todoItemsContainer");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoItemFromLocalStorage() {
    let stringifiedTodoItem = localStorage.getItem("todoList");
    let parsedTodoItem = JSON.parse(stringifiedTodoItem);
    if (parsedTodoItem === null) {
        return [];
    } else {
        return parsedTodoItem;
    }
}

let todoList = getTodoItemFromLocalStorage();
let todoCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function todoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    /*
    if(checkboxElement.checked === true) {
        labelElement.classList.add("strike-label");
    }
    else {
        labelElement.classList.remove("strike-label");
    }
    */
    labelElement.classList.toggle("strike-label");
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.id;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let selectedTodoObject = todoList[todoObjectIndex];
    if (selectedTodoObject === true) {
        selectedTodoObject.isChecked = false;
    } else {
        selectedTodoObject.isChecked = true;
    }
}

function deleteTodoItem(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deletedTodoItem = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.id;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deletedTodoItem, 1);
}

function createAndAppendTodoItem(todo) {
    let todoId = "todo" + todo.id;
    let checkboxId = "checkboxInput" + todo.id;
    let labelId = "label" + todo.id;

    let todoItem = document.createElement("li");
    todoItem.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItem.id = todoId;
    todoItemsContainer.appendChild(todoItem);

    let checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.classList.add("checkbox-input");
    checkboxInput.id = checkboxId;
    checkboxInput.checked = todo.isChecked;
    checkboxInput.onclick = function() {
        todoStatusChange(checkboxId, labelId, todoId);
    }
    todoItem.appendChild(checkboxInput);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoItem.appendChild(labelContainer);

    let checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add("checkbox-label");
    checkboxLabel.htmlFor = checkboxId;
    checkboxLabel.textContent = todo.text;
    checkboxLabel.id = labelId;
    if (todo.isChecked === true) {
        checkboxLabel.classList.add("strike-label");
    }
    labelContainer.appendChild(checkboxLabel);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        deleteTodoItem(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);
}

function addTodoItem() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    todoCount += 1;
    let todo = {
        text: userInputValue,
        id: todoCount,
        isChecked: false
    };
    createAndAppendTodoItem(todo);
    todoList.push(todo);
    userInputElement.value = "";
}

for (let todo of todoList) {
    createAndAppendTodoItem(todo);
}

let addTodoButton = document.getElementById("addTodoButton");
addTodoButton.onclick = function() {
    addTodoItem();
}