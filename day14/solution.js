const fileUrl = 'input.txt'
fetch(fileUrl)
   .then( r => r.text() )
   .then( t => job(t))
   
function job(input){
	if(typeof input === "object"){
		input = input.join('\n')
	}
	const span = document.querySelector('#answer1')
	span.innerText = solution1(input)
	const span2 = document.querySelector('#answer2')
	span2.innerText = solution2(input)
}

function solution1(input){
	const instructions = parseInput(input);
	const program = new Program();
	instructions.forEach(x =>program.exeInstruction(x))
	return program.sumInMemory
}

function solution2(input){
	const instructions = parseInput(input);
	const program = new Program();
	let i = 0;
	instructions.forEach(x => program.exeInstruction2(x))
	return program.sumInMemory
}

class Program {
	constructor(){
		this.memory = {};
	}
	
	get sumInMemory(){
		let sum = 0;
		for (let mem in this.memory){
			sum += this.memory[mem]
		}
		return sum
	}
	
	exeInstruction(instruction){
		instruction.params.forEach(x => this.memory[x.addres] = x.maskedVal(instruction.mask));
	}
	
	exeInstruction2(instruction){
		for(let i = 0; i < instruction.params.length; i++){
			const adresses = instruction.params[i].maskedAdresses(instruction.mask);
			adresses.forEach(x => this.memory[x] = instruction.params[i].val);
		}	
	}
}

class Instruction {
	constructor(input){
		this.mask = input[0];
		this.params = [];
		input.splice(1).forEach(x => this.params.push(new Parameter(parseInt(x.split(' = ')[0].replace('mem[', '').replace(']', '')), parseInt(x.split(' = ')[1])))
		)
	}
}

class Parameter {
	constructor(addres, val){
		this.addres = addres;
		this.val = val; 
	}
	
	get binaryVal() {
		const bin = this.val.toString(2)
		return '0'.repeat(36-bin.length) + bin
	}
	
	get binaryAddres() {
		const bin = this.addres.toString(2)
		return '0'.repeat(36-bin.length) + bin
	}
	
	maskedVal(mask){
		let param = this.binaryVal;
		for(let i = 0; i < mask.length; i++){
			if(mask[i] === '1' || mask[i] === '0'){
				param = param.replaceAt(i, mask[i])
			}
		}
		return parseInt(param, 2)
	}
	
	maskedAdresses(mask){
		let addres = this.binaryAddres;
		for(let i = 0; i < mask.length; i++){
			if(mask[i] === '1' || mask[i] === 'X'){
				addres = addres.replaceAt(i, mask[i])
			}
		}
		// to avoid browser crash by pasting example puzzle input
		if(addres.count('X') > 10){
			return []
		}
		const combinations = generateStates(addres.count('X'));
		const adresses = [];
			for(let ii = 0; ii < combinations.length; ii++){
				let index = 0;
				let newAddres = addres
				for(let iii = 0; iii < addres.length; iii++){
					if(addres[iii] === 'X'){
						newAddres = newAddres.replaceAt(iii, combinations[ii][index])
						index++;
					}
				}
				adresses.push(parseInt(newAddres, 2))
			}
		return adresses
	}
}

function parseInput(input){
	return input.split('mask = ').map(x => x.split(/\r?\n/)).filter(x => x!='' ).map(x => new Instruction(x.filter(x => x!='' )))
}

function generateStates(n){
  const states = [];
  var maxDecimal = parseInt("1".repeat(n),2);
  for(let i = 0; i <= maxDecimal; i++){
    states.push(i.toString(2).padStart(n,'0'));
  }

  return states;
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

String.prototype.count = function(s1){
	return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;  
}