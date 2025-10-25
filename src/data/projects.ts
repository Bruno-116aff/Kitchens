import type { Project } from '../types';
import { images } from './images';

export const mockProjects: Project[] = [
	{
		id: '1',
		slug: 'modern-linear-kitchen',
		title: 'Modern Linear Kitchen',
		description:
			'A sleek and contemporary linear kitchen featuring high-gloss white cabinets and premium stainless steel appliances.',
		images: [images.portfolio.kitchen1],
		layout: 'linear',
		style: 'modern',
		budget: '€10-20k',
		material: 'MDF',
		duration: '4-6 weeks',
		price: '€15,000',
		clientTestimonial: {
			name: 'Sarah & John',
			text: 'Absolutely love our new kitchen! The team was professional and delivered exactly what we wanted.',
		},
	},
	{
		id: '2',
		slug: 'classic-l-shaped-kitchen',
		title: 'Classic L-Shaped Kitchen',
		description:
			'A timeless L-shaped kitchen with warm wood cabinets and traditional design elements.',
		images: [images.portfolio.kitchen2],
		layout: 'l-shaped',
		style: 'classic',
		budget: '€20-30k',
		material: 'solid-wood',
		duration: '6-8 weeks',
		price: '€25,000',
		clientTestimonial: {
			name: 'Maria & David',
			text: 'The craftsmanship is outstanding. Our kitchen feels like a work of art.',
		},
	},
	{
		id: '3',
		slug: 'scandinavian-u-shaped-kitchen',
		title: 'Scandinavian U-Shaped Kitchen',
		description:
			'A bright and airy U-shaped kitchen with light wood finishes and minimalist Scandinavian design.',
		images: [images.portfolio.kitchen3],
		layout: 'u-shaped',
		style: 'scandinavian',
		budget: '€15-25k',
		material: 'MDF',
		duration: '5-7 weeks',
		price: '€20,000',
		clientTestimonial: {
			name: 'Anna & Peter',
			text: 'Perfect blend of functionality and beauty. Highly recommend!',
		},
	},
	{
		id: '4',
		slug: 'industrial-island-kitchen',
		title: 'Industrial Island Kitchen',
		description:
			'A bold industrial-style kitchen with a central island and exposed metal elements.',
		images: [images.portfolio.kitchen1],
		layout: 'island',
		style: 'loft',
		budget: '€25-35k',
		material: 'acrylic',
		duration: '7-9 weeks',
		price: '€30,000',
		clientTestimonial: {
			name: 'Tom & Lisa',
			text: 'The island is perfect for entertaining. We love the industrial aesthetic.',
		},
	},
	{
		id: '5',
		slug: 'minimalist-two-row-kitchen',
		title: 'Minimalist Two-Row Kitchen',
		description:
			'A clean and minimalist two-row kitchen with hidden storage and seamless design.',
		images: [images.portfolio.kitchen2],
		layout: 'two-row',
		style: 'minimalist',
		budget: '€18-28k',
		material: 'acrylic',
		duration: '6-8 weeks',
		price: '€23,000',
		clientTestimonial: {
			name: 'Emma & James',
			text: 'So clean and organized. Every detail was thoughtfully designed.',
		},
	},
	{
		id: '6',
		slug: 'provence-style-kitchen',
		title: 'Provence Style Kitchen',
		description:
			'A charming Provence-style kitchen with rustic elements and warm colors.',
		images: [images.portfolio.kitchen3],
		layout: 'l-shaped',
		style: 'provence',
		budget: '€12-22k',
		material: 'wood-veneer',
		duration: '5-7 weeks',
		price: '€17,000',
		clientTestimonial: {
			name: 'Sophie & Michael',
			text: "Feels like we're in the French countryside. Beautiful work!",
		},
	},
	{
		id: '7',
		slug: 'modern-u-shaped-kitchen',
		title: 'Modern U-Shaped Kitchen',
		description:
			'A contemporary U-shaped kitchen with dark cabinets and contrasting light countertops.',
		images: [images.portfolio.kitchen1],
		layout: 'u-shaped',
		style: 'modern',
		budget: '€22-32k',
		material: 'MDF',
		duration: '6-8 weeks',
		price: '€27,000',
		clientTestimonial: {
			name: 'Rachel & Mark',
			text: 'The storage solutions are incredible. Everything has its place.',
		},
	},
	{
		id: '8',
		slug: 'classic-island-kitchen',
		title: 'Classic Island Kitchen',
		description:
			'A traditional kitchen with a central island and classic design elements.',
		images: [images.portfolio.kitchen2],
		layout: 'island',
		style: 'classic',
		budget: '€28-38k',
		material: 'solid-wood',
		duration: '8-10 weeks',
		price: '€33,000',
		clientTestimonial: {
			name: 'Jennifer & Robert',
			text: 'The island is the heart of our home. Perfect for family gatherings.',
		},
	},
];
