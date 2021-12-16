// this function will take the array as an argument and return the next id.
const nextId = (array) => array[array.length - 1].id + 1;

const copy = (obj) => JSON.parse(JSON.stringify(obj));

const todoList = [
  {
    id: 1,
    task: 'Learn about JS Data Types',
    complete: true,
    dueDate: '2021-12-13'
  },
  {
    id: 2,
    task: 'Learn about Iteration',
    complete: false,
    dueDate: '2021-12-14'
  },
]

// 🚧 Task 1: `addTask(todoList, task)`

function addTask(todoList, task) {
  todoList.push(Object.assign({},task, {id: nextId(todoList)}))
  // [...todoList, task] // non-destructively add to new array
  return task
}

// // 👟👟👟 uncomment the lines below to test

console.log('addTask', addTask(todoList, {
  task: 'Practice using the filter method',
  complete: false,
  dueDate: '2021-12-15'
}))
console.log('todoList after addTask', copy(todoList))

// 🚧 Task 2: `incompleteTasks(todoList)`

function incompleteTasks(todoList) {
  return todoList.filter(task => task.complete === false)
}

// // 👟👟👟 uncomment the lines below to test

console.log('incompleteTasks', incompleteTasks(todoList))
console.log('todoList after incompleteTasks', copy(todoList))


// 🚧 Task 3: `incompleteTaskCount(todoList)`

function incompleteTaskCount(todoList) {
  return incompleteTasks(todoList).length;
}

// // 👟👟👟 uncomment the lines below to test

console.log('incompleteTaskCount', incompleteTaskCount(todoList))
console.log('todoList after incompleteTaskCount', copy(todoList))


function removeTask(todoList, taskId) {
  let indexToRemove = todoList.findIndex(task => task.id === taskId)
  return todoList.splice(indexToRemove, 1)[0]
  // return todoList.filter(task => task.id !== taskId) 
}

// // 👟👟👟 uncomment the lines below to test

console.log('addTask', addTask(todoList, {
  task: 'demo task',
  complete: false,
  dueDate: '2021-12-15'  
}));
console.log('todoList after addTask', copy(todoList));
console.log('removeTask', removeTask(todoList, 4));
console.log('todoList after removeTask', copy(todoList));

