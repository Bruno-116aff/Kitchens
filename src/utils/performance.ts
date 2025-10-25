// Performance optimization utilities

/**
 * Debounce function to limit the rate of function calls
 */
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number,
	immediate?: boolean
): (...args: Parameters<T>) => void {
	let timeout: number | null = null;

	return function executedFunction(...args: Parameters<T>) {
		const later = () => {
			timeout = null;
			if (!immediate) func(...args);
		};

		const callNow = immediate && !timeout;

		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(later, wait);

		if (callNow) func(...args);
	};
}

/**
 * Throttle function to ensure function is called at most once per interval
 */
export function throttle<T extends (...args: any[]) => any>(
	func: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;

	return function executedFunction(...args: Parameters<T>) {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

/**
 * Intersection Observer for lazy loading
 */
export class LazyLoadObserver {
	private observer: IntersectionObserver;
	private observedElements: Set<Element> = new Set();

	constructor(
		callback: IntersectionObserverCallback,
		options: IntersectionObserverInit = {}
	) {
		this.observer = new IntersectionObserver(callback, {
			rootMargin: '50px',
			threshold: 0.1,
			...options,
		});
	}

	observe(element: Element) {
		if (!this.observedElements.has(element)) {
			this.observer.observe(element);
			this.observedElements.add(element);
		}
	}

	unobserve(element: Element) {
		if (this.observedElements.has(element)) {
			this.observer.unobserve(element);
			this.observedElements.delete(element);
		}
	}

	disconnect() {
		this.observer.disconnect();
		this.observedElements.clear();
	}
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string, type?: string) {
	const link = document.createElement('link');
	link.rel = 'preload';
	link.href = href;
	link.as = as;
	if (type) link.type = type;

	document.head.appendChild(link);
}

/**
 * Prefetch resources for faster navigation
 */
export function prefetchResource(href: string) {
	const link = document.createElement('link');
	link.rel = 'prefetch';
	link.href = href;

	document.head.appendChild(link);
}

/**
 * Load script dynamically
 */
export function loadScript(src: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = src;
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

		document.head.appendChild(script);
	});
}

/**
 * Load CSS dynamically
 */
export function loadCSS(href: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = href;
		link.onload = () => resolve();
		link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));

		document.head.appendChild(link);
	});
}

/**
 * Measure Core Web Vitals
 */
export function measureWebVitals() {
	// Largest Contentful Paint (LCP)
	new PerformanceObserver(list => {
		const entries = list.getEntries();
		const lastEntry = entries[entries.length - 1];
		console.log('LCP:', lastEntry.startTime);
	}).observe({ entryTypes: ['largest-contentful-paint'] });

	// First Input Delay (FID) - simplified version
	new PerformanceObserver(list => {
		const entries = list.getEntries();
		entries.forEach(entry => {
			console.log('FID:', (entry as any).processingStart - entry.startTime);
		});
	}).observe({ entryTypes: ['first-input'] });

	// Cumulative Layout Shift (CLS) - simplified version
	let clsValue = 0;
	new PerformanceObserver(list => {
		const entries = list.getEntries();
		entries.forEach(entry => {
			if (!(entry as any).hadRecentInput) {
				clsValue += (entry as any).value;
				console.log('CLS:', clsValue);
			}
		});
	}).observe({ entryTypes: ['layout-shift'] });
}

/**
 * Optimize images with WebP support detection
 */
export function supportsWebP(): Promise<boolean> {
	return new Promise(resolve => {
		const webP = new Image();
		webP.onload = webP.onerror = () => {
			resolve(webP.height === 2);
		};
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	});
}

/**
 * Service Worker registration for caching
 */
export function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
	if ('serviceWorker' in navigator) {
		return navigator.serviceWorker
			.register('/sw.js')
			.then(registration => {
				console.log('Service Worker registered:', registration);
				return registration;
			})
			.catch(error => {
				console.error('Service Worker registration failed:', error);
				return null;
			});
	}
	return Promise.resolve(null);
}

/**
 * Bundle size analyzer helper
 */
export function analyzeBundleSize() {
	// Initialize performance monitoring in development
	if (
		typeof window !== 'undefined' &&
		window.location.hostname === 'localhost'
	) {
		// Log component imports for bundle analysis
		console.group('Bundle Analysis');
		console.log('Bundle analysis not available in browser environment');
		console.groupEnd();
	}
}

/**
 * Memory usage monitor
 */
export function monitorMemoryUsage() {
	if ('memory' in performance) {
		const memory = (performance as any).memory;
		console.log('Memory Usage:', {
			used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
			total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
			limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB',
		});
	}
}

/**
 * Initialize performance optimizations
 */
export function initPerformanceOptimizations() {
	// Measure Web Vitals
	measureWebVitals();

	// Register Service Worker
	registerServiceWorker();

	// Preload critical resources
	preloadResource('/fonts/inter.woff2', 'font', 'font/woff2');

	// Monitor memory usage periodically
	setInterval(monitorMemoryUsage, 30000);

	console.log('Performance optimizations initialized');
}
