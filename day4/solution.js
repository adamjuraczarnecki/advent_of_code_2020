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
	return parsePasports(input).filter(isValidPassportTemp).length
}

function solution2(input){
	return parsePasports(input).filter(isValidPassport).length
}

function parsePasports(input) {
	let pasports = [];
	let pasport = {};
	for (let i = 0; i < input.length; i++){
		if (input[i] === '') {
			pasports.push(pasport);
			pasport = {};
		} else {
			input[i].split(' ').forEach(x => pasport[x.split(':')[0]] = x.split(':')[1])
		}
	}
	return pasports
}

function isValidPassportTemp(passport){
	return (passport.byr && passport.iyr && passport.eyr && passport.hgt&& passport.hcl && passport.ecl && passport.pid)
}

function isValidPassport(passport){
	return (isValidByr(passport.byr) && isValidIyr(passport.iyr) && isValidEyr(passport.eyr)
				&& isValidHgt(passport.hgt) && isValidHcl(passport.hcl) && isValidEcl(passport.ecl) && isValidPid(passport.pid))
}

function isValidByr(byr){
	const re = RegExp(/^[0-9]{4}$/);
	return (re.test(byr) && parseInt(byr) >= 1920 && parseInt(byr) <= 2002)
}

function isValidIyr(iyr){
	const re = RegExp(/^[0-9]{4}$/);
	return (re.test(iyr) && parseInt(iyr) >= 2010 && parseInt(iyr) <= 2020)
}

function isValidEyr(eyr){
	const re = RegExp(/^[0-9]{4}$/);
	return (re.test(eyr) && parseInt(eyr) >= 2020 && parseInt(eyr) <= 2030)
}

function isValidHgt(hgt = ''){
	if (hgt.includes('cm')){
		const x = parseInt(hgt.slice(0,3))
		return (x >= 150 && x <= 193)
	} else if (hgt.includes('in')){
		const x = parseInt(hgt.slice(0,2))
		return (x >= 59 && x <= 76)
	} else {
		return false
	}
}

function isValidHcl(hcl){
	const re = RegExp(/^#[a-f0-9]{6}$/);
	return re.test(hcl)
}

function isValidEcl(ecl){
	return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)
}

function isValidPid(pid){
	const re = RegExp(/^\d{9}$/);
	return re.test(pid)
}
