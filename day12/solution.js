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
	const ship = new Ship();
	const instructions = parseInput(input);
	instructions.forEach(x => ship.move(x));
	return ship.manhatanDistance
}
let ship
function solution2(input){
	ship = new BetterShip();
	const instructions = parseInput(input);
	instructions.forEach(x => ship.move(x));
	return ship.manhatanDistance
}

class BetterShip {
	constructor(){
		this.shipPosition = {
			north : 0,
			east  : 0,};
		this.waypointPosition = {
			north : 1,
			east  : 10
		};
	}
	
	get manhatanDistance(){
		return Math.abs(this.shipPosition.north) + Math.abs(this.shipPosition.east)
	}
	
	move(instruction){
		if (instruction.action === 'F'){
			this.forward(instruction.val);
		} else if (instruction.action === 'L' || instruction.action === 'R'){
			this.rotateWaypoint(instruction.action, instruction.val);
		} else {
			this.moveWaypoint(instruction.action, instruction.val);
		}
	}
	
	forward(val){
		this.shipPosition.north = this.shipPosition.north + (this.waypointPosition.north * val);
		this.shipPosition.east = this.shipPosition.east + (this.waypointPosition.east * val);
	}
	
	moveWaypoint(dir, val){
		switch(dir){
			case 'N':
				this.waypointPosition.north +=  val;
			break;
			case 'E':
				this.waypointPosition.east +=  val;
			break;
			case 'S':
				this.waypointPosition.north -=  val;
			break;
			case 'W':
				this.waypointPosition.east -=  val;
			break;
		}
	}
	
	rotateWaypoint(dir, deg){
		if(dir === 'L'){
			if(deg === 90){
				const temp = this.waypointPosition.north;
				this.waypointPosition.north =  this.waypointPosition.east;
				this.waypointPosition.east  = -temp;
			}  else if (deg === 270) {
				const temp = this.waypointPosition.east;
				this.waypointPosition.east   = this.waypointPosition.north;
				this.waypointPosition.north  =  -temp;
			}
		} else if(dir === 'R'){
			if(deg === 90){
				const temp = this.waypointPosition.east;
				this.waypointPosition.east  = this.waypointPosition.north;
				this.waypointPosition.north = -temp;
			}  else if (deg === 270) {
				const temp = this.waypointPosition.east;
				this.waypointPosition.east   = -this.waypointPosition.north;
				this.waypointPosition.north  = temp;
			}
		}
		if (deg === 180){
			this.waypointPosition.east   = -this.waypointPosition.east
			this.waypointPosition.north  = -this.waypointPosition.north
		}
	}
}

class Ship {
	constructor() {
		this.direction = 'E';
		this.position = {
				north : 0,
				east  : 0,};		
	}
	
	get manhatanDistance(){
		return Math.abs(this.position.north) + Math.abs(this.position.east)
	}
	
	move(instruction){
		if (instruction.action === 'F'){
			this.moveRel(instruction.action, instruction.val);
		} else if (instruction.action === 'R' || instruction.action === 'L'){
			this.rotate(instruction.action, instruction.val)
		} else {
			this.moveDir(instruction.action, instruction.val)
		}
	}
	
	moveDir(action, val){
		switch(action){
			case 'N':
				this.position.north +=  val;
			break;
			case 'E':
				this.position.east +=  val;
			break;
			case 'S':
				this.position.north -=  val;
			break;
			case 'W':
				this.position.east -=  val;
			break;
		}
	}
	moveRel(action, val){
		this.moveDir(this.direction, val);
	}
	rotate(action, val){
		const directories = ['N', 'E', 'S', 'W'];
		const currentDirIndex = directories.indexOf(this.direction)
		const deg = val / 90;
		if(action === 'R'){
			this.direction = directories[(currentDirIndex + deg) % 4]
		} else {
			if (currentDirIndex >= deg){
				this.direction = directories[currentDirIndex - deg]
			} else {
				this.direction = directories[currentDirIndex - deg + 4]
			}
		}
	}
}

class Instruction{
	constructor(inpuLine){
		this.action = inpuLine[0];
		this.val = parseInt(inpuLine.substring(1));
	}
}

function parseInput(input){
	const instructionList = [];
	input.forEach(x => instructionList.push(new Instruction(x)))
	return instructionList
}