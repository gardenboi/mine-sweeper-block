export type Props = {
	tableRows: number;
	tableCols: number;
	bombCount: number;
}

export interface GameTypes {
	bombs: boolean[][];
	cellFlagged: boolean[][];
	cellClicked: boolean[][];
	mouseswitches: number;
	alive: boolean;
	tableRows: number;
	tableCols: number;
	bombCount: number;
	aRef: MutableRefObject<HTMLTableCellElement[]>;
	reloadBtn:MutableRefObject<HTMLButtonElement | null>;
}
