const _____ = 'MAKE SURE TO FILL ME IN!!!';

const nextId = (array) => array[array.length - 1].id + 1;

const copy = (obj) => JSON.parse(JSON.stringify(obj));

const todoList = [
  {
    id: 1,
    label: 'Learn about JS Data Types',
    complete: true,
    dueDate: '2021-12-13'
  },
  {
    id: 2,
    label: 'Learn about Iteration',
    complete: false,
    dueDate: '2021-12-14'
  },
]

function getTodoListElement() {
  return document.querySelector('#todoList')
}

function renderTask(task) {
  const li = document.createElement('li');
  li.className = 'grid grid-cols-12 items-center task';
  li.dataset.id = task.id;
  li.innerHTML = `
  <span class="col-span-6 task-label">

  </span>
  <span class="col-span-5 due-date">

  </span>
  <span class="text-right space-x-2 due-date completed">
    
  </span>
  `; 
  // target the .task-label and .due-date spans 
  const taskLabelEl = li.querySelector('.task-label');
  const dueDateEl = li.querySelector('.due-date');
  const completedEl = li.querySelector('.completed');
  // fill them in with the appropriate content from the task object
  taskLabelEl.textContent = task.label;
  dueDateEl.textContent = task.dueDate;
  completedEl.innerHTML = `<i class="far ${task.complete ? 'fa-check-square' : 'fa-square'} text-4xl text-green-300 cursor-pointer"></i>`;
  // - `handleToggleComplete(task)`
  //   - we'll need to attach an event listener to each box in the todo list. 
  //   - when one of them is clicked, we'll invoke `toggleComplete` and pass in the appropriate `task` as an argument.
  completedEl.addEventListener('click', (e) => {
    toggleComplete(task.id);
  })
  document.querySelector('#todoList').append(li);
  return li;
}

function loadTodoList(todoList) {
  todoList.forEach(renderTask)
}

loadTodoList(todoList);

function addTask(todoList, task) {
  const newTask = {
    id: nextId(todoList),
    ...task,
    completed: false
  };
  todoList.push(newTask);
  // 🚧 🚧 🚧
  renderTask(newTask);
  // 🚧 🚧 🚧
  return newTask;
}

function removeTask(todoList, taskId) {
  const indexToRemove = todoList.findIndex(task => task.id === parseInt(taskId, 10));
  if (indexToRemove !== -1) {
    const taskToRemove = playlist.splice(indexToRemove, 1)[0];
    // 🚧 🚧 🚧
    document.querySelector(`#todoList li[data-id="${taskId}"]`).remove()
    // 🚧 🚧 🚧
    return taskToRemove;
  } else {
    alert('Task not found!')
  }
}

function toggleComplete(taskId) {
  const task = todoList.find(task => task.id === parseInt(taskId, 10))
  task.complete = !task.complete;
  // Update the Task in the DOM to indicate that the task is completed.
  updateTask(task);
  return task;
}

function updateTask(task) {
  const li = document.querySelector(`#todoList li[data-id="${task.id}"]`);
  const taskLabelEl = li.querySelector('.task-label');
  const dueDateEl = li.querySelector('.due-date');
  const completedEl = li.querySelector('.completed');
  // fill them in with the appropriate content from the task object
  taskLabelEl.textContent = task.label;
  dueDateEl.textContent = task.dueDate;
  completedEl.innerHTML = `<i class="far ${task.complete ? 'fa-check-square' : 'fa-square'} text-4xl text-green-300 cursor-pointer"></i>`;
}


// - `handleNewTaskSubmit(event)`
//   - we'll need to prevent the default behavior.
//   - we'll then need to attach an event listener to the newTask form.
//   - when the form is submitted, we'll pull the data out of the form, and pass it to `addTask` function.
document.querySelector('#newTask').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const taskData = {
    label: form.labelInput.value,
    dueDate: form.dueDateInput.value
  }
  addTask(todoList, taskData);
  form.reset();
})


