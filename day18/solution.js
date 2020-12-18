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
	return input.filter(x => x!== '').reduce((a,x) => a + parseInput(x), 0)
}

function solution2(input){
	return input.filter(x => x!== '').reduce((a,x) => a + parseInput2(x), 0)
}

function solve(line){
	line = line.replace('(', '').replace(')', '').split(' ')
	let sum = parseInt(line[0]);
	for(let i = 0; i < line.length-2; i++){
		if(line[i+1] === '+'){
			sum += parseInt(line[i+2])
		} else if(line[i+1] === '*') {
			sum *= parseInt(line[i+2])
		}
	}
	return sum
}
function validateInput(input){
	return input.count('\\(') === input.count('\\)')
}
function parseInput(input){
	if(!validateInput(input)){return 0}
	while(input.includes('(')){
		input = input.replace(/\([\d \* \+]+\)/g, x => solve(x))
	}
	return solve(input)
}

function solve2(line){
	line = line.replace('(', '').replace(')', '')
	while(line.includes('+')){
		line = line.replace(/\d+ \+ \d+/g, x => add(x))
		//console.log(line)
	}
	while(line.includes('*')){
		line = line.replace(/\d+ \* \d+/g, x => multiply(x))
		//console.log(line)
	}

	return parseInt(line)
}

function add(x){
	return x.split(' + ').reduce((a, x) => a + parseInt(x) ,0)
}

function multiply(x){
	return x.split(' * ').reduce((a, x) => a * parseInt(x) ,1)
}

function parseInput2(input){
	if(!validateInput(input)){return 0}
	while(input.includes('(')){
		input = input.replace(/\([\d \* \+]+\)/g, x => solve2(x))
	}
	return solve2(input)
}

String.prototype.count = function(s1){
	return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;  
}