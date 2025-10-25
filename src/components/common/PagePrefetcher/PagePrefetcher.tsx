import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PagePrefetcher: React.FC = () => {
	const location = useLocation();

	// Preload critical assets immediately
	useEffect(() => {
		const criticalImages = [
			'/images/portfolio/project-1/1.jpg',
			'/images/portfolio/project-3/1.jpg',
			'/images/portfolio/project-8/1.jpg',
		];

		criticalImages.forEach(src => {
			// Use fetch to preload images
			fetch(src, { method: 'HEAD' }).catch(() => {});
		});
	}, []);

	// Prefetch on hover for links and their JS bundles
	useEffect(() => {
		const handleMouseEnter = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const link = target.closest('a');

			if (link && link.href) {
				const url = new URL(link.href);
				const path = url.pathname;

				// Don't prefetch if already on this page
				if (path !== location.pathname) {
					// Prefetch the page itself
					const linkTag = document.createElement('link');
					linkTag.rel = 'prefetch';
					linkTag.href = link.href;
					document.head.appendChild(linkTag);

					// Prefetch the JS bundle if it's an internal link
					if (url.origin === window.location.origin) {
						// Try to prefetch the JS chunk for this route
						// This is a best-effort approach
					}
				}
			}
		};

		document.addEventListener('mouseenter', handleMouseEnter, true);

		return () => {
			document.removeEventListener('mouseenter', handleMouseEnter, true);
		};
	}, [location.pathname]);

	return null;
};

export default PagePrefetcher;
