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
	  
let program;
function solution1(input){
	program = new Program(input.filter(x => x != ''))
	return program.exeToFistLoop()
}

function solution2(input){

	return program.codeFixer()
}

class Program {
	constructor(input){
		const operations = [];
		input.forEach(x => operations.push(new Instruction(x)));
		this.operations = operations;
		this.accumulator = 0;
		this.currsor = 0;
	}
	exeOneStep() {
		const instruction = this.operations[this.currsor]
		switch(instruction.operation) {
			case 'nop':
				this.currsor++;
			break;
			case 'acc':
				this.accumulator += instruction.argument;
				this.currsor++;
			break;
			case 'jmp':
				this.currsor += instruction.argument;
			break;
		}
	}
	
	exeToFistLoop(){
		const executedOps =[];
		this.accumulator = 0;
		this.currsor = 0;
		do {
			executedOps.push(this.currsor);
			this.exeOneStep();
			if (this.currsor === this.operations.length){
				return this.accumulator
			}
		} while(!executedOps.includes(this.currsor));
		
		return this.accumulator
	}
	
	codeFixer() {
		for(let i = 0 ;i < this.operations.length; i = this.nextJmpOrNopCurrsor(i)){
			this.accumulator = 0;
			this.currsor = 0;
			this.operations[i].swithOp()
			this.exeToFistLoop()
			if(this.currsor === this.operations.length){
				return this.accumulator
			} else {
				this.operations[i].swithOp()
			}
		}
	}
	
	nextJmpOrNopCurrsor(currsor) {
		for(let i = currsor + 1; i < this.operations.length; i++){
			if (this.operations[i].operation === 'jmp' || this.operations[i].operation  === 'nop') {
				return i
			}
		}
	}
}

class Instruction {
	constructor(line){
		this.operation = line.split(' ')[0];
		this.argument = parseInt(line.split(' ')[1])
	}
	
	swithOp(){
		if(this.operation === 'nop'){
			this.operation = 'jmp'
		} else if (this.operation === 'jmp') {
			this.operation = 'nop'
		}
	}
}
