"use strict";

const tasksList = document.querySelector('.TODO-list');

function addItemToList(event) {
    event.preventDefault();
    const newItem = document.createElement('li');
    const taskText = event.target.newTask.value.trim();
    const addTaskErrorMsg = document.querySelector('.form-error-msg');
    if (taskText) {
        addTaskErrorMsg.classList.remove('shown');
        newItem.textContent = taskText;
        const newButton = document.createElement('button');
        newButton.textContent = 'Видалити';
        newButton.addEventListener('click', () => {
            newItem.remove(); 
        });
        newItem.append(newButton); 
        tasksList.append(newItem); 
    }
    else {
        addTaskErrorMsg.classList.add('shown');
    }
    event.target.reset();
}

const addTaskForm = document.querySelector('#add-task');
if (addTaskForm) {
    addTaskForm.addEventListener('submit', event => {
        addItemToList(event);
    });
}
 

