import { MutableRefObject } from "react";

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
export class GameObject implements GameTypes {
	constructor(
		public tableRows: number,
		public tableCols: number,
		public bombCount: number,
		public aRef: MutableRefObject<HTMLTableCellElement[]>,
		public reloadBtn: MutableRefObject<HTMLButtonElement>,
		public bombs: boolean[][] = [],
		public cellFlagged: boolean[][] = [],
		public cellClicked: boolean[][] = [],
		public mouseswitches: number = 0,
		public alive: boolean = true
	) {}
}