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
let rules;
let messages;
function solution1(input){
	[rules, messages] = parseInput(input)
	let count = 0;
	messages.forEach(x => {if(rules.match(x,0)){count++;}})
	return count
}

function solution2(input){
	// to prevent error with input without rules 42 or 31
	if (!rules.rule[31] || !rules.rule[41]){
		return 'Not valid input for this puzzle'
	}
	rules.rule[8] = [[42], [42, 8]];
	rules.rule[11] = [[42, 31],[42, 11, 31]]
	const regNew = new RegExp(`^(?<group42>(${rules.buildRegex(42)})+)(?<group31>(${rules.buildRegex(31)})+)$`)
	let count = 0;
	for (const message of messages){
		const matches = regNew.exec(message);
		if(matches) {
			const {groups} = matches;
			const matches42 = groups.group42.match(new RegExp(rules.buildRegex(42), 'g')).length;
			const matches31 = groups.group31.match(new RegExp(rules.buildRegex(31), 'g')).length;
			if(matches42 > matches31) {
				count++;
			}
		}
	}
	return count
}

function parseInput(input){
	input = input.join('\n');
	input = input.split('\n\n')
	rules = new Rules(input[0])
	messages = input[1].split(/\r?\n/)
	return [rules, messages]
}


class Rules {
	constructor(input){
		this.rule = {}
		input.replaceAll('"', '').split(/\r?\n/).map(x => this.rule[x.split(': ')[0]] = x.split(': ')[1].split(' | ').map(x => x.split(' ')))
		this.memo = {}
	}
	match(message, ruleIndex){
		const rule = new RegExp('^' + this.buildRegex(ruleIndex) + '$')
		return rule.test(message)
	}
	
	buildRegex(ruleIndex){
		if (ruleIndex in this.memo){
			return this.memo[ruleIndex]
		}
		let result = '';
		if(this.rule[ruleIndex].length === 1){
			if(this.rule[ruleIndex][0][0] === 'a' ||  this.rule[ruleIndex][0][0] === 'b'){
				result =  this.rule[ruleIndex][0][0];
			} else {
				result =  this.rule[ruleIndex][0].map(x => this.buildRegex(parseInt(x))).join('');
			}
		} else {
			result = `(${this.rule[ruleIndex][0].map(x => this.buildRegex(parseInt(x))).join('')}|${this.rule[ruleIndex][1].map(x => this.buildRegex(parseInt(x))).join('')})`
		}
		this.memo[ruleIndex] = result
		return result
	}
}