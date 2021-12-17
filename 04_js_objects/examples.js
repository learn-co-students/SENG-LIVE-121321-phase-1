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
  },
  { 
    meal: 'Beanfields chips',
    mealType: 'snack'
  }
]


// const menu = {
 
// }

// dot notation version
// meals.forEach(m => {
//   if (m.mealType === 'breakfast') {
//     menu.breakfast.push(m.meal);
//   } else if (m.mealType === 'lunch') {
//     menu.lunch.push(m.meal);
//   } else if (m.mealType === 'dinner') {
//     menu.dinner.push(m.meal)
//   }
// })

// bracket notation version


function generateMenu(meals) {
  const menu = {}
  meals.forEach(m => {
    if(!menu[m.mealType]) {
      menu[m.mealType] = []
    }
    menu[m.mealType].push(m.meal)
  })
  return menu;
}

console.log('generateMenu(meals)', generateMenu(meals))

// reduce version
function generateMenuWithReduce(meals) {
  return meals.reduce((menu, m) => {
    if(!menu[m.mealType]) {
      menu[m.mealType] = []
    }
    menu[m.mealType].push(m.meal)
    return menu;
  }, {})
}

const menu = generateMenu(meals)

for (const menuItem in menu) {
  console.log(`${menuItem}`)
  menu[menuItem].forEach(m => console.log(`  ${m}`))
}

Object.keys(menu).forEach(menuItem => {
  console.log(`${menuItem}`)
  menu[menuItem].forEach(m => console.log(`  ${m}`))
})

let shoppingList = [
  {name: 'Apples', quantity: 2, price: 1.99},
  {name: 'Dates', quantity: 1, price: 5.99},
  {name: 'Coconut Water', quantity: 3, price: 2.49}
]


let total = shoppingList.reduce(function (total, currentItem) {
  return total + currentItem.quantity * currentItem.price
}, 0)