
import { forwardRef, MutableRefObject, Ref } from 'react';
import { Props } from './types';

const Grid = forwardRef<HTMLTableCellElement[], Props>((props: Props, ref: Ref<HTMLTableCellElement[]>) => {
	const createTable = (arg: Props) => {
		const {
			tableRows,
			tableCols,
		} = arg;

		const rows = [];

		for (let i = 0; i < tableRows; i++) {
			const cells = [];
			for (let j = 0; j < tableCols; j++) {
				const cellKey = [i, j];

				const idx = i * tableCols + j;
				const cell = (
					<td
						key={cellKey.toString()}
						data-row={i}
						data-col={j}
						data-hidden-attribute={false}
						ref={(el) => {
							if (el) {
								if (!(ref as MutableRefObject<HTMLTableCellElement[]>).current) {
									(ref as MutableRefObject<HTMLTableCellElement[]>).current = [];
								}
								(ref as MutableRefObject<HTMLTableCellElement[]>).current[idx] = el;
							}
						}}
					>
						{/* Cell content */}
					</td>
				);
				cells.push(cell);
			}

			const rowKey = i;
			const row = <tr key={rowKey}>{cells}</tr>;

			rows.push(row);
		}

		return (
			<table id="field">
				<tbody>{rows}</tbody>
			</table>
		);
	};

	return <>{createTable(props)}</>;
});


export default Grid;