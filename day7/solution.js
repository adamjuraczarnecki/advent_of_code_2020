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
	const bags = getBagMap(input.filter(x => x != ''))
	return getAllBagsCan('shiny gold', bags).length
}

function solution2(input){
	const bags = getBagMap(input.filter(x => x != ''))
	console.log(bags)
	return getRequiredBags('shiny gold', bags)
}

function getRequiredBags(color, bags){
	const rootBag = bags[color];
	console.log(rootBag.contain)
	
	return rootBag.contain.reduce((count, innerBag) => {
		// console.log(count + innerBag.count, '=', count, '+', innerBag.count)
		return count + innerBag.count + innerBag.count * getRequiredBags(innerBag.name, bags)
	}, 0)
}

function getBagMap(input){
	let bagMap ={};
	for (let i = 0; i < input.length; i++){
		const bagName = input[i].split(' bags contain ')[0];
		let bagRulesList = [];
		let bagRules = [];
		if (!input[i].split(' bags contain ')[1].includes('no other')){
			bagRulesList = input[i].split(' bags contain ')[1].replace('.', '').replaceAll('bags', '').replaceAll('bag', '').split(',')
			for (let ii = 0; ii < bagRulesList.length; ii++){
				const rule = bagRulesList[ii].split(' ').filter( x => x != '')
				bagRules.push(new SubBag(rule[1].concat(' ', rule[2]), parseInt(rule[0])))
			}
		}
		bagMap[bagName] = new Bag(bagName, bagRules);
		bagRules = {};
	}
	return bagMap
}

class Bag {
	constructor(name, contain) {
		this.name = name;
		this.contain = contain;
	}
	get length(){
		return this.contain.length
	}
	
	get subNames() {
		let names = [];
		this.contain.forEach(x => names.push(x.name))
		return names
	}
	
}

class SubBag {
	constructor(name, count){
		this.name = name;
		this.count = count;
	}
}

function getBagsCanContainThisBag(color, bags){
	const canContain = [];
	for(bag in bags){
		if(bags[bag].subNames.includes(color)){
			canContain.push(bag)
		}
	}
	return canContain
}

function getAllBagsCan(color, bags){
	const canContain = getBagsCanContainThisBag(color, bags);
	const toCheck = getBagsCanContainThisBag(color, bags);
	while(toCheck.length > 0 ){
		const subList = getBagsCanContainThisBag(toCheck.pop(), bags)
		for (let i = 0; i < subList.length; i++){
			if (!canContain.includes(subList[i])){
				canContain.push(subList[i]);
				toCheck.push(subList[i]);
			}
		}
	}
	return canContain
}