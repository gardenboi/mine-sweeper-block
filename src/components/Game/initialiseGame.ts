
import { GameTypes } from "./types";
/**
 * Places a single bomb in a grid represented by a two-dimensional array.
 * @param {boolean[][]} bombs - 1D or 2D rows depending on the call
 * @param {number} numOfRows - from Game
 * @param {number} numOfCols - from Game
 */
function placeSingleBomb(bombs:boolean[][], tableRows:number, tableCols:number) {
	let row : boolean[];
	// Generate random row and column indices
	const nrow = Math.floor(Math.random() * tableRows);
	const ncol = Math.floor(Math.random() * tableCols);
	// Access the row at the randomly generated nrow index
	row = bombs[nrow];
	// If the row doesn't exist, initialize it as an empty array
	if (!row) {
		row = [];
		bombs[nrow] = row;
	}
	// Access the column at the randomly generated ncol index within the row
	const col = row[ncol];
	// If the column is empty, place a bomb (true) in that cell; otherwise, retry
	if (!col) {
		row[ncol] = true;
	} else {
		// If the cell is already occupied by a bomb, retry the placement
		placeSingleBomb(bombs, tableRows, tableCols);
	}
}

/**
 * Generates a grid with randomly placed bombs.
 * @param {number} tableRows - The number of rows in the grid.
 * @param {number} tableCols - The number of columns in the grid.
 * @param {number} bombCount - The total number of bombs to be placed in the grid.
 * @return {boolean[][]} A grid with randomly placed bombs, represented as a two-dimensional array.
 */
function placeBombs(tableRows: number, tableCols:number, bombCount:number):boolean[][] {
	let i;
	const rows: boolean[][] = [];

	for (i = 0; i < bombCount; i++) {
		placeSingleBomb(rows, tableRows, tableCols);
	}
	return rows;
}

/**
 * Populates a two-dimensional array with randomly placed bombs to create a game grid.
 *
 * @param {number} tableRows - The number of rows in the game grid.
 * @param {number} tableCols - The number of columns in the game grid.
 * @param {number} bombCount - The total number of bombs to be placed in the game grid.
 * @return {boolean[][]} A game grid with randomly placed bombs, represented as a two-dimensional array.
 */
export default function populateBombArray({tableRows, tableCols, bombCount}:GameTypes) {
	return placeBombs(tableRows as number, tableCols as number, bombCount as number);
}
