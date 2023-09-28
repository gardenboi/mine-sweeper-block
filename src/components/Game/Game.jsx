import { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';

import { startGame, gameHandler, restart } from './logic';

/**
 * @typedef {Object} props
 * @property {number} tableRows - Number of rows in the table
 * @property {number} tableCols - Number of columns in the table
 * @property {number} bombCount - Number of bombs in the game
 * @param {props} props - Props passed from edit.jsx
 * @return {props} - this
 */
export default function Game(props) {
	//extract meaningful data from components
	const { tableRows, tableCols, bombCount } = props;

	//Check type
	Game.propTypes = {
		tableRows: PropTypes.number.isRequired,
		tableCols: PropTypes.number.isRequired,
		bombCount: PropTypes.number.isRequired,
	};

	const aRef = useRef([]); //There are no 2D useRef in ReactJS so we need to use getElementPosition() to calculate a position 😢️
	const reloadBtn = useRef(null);
	const mineSweeperRef = useRef(null);

	/**
	 * Represents constants for the game.
	 * @class
	 */
	class GameConstants {
		/**
		 * Creates an instance of GameConstants.
		 * @constructor
		 * @param {number} rows - The number of rows in the game grid.
		 * @param {number} cols - The number of columns in the game grid.
		 * @param {number} nBombs - The number of bombs in the game.
		 * @param {Object} arrayRef - A reference to an object (provide more details if necessary).
		 * @param {Object} reloadBtnRef - A reference to an object (provide more details if necessary).
		 */
		constructor(rows, cols, nBombs, arrayRef, reloadBtnRef) {
			this.rows = rows;
			this.cols = cols;
			this.nBombs = nBombs;
			this.arrayRef = arrayRef; //Object reference
			this.reloadBtnRef = reloadBtnRef; //Object reference
		}
	}

	const g = new GameConstants(
		tableRows,
		tableCols,
		bombCount,
		aRef,
		reloadBtn
	);

	/**
	 * Handles an event on a game cell element.
	 * @param {Event} event - The event object triggered by the cell element.
	 * @param {string} clickType - The type of click event (e.g., 'left', 'right', etc.).
	 */
	const handleCellEventListener = (event, clickType) => {
		/**
		 * Represents a dataset object containing custom data attributes from the cell element.
		 * @typedef {Object} event.target
		 * @property {Object} dataset
		 * @property {string} row - The row index of the cell.
		 * @property {string} col - The column index of the cell.
		 * @property {number} intRow - row casted to int from string
		 * @property {number} intCol - col casted to int from string
		 * @property {number} clickType - left=1/right=3 click
		 */

		const { dataset } = event.target; // Access the dataset object
		const { row, col } = dataset;

		if (isNaN(row) || isNaN(col)) {
			return;
		}

		const intRow = parseInt(row, 10);
		const intCol = parseInt(col, 10);

		gameHandler(intRow, intCol, clickType);
	};

	const restartGameCallback = useCallback(() => {
		restart(g);
	}, [g]);

	const startGameCallback = useCallback(() => {
		reloadBtn.current.textContent = '😃';
		startGame(g);
	}, [g]);

	/**
	 *
	 * @param e
	 */
	function handleContextMenu(e) {
		e.preventDefault();
	}

	useEffect(() => {
		startGameCallback();
	}, [startGameCallback, tableCols, tableRows]);

	return (
		<div
			id="mineswper"
			onClick={(e) => handleCellEventListener(e, 1)}
			onContextMenu={(e) => {
				handleContextMenu(e);
				handleCellEventListener(e, 3);
			}}
			ref={mineSweeperRef}
		>
			<Grid props={props} ref={aRef}></Grid>

			<button ref={reloadBtn} onClick={restartGameCallback}></button>
		</div>
	);
}
