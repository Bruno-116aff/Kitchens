import React, { useEffect, useRef } from 'react';
import { trackTimeOnPage } from '../../../utils/analytics';

interface TimeTrackerProps {
	pageUrl: string;
	thresholds?: number[]; // seconds
}

const TimeTracker: React.FC<TimeTrackerProps> = ({
	pageUrl,
	thresholds = [30, 60, 120, 300], // 30s, 1min, 2min, 5min
}) => {
	const startTime = useRef<number>(Date.now());
	const trackedTimes = useRef<Set<number>>(new Set());
	const intervalRef = useRef<number | null>(null);

	useEffect(() => {
		const checkTimeThresholds = () => {
			const timeSpent = Math.round((Date.now() - startTime.current) / 1000);

			thresholds.forEach(threshold => {
				if (timeSpent >= threshold && !trackedTimes.current.has(threshold)) {
					trackedTimes.current.add(threshold);
					trackTimeOnPage(timeSpent, pageUrl);
				}
			});
		};

		// Check every 10 seconds
		intervalRef.current = setInterval(checkTimeThresholds, 10000);

		// Cleanup on unmount
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}

			// Track final time on page
			const finalTime = Math.round((Date.now() - startTime.current) / 1000);
			if (finalTime > 0) {
				trackTimeOnPage(finalTime, pageUrl);
			}
		};
	}, [pageUrl, thresholds]);

	return null;
};

export default TimeTracker;
