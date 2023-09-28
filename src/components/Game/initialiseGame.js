/**
 * Places a single bomb in a grid represented by a two-dimensional array.
 * @param {boolean[][]} bombs - 1D or 2D rows depending on the call
 * @param {number} numOfRows - from Game
 * @param {number} numOfCols - from Game
 */
function placeSingleBomb(bombs, numOfRows, numOfCols) {
	let row;
	// Generate random row and column indices
	const nrow = Math.floor(Math.random() * numOfRows);
	const ncol = Math.floor(Math.random() * numOfCols);
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
		placeSingleBomb(bombs, numOfRows, numOfCols);
	}
}

/**
 * Generates a grid with randomly placed bombs.
 * @param {number} numOfRows - The number of rows in the grid.
 * @param {number} numOfCols - The number of columns in the grid.
 * @param {number} numOfBombs - The total number of bombs to be placed in the grid.
 * @return {boolean[][]} A grid with randomly placed bombs, represented as a two-dimensional array.
 */
function placeBombs(numOfRows, numOfCols, numOfBombs) {
	let i;
	const rows = [];

	for (i = 0; i < numOfBombs; i++) {
		placeSingleBomb(rows, numOfRows, numOfCols);
	}
	return rows;
}

/**
 * Populates a two-dimensional array with randomly placed bombs to create a game grid.
 *
 * @param {number} numOfRows - The number of rows in the game grid.
 * @param {number} numOfCols - The number of columns in the game grid.
 * @param {number} numOfBombs - The total number of bombs to be placed in the game grid.
 * @return {boolean[][]} A game grid with randomly placed bombs, represented as a two-dimensional array.
 */
export default function populateBombArray(numOfRows, numOfCols, numOfBombs) {
	return placeBombs(numOfRows, numOfCols, numOfBombs);
}
