import { render, Suspense } from '@wordpress/element';
import Game from './components/Game/Game';
import { Props } from './components/Game/types';
window.addEventListener('DOMContentLoaded', () => {
	const element: HTMLElement = document.querySelector('.wp-block-create-block-mineswper') as HTMLElement;
	if (element && !!element.dataset) {
		const attributes: { [name: string]: string | undefined }= { ...element.dataset };
		const {tableRows, tableCols, bombCount} = attributes 
		render(
			<Suspense fallback={<div className="wp-block-placeholder" />}>
				<Game tableRows={Number(tableRows)} tableCols={Number(tableCols)} bombCount={Number(bombCount)} />
			</Suspense>,
			element
		);
	}
});
