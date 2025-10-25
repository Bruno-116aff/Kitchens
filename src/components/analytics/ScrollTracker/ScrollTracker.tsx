import React, { useEffect, useRef } from 'react';
import { trackScrollDepth } from '../../../utils/analytics';

interface ScrollTrackerProps {
	onScrollDepth?: (depth: number) => void;
	thresholds?: number[];
}

const ScrollTracker: React.FC<ScrollTrackerProps> = ({
	onScrollDepth,
	thresholds = [25, 50, 75, 90, 100],
}) => {
	const trackedDepths = useRef<Set<number>>(new Set());

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;
			const scrollHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const scrollDepth = Math.round((scrollTop / scrollHeight) * 100);

			// Track only new thresholds reached
			thresholds.forEach(threshold => {
				if (scrollDepth >= threshold && !trackedDepths.current.has(threshold)) {
					trackedDepths.current.add(threshold);
					trackScrollDepth(threshold);

					if (onScrollDepth) {
						onScrollDepth(threshold);
					}
				}
			});
		};

		// Throttle scroll events for better performance
		let ticking = false;
		const throttledScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					handleScroll();
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener('scroll', throttledScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', throttledScroll);
		};
	}, [thresholds, onScrollDepth]);

	return null;
};

export default ScrollTracker;
