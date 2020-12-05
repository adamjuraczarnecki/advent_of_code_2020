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
	let highestID = 0;
	for (let i = 0; i < input.length; i++) {
		if (getSeatID(input[i]) > highestID) {
			highestID = getSeatID(input[i])
		}
	}
	return highestID
}

function solution2(input){
	let arr = range(8, solution1(input))
	for (let i = 0; i < input.length; i++){
		arr = arr.filter(x => x != getSeatID(input[i]))
	}
	return arr.pop()
}

function BSP(coordinants, low, up){
	let min = 0;
	let max = 2 ** coordinants.length - 1;
	for (let i = 0; i < coordinants.length; i++){
		const numOfRows = (max + 1 - min) / 2
		if(coordinants[i] === low){
			max = max - numOfRows
		} else if (coordinants[i] === up){
			min = min + numOfRows
		}
	}
	return max
}

function getRowNumber(seat){
	return BSP(seat.slice(0,7), 'F','B')
}

function getColumnNumber(seat){
	return BSP(seat.slice(-3), 'L','R')
}

function getSeatID(seat){
	return getRowNumber(seat) * 8 + getColumnNumber(seat)
}

function range(min, max){
	let arr = [];
	for (let i = min; i <= max; i++){
		arr.push(i);
	}
	return arr
}