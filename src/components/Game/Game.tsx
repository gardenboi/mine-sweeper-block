import {
	useRef,
	useEffect,
	useCallback,
	MutableRefObject,
	MouseEvent,
} from 'react';
import { startGame, gameHandler, restart } from './logic';
import { Props, GameTypes, GameObject } from './types';
import Grid from './Grid';

// Define the GameObject class that implements GameTypes


export default function Game(props: Props) {
	//extract meaningful data from components
	const { tableRows, tableCols, bombCount } = props;

	const aRef: MutableRefObject<HTMLTableCellElement[]> = useRef([]); //In ReactTS apparently there are 2D useRefs but for refactoring sake I kept it the same as in dynamic-JSX
	const reloadBtn: MutableRefObject<HTMLButtonElement | null> = useRef(null);
	const mineSweeperRef = useRef(null);




	const g = new GameObject(
		tableRows,
		tableCols,
		bombCount,
		aRef,
		reloadBtn as MutableRefObject<HTMLButtonElement>,
		new Array<Array<boolean>>
	);

	/**
	 * Handles an event on a game cell element.
	 * @param {Event} event - The event object triggered by the cell element.
	 * @param {string} clickType - The type of click event (e.g., 'left', 'right', etc.).
	 */
	const handleCellEventListener = (
		clickedEl: HTMLDivElement,
		clickType: number
	) => {
		const { row, col } = clickedEl.dataset;

		//console.log(row);
		//console.log(col);

		if (!!row && !!col) gameHandler(Number(row), Number(col), clickType, g);
	};

	const restartGameCallback = useCallback(() => {
		restart(g);
	}, [g]);

	const startGameCallback = useCallback(() => {
		startGame(g);
	}, [g]);

	/**
	 *
	 * @param e
	 */
	function handleContextMenu(
		e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
	): void {
		e.nativeEvent.preventDefault();
	}

	useEffect(() => {
		startGameCallback();
	}, [startGameCallback, tableCols, tableRows]);

	return (
		<div
			id="mineswper"
			onClick={(e) =>
				handleCellEventListener(e.target as HTMLDivElement, 1)
			}
			onContextMenu={(e) => {
				handleContextMenu(e);
				handleCellEventListener(e.target as HTMLDivElement, 3);
			}}
			ref={mineSweeperRef}
		>
			<Grid {...props} ref={aRef}></Grid>

			<button ref={reloadBtn} onClick={restartGameCallback}></button>
		</div>
	);
}
