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

/*---------- Global Variables ----------*/
var taskItems = []
var lists = JSON.parse(localStorage.getItem('list-card')) || [];

/*---------- Event Listeners -----------*/


outputTaskContainer.addEventListener('click', removeSingleItem)
btnAddTask.addEventListener('click', addTaskToList)
btnCreateTaskList.addEventListener('click', createNewList);
btnClear.addEventListener('click', clearTaskListBtn)

/*---------- Functions -----------------*/

function startCheckYoSelf() {
  fetchLists()
  toggleNoLists()
}

function reinstateLists(i) {
  return new ToDoList(lists[i].id, lists[i].title, lists[i].tasks);
}

function fetchLists() {
  lists.forEach(element => {
    addCardToDOM(element)
  });
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

function taskToCard(newCard) {
  var taskListIteration = '';
  for (var i = 0; i < newCard.tasks.length; i++) {
    taskListIteration += `
      <li data-id=${newCard.tasks[i].id} class="index-${i}">${newCard.tasks[i].content}</li>`
  } return taskListIteration;
}

function removeSingleItem(e){
  e.target.closest('li').remove()
  console.log(e.target)
}

function getListIndex(target) {
  var parent = target.closest('article');
  var parentID = parseInt(parent.dataset.id);
  var index = lists.findIndex(element => element.id === parentID);
  return index;
}

function removeCard(target) {
  var index = getListIndex(target)
  var task = reinstateLists(index)
  target.closest('article').remove();
  task.deleteFromStorage(index);
}

function createNewList(e) {
  e.preventDefault()
  if (inputTitle.value && taskItems.length != 0){
    var newToDoList = new ToDoList(Date.now(), inputTitle.value, taskItems);
    console.log(taskItems);
    lists.push(newToDoList);
    addCardToDOM(newToDoList);
    console.log(lists)
    newToDoList.saveToStorage(lists);
    clearTaskList();
  }
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
  cardClone.querySelector('.card-title').innerText = list.title;
  cardClone.querySelector('.card__task-list').innerHTML = `<li>${taskToCard(list)}</li>`
  urgentify(cardClone, list);
}

function cardActions(e) {
  e.preventDefault();
  console.log('card actions')
  let target = e.target;
  if (target.matches('.card__task-delete')) {
    removeCard(target);
    console.log('target remove')
  }
  if (target.matches('.card__task-urgent')) {
    urgentify();
  }
  toggleNoLists()
}

function urgentify(cardClone){
  console.log('urgentify')
  
  if(lists.urgent){
    cardClone.querySelector('.card__task-urgent').setAttribute('src', 'images/urgent-active.svg')

  } else {
    cardClone.querySelector('.card__task-urgent').setAttribute('src', 'images/urgent.svg')
  }
}

function clearTaskListBtn(e) {
  e.preventDefault()
  clearTaskList()  
}

function clearTaskList() {
  inputTitle.value = '';
  outputTaskContainer.innerHTML =''
  taskItems.splice(0, taskItems.length)
}

function toggleNoLists() {
  if(lists.length === 0){
    
  }
}

window.onload = startCheckYoSelf()