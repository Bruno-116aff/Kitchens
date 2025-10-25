import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
	type: 'Organization' | 'LocalBusiness' | 'Product' | 'FAQPage' | 'Review';
	data: any;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ type, data }) => {
	const generateSchema = () => {
		switch (type) {
			case 'Organization':
				return {
					'@context': 'https://schema.org',
					'@type': 'Organization',
					name: data.name || 'Custom Kitchens Cyprus',
					url: data.url || 'https://customkitchens.cy',
					logo: data.logo || 'https://customkitchens.cy/logo.svg',
					description:
						data.description ||
						'Professional custom kitchen design, manufacturing and installation in Cyprus',
					contactPoint: {
						'@type': 'ContactPoint',
						telephone: data.phone || '+357-XX-XXX-XXX',
						contactType: 'customer service',
						availableLanguage: ['English', 'Russian'],
					},
					sameAs: data.socialMedia || [
						'https://facebook.com/customkitchenscy',
						'https://instagram.com/customkitchenscy',
					],
				};

			case 'LocalBusiness':
				return {
					'@context': 'https://schema.org',
					'@type': 'LocalBusiness',
					name: data.name || 'Custom Kitchens Cyprus',
					description:
						data.description ||
						'Professional custom kitchen design, manufacturing and installation in Cyprus',
					url: data.url || 'https://customkitchens.cy',
					telephone: data.phone || '+357-XX-XXX-XXX',
					email: data.email || 'info@customkitchens.cy',
					address: {
						'@type': 'PostalAddress',
						streetAddress: data.address?.street || 'Kitchen Street 123',
						addressLocality: data.address?.city || 'Nicosia',
						addressCountry: data.address?.country || 'CY',
					},
					geo: data.geo || {
						'@type': 'GeoCoordinates',
						latitude: 35.1856,
						longitude: 33.3823,
					},
					openingHoursSpecification: data.openingHours || [
						{
							'@type': 'OpeningHoursSpecification',
							dayOfWeek: [
								'Monday',
								'Tuesday',
								'Wednesday',
								'Thursday',
								'Friday',
							],
							opens: '09:00',
							closes: '18:00',
						},
						{
							'@type': 'OpeningHoursSpecification',
							dayOfWeek: 'Saturday',
							opens: '10:00',
							closes: '16:00',
						},
					],
					priceRange: '€€€',
					aggregateRating: data.rating
						? {
								'@type': 'AggregateRating',
								ratingValue: data.rating.value,
								reviewCount: data.rating.count,
						  }
						: undefined,
				};

			case 'Product':
				return {
					'@context': 'https://schema.org',
					'@type': 'Product',
					name: data.name || 'Custom Kitchen',
					description:
						data.description ||
						'Professional custom kitchen design and installation',
					image: data.images || [
						'https://customkitchens.cy/images/portfolio/project-1/1.jpg',
					],
					sku: data.sku || 'KITCHEN-001',
					offers: {
						'@type': 'Offer',
						price: data.price || '15000',
						priceCurrency: 'EUR',
						availability: 'https://schema.org/InStock',
						seller: {
							'@type': 'Organization',
							name: 'Custom Kitchens Cyprus',
						},
					},
					brand: {
						'@type': 'Brand',
						name: 'Custom Kitchens Cyprus',
					},
					aggregateRating: data.rating
						? {
								'@type': 'AggregateRating',
								ratingValue: data.rating.value,
								reviewCount: data.rating.count,
						  }
						: undefined,
				};

			case 'FAQPage':
				return {
					'@context': 'https://schema.org',
					'@type': 'FAQPage',
					mainEntity:
						data.faqs?.map((faq: any) => ({
							'@type': 'Question',
							name: faq.question,
							acceptedAnswer: {
								'@type': 'Answer',
								text: faq.answer,
							},
						})) || [],
				};

			case 'Review':
				return {
					'@context': 'https://schema.org',
					'@type': 'Review',
					itemReviewed: {
						'@type': 'LocalBusiness',
						name: 'Custom Kitchens Cyprus',
					},
					reviewRating: {
						'@type': 'Rating',
						ratingValue: data.rating,
						bestRating: 5,
					},
					author: {
						'@type': 'Person',
						name: data.author,
					},
					reviewBody: data.text,
					datePublished: data.date,
				};

			default:
				return {};
		}
	};

	const schema = generateSchema();

	return (
		<Helmet>
			<script type='application/ld+json'>{JSON.stringify(schema)}</script>
		</Helmet>
	);
};

export default SchemaMarkup;
