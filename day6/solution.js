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
	let sumOfGroupAnswersCount = 0;
	const groups = splitToGroups(input);
	for (let i = 0; i < groups.length; i++){
		sumOfGroupAnswersCount += getGroupAnswersCount(groups[i])
	}
	return sumOfGroupAnswersCount
}

function solution2(input){
	let sumOfAllYesGroupAnswersCount = 0;
	const groups = splitToGroups(input);
	for (let i = 0; i < groups.length; i++){
		sumOfAllYesGroupAnswersCount += getAllYesGroupAnswersCount(groups[i])
	}
	return sumOfAllYesGroupAnswersCount
}

function getGroupAnswersCount(group){
	let groupAnswers = [];
	for(let i = 0; i < group.length; i++){
		for(let ii = 0; ii < group[i].length; ii++){
			groupAnswers.push(group[i][ii])
		}
	}
	return new Set(groupAnswers).size
}

function splitToGroups(input){
	let groups = [];
	let = group = [];
	for (let i = 0; i < input.length; i++){
		if (input[i] === ''){
			groups.push(group)
			group = [];
		} else {
			group = group.concat(input[i])
		}
	}
	return groups
}

function getAllYesGroupAnswersCount(group){
	let groupAnswers = [];
	for(let i = 0; i < group.length; i++){
		for(let ii = 0; ii < group[i].length; ii++){
			groupAnswers.push(group[i][ii])
		}
	}
	groupAnswers = groupAnswers.filter(x => groupAnswers.occurance(x) === group.length)
	return new Set(groupAnswers).size
}

Array.prototype.occurance = function(value){
	return this.filter(x => x === value).length
}