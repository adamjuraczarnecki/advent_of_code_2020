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
	return getTreeCount(input, [3, 1])
}

function solution2(input){
	const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
	let treeCountMultiplyed = 1;
	for (let i = 0; i < slopes.length; i++){
		treeCountMultiplyed *= getTreeCount(input, slopes[i])
	}
	return treeCountMultiplyed
}

function getTreeCount(map, slope){
	let treeCount = 0;
	let yIndex = 0;
	for (let i = 0; i < map.length; i += slope[1]){
		if(map[i][yIndex] === '#'){
			treeCount ++;
		}
		yIndex = (yIndex + slope[0]) % map[0].length
	}
	return treeCount	
}

const testMap = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`.split(/\r?\n/)