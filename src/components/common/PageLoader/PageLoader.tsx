import React, { useState, useEffect } from 'react';
import './PageLoader.css';

const PageLoader: React.FC = () => {
	const [showLoader, setShowLoader] = useState(false);

	useEffect(() => {
		// Show loader only if it takes more than 100ms to load
		const timer = setTimeout(() => {
			setShowLoader(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	// Don't show loader if page loads quickly
	if (!showLoader) {
		return null;
	}

	return (
		<div className='page-loader'>
			<div className='page-loader__spinner'>
				<div className='page-loader__dot'></div>
				<div className='page-loader__dot'></div>
				<div className='page-loader__dot'></div>
			</div>
		</div>
	);
};

export default PageLoader;
