/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { BlockAttributes, registerBlockType } from '@wordpress/blocks';
//import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
/**
 * Internal dependencies
 */
import jsonData from './block.json';
const metadata = jsonData as BlockAttributes;
import { Edit } from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	...metadata,

	icon: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlSpace="preserve"
			width="400"
			height="400"
			viewBox="0 0 100 100"
		>
			<path d="M90 47.5h-5V45h-5.4c-.8-4.6-2.6-8.8-5.2-12.4l3.9-3.8-1.8-1.8 3.6-3.5-3.6-3.6-3.5 3.6-1.8-1.8-3.8 3.9A29.8 29.8 0 0 0 55 20.4V15h-2.5v-5h-5v5H45v5.4c-4.6.8-8.8 2.6-12.4 5.2l-3.8-3.9-1.8 1.8-3.5-3.6-3.6 3.6 3.6 3.5-1.8 1.8 3.9 3.8A29.8 29.8 0 0 0 20.4 45H15v2.5h-5v5h5V55h5.4c.8 4.6 2.6 8.8 5.2 12.4l-3.9 3.8 1.8 1.8-3.6 3.5 3.6 3.6 3.5-3.6 1.8 1.8 3.8-3.9c3.6 2.6 7.8 4.4 12.4 5.2V85h2.5v5h5v-5H55v-5.4c4.6-.8 8.8-2.6 12.4-5.2l3.8 3.9 1.8-1.8 3.5 3.6 3.6-3.6-3.6-3.5 1.8-1.8-3.9-3.8c2.6-3.6 4.4-7.8 5.2-12.4H85v-2.5h5v-5ZM50 25v5c-11 0-20 9-20 20h-5a25 25 0 0 1 25-25Z" />
		</svg>
	),
	supports: {
		align: true,
		anchor: true,
		className: true,
		color: {
			background: true,
			gradients: true,
		},
		spacing: {
			margin: true, // Enable margin UI control.
			padding: true, // Enable padding UI control.
			blockGap: true, // Enables block spacing UI control.
		},
	},

	/**
	 * Renders a "Game" component inside a div element.
	 *
	 * @param attributes.attributes
	 * @param {Object} attributes - An object containing attributes.
	 * @param {number} attributes.tableRows - The number of rows in the table.
	 * @param {number} attributes.tableCols - The number of columns in the table.
	 * @param {number} attributes.bombCount - The number of bombs in the game.
	 * @return {JSX.Element} A div element containing the "Game" component.
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
