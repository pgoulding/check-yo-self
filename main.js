// /*---------- Query Selectors -----------*/
var inputTitle = document.querySelector('#input-title');
var inputTaskItem = document.querySelector('#input-item');
var inputSearch = document.querySelector('#input-search');
var outputArray = document.getElementsByClassName('sidebar__task-list');
var btnTaskListItemDelete = document.getElementsByClassName('img__task-delete');
var btnAddTask = document.querySelector('#add-task-icon');
var btnCreateTaskList = document.querySelector('#btn-make-task');
var btnClear = document.querySelector('#btn-clear');
var btnFilterUrgent = document.querySelector('#btn-filter-urgent') 
var cardTemplate = document.querySelector('template'); 
var outputTaskContainer = document.querySelector('.form__task-container');
var cardsArea = document.querySelector('main');
/*---------- Global Variables ----------*/
var lists = JSON.parse(localStorage.getItem('list-card')) || [];
/*---------- Event Listeners -----------*/
outputTaskContainer.addEventListener('click', removeSingleItem);
btnAddTask.addEventListener('click', addTaskToList);
btnCreateTaskList.addEventListener('click', addTaskToArray);
btnClear.addEventListener('click', clearTaskListBtn);
btnFilterUrgent.addEventListener('click', toggleShowUrgent);
inputSearch.addEventListener('input', searchLists);
/*---------- Functions -----------------*/
function startCheckYoSelf() {
  fetchLists()
  toggleNoLists()
  disableBtns()
}

function fetchLists() {
  lists.forEach(element => addCardToDOM(element));
}

function disableBtns() {
  if(inputTitle.value && outputArray.innerText ===0){
    btnAddTask.disabled = true
  }
  
}

function toggleNoLists() {
  var hiddenMessage = document.querySelector('.no-ideas');
  if (lists.length != 0) {
    hiddenMessage.classList.add('hidden');
    cardsArea.classList.add('masonry-layout');
  } else {
    hiddenMessage.classList.remove('hidden');
    cardsArea.classList.remove("masonry-layout");
  }
}

function reinstateLists(i) {
  return new ToDoList(
    lists[i].id,
    lists[i].title,
    lists[i].tasks,
    lists[i].urgent
  );
}

function searchLists(e) {
  e.preventDefault()
  var searchQuery = inputSearch.value.toLowerCase();
  var searchResults = lists.filter(card => card.title.toLowerCase().includes(searchQuery));
  cardsArea.innerHTML = '';
  searchResults.forEach(list => addCardToDOM(list));
}

function toggleShowUrgent(e) {
  e.preventDefault()
  btnFilterUrgent.classList.toggle('urgent');
  if(btnFilterUrgent.classList.contains('urgent')) {
    var filterResults = lists.filter(list => list.urgent === true);
  } else {
    var filterResults = lists.filter(list => list.urgent === list.urgent)
  }
  cardsArea.innerHTML = "";
  filterResults.forEach(idea => addCardToDOM(idea));
}

function addTaskToList(e) {
  e.preventDefault()
  if(inputTaskItem.value){
    outputTaskContainer.innerHTML += `<li class="sidebar__task-list"><img src="images/delete.svg" class="card__task-ico img__task-delete"> ${inputTaskItem.value}</li>`
    inputTaskItem.value = '';
  }
}

function addTaskToArray(e){
  e.preventDefault()
  var taskArray = []
 for (let i = 0; i < outputArray.length; i++) {
   var newTask = {id: `1${i}${Date.now()}`, done: false, content: outputArray[i].innerText
   }
   taskArray.push(newTask)
 }
  createNewList(taskArray)
}

function createNewList(taskItems) {
  if (inputTitle.value && taskItems.length != 0) {
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

function taskToCard(newCard) {
  var taskListIteration = '';
  for (var i = 0; i < newCard.tasks.length; i++) {
    taskListIteration += `<li class="card__task-checkbox" data-id=${newCard.tasks[i].id}><img src=${newCard.tasks[i].done === true ? `"images/checkbox-active.svg"` : `"images/checkbox.svg"`} class="card__task-ico">${newCard.tasks[i].content}</li>`
  } return taskListIteration;
}

function cloneQueries(cardClone, list) {
  cardClone.querySelector('.card').dataset.id = list.id;
  cardClone.querySelector('.card-title').innerText = list.title;
  cardClone.querySelector('.card__task-list').innerHTML = `<li>${taskToCard(list)}</li>`;
  cardClone.querySelector('.card__task-urgent').setAttribute('src', `${list.urgent === true ? `images/urgent-active.svg` : `images/urgent.svg`}`)
  // cardClone.querySelector('card__task-container').style.backgroundColor=`${list.urgent === true ? 'yellow' : 'white'}`;
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
  if (target.matches('.card__task-checkbox')){
    changeCheckbox(target)
  }
  toggleNoLists()
}

function getListIndex(target) {
  var parent = target.closest('article');
  var parentID = parseInt(parent.dataset.id);
  var listIndex = lists.findIndex(element => element.id === parentID);
  return listIndex;
}

function removeCard(target) {
  var listIndex = getListIndex(target)
  var task = reinstateLists(listIndex)
  target.closest('article').remove();
  task.deleteFromStorage(listIndex);
}

function removeSingleItem(e) {
  e.target.closest('li').remove()
  console.log(e.target)
}

function urgentify(target) {
  var listIndex = getListIndex(target)
  var toDoCard = reinstateLists(listIndex)
  target.setAttribute(`src`, `${toDoCard.urgent === false ? `images/urgent-active.svg` : `images/urgent.svg`}`)
  toDoCard.updateToDo()
}

function urgentBackground(taskList) {
  if(taskList.urgent === true){
    newClass = `urgent`
  }else{
    return 'not-urgent'
  }
}

// function checkItemDOM(target) {
//   if(target.getAttribute('src', 'images/checkbox.svg') === true){
//     target.setAttribute('src', 'images/checkbox-active.svg')
//     debugger;
//   } else {
//     target.setAttribute('src', 'images/checkbox.svg')
//   }
// }

function changeCheckbox(target) {
  if (target.firstChild.src === "images/checkbox.svg"){
      target.firstChild.src = "images/checkbox-active.svg";
    } else {
      target.firstChild.src = "images/checkbox.svg";
    }
  // target.firstChild.src = (target.firstChild.src === unchecked) ? checked : unchecked;
  console.log(target.firstChild.src)
  console.log(target)
  markItems(target)
}

function markItems(target) {
  var parent = target.closest('article')
  var child = target.closest('li')
  var listIndex = getListIndex(target);
  var toDoCard = reinstateLists(listIndex);
  const targetList = lists.find(list => list.id == parent.dataset.id);
  const targetIndex = targetList.tasks.findIndex(task => task.id === child.dataset.id)
  toDoCard.updateTask(targetIndex)
}

function clearTaskListBtn(e) {
  e.preventDefault()
  clearTaskList()  
}

function clearTaskList() {
  inputTitle.value = '';
  outputTaskContainer.innerHTML =''
}

window.onload = startCheckYoSelf()