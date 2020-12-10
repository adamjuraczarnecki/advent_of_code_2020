const fileUrl = 'input.txt'
fetch(fileUrl)
   .then( r => r.text() )
   .then( t => job(t.split(/\r?\n/)) )
   
function job(input){
	const span = document.querySelector('#answer1')
	span.innerText = solution1(input)
	const span2 = document.querySelector('#answer2')
	span2.innerText = solution2(input)
}

function solution1(input){
	const numbers = parseNumbers(input);
	const diffs = getDiffs(numbers);
	return diffs.count(1) * diffs.count(3)
}

function solution2(input){
	const numbers = parseNumbers(input);
	numbers.pop();
	const combinations = numbers.map((x, i) => (i == 0 ? 1 : 0));
	for (let i = 0; i < combinations.length; i++) {
		for (let ii = i - 3; ii < i; ii++) {
			if (isMultiple(numbers[i], numbers[ii])) {
				combinations[i] += combinations[ii];
			}
		}
	}	
	return combinations[combinations.length - 1]
}

function isMultiple(a, b){
	return a - b <= 3
}
function parseNumbers(input){
	const numbers = input.filter(x => x != '').map(x => parseInt(x))
	numbers.push(0);
	numbers.push(Math.max(...numbers) + 3)
	return numbers.sort((a, b) => a - b)
}

function getDiffs(numbers){
	const diffs = [];
	for (let i = 0; i < numbers.length-1; i++){
		const diff = numbers[i+1] - numbers[i];
		diffs.push(diff);
	}
	return diffs
}

Array.prototype.count = function(element) {
	return this.filter(x => x === element).length
}

// This works but is stupid as fuck, maby in a bigger machine not on a browser
function solution22(input){
	const numbers = parseNumbers(testInput);
	const diffs = getDiffs(numbers);
	const max = numbers[numbers.length - 1]
	let allPosibleCombination = getAllSubsets(numbers);
	allPosibleCombination = allPosibleCombination.map(x => x.sort(((a, b) => a - b)))
	allPosibleCombination = [...new Set(allPosibleCombination)]
	allPosibleCombination = allPosibleCombination.filter(isGoingToWork)
	allPosibleCombination = allPosibleCombination.filter(x => x[0] === 0 && x[x.length-1] === max)
	allPosibleCombination.sort()
	const result = [];
	allPosibleCombination.forEach(function(x){
		if(!result.includes(x)){
			result.push(x)
		}
	})
		
	return result.length / 2 // can't remove duplicats
}

function isPossible(a,b){
  return b - a <= 3 && b !== a
}

function isGoingToWork(combination){
	const trues =[];
	combination.push()
	for (let i = 1; i < combination.length; i++){
		trues.push(isPossible(combination[i-1], combination[i]))
	}
	return trues.every(x => x === true)
}

// https://stackoverflow.com/questions/42773836/how-to-find-all-subsets-of-a-set-in-javascript
const getAllSubsets = 
      theArray => theArray.reduce(
        (subsets, value) => subsets.concat(
         subsets.map(set => [value,...set])
        ),
        [[]]
      );
