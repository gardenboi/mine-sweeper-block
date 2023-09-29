import { render, Suspense } from '@wordpress/element';
import Game from './components/Game/Game';
import { Props } from './components/Game/types';
window.addEventListener('DOMContentLoaded', () => {
	const element: HTMLElement = document.querySelector('.wp-block-create-block-mineswper') as HTMLElement;
	if (element && !!element.dataset) {
		const attributes: { [key: number]: string }= { ...element.dataset };
		render(
			<Suspense fallback={<div className="wp-block-placeholder" />}>
				<Game {...attributes as Props} />
			</Suspense>,
			element
		);
	}
});
