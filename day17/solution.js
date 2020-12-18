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

	return simulation(input)
}

function solution2(input){

	return simulation(input, 4)
}

function calc(coordinates) {
	if (coordinates.length === 0) {
		return [[]];
	} else {
		const rest = calc(coordinates.slice(1));
		return [...rest.map(x => [coordinates[0] - 1, ...x]), ...rest.map(x => [coordinates[0], ...x]), ...rest.map(x => [coordinates[0] + 1, ...x]),];
	}
}

function getNeighbors(key) {
	const coordinates = key.split(',').map(x => +x);
	return calc(coordinates).map(c => c.join(',')).filter(c => c !== key);
}

function pasreInput(input, dimensions){
	let map = new Map();
	input.map((line, y) => {
    line.split('').map((char, x) => {
		const coordinates = new Array(dimensions - 2).fill(0);
		map.set([x, y, ...coordinates].join(','), char === '#');
    });
  });
  return map
}

function simulation(input, dimensions = 3) {
	let map = pasreInput(input, dimensions)
	let count;
	for (let i = 0; i < 6; i++) {
		let next = new Map();
		let missing = [];
		count = 0;

		for (let key of map.keys()) {
			if (map.get(key)) {
				missing = missing.concat(getNeighbors(key).filter(key => !map.has(key)),);
			}
		}
		missing.forEach(key => map.set(key, false));

		for (let key of map.keys()) {
			const active = getNeighbors(key).filter(key => map.get(key)).length;
			next.set(key, (map.get(key) && active === 2) || active === 3);
			if (next.get(key)) {
				count++;
			}
		}
		map = next;
	}
	return count;
}