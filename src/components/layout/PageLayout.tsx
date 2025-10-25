import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import PagePrefetcher from '../common/PagePrefetcher/PagePrefetcher';
import ScrollToTop from '../common/ScrollToTop/ScrollToTop';
import type { SEOData } from '../../types';
import './PageLayout.css';

interface PageLayoutProps {
	children: React.ReactNode;
	seo?: SEOData;
	className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
	children,
	seo,
	className = '',
}) => {
	const defaultSEO: SEOData = {
		title: 'Custom Kitchens Cyprus - Design, Build & Install',
		description:
			'Professional custom kitchen design, manufacturing and installation in Cyprus. We handle everything in-house for the best results.',
		keywords:
			'custom kitchens, kitchen design, Cyprus, kitchen installation, kitchen renovation',
		...seo,
	};

	const pageClasses = ['page-layout', className].filter(Boolean).join(' ');

	return (
		<>
			<Helmet>
				<title>{defaultSEO.title}</title>
				<meta name='description' content={defaultSEO.description} />
				{defaultSEO.keywords && (
					<meta name='keywords' content={defaultSEO.keywords} />
				)}

				{/* Open Graph / Facebook */}
				<meta property='og:type' content='website' />
				<meta property='og:title' content={defaultSEO.title} />
				<meta property='og:description' content={defaultSEO.description} />
				{defaultSEO.image && (
					<meta property='og:image' content={defaultSEO.image} />
				)}
				{defaultSEO.url && <meta property='og:url' content={defaultSEO.url} />}

				{/* Twitter */}
				<meta property='twitter:card' content='summary_large_image' />
				<meta property='twitter:title' content={defaultSEO.title} />
				<meta property='twitter:description' content={defaultSEO.description} />
				{defaultSEO.image && (
					<meta property='twitter:image' content={defaultSEO.image} />
				)}

				{/* Additional meta tags */}
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='robots' content='index, follow' />
				<meta name='language' content='en' />
				<meta name='geo.region' content='CY' />
				<meta name='geo.placename' content='Cyprus' />

				{/* Canonical URL */}
				{defaultSEO.url && <link rel='canonical' href={defaultSEO.url} />}

				{/* Favicon */}
				<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
				<link rel='apple-touch-icon' href='/apple-touch-icon.png' />

				{/* Preconnect to external domains */}
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>
			</Helmet>

			<div className={pageClasses}>
				<ScrollToTop />
				<PagePrefetcher />
				<Header />

				<main className='page-layout__main'>{children}</main>

				<Footer />
			</div>
		</>
	);
};

export default PageLayout;
