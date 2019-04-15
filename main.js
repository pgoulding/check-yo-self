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
var outputArray = document.getElementsByClassName('sidebar__task-list')

/*---------- Global Variables ----------*/
var lists = JSON.parse(localStorage.getItem('list-card')) || [];

/*---------- Event Listeners -----------*/


outputTaskContainer.addEventListener('click', removeSingleItem)
btnAddTask.addEventListener('click', addTaskToList)
btnCreateTaskList.addEventListener('click', addTaskToArray);
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
    outputTaskContainer.innerHTML += `<li class="sidebar__task-list"><img src="images/delete.svg" class="card__task-ico img__task-delete"> ${inputTaskItem.value}</li>`
  }
}

function addTaskToArray(e){
  e.preventDefault()
  taskArray = []
 for (let i = 0; i < outputArray.length; i++) {
   var newTask = {
     id: `${i}${Date.now()}`,
     done: false,
     content: outputArray[i].innerText
   }
   taskArray.push(newTask)
 }
  inputTaskItem.value = '';
  createNewList(taskArray)
}

function taskToCard(newCard) {
  var taskListIteration = '';
  for (var i = 0; i < newCard.tasks.length; i++) {
    taskListIteration += `<li data-id=${newCard.tasks[i].id} class="index-${i}"><img src="images/checkbox.svg" class="card__task-ico">${newCard.tasks[i].content}</li>`
  } return taskListIteration;
}

function removeSingleItem(e){
  e.target
  e.target.closest('li').remove()
  console.log(e.target)
}

function getItemIndex(target){

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

function createNewList(taskItems) {
  if (inputTitle.value && taskItems.length != 0){
    var newToDoList = new ToDoList(Date.now(), inputTitle.value, taskItems);
    lists.push(newToDoList);
    addCardToDOM(newToDoList);
    newToDoList.saveToStorage(lists);
    clearTaskList();
    toggleNoLists();
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
  cardClone.querySelector('.card__task-list').innerHTML = `<li>${taskToCard(list)}</li>`;
  cardClone.querySelector('.card__task-delete').innerHTML = ``
  urgentify(cardClone, list);
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
  toggleNoLists()
}

function urgentify(cardClone, list){
  console.log('urgentify')
  if(list.urgent===true){
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
}

function toggleNoLists() {
  var hiddenMessage = document.querySelector('.no-ideas')
  if(lists.length !=0){
    hiddenMessage.classList.add('hidden')
    cardsArea.classList.add('masonry-layout')
  } else {
    hiddenMessage.classList.remove('hidden')
    cardsArea.classList.remove('masonry-layout')
  }
}

window.onload = startCheckYoSelf()