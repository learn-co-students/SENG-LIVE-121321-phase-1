let meals = [
  {
    meal: 'Scrambled Eggs',
    mealType: 'breakfast'
  }, 
  {
    meal: 'Buttermilk Pancakes',
    mealType: 'breakfast'
  },
  {
    meal: 'Chocolate Protein Shake',
    mealType: 'breakfast'
  },
  {
    meal: 'BLT Sandwich',
    mealType: 'lunch'
  },
  {
    meal: 'Soup',
    mealType: 'lunch'
  },
  {
    meal: 'Burrito',
    mealType: 'lunch'
  },
  {
    meal: 'Indian Curry',
    mealType: 'dinner'
  },
  {
    meal: 'Grilled Chicken Caesar',
    mealType: 'dinner'
  },
  {
    meal: 'Fish & Chips',
    mealType: 'dinner'
  }
]

let shoppingList = [
  {name: 'Apples', quantity: 2, price: 1.99},
  {name: 'Dates', quantity: 1, price: 5.99},
  {name: 'Coconut Water', quantity: 3, price: 2.49}
]


let total = shoppingList.reduce(function (total, currentItem) {
  return total + currentItem.quantity * currentItem.price
}, 0)