/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
//import { __ } from '@wordpress/i18n';
import Game from './components/Game/Game';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { RangeControl, Panel, PanelBody } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { BlockAttributes, BlockEditProps } from '@wordpress/blocks';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 * @param props sdsdasd
 * @property
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export const Edit = (props: BlockEditProps<BlockAttributes>): JSX.Element => {
	const { attributes, setAttributes } = props;

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<Panel>
					<PanelBody title={'sdsds'}>
						<RangeControl
							label={'Rows'}
							value={attributes.tableRows}
							step={1}
							onChange={(e) => {
								setAttributes({ tableRows: e });
							}}
							min={10}
							max={99}
						/>

						<RangeControl
							label={'Cols'}
							value={attributes.tableCols}
							step={1}
							onChange={(e) => {
								setAttributes({ tableCols: e });
							}}
							min={10}
							max={99}
						/>

						<RangeControl
							label={'Bombs'}
							value={attributes.bombCount}
							step={1}
							onChange={(e) => {
								setAttributes({ bombCount: e });
							}}
							min={10}
							max={100}
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<Game
				tableRows={attributes.tableRows}
				tableCols={attributes.tableCols}
				bombCount={attributes.bombCount}
			/>
		</div>
	);
};
