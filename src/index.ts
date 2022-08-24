import {v4 as uuidv4} from 'uuid';

type Task  = {
  id: string,
  title: string,
  complated: boolean,
  createdAt: Date,
}

// console.log(uuidv4())

const list = document.getElementById("list") as HTMLUListElement;
const form = document.querySelector<HTMLFormElement>('form');
const input = document.querySelector<HTMLInputElement>('input');

const tasks: Task[] = loadedTasks();

tasks.forEach(addNewTask)

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if(input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidv4(),
    title: input.value,
    complated: true,
    createdAt: new Date()
  }
  
  saveTasks()

  tasks.push(newTask);

  addNewTask(newTask)
  input.value = ""
})


function addNewTask(task: Task) {
  const itemList = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener("change", () => {
    task.complated = checkbox.checked;
    // console.log(task)
    saveTasks()
  })
  checkbox.type = 'checkbox';
  checkbox.checked = task.complated;
  label.append(checkbox, task.title);
  itemList.append(label);
  list?.append(itemList);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadedTasks(): Task[] {
  const tasksJSON  = localStorage.getItem("tasks");

  if(tasksJSON === null) return [];
 return JSON.parse(tasksJSON);
}