import populateBombArray from './initialiseGame';
import { happyFace, deadFace, bombEmoji, flagEmoji, colors, cellColor } from './components';
import { GameTypes } from './types'

/**
 * Initializes and starts a game using provided game constants.
 *
 * @param {GameTypes} g - An instance of the GameConstants class containing game constants.
 */
export function startGame(g: GameTypes) {
	g.alive = true;
	if (g.reloadBtn) g.reloadBtn.current!.textContent = happyFace;
	g.cellFlagged = create2Darray(g);
	g.cellClicked = create2Darray(g);
	g.bombs = populateBombArray(g);
}
/**
 *
 * @return {boolean[][]} - empty boolean array
 */
function create2Darray(g: GameTypes) {
	const a = [];
	for (let i = 0; i < g.tableRows; i++) {
		const row = [];
		for (let j = 0; j < g.tableCols; j++) {
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
function getElementPosition(row: number, col: number, g: GameTypes): number {
	return row * g.tableCols + col; // Simple matrix to position calculation referenced in Grid.jsx
}

export function gameHandler(row: number, col: number, clickType: number, g: GameTypes) {
	const pos = getElementPosition(row, col, g);

	if (!g.alive) {
		return;
	}

	g.mouseswitches += clickType;

	if (clickType === 3) {
		// Right-click logic
		if (g.cellClicked[row][col]) {
			return;
		}

		if (g.cellFlagged[row][col]) {
			g.cellFlagged[row][col] = false;
			g.aRef.current[pos].textContent = '';
		} else {
			g.cellFlagged[row][col] = true;
			g.aRef.current[pos].textContent = flagEmoji;
		}
	} else {
		// Left-click logic
		g.mouseswitches += clickType;
		if (g.cellFlagged[row][col] === true) {
			return;
		}

		g.aRef.current[pos].style.backgroundColor = cellColor['grey'];
		if (g.cellClicked[row][col] && g.mouseswitches === 4) {
			performMassClick(row, col, g);
		}

		g.mouseswitches = 0;
		handleCellClick(pos, row, col, g);
	}
}

/**
 *
 * @param {number} pos - calculated position
 * @param {number} i - row
 * @param {number} j - col
 */
function handleCellClick(pos: number, i: number, j: number, g: GameTypes) {
	//console.log(pos);
	//console.log(aRef.current[pos].textContent);
	if (g.cellFlagged[i][j] === true) {
		return;
	}
	g.cellClicked[i][j] = true;

	if (g.bombs[i][j]) {
		g.alive = false; // IMPORTANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		g.aRef.current[pos].textContent = bombEmoji;
		g.aRef.current[pos].style.backgroundColor = cellColor['red'];
		gameOver(g, pos);
	} else {
		//(row - 1) * n_cols + col-1
		g.aRef.current[pos].style.backgroundColor = cellColor['grey'];

		const bombCnt = adjacentBombs(i, j, g);
		if (bombCnt > 0) {
			g.aRef.current[pos].style.color = colors[bombCnt];
			g.aRef.current[pos].textContent = String(bombCnt);
		} else {
			clickAdjacentBombs(i, j, g);
		}
	}
}

/**
 *
 * @param {number} row - row
 * @param {number} col - col
 * @return {number} bombCnt - count nearby bombs
 */
function adjacentBombs(row: number, col: number, g: GameTypes) {
	let bombCnt = 0;

	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			if (
				!!g.bombs[row + i] &&
				g.bombs[row + i] &&
				!!g.bombs[row + i][col + j] &&
				g.bombs[row + i][col + j]
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
function adjacentFlags(row: number, col: number, g: GameTypes) {
	let flagsCount = 0;

	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			// const cell = document.getElementById( cellID( row + i, col + j ) );
			if (
				!!g.cellClicked[row + i][col + j] &&
				g.cellFlagged[row + i][col + j]
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
function clickAdjacentBombs(row: number, col: number, g: GameTypes) {
	let delayIncrement = 0;
	const delay = 2;
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			delayIncrement += delay;
			if (i === 0 && j === 0) {
				continue;
			}
			if (
				row + i < 0 ||
				row + i > g.tableRows - 1 ||
				col + j < 0 ||
				col + j > g.tableCols - 1
			) {
				continue;
			}
			const pos = getElementPosition(row + i, col + j, g);
			if (
				!g.cellClicked[row + i][col + j] &&
				!g.cellFlagged[row + i][col + i]
			) {
				setTimeout(() => {
					handleCellClick(pos, row + i, col + j, g);
				}, delayIncrement)

			}
		}
	}
}

/**
 *
 * @param {number} row - row
 * @param {number} col - col

 */
function performMassClick(row: number, col: number, g: GameTypes) {
	//case not covered, could throw error
	console.log(
		`condition :${adjacentFlags(row, col, g) === adjacentBombs(row, col, g)}`
	);
	if (adjacentFlags(row, col, g) === adjacentBombs(row, col, g)) {
		clickAdjacentBombs(row, col, g);
	}
}

/**
 *
 */
function gameOver(g: GameTypes, lastClicked: number) {
	if (g.reloadBtn) g.reloadBtn.current!.textContent = deadFace;
	g.cellClicked = create2Darray(g);
	g.cellFlagged = create2Darray(g);

	const delay = 2; // Delay in milliseconds (adjust as needed)
	let delayIncrement = 0;

	for (let rowIdx = 0; rowIdx < g.bombs.length; rowIdx++) {
		for (let colIdx = 0; colIdx < g.bombs[rowIdx].length; colIdx++) {
			if (g.bombs[rowIdx][colIdx]) {
				const pos = getElementPosition(rowIdx, colIdx, g);

				setTimeout(() => {
					g.aRef.current[pos].textContent = bombEmoji;
					g.aRef.current[pos].style.backgroundColor = cellColor['bomb'];
					if (pos === lastClicked) {
						g.aRef.current[pos].style.backgroundColor = cellColor['red'];
					}
				}, delayIncrement);

				delayIncrement += delay;
			}
		}
	}
}

/**
 *
 * @param {GameTypes} g - An instance of the GameConstants class containing game constants.
 */
export function restart(g: GameTypes) {
	
	const delay = 10;
	let delayIncrement = 0;
	for (let i = 0; i < g.tableCols * g.tableRows; i++) {
		if (i> i*(i%g.tableCols)) delayIncrement += delay;
		setTimeout(() => {
			g.aRef.current[i].textContent = '';
			g.aRef.current[i].style.backgroundColor = cellColor['grey'];
		}, delayIncrement);
	}

	for (let i = 0; i < g.tableCols * g.tableRows; i++) {
		if (i> i*(i%g.tableCols)) delayIncrement += delay;
		setTimeout(() => {
			g.aRef.current[i].textContent = '';
			g.aRef.current[i].style.backgroundColor = cellColor['default'];
		}, delayIncrement);
	}

	startGame(g);
}
