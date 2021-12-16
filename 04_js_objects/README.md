# Phase 1 - Lecture 4 => JS Objects


## Topics

- 📌 Creating and accessing objects
- 📌 Modifying objects
- 🤓 Prototypal inheritance
- 💡 Iterating through objects
  - 💡 [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
  - 💡 [Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
  - 💡 [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) & [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loops
- 💡 [Pass by value vs. pass by reference](https://stackoverflow.com/a/25117245/14715297) review

## Notes Before We Start

- Tangential Questions HackMD doc for questions not directly related to our current topic (let me know when you add something and I'll get to it at a logical stopping point)
- How the code we're writing now fits into the bigger picture of your learning journey.

## Agenda

- Discuss the Reduce Function (with examples.js)
- Shallow dive into Prototypal Inheritance
- Discuss Object Iteration
- Do a review of yesterday's content and add a bit


## The Reduce Function

Reduce is a useful iterative function. Whenever we need to iterate and reduce an array to a single value, the reduce function can handle that.

The diagram below outlines how it works in the case where we're looking to reduce an array of shopping list items to its total cost.
![Reduce Function](../assets/reduce-diagram.png)
The first parameter in the reducer function is referred to as an accumulator. The second parameter represents the current element in the array being reduced. (Elements are passed to the reducer function as the second argument one at a time until the array has been traversed completely.) 

The Docs for Reduce on MDN have a bunch more practical examples we can look over.

## 🤓 Prototypal Inheritance 🤓

The methods we discussed yesterday are defined on the Array prototype. Prototypes are the foundation of how objects in JavaScript can access the functionality built into the language.
If we add a method to the Array prototype like so:

```js
Array.prototype.sample = function() {
  return this[Math.floor(Math.random()*(this.length))]
}
```

Then we can call that method on any arrays in our program.

```js
meals.sample() // returns a random element from the breakfast array.
```

Adding methods to a built in JavaScript Object is called [Monkey Patching](https://www.audero.it/blog/2016/12/05/monkey-patching-javascript/).

The function above is an example of how we're able to access methods like `.pop()` and `.push()` when we interact with arrays. Those methods are both defined on the Array prototype, giving us access to them on all Array objects in our program.

For now, understanding that the methods and properties that we access on objects or primitives within JavaScript are defined either directly on the object itself or on the prototype for that object or primitive data type.

## Object Iteration

What methods can we use to iterate over an object? When would this be useful?

## Tasks for Music Library

- `addSongToPlaylist` (make sure both of these functions add an id to the newly added)
- `calculatePlaylistDuration(playlist)`
- `renameArtist(playlist, oldArtistName, newArtistName)`

## Tasks for Todo List

- `markComplete(todoList, taskId)`
- `addDueDateToTask(todoList, taskId, dueDate)`


## Resources

- [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
- [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) & [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loops
- [For vs forEach() vs for/in vs for/of in JavaScript](https://thecodebarbarian.com/for-vs-for-each-vs-for-in-vs-for-of-in-javascript.html)
- [Pass by value vs. pass by reference](https://stackoverflow.com/a/25117245/14715297) 

