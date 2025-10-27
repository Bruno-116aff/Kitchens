import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import NotFoundPage from '../pages/NotFoundPage';
import PageLoader from '../components/common/PageLoader/PageLoader';

// Lazy load pages
const HomePage = React.lazy(() => import('../pages/HomePage'));
const ServicesPage = React.lazy(() => import('../pages/ServicesPage'));
const AboutPage = React.lazy(() => import('../pages/AboutPage'));
const PortfolioPage = React.lazy(() => import('../pages/PortfolioPage'));
const ProcessPage = React.lazy(() => import('../pages/ProcessPage'));
const FAQPage = React.lazy(() => import('../pages/FAQPage'));
const ContactPage = React.lazy(() => import('../pages/ContactPage'));
const PrivacyPage = React.lazy(() => import('../pages/PrivacyPage'));
const TermsPage = React.lazy(() => import('../pages/TermsPage'));
const ThankYouPage = React.lazy(() => import('../pages/ThankYouPage'));

// New pages for advanced features
const CalculatorPage = React.lazy(() => import('../pages/CalculatorPage'));
const PlannerPage = React.lazy(() => import('../pages/PlannerPage'));
const BookingPage = React.lazy(() => import('../pages/BookingPage'));
const FinancingPage = React.lazy(() => import('../pages/FinancingPage'));
const ProjectDetailPage = React.lazy(
	() => import('../pages/ProjectDetailPage')
);

export const router = createBrowserRouter([
	{
		path: '/Kitchens/',
		element: (
			<PageLayout
				seo={{
					title: 'Custom Kitchens Cyprus - Design, Build & Install',
					description:
						'Professional custom kitchen design, manufacturing and installation in Cyprus. We handle everything in-house for the best results.',
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<HomePage />
				</React.Suspense>
			</PageLayout>
		),
		errorElement: <NotFoundPage />,
	},
	{
		path: '/Kitchens/services',
		element: (
			<PageLayout
				seo={{
					title: 'Kitchen Services - Custom Design & Installation',
					description:
						'Comprehensive kitchen services including design, manufacturing, and installation. From consultation to completion.',
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<ServicesPage />
				</React.Suspense>
			</PageLayout>
		),
	},
	{
		path: '/Kitchens/about',
		element: (
			<PageLayout
				seo={{
					title: 'About Us - Custom Kitchens Cyprus',
					description:
						'Learn about our team, experience, and commitment to delivering exceptional custom kitchen solutions in Cyprus.',
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<AboutPage />
				</React.Suspense>
			</PageLayout>
		),
	},
	{
		path: '/Kitchens/portfolio',
		element: (
			<PageLayout
				seo={{
					title: 'Kitchen Portfolio - Our Latest Projects',
					description:
						'Browse our portfolio of custom kitchen projects. See the quality and craftsmanship we deliver to our clients.',
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<PortfolioPage />
				</React.Suspense>
			</PageLayout>
		),
	},
	{
		path: '/Kitchens/portfolio/:slug',
		element: (
			<PageLayout
				seo={{
					title: 'Kitchen Project - Custom Kitchens Cyprus',
					description: 'Detailed view of our custom kitchen project.',
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<ProjectDetailPage />
				</React.Suspense>
			</PageLayout>
		),
	},
	{
		path: '/Kitchens/process',
		element: (
			<PageLayout
				seo={{
					title: 'Our Process - How We Work',
					description:
						'Learn about our 6-step process from consultation to installation. Transparent, professional, and reliable.',
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<ProcessPage />
				</React.Suspense>
			</PageLayout>
		),
	},
	{
		path: '/Kitchens/faq',
		element: (
			<PageLayout
				seo={{
					title: 'FAQ - Frequently Asked Questions',
					description:
						'Find answers to common questions about our kitchen design, manufacturing, and installation services.',
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<FAQPage />
				</React.Suspense>
			</PageLayout>
		),
	},
	{
		path: '/Kitchens/contact',
		element: (
			<PageLayout
				seo={{
					title: 'Contact Us - Get Your Free Quote',
					description:
						"Contact us for a free consultation and quote. We're here to help you create your dream kitchen.",
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<ContactPage />
				</React.Suspense>
			</PageLayout>
		),
	},
	{
		path: '/Kitchens/privacy-policy',
		element: (
			<PageLayout
				seo={{
					title: 'Privacy Policy - Custom Kitchens Cyprus',
					description:
						'Our privacy policy explains how we collect, use, and protect your personal information.',
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<PrivacyPage />
				</React.Suspense>
			</PageLayout>
		),
	},
	{
		path: '/Kitchens/terms-of-service',
		element: (
			<PageLayout
				seo={{
					title: 'Terms of Service - Custom Kitchens Cyprus',
					description:
						'Terms and conditions for our kitchen design, manufacturing, and installation services.',
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<TermsPage />
				</React.Suspense>
			</PageLayout>
		),
	},
	{
		path: '/Kitchens/thank-you',
		element: (
			<PageLayout
				seo={{
					title: 'Thank You - Message Received',
					description:
						'Thank you for your message. We will get back to you within 24 hours.',
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<ThankYouPage />
				</React.Suspense>
			</PageLayout>
		),
	},
	// New advanced pages
	{
		path: '/Kitchens/calculator',
		element: (
			<PageLayout
				seo={{
					title: 'Kitchen Price Calculator - Get Instant Quote',
					description:
						'Calculate your kitchen price in 60 seconds. Answer 7 simple questions and get a personalized quote.',
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<CalculatorPage />
				</React.Suspense>
			</PageLayout>
		),
	},
	{
		path: '/Kitchens/planner',
		element: (
			<PageLayout
				seo={{
					title: '3D Kitchen Planner - Design Your Dream Kitchen',
					description:
						'Design your kitchen online with our free 3D planner. Try different layouts and materials.',
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<PlannerPage />
				</React.Suspense>
			</PageLayout>
		),
	},
	{
		path: '/Kitchens/book',
		element: (
			<PageLayout
				seo={{
					title: 'Book Appointment - Free Consultation',
					description:
						'Book your free consultation or measurement visit. Choose convenient time and location.',
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<BookingPage />
				</React.Suspense>
			</PageLayout>
		),
	},
	{
		path: '/Kitchens/financing',
		element: (
			<PageLayout
				seo={{
					title: 'Financing Options - 0% Interest Available',
					description:
						'Flexible financing options for your kitchen project. 0% interest rates available.',
					url: window.location.href,
				}}
			>
				<React.Suspense fallback={<PageLoader />}>
					<FinancingPage />
				</React.Suspense>
			</PageLayout>
		),
	},
	// 404 catch-all
	{
		path: '*',
		element: (
			<PageLayout
				seo={{
					title: 'Page Not Found - Custom Kitchens Cyprus',
					description: 'The page you are looking for could not be found.',
					url: window.location.href,
				}}
			>
				<NotFoundPage />
			</PageLayout>
		),
	},
]);

export default router;
