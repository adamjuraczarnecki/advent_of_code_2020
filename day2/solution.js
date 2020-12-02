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
	let validPassCount = 0;
	for(let i = 0; i < input.length; i++){
		const pass = input[i].split(' ')[2]
		const letter = input[i].split(' ')[1][0]
		const min = parseInt(input[i].split('-')[0])
		const max = parseInt(input[i].split('-')[1])
		if (pass.count(letter)>= min && pass.count(letter) <= max){
			validPassCount ++;
		}
	}
	return validPassCount
}

function solution2(input){
	let validPassCount = 0;
	for(let i = 0; i < input.length; i++){
		const pass = input[i].split(' ')[2]
		const letter = input[i].split(' ')[1][0]
		const index1 = parseInt(input[i].split('-')[0]) - 1
		const index2 = parseInt(input[i].split('-')[1]) - 1
		let matchedLetters = 0;
		if(pass[index1] === letter) {matchedLetters++}
		if(pass[index2] === letter) {matchedLetters++}
		if (matchedLetters === 1){
			validPassCount ++;
		}
	}
	return validPassCount
}

String.prototype.count = function(s1){
	return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;  
}