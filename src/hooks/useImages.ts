import { useTranslation } from 'react-i18next';
import {
	images,
	getImage,
	getWebPImage,
	getResponsiveImage,
	getPlaceholderImage,
} from '../data/images';

export const useImages = () => {
	const { t } = useTranslation('images');

	// Get image path with fallback
	const getImagePath = (imageKey: string, fallback?: string) => {
		return getImage(imageKey, fallback);
	};

	// Get alt text for image
	const getImageAlt = (imageKey: string, fallback?: string) => {
		return t(`alt.${imageKey}`, { defaultValue: fallback || imageKey });
	};

	// Get WebP image with fallback
	const getWebPImageData = (imageKey: string, fallback?: string) => {
		return getWebPImage(imageKey, fallback);
	};

	// Get responsive image srcset
	const getResponsiveImageData = (imageKey: string, sizes?: number[]) => {
		return getResponsiveImage(imageKey, sizes);
	};

	// Get placeholder image
	const getPlaceholderImageData = (
		width?: number,
		height?: number,
		text?: string
	) => {
		return getPlaceholderImage(width, height, text);
	};

	// Get optimized image props
	const getOptimizedImageProps = (
		imageKey: string,
		options: {
			fallback?: string;
			alt?: string;
			sizes?: number[];
			className?: string;
			width?: number;
			height?: number;
			lazy?: boolean;
			priority?: boolean;
		} = {}
	) => {
		const {
			fallback,
			alt,
			sizes,
			className,
			width,
			height,
			lazy = true,
			priority = false,
		} = options;

		return {
			src: getImagePath(imageKey, fallback),
			alt: alt || getImageAlt(imageKey, fallback),
			className,
			width,
			height,
			lazy,
			priority,
			webp: getWebPImageData(imageKey, fallback),
			srcSet: getResponsiveImageData(imageKey, sizes),
		};
	};

	return {
		images,
		getImagePath,
		getImageAlt,
		getWebPImageData,
		getResponsiveImageData,
		getPlaceholderImageData,
		getOptimizedImageProps,
	};
};
