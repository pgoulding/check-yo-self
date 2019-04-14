class ToDoList{
  constructor(id, title, tasks){
    this.id = id;
    this.title = title;
    this.tasks = tasks || [];
    this.urgent = false;
  }
  saveToStorage(lists) {
    localStorage.setItem('list-card', JSON.stringify(lists));
  }
  deleteFromStorage(index) {
    lists.splice(index, 1);
    this.saveToStorage(lists);
  }
  updateTitle(list, editedTitle) {
    list.title = editedTitle;
    this.saveToStorage(lists);
  }
  urgent() {
    this.urgent = !this.urgent;
    this.saveToStorage(lists);
  }
  updateTask(){

  }
}

class Tasks{
  constructor(id, content){
    this.id = id;
    this.done = false;
    this.content = content;
  }
}