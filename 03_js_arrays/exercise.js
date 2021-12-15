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

}

// // 👟👟👟 uncomment the lines below to test

// console.log('addTask', addTask(todoList, {
//   task: 'Practice using the filter method',
//   complete: false,
//   dueDate: '2021-12-15'
// }))
// console.log('todoList after addTask', copy(todoList))





// 🚧 Task 2: `incompleteTasks(todoList)`

function incompleteTasks(todoList) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('incompleteTasks', incompleteTasks(todoList))
// console.log('todoList after incompleteTasks', copy(todoList))





// 🚧 Task 3: `incompleteTaskCount(todoList)`

function incompleteTaskCount(todoList) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('incompleteTaskCount', incompleteTaskCount(todoList))
// console.log('todoList after incompleteTaskCount', copy(todoList))





// ADVANCED DELIVERABLE!

// Think about different ways you could do this
// What would you want to return?
// How would you remove the task from todoList whose taskId is passed as an argument destructively?
// How would your approach the change if you wanted to return a todoList array 
// without the removed task non - destructively ? (Without affecting the todoList
// passed as an argument)
// Which is more difficult? Why?
function removeTask(todoList, taskId) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('addTask', addTask(todoList, {
//   task: 'demo task',
//   complete: false,
//   dueDate: '2021-12-15'  
// }));
// console.log('todoList after addTask', copy(todoList));
// console.log('removeTask', removeTask(todoList, 4));
// console.log('todoList after removeTask', copy(todoList));

