class ToDoList{
  constructor(id, title, urgent){
    this.id = id;
    this.title = title;
    this.tasks = [];
    this.urgent = urgent || false;
  }
  saveToStorage(lists) {
    localStorage.setItem('idea-card', JSON.stringify(lists));
  }
  deleteFromStorage(index) {
    lists.splice(index, 1);
    this.saveToStorage(lists);
  }
  updateTitle(idea, editedTitle) {
    idea.title = editedTitle;
    this.saveToStorage(lists);
  }
  urgent() {
    this.urgent = !this.urgent;
    this.saveToStorage(lists);
  }
  updateToDo(){

  }
  updateTask(){

  }
}