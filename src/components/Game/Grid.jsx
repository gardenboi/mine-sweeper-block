import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// Grid.PropTypes = {
// 	tableRows: PropTypes.number.isRequired, // Expect tableRows to be a number
// 	tableCols: PropTypes.number.isRequired, // Expect tableCols to be a number
// };
/**
 * @typedef {Object} props
 * @property {number} tableRows - Number of rows in the table
 * @property {number} tableCols - Number of columns in the table
 * @property {number} bombCount - Number of bombs in the game
 * @param {props} props - Props passed from edit.jsx
 * @return {props} - this
 */
const Grid = forwardRef(function Grid(props, ref) {
	//console.log(ref)
	/**
	 * @param {props} arg - props
	 * @return {props} - this
	 */
	const createTable = (arg) => {
		const {
			props: { tableRows, tableCols },
		} = arg;

		Grid.propTypes = {
			tableRows: PropTypes.number.isRequired,
			tableCols: PropTypes.number.isRequired,
		};

		const rows = [];

		for (let i = 0; i < tableRows; i++) {
			const cells = [];
			for (let j = 0; j < tableCols; j++) {
				const cellKey = [i, j];

				//(row - 1) * n_cols + col
				const idx = i * tableCols + j; // Simple matrix to position calculation in referenced in Table.js
				const cell = (
					<td
						key={cellKey}
						data-row={i}
						data-col={j}
						data-hidden-attribute={false}
						ref={(el) => {
							ref.current[idx] = el;
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
