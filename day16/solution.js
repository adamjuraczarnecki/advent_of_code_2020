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
	const [ranges, myTicket, nearbyTickets] = parseInput(input)
	const errorRate = nearbyTickets.reduce((a, x) => a + ranges.scanTicket(x), 0);
	return errorRate
}

function solution2(input){
	const [ranges, myTicket, nearbyTickets] = parseInput(input)
	const validTickets = nearbyTickets.filter(x => ranges.scanTicket(x) === 0)
	validTickets.push(myTicket)
	let possiblePositions = [];
	const setPositions = []
	ranges.rules.forEach(x => possiblePositions.push({ 'name' : x.name, 'positions' : x.findPossiblesPositions(validTickets)}));
	do {
		const candidats = possiblePositions.filter(x => x.positions.length === 1);
		candidats.forEach(x => setPositions.push({ 'name' : x.name, 'position' : x.positions[0]}));
		candidats.forEach(can => possiblePositions = possiblePositions.filter(x => x!==can));
		candidats.forEach(function(can){
			for(let i = 0; i < possiblePositions.length; i++){
				possiblePositions[i].positions = possiblePositions[i].positions.filter(x => x!== can.positions[0]);
			}
		})
	} while (possiblePositions.length > 0)
	setPositions.forEach(x => console.log(`${x.name}: position: ${x.position}`))
	const departurePositions = setPositions.filter(x => x.name.includes('departure'));
	let multiplyDeparturePositions = 1;
	console.log('\nYour Ticket Departure FIelds:')
	for(let i = 0; i < departurePositions.length; i++){
		console.log(`${departurePositions[i].name} - position: ${departurePositions[i].position}, value: ${myTicket.values[departurePositions[i].position]} `)
		multiplyDeparturePositions *= myTicket.values[departurePositions[i].position]
	}
	return multiplyDeparturePositions !== 1 ? multiplyDeparturePositions : 'No "Departure" fields in input '
}

function parseInput(input){
	input = input.join('\n');
	input = input.split('\n\n')
	const myTicket = new Ticket(input[1].split('\n')[1]);
	const setOfRules = new SetOfRules(input[0].split('\n'));
	const nearbyTickets = input[2].split('\n').filter(x => x !== '').slice(1).map(x => new Ticket(x));
	return [setOfRules, myTicket, nearbyTickets] 
}

class SetOfRules{
	constructor(inputLines){
		this.rules = inputLines.map(x => new Field(x));
	}
	scanTicket(ticket){
		let errorRate = 0
		for(let i = 0; i < ticket.values.length; i++){
			let errorFlag = false
			for(let ii = 0; ii < this.rules.length; ii++){
				if(this.rules[ii].isValid(ticket.values[i])){
					errorFlag = true;
					break;
				}
			}
			if(!errorFlag){
				errorRate += ticket.values[i];
			}
		}
		return errorRate
	}
	
}

class Field {
	constructor(inputLine){
		this.name = inputLine.split(':')[0];
		this.lowRange = inputLine.split(':')[1].split(' or ')[0].split('-').map(x => parseInt(x))
		this.highRange = inputLine.split(':')[1].split(' or ')[1].split('-').map(x => parseInt(x))
	}
	
	isValid(val){
		return (val >= this.lowRange[0] && val <= this.lowRange[1]) || (val >= this.highRange[0] && val <= this.highRange[1])
	}
	
	findPossiblesPositions(tickets){
		const possiblePositions = [];
		for(let i_rule = 0; i_rule < tickets[0].values.length; i_rule++){
			let errorFlag = false;
			for(let i_ticket = 0; i_ticket < tickets.length; i_ticket++){
				if(!this.isValid(tickets[i_ticket].values[i_rule])){
					errorFlag = true;
					break;
				}
			}
			if(!errorFlag){
				possiblePositions.push(i_rule)
			}
		}
		return possiblePositions
	}
}

class Ticket {
	constructor(input){
		this.values = input.split(',').map(x => parseInt(x))
	}
}