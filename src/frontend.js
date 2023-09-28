import { render, Suspense } from '@wordpress/element';
import Game from './components/Game/Game';
window.addEventListener('DOMContentLoaded', () => {
	const element = document.querySelector('.wp-block-create-block-mineswper');
	if (element && !!element.dataset) {
		const attributes = { ...element.dataset };
		render(
			<Suspense fallback={<div className="wp-block-placeholder" />}>
				<Game {...attributes} />
			</Suspense>,
			element
		);
	}
});
