import React, { useState } from 'react';
import {
	getImage,
	getWebPImage,
	getResponsiveImage,
	getPlaceholderImage,
} from '../../../data/images';
import './OptimizedImage.css';

interface OptimizedImageProps {
	src: string;
	alt: string;
	className?: string;
	fallback?: string;
	width?: number;
	height?: number;
	lazy?: boolean;
	priority?: boolean;
	onLoad?: () => void;
	onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
	src,
	alt,
	className = '',
	fallback,
	width,
	height,
	lazy = true,
	priority = false,
	onLoad,
	onError,
}) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);

	const handleLoad = () => {
		setIsLoaded(true);
		onLoad?.();
	};

	const handleError = () => {
		setHasError(true);
		onError?.();
	};

	// Get optimized image paths
	const optimizedSrc = getImage(src, fallback);
	const { webp } = getWebPImage(optimizedSrc, fallback);
	const srcSet = getResponsiveImage(optimizedSrc);

	// Use fallback if error occurred, or placeholder if no fallback
	const finalSrc = hasError
		? fallback || getPlaceholderImage(width || 400, height || 300, alt)
		: optimizedSrc;

	return (
		<div className={`optimized-image ${className}`}>
			<picture>
				{/* WebP source for modern browsers */}
				<source
					srcSet={getResponsiveImage(webp)}
					type='image/webp/jpg'
					media='(min-width: 1px)'
				/>

				{/* Fallback image */}
				<img
					src={finalSrc}
					srcSet={srcSet}
					alt={alt}
					width={width}
					height={height}
					loading={lazy && !priority ? 'lazy' : 'eager'}
					decoding={priority ? 'sync' : 'async'}
					onLoad={handleLoad}
					onError={handleError}
					className={`optimized-image__img ${
						isLoaded ? 'optimized-image__img--loaded' : ''
					} ${hasError ? 'optimized-image__img--error' : ''}`}
				/>
			</picture>

			{/* Loading placeholder */}
			{!isLoaded && !hasError && (
				<div className='optimized-image__placeholder'>
					<div className='optimized-image__skeleton'></div>
				</div>
			)}

			{/* Error placeholder */}
			{hasError && (
				<div className='optimized-image__error'>
					<div className='optimized-image__error-icon'>📷</div>
					<span className='optimized-image__error-text'>
						Image not available
					</span>
				</div>
			)}
		</div>
	);
};

export default OptimizedImage;
