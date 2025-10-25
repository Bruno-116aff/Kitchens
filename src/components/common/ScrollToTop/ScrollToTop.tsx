import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		// Instant scroll to top without animation
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

export default ScrollToTop;
