// /*---------- Query Selectors -----------*/
var inputTitle = document.querySelector('#input-title');
var inputTaskItem = document.querySelector('#input-item');

var btnAddTask = document.querySelector('#add-task-icon');
var btnCreateTaskList = document.querySelector('#btn-make-task');
var btnClear = document.querySelector('#btn-clear');

var cardTemplate = document.querySelector('template'); 

var outputTaskContainer = document.querySelector('.form__task-container');
var cardsArea = document.querySelector('main')
var btnTaskListItemDelete = document.getElementsByClassName('img__task-delete')


// var inputTitle = document.querySelector('')
// var inputTitle = document.querySelector('')
// var inputTitle = document.querySelector('')
// /*---------- Global Variables ----------*/

var taskItems = []
var lists = JSON.parse(localStorage.getItem('list-card')) || [];

// /*---------- Event Listeners -----------*/


outputTaskContainer.addEventListener('click', removeSingleItem)
btnAddTask.addEventListener('click', addTaskToList)
btnCreateTaskList.addEventListener('click', createNewList);

// btnCreateTaskList.addEventListener('click', makeTaskList)
// btnClear.addEventListener('click', clearTaskList)

// /*---------- Functions -----------------*/

function startCheckYoSelf() {

}

function addTaskToList(e) {
  e.preventDefault()
  if(inputTaskItem.value){
    outputTaskContainer.innerHTML += `<li><img src="images/delete.svg" class="card__task-ico img__task-delete"> ${inputTaskItem.value}</li>`
    var newTask = new Tasks(Date.now(), inputTaskItem.value)
    taskItems.push(newTask)
    console.log(taskItems)
    inputTaskItem.value = '';
  }
}

// function addTaskListEvents() {
//   for (var i = 0; i < btnTaskListItemDelete.length; ++i) {
//     btnTaskListItemDelete[i].addEventListener('click', removeSingleItem);
//   }
// }

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

function createNewList(e) {
  e.preventDefault()
  var newToDoList = new ToDoList(Date.now(), inputTitle.value, taskItems.values());
  addCardToDOM(newToDoList);
  lists.push(newToDoList);
  newToDoList.saveToStorage(lists);
  // clearCardForms();
}

function addCardToDOM(list) {
  var cardClone = cardTemplate.content.cloneNode(true);
  var cardQuery = cardClone.querySelector('.card');
  cloneQueries(cardClone, list);
  cardQuery.addEventListener('click', cardActions);
  cardsArea.insertBefore(cardClone, cardsArea.firstChild);
}

function cloneQueries(cardClone, list) {
  cardClone.querySelector('.card').dataset.id = list.id;
  cardClone.querySelector('.card-title').innerText = list.title || 'list Title';
  cardClone.querySelector('.card__task-list').innerText = list.tasks || 'Lorem Ipsum';
  // cardClone.querySelector('.card-bottom-quality').innerText = qualityName;
  // starCheck(list, cardClone);
}

function cardActions(e) {
  e.preventDefault();
  let target = e.target;
  if (target.matches('.card__task-delete')) {
    removeCard(target);
  }
  if (target.matches('.card__task-urgent')) {
    urgentify(target);
  }
}

function clearTaskList() {
  
}

window.onload = startCheckYoSelf()