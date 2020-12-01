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
	for(let i = 0; i < input.length; i++){
		for(let ii = 0; ii < input.length; ii++){
			if(parseInt(input[i]) + parseInt(input[ii]) === 2020){
				return parseInt(input[i]) * parseInt(input[ii])
			}
		}
	}
}

function solution2(input){
	for(let i = 0; i < input.length; i++){
		for(let ii = 0; ii < input.length; ii++){
			for(let iii = 0; iii < input.length; iii++){
				if(parseInt(input[i]) + parseInt(input[ii]) + parseInt(input[iii]) === 2020){
					return parseInt(input[i]) * parseInt(input[ii]) * parseInt(input[iii])
				}
			}
		}
	}
}