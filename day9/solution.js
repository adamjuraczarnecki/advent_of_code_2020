const fileUrl = 'input.txt'
fetch(fileUrl)
   .then( r => r.text() )
   .then( t => job(t.split(/\r?\n/)) )
   
function job(input, preamble = 25){
	const span = document.querySelector('#answer1')
	span.innerText = solution1(input, preamble)
	const span2 = document.querySelector('#answer2')
	span2.innerText = solution2(input, preamble)
}
	  

function solution1(input, preamble){
	const numbers = parseNumbers(input);
	
	for (let i = preamble; i < numbers.length; i++) {
		if(!isSumInArray(numbers[i], numbers.slice(i - preamble, i)))
			return numbers[i]
	}
}

function solution2(input, preamble){

	return findContiguousSet(solution1(input, preamble), parseNumbers(input))
}

function findContiguousSet(sum, arr){
	for(let i = 0; i < arr.length; i++){
		let total = arr[i];
		for(let ii = i + 1; ii < arr.length; ii++){
			total += arr[ii]
			if(total > sum){
				break
			} else if (total === sum) {
				return Math.min(...arr.slice(i, ii)) + Math.max(...arr.slice(i, ii))			
			}
		}
	}
}

function isSumInArray(sum, arr){
	for(let i = 0; i < arr.length; i++){
		if (arr.includes(sum - arr[i])){
			return true
		}
	}
	return false
 }

function parseNumbers(input){
	return input.filter(x => x != '').map(x => parseInt(x))
}

const testInput = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`.split(/\r?\n/)
