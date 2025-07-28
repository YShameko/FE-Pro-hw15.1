"use strict";
const tasksList = document.querySelector('.js--todos-wrapper');
const addTaskForm = document.querySelector('.form');
const addTaskInput = document.querySelector('.form__input');
const addTaskErrorMsg = document.querySelector('.form-error-msg');
const STORAGE_KEY = 'todoList';
let currentTodoList = [];

function createTodoItemElement(taskText, isChecked = false) {
    const newRecord = document.createElement('li');
    newRecord.classList.add('todo-item');
    if (isChecked) {
        newRecord.classList.add('todo-item--checked');
    }

    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.checked = isChecked;
    newRecord.appendChild(newCheckbox);

    const newTaskDescription = document.createElement('span');
    newTaskDescription.classList.add('todo-item__description');
    newTaskDescription.textContent = taskText;
    newRecord.appendChild(newTaskDescription);

    const newButton = document.createElement('button');
    newButton.textContent = 'Видалити';
    newButton.classList.add('todo-item__delete');
    newRecord.appendChild(newButton);

    return newRecord; 
}

function saveTodoList() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTodoList));
}

function readTodoList() {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
}

function renderTodoList() {
    tasksList.innerHTML = ''; 
    currentTodoList.forEach(todo => {
        const todoElement = createTodoItemElement(todo.text, todo.checked);
        tasksList.appendChild(todoElement);
    });
}

function handleAddTodoItem(event) {
    event.preventDefault(); 

    const taskText = addTaskInput.value.trim();

    if (taskText) {
        addTaskErrorMsg.classList.remove('shown');
        currentTodoList.push({ text: taskText, checked: false });
        saveTodoList(); 
        renderTodoList(); 
        
        addTaskInput.value = '';
    } else {
        addTaskErrorMsg.classList.add('shown');
        addTaskInput.focus();
    }
}

function handleTodoListClick(event) {
    const clickedElement = event.target;
    const listItem = clickedElement.closest('.todo-item'); 

    if (!listItem) { 
        return;
    }

    const index = Array.from(tasksList.children).indexOf(listItem); 

    if (clickedElement.classList.contains('todo-item__delete')) {
        if (index > -1) {
            currentTodoList.splice(index, 1); 
            saveTodoList(); 
            listItem.remove(); 
        }
    } else if (clickedElement.type === 'checkbox') {
        if (index > -1 && currentTodoList[index]) {
            currentTodoList[index].checked = clickedElement.checked; 
            saveTodoList(); 
            listItem.classList.toggle('todo-item--checked', clickedElement.checked);
        }
    }
}

// ----------------------------------------------------------------------------------------------------
currentTodoList = readTodoList(); 
renderTodoList(); 

if (addTaskForm) {
    addTaskForm.addEventListener('submit', handleAddTodoItem);
}

if (tasksList) {
    tasksList.addEventListener('click', handleTodoListClick);
    tasksList.addEventListener('change', handleTodoListClick); 
}
