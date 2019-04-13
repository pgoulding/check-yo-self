// /*---------- Query Selectors -----------*/
var inputTitle = document.querySelector('#input-title');
var inputTaskItem = document.querySelector('#input-item');

var btnAddTask = document.querySelector('#add-task-icon');
var btnCreateTaskList = document.querySelector('btn-make-task');
var btnClear = document.querySelector('btn-clear');

var cardTemplate = document.querySelector('template'); 

var outputTaskContainer = document.querySelector('.form__task-container');

var btnTaskListItemDelete = document.getElementsByClassName('img__task-delete')


// var inputTitle = document.querySelector('')
// var inputTitle = document.querySelector('')
// var inputTitle = document.querySelector('')
// /*---------- Global Variables ----------*/

var taskItems = []
var lists = JSON.parse(localStorage.getItem('list-card')) || [];

// /*---------- Event Listeners -----------*/



btnAddTask.addEventListener('click', addTaskToList)

// btnCreateTaskList.addEventListener('click', makeTaskList)
// btnClear.addEventListener('click', clearTaskList)

// /*---------- Functions -----------------*/

function startCheckYoSelf() {

}

function addTaskToList(e) {
  e.preventDefault()
  outputTaskContainer.innerHTML += `<li><img src="images/delete.svg" class="card__task-ico img__task-delete">${inputTaskItem.value}</li>`
  taskItems.push(inputTaskItem.value)
  addTaskListEvents()
}

function addTaskListEvents() {
  for (var i = 0; i < btnTaskListItemDelete.length; ++i) {
    btnTaskListItemDelete[i].addEventListener('click', removeSingleItem);
  }
}

function removeSingleItem(e){
  e.target.closest('li').remove()
}

function removeCard(target) {
  const parsedId = parseInt(target.parentNode.parentNode.getAttribute('data-id'));
  const targetIdea = lists.find(task => {
    task.id === parsedId;
  });
  const ideaIndex = lists.indexOf(targetIdea);
  target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
  targetIdea.deleteFromStorage(ideaIndex);
  hideEmptyMessage();
}

function createNewList() {
  var newToDoList = new ToDoList(Date.now(), inputListTitle.value, taskItem);
  addCardToDOM(newToDoList);
  lists.push(newToDoList);
  newToDoList.saveToStorage(lists);
  clearCardForms();
  var cardBody = document.querySelectorAll('.card-body');
}

function addCardToDOM(list) {
  var cardClone = cardTemplate.content.cloneNode(true);
  var cardQuery = cardClone.querySelector('.card');
  var qualityName = qualities[list.quality];
  cloneQueries(cardClone, qualityName, list);
  cardQuery.addEventListener('click', cardActions);
  cardQuery.addEventListener('input', editText);
  cardsArea.insertBefore(cardClone, cardsArea.firstChild);
  khalidify()
}

function cloneQueries(cardClone, qualityName, list) {
  cardClone.querySelector('.card').dataset.id = list.id;
  cardClone.querySelector('.card-title').innerText = list.title || 'list Title';
  cardClone.querySelector('.card-body').innerText = list.body || 'Lorem Ipsum';
  cardClone.querySelector('.card-bottom-quality').innerText = qualityName;
  starCheck(list, cardClone);
}

function removeSingleItem() {
  
}

function makeTaskList() {
  // outputTaskContainer
  
}

function clearTaskList() {
  
}

window.onload = startCheckYoSelf()