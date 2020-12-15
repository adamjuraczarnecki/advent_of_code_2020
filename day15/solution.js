const fileUrl = 'input.txt'
fetch(fileUrl)
   .then( r => r.text() )
   .then( t => job(t.split(/\r?\n/)) )
   
function job(input){
	const span = document.querySelector('#answer1')
	span.innerText = solution1(input.filter(x => x!='' ))
	const span2 = document.querySelector('#answer2')
	span2.innerText = solution2(input.filter(x => x!='' ))
}

function solution1(input){
	const spokenNumbers = input[0].split(',').map(x => parseInt(x));
	for(let i = spokenNumbers.length; i < 2020; i++){
		const last = spokenNumbers.pop();
		if (spokenNumbers.indexOf(last) === - 1){
			spokenNumbers.push(last);
			spokenNumbers.push(0);
		} else {
			const prelast = i - (spokenNumbers.lastIndexOf(last) + 1)
			spokenNumbers.push(last);
			spokenNumbers.push(prelast);
		}
	}
	
	return spokenNumbers.pop()
}
// this is much faster:
function solution2(input){
	input = input[0].split(',').map(x => parseInt(x));
	const spokenNumbers = {};
	let preLast
	let last = input.pop()
	input.forEach((x, i) => spokenNumbers[x]= i+1)
	for(let i = input.length + 1; i < 30000000; i++){
		preLast = last;
		if (spokenNumbers[last] === undefined){			
			last = 0;
		} else {
			last = i - spokenNumbers[last]
		}
		spokenNumbers[preLast] = i
	}
	return last
}