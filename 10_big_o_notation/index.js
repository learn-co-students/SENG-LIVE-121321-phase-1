// ✅ What is Asymptotic Notation?

	// used to describe runtime of an algorithm
	// "how much time will an algorithm take given an input N?"
		
	// Goal = finding a balance between the efficiency and readability of our code
	// depending on context.

	// concerning ourselves with runtime isn't always necessary

		// constant operation (simplest runtime)

			let myArray = [1,2,3,4,5];

			const arrayLength = myArray.length;

			// console.log(arrayLength);

// ✅ Big Θ (Theta) Notation

	// number of iterations the algorithm always takes with an input of n

	// Θ(N) - always iterates N times for a list size of N
	let shorterArray = [1,2,3,4,5];
	let longerArray = [1,2,3,4,5,6,7,8,9,10];
			
	function iterateItems(arr) {
		arr.forEach(num => {
			console.log(num);
		});
	}

	// iterateItems(shorterArray);
	// iterateItems(longerArray);

// ✅ Big Ω (Omega) Notation

	// best case running time

	function findIndex(itemsArray, matchCase) {
		for (let i = 0, total = itemsArray.length; i < total; i++)
		  if (itemsArray[i] == matchCase) {
				console.log(i);
		  }
		 console.log(-1);
	};

	const lettersArray= ['a', 'b', 'c', 'd'];
	
	// findIndex(lettersArray, 'a'); 	
	// 0  (best case, one iteration)
	// Big Ω(1) (we find it in the first index)

// ✅ Big O Notation

	// worst case running time
	// Big O(N)
	
	// knowing Big O helps us to be more aware of the efficiency of algorithms so
	// that we can optimize the performance of our applications

	// help us to select the most efficient solution
	
		// findIndex(lettersArray, 'd'); 
		
			// 3  (worst case, 4 iterations)
		
		// findIndex(lettersArray, 'e'); 
		
			// -1 (worst case, 4 iterations)

	// Constant Time Complexity: Big O(1)

		function multipleByTwo(num) {
			return 2 * num
		}
		
		// console.log(multipleByTwo(10)); // 20 iterations
		// console.log(multipleByTwo(3000)); // 6000 iterations

	// Linear Time Complexity: Big O(N)

		function reverseArr(originalArray) {
			let newArray = []
			for (let i = originalArray.length - 1; i >= 0; i--) {
				newArray.push(originalArray[i])
			}
			
			return newArray
		}
		
		// console.log(reverseArr([4, 5, 6])); // [6, 5, 4]
		// console.log(reverseArr([6, 5, 4, 3, 2, 1])); // [1, 2, 3, 4, 5, 6]

	// Quadratic Time Complexity: Big O(N^2)

		function multAllElements(arr1, arr2) {
			if (arr1.length !== arr2.length) return undefined
				
				let sumOfProducts = 0
				
				for (let el of arr1) {
					for (let subEl of arr2) {
						sumOfProducts += el * subEl
					}
				}
			return sumOfProducts;
		}

		// console.log(multAllElements([1, 2], [9, 10])); // yields 57
		// console.log(multAllElements([1, 2, 3, 4], [5, 6, 7, 8])); // yields 260

// -------------------------------------------

console.log("------------------------");
console.log("⬇️ Extra Activities ⬇️");
console.log("🚨 Comment Out Lecture Code Above Before Starting 🚨");
console.log("💡 Use console.log() To Check Answers 💡");
console.log("------------------------");

// ❗ Use these constants / functions in your solutions

// 🚧 Activity 1: Calculating Big O Runtimes

	// 🚨 Comment out any conflicting lecture code above before proceeding.

	// 1️⃣ Determine the Big O runtime of findIndexOfFirstNumber() below.

		function findIndexOfFirstNumber(num, arr) {
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] === num) {
					return i;
				}
			}

			return -1
		}

	// ✅ Write your answer / explanation here.
	
	// Time: O(N) Space: O(1)
	
	// in the worst case, the number is the last in the array or not present
	// in both cases, the algorithm will traverse the entire array of N elements
	// the length of the array doesn't affect how much memory the algorithm uses.

	// 2️⃣ Determine the Big O runtime of findIndexOfEachNumber() below.

		function findIndexOfEachNumber(num, arr) {
			let arrayOfIndices = [];
			arr.forEach((el, i) => {
				if (el === num) {
					arrayOfIndices.push(i);
				}
			});
			
			return arrayOfIndices;
		}

	// ✅ Write your answer / explanation here.

// 🚧 Activity 2: Calculating Big O Runtimes

	// 1️⃣ Determine the Big O runtime of findHigherOrLower() below.

		const array = [36, 14, 1, 7, 21];

		function findHigherOrLower(arr) {
			if (arr[arr.length -1 ] > arr[0]) {
				return "Higher";
			} else if (arr[arr.length -1 ] < arr[0]) {
				return "Lower";
			} else {
				return "Neither";
			}
		}

		// ✅ Write your answer / explanation here.
		// Time:  O(1) The algorithm accesses individual array values by index. Because this does not require iteration, the size of the array doesn't affect how many operations the algorithm requires
		// Space: O(1) We're not storing information proportional to the size of the input.

	// 2️⃣ Determine the Big O runtime of findSumOfSequentialArray() below.

		const numsArray = [1,2,3,4,5,6,7,8];

		function findSumOfSequentialArray(arr) {
			let sumOfNums = 0;
			for (let i = 0; i < arr.length; i++) {
				sumOfNums += arr[i];
			}

			return sumOfNums;
		}

		// ✅ Write your answer / explanation here.
		// Time: O(N) The algorithm will iterate over the entire array a single time, introducing linear time complexity.
		// Space: O(1) We only have a constant number of variables defined here, not affected by array size.

// 🚧 Activity 3: Calculating Big O Runtimes

	// 🚨 Comment out any conflicting lecture code above before proceeding.

	// 1️⃣ Determine the Big O runtime of sortArraysByValue() below.

		function sortArraysByValue(arr){
			function swap(arr, index1, index2){
        let temporaryValue = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temporaryValue;
			}
			let count = 1;
			while (count < arr.length) {
        let swapCount = 0;
        for (let i=0; i<arr.length-count; i++) {
          if (arr[i] > arr[i+1]) {
            swap(arr, i, i+1);
            swapCount++;
          }
        }
        count++;
      }
			return arr;
		}

		// ✅ Write your answer / explanation here.
		// Time: O(N^2) Because we have nested iteration, the number of operations required will increase quadratically as a function of the input size.
		// Space: O(1) We only have a constant number of variables defined here, so space complexity is not influenced by the size of the input.

	// 2️⃣ Determine the Big O runtime of findSumOfSequentialArray() below.

		const sequentialArray = [1,2,3,4,5,6,7,8];

		function findSumOfSequentialArray(arr) {
			return arr.length * (arr.length + 1)/2;
		}

		// ✅ Write your answer / explanation here.
		// Time: O(1) because we have no iteration, just a constant number of expressions, the size of the input doesn't affect the number of required operations.
		// Space: O(1) Our algorithm is storing nothing in memory.