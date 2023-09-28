import populateBombArray from './initialiseGame';
import components from './components';

let bombs = [false];
let cellFlagged = [false];
let cellClicked = [false];
let mouseswitches = 0;
let alive = true;
let tableRows = 0;
let tableCols = 0;
let bombCount = 0;
let aRef = null; //Object reference
let reloadBtn = null; //Object reference

/**
 * Initializes and starts a game using provided game constants.
 *
 * @param {GameConstants} g - An instance of the GameConstants class containing game constants.
 */
export function startGame(g) {
	tableRows = g.rows;
	tableCols = g.cols;
	bombCount = g.nBombs;
	aRef = g.arrayRef;
	reloadBtn = g.reloadBtnRef;
	cellFlagged = create2Darray();
	cellClicked = create2Darray();
	bombs = populateBombArray(tableRows, tableCols, bombCount);
}
/**
 *
 * @return {boolean[][]} - empty boolean array
 */
function create2Darray() {
	const a = [];
	for (let i = 0; i < tableRows; i++) {
		const row = [];
		for (let j = 0; j < tableCols; j++) {
			row.push(false);
		}
		a.push(row);
	}
	return a;
}
/**
 *
 * @param {number} row - row
 * @param {number} col - col
 * @return {number} position of the grid counted from 0 to rows*cols-1 top left to bottom right
 */
function getElementPosition(row, col) {
	return row * tableCols + col; // Simple matrix to position calculation referenced in Grid.jsx
}

export function gameHandler(row, col, clickType) {
	const pos = getElementPosition(row, col);

	if (!alive) {
		return;
	}

	mouseswitches += clickType;

	if (clickType === 3) {
		// Right-click logic
		if (cellClicked[row][col]) {
			return;
		}

		if (cellFlagged[row][col]) {
			cellFlagged[row][col] = false;
			aRef.current[pos].textContent = '';
		} else {
			cellFlagged[row][col] = true;
			aRef.current[pos].textContent = components.flagEmoji;
		}
	} else {
		// Left-click logic
		mouseswitches += clickType;
		if (cellFlagged[row][col] === true) {
			return;
		}

		aRef.current[pos].style.backgroundColor = 'lightGrey';
		if (cellClicked[row][col] && mouseswitches === 4) {
			performMassClick(row, col);
		}

		mouseswitches = 0;
		handleCellClick(pos, row, col);
	}
}

/**
 *
 * @param {number} pos - calculated position
 * @param {number} i - row
 * @param {number} j - col
 */
function handleCellClick(pos, i, j) {
	//console.log(pos);
	//console.log(aRef.current[pos].textContent);
	if (cellFlagged[i][j] === true) {
		return;
	}
	cellClicked[i][j] = true;

	if (bombs[i][j]) {
		alive = false; // IMPORTANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		aRef.current[pos].textContent = components.bombEmoji;
		aRef.current[pos].style.backgroundColor = 'red';
		gameOver(tableRows, tableCols, aRef, reloadBtn);
	} else {
		//(row - 1) * n_cols + col-1
		aRef.current[pos].style.backgroundColor = 'lightGrey';

		const bombCnt = adjacentBombs(i, j);
		if (bombCnt > 0) {
			aRef.current[pos].style.color = components.colors[bombCnt];
			aRef.current[pos].textContent = bombCnt;
		} else {
			clickAdjacentBombs(i, j);
		}
	}
}

/**
 *
 * @param {number} row - row
 * @param {number} col - col
 * @return {number} bombCnt - count nearby bombs
 */
function adjacentBombs(row, col) {
	let bombCnt = 0;

	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			if (
				!!bombs[row + i] &&
				bombs[row + i] &&
				!!bombs[row + i][col + j] &&
				bombs[row + i][col + j]
			) {
				bombCnt++;
			}
		}
	}

	return bombCnt;
}

/**
 *
 * @param {number} row - row
 * @param {number} col - col
 * @return {number} - nearby flags
 */
function adjacentFlags(row, col) {
	let flagsCount = 0;

	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			// const cell = document.getElementById( cellID( row + i, col + j ) );
			if (
				!!cellClicked[row + i][col + j] &&
				cellFlagged[(row + i, col + j)]
			) {
				flagsCount++;
			}
		}
	}
	return flagsCount;
}

/**
 *
 * @param {number} row - row
 * @param {number} col - col
 */
function clickAdjacentBombs(row, col) {
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			if (i === 0 && j === 0) {
				continue;
			}
			if (
				row + i < 0 ||
				row + i > tableRows - 1 ||
				col + j < 0 ||
				col + j > tableCols - 1
			) {
				continue;
			}
			const pos = getElementPosition(row + i, col + j);
			if (
				!cellClicked[row + i][col + j] &&
				!cellFlagged[row + i][col + i]
			) {
				handleCellClick(pos, row + i, col + j);
			}
		}
	}
}

/**
 *
 * @param {number} row - row
 * @param {number} col - col

 */
function performMassClick(row, col) {
	//case not covered, could throw error
	console.log(
		`condition :${adjacentFlags(row, col) === adjacentBombs(row, col)}`
	);
	if (adjacentFlags(row, col) === adjacentBombs(row, col)) {
		clickAdjacentBombs(row, col);
	}
}

/**
 *
 */
function gameOver() {
	reloadBtn.current.textContent = '😵';
	cellClicked = create2Darray();
	cellFlagged = create2Darray();

	const delay = 2; // Delay in milliseconds (adjust as needed)
	let delayIncrement = 0;

	for (let rowIdx = 0; rowIdx < bombs.length; rowIdx++) {
		for (let colIdx = 0; colIdx < bombs[rowIdx].length; colIdx++) {
			if (bombs[rowIdx][colIdx]) {
				const pos = getElementPosition(rowIdx, colIdx);

				setTimeout(() => {
					aRef.current[pos].textContent = components.bombEmoji;
				}, delayIncrement);

				delayIncrement += delay;
			}
		}
	}
}

/**
 *
 * @param {GameConstants} g - An instance of the GameConstants class containing game constants.
 */
export function restart(g) {
	alive = true;
	reloadBtn.current.textContent = '😃';
	startGame(g);
	for (let i = 0; i < tableCols * tableRows; i++) {
		aRef.current[i].textContent = '';
		aRef.current[i].style.backgroundColor = '#fff';
	}
}
