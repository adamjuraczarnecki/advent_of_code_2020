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
	let seats = occupySeats(input)
	let stopsChanging = seats[1]

	while(!stopsChanging){
		seats = emptySeats(seats[0])
		seats = occupySeats(seats[0])
		stopsChanging = seats[1]
	}
	let occupiedSeats = 0;
	seats[0].forEach(x => occupiedSeats += x.count('#'))
	
	return occupiedSeats
}

function solution2(input){
	let seats = occupySeats2(input)	
	let stopsChanging = seats[1]

	while(!stopsChanging){
		seats = emptySeats2(seats[0])
		seats = occupySeats2(seats[0])
		stopsChanging = seats[1]
	}
	let occupiedSeats = 0;
	seats[0].forEach(x => occupiedSeats += x.count('#'))
	
	return occupiedSeats
}

function occupySeats(input){
	let seats = input;
	const seatsToOccupy = []
	for(let i = 0; i < input.length; i++){
		for(let ii = 0; ii< input[i].length; ii++){
			if(input[i][ii] === 'L'){
				if(adjacentSeats(input, i, ii).count('#') === 0){
					seatsToOccupy.push([i, ii])
				}
			}
		}
	}
	seatsToOccupy.forEach(x => seats[x[0]] = seats[x[0]].replaceAt(x[1] ,'#'))

	return [seats, seatsToOccupy.length === 0]
}

function emptySeats(input){
	let seats = input;
	const seatsToEmpty = []
	for(let i = 0; i < input.length; i++){
		for(let ii = 0; ii< input[i].length; ii++){
			if(input[i][ii] === '#'){
				if(adjacentSeats(input, i, ii).count('#') >= 4){
					seatsToEmpty.push([i, ii])
				}
			}
		}
	}
	seatsToEmpty.forEach(x => seats[x[0]] = seats[x[0]].replaceAt(x[1] ,'L'))

	return [seats, seatsToEmpty.length === 0]
}

function occupySeats2(input){
	let seats = input;
	const seatsToOccupy = []
	for(let i = 0; i < input.length; i++){
		for(let ii = 0; ii< input[i].length; ii++){
			if(input[i][ii] === 'L'){
				if(visibleOccupied(input, i, ii) === 0){
					seatsToOccupy.push([i, ii])
				}
			}
		}
	}
	seatsToOccupy.forEach(x => seats[x[0]] = seats[x[0]].replaceAt(x[1] ,'#'))

	return [seats, seatsToOccupy.length === 0]
}

function emptySeats2(input){
	let seats = input;
	const seatsToEmpty = []
	for(let i = 0; i < input.length; i++){
		for(let ii = 0; ii< input[i].length; ii++){
			if(input[i][ii] === '#'){
				if(visibleOccupied(input, i, ii) >= 5){
					seatsToEmpty.push([i, ii])
				}
			}
		}
	}
	seatsToEmpty.forEach(x => seats[x[0]] = seats[x[0]].replaceAt(x[1] ,'L'))

	return [seats, seatsToEmpty.length === 0]
}

function crawl(seats, i, ii, dX, dY){
	let seat = null;
	let inc = 1;
	while(!seat){
		if(!seats[ii+(dY*inc)]){return null}
		let space
		try{
			space = seats[i+(dX*inc)][ii+(dY*inc)]
		}catch {}
		if (space===undefined){return null}
		if(space!='.'){seat=space}
		inc++
	}
	return seat
}

function visibleOccupied(seats, i, ii){
	let visibleOccupied = 0;
	if(crawl(seats, i, ii,  1,  0) === '#'){visibleOccupied++}  // down
	if(crawl(seats, i, ii, -1,  0) === '#'){visibleOccupied++}  // up
	if(crawl(seats, i, ii,  0,  1) === '#'){visibleOccupied++}  // right
	if(crawl(seats, i, ii,  0, -1) === '#'){visibleOccupied++}  // left
	if(crawl(seats, i, ii,  1,  1) === '#'){visibleOccupied++}  // down right
	if(crawl(seats, i, ii,  1, -1) === '#'){visibleOccupied++}  // down left
	if(crawl(seats, i, ii, -1, -1) === '#'){visibleOccupied++}  // up left
	if(crawl(seats, i, ii, -1,  1) === '#'){visibleOccupied++}  // up right
	return visibleOccupied
}

function adjacentSeats(input , i, ii){
	const adjacentPositions = [ [i-1,ii-1], [i-1,ii], [i-1,ii+1],[i,ii-1],[i,ii+1], [i+1,ii-1], [i+1,ii], [i+1,ii+1]]
	const adjacentSeats = []
	
	adjacentPositions.forEach(function(x){
		
		try {
			adjacentSeats.push(input[x[0]][x[1]]);
		} catch (error) {}
	}, this)
	return adjacentSeats.filter(x => x!== null)
}

Array.prototype.count = function(element) {
	return this.filter(x => x === element).length
}
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
String.prototype.count = function(s1){
	return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;  
}