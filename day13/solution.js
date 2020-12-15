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
	const myTImeStamp = input[0];
	const busses = input[1].split(',').filter(x => x !== 'x').map(x => parseInt(x))
	const erliestBus = {}
	for(let i = 0; i < busses.length; i++){
		erliestBus[busses[i]] = closestDivisible(myTImeStamp, busses[i])
	}
	const earliestTimestamp = Math.min(...Object.values(erliestBus))
	const earliestBusId = Object.keys(erliestBus).find(x => erliestBus[x] === earliestTimestamp)
	return (earliestTimestamp - myTImeStamp) * earliestBusId
}

function solution2(input){
	const buses = pasteBusses(input[1])
	const num = buses.map(b => b.bus)
	const rem = buses.map(b => (b.bus - b.index) % b.bus)
	return crt(num, rem)
}

function closestDivisible(closest, divisible){
	for(let i = closest; i < closest + divisible; i++){
		if(i % divisible === 0){
			return i
		}
	}
}

function pasteBusses(input){
	input = input.split(',');
	const busses = [];
	let div;
	for(let i = 0; i < input.length; i++){
		if (input[i] !== 'x'){
			busses.push({bus: parseInt(input[i]), index : i});
		}
	}
	return busses
}

// https://rosettacode.org/wiki/Chinese_remainder_theorem#JavaScript
// i don't understand a shit, im an economist.
function crt(num, rem) {
  let sum = 0;
  const prod = num.reduce((a, c) => a * c, 1);
 
  for (let i = 0; i < num.length; i++) {
    const [ni, ri] = [num[i], rem[i]];
    const p = Math.floor(prod / ni);
    sum += ri * p * mulInv(p, ni);
  }
  return sum % prod;
}
 
function mulInv(a, b) {
  const b0 = b;
  let [x0, x1] = [0, 1];
 
  if (b === 1) {
    return 1;
  }
  while (a > 1) {
    const q = Math.floor(a / b);
    [a, b] = [b, a % b];
    [x0, x1] = [x1 - q * x0, x0];
  }
  if (x1 < 0) {
    x1 += b0;
  }
  return x1;
}