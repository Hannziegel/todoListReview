import './style.css';
import Tasks from './Tasks.js';
import Task from './Task.js';
import {setLocalStorage, reloadPage, getLocalStorage} from './Storage.js'

/* ----------========== INDEX HTML  ==========---------- */

const todoList = new Tasks();
const todoListArray =  todoList.tasks;
const todoListUL = document.getElementById('todoListUL');
const addItemInput = document.getElementById('addItemInput');
const enterIcon = document.getElementById('enterIcon');
const clearAllCompleted = document.getElementById('clearAllCompleted');

/* ----------========== CREATE HTML ELEMENTS ==========---------- */

// method create individual task HTML

const createTaskHtml = (description, taskIndex) => {
  const taskLi = document.createElement('li');
  const checkbox = document.createElement('div');
  const inputDescription = document.createElement('input');
  const dotsIconDiv = document.createElement('div');

  // create Li container for the task

  taskLi.classList.add('todoItem');
  taskLi.id = parseFloat(taskIndex) + 1;
  todoListUL.appendChild(taskLi);

  // create checkbox div

  checkbox.classList.add('checkbox');
  checkbox.classList.add('checkBoxUnchecked');
  checkbox.addEventListener('click', () => {
    todoList.taskDone(taskLi.id);
    localStorage.setItem('data', JSON.stringify(todoList.tasks));

    if (checkbox.classList.contains('checkBoxUnchecked')) {
      checkbox.classList.remove('checkBoxUnchecked');
      checkbox.classList.add('checkBoxChecked');
    } else {
      checkbox.classList.add('checkBoxUnchecked');
      checkbox.classList.remove('checkBoxChecked');
    }
  });

  // create input

  inputDescription.classList.add('todoItemInput');
  inputDescription.value = description;

  // change todo
  inputDescription.addEventListener('change', () => {
    todoList.editTask(inputDescription.value, taskLi.id);
    localStorage.setItem('data', JSON.stringify(todoList.tasks));
  });

  // create dots
  dotsIconDiv.classList.add('dragDots');

  // append
  taskLi.append(checkbox, inputDescription, dotsIconDiv);
};

// method that create in the html
const createTasksListHTML = () => {
  todoList.tasks.forEach((e, index) => {
    createTaskHtml(e.description, index);
  });
};

/* ----------========== WHEN PAGE IS LOAD PAGE GET LOCALSTORAGE ==========---------- */
// Check if there is data stored
todoListArray = getLocalStorage(todoListArray);

//create HTML when page loaded
createTasksListHTML();

/* ----------========== ADD ITEM ==========---------- */
enterIcon.addEventListener('click', () => {
  createTaskHtml(addItemInput.value, todoList.tasks.length);
  todoList.addTask(new Task(addItemInput.value, false, todoList.tasks.length + 1));
  // Store new collection in Local Storage
  setLocalStorage();
});

/* ----------========== REMOVE ITEM ==========---------- */

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('dragDots')) {
    todoList.removeTask(event.target.parentElement.id);
    event.target.parentElement.remove();
    setLocalStorage();
    reloadPage();
  }
});

/* ----------========== CLEAR ALL COMPLETED ITEM ==========---------- */

clearAllCompleted.addEventListener('click', () => {
  todoList.clearCompleted();
  setLocalStorage();
  reloadPage();
});