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
	
	return 0
}

function solution2(input){
	
	return 0
}

