// Real portfolio projects data
export interface PortfolioProject {
	id: string;
	title: string;
	description: string;
	category: 'kitchen' | 'entryway' | 'office' | 'living' | 'kids';
	style: string[];
	materials: string[];
	layout: string[];
	size: 'compact' | 'medium' | 'large';
	budget: 'economy' | 'standard' | 'premium';
	features: string[];
	images: {
		main: string;
		gallery: string[];
	};
	details: {
		dimensions?: string;
		drawers?: number;
		worktop?: string;
		hardware?: string;
		specialFeatures?: string[];
	};
	clientTestimonial?: {
		name: string;
		text: string;
		rating: number;
	};
	slug: string;
	meta: {
		instagramPost?: string;
		hashtags: string[];
	};
}

export const portfolioProjects: PortfolioProject[] = [
	{
		id: 'project-1',
		title: 'Stylish Modern Kitchen',
		description:
			'A stunning kitchen with glossy NIEMANN MDF and Egger Halifax chipboard creating a warm and cozy atmosphere.',
		category: 'kitchen',
		style: ['modern', 'minimalist'],
		materials: ['MDF', 'Egger Halifax', 'glossy finish'],
		layout: ['linear'],
		size: 'medium',
		budget: 'standard',
		features: [
			'Natural light',
			'Functional zones',
			'Aventos HF lift-up mechanism',
		],
		images: {
			main: '/images/portfolio/project-1/1.jpg',
			gallery: [
				'/images/portfolio/project-1/1.jpg',
				'/images/portfolio/project-1/2.jpg',
				'/images/portfolio/project-1/3.jpg',
				'/images/portfolio/project-1/4.jpg',
				'/images/portfolio/project-1/5.jpg',
				'/images/portfolio/project-1/6.jpg',
				'/images/portfolio/project-1/7.jpg',
			],
		},
		details: {
			worktop: 'Acrylic',
			hardware: 'Premium Blum',
			specialFeatures: [
				'Precise measurements',
				'Minimal gaps',
				'Maximum neatness',
			],
		},
		slug: 'stylish-modern-kitchen',
		meta: {
			hashtags: [
				'#WoodJoy',
				'#CustomKitchens',
				'#LuxuryInteriors',
				'#MDFKitchen',
				'#ModernDesign',
			],
		},
	},
	{
		id: 'project-2',
		title: 'Minimalist Entryway Set',
		description:
			'A compact entryway design combining minimalism, style, and smart functionality with handcrafted mirror.',
		category: 'entryway',
		style: ['minimalist', 'modern'],
		materials: ['MDF', 'ceramic tiles'],
		layout: ['linear'],
		size: 'compact',
		budget: 'standard',
		features: [
			'Comfortable seating',
			'Coat hooks',
			'Shoe storage',
			'Spacious wardrobe',
			'Handcrafted mirror',
		],
		images: {
			main: '/images/portfolio/project-2/1.jpg',
			gallery: [
				'/images/portfolio/project-2/1.jpg',
				'/images/portfolio/project-2/2.jpg',
				'/images/portfolio/project-2/3.jpg',
				'/images/portfolio/project-2/4.jpg',
				'/images/portfolio/project-2/5.jpg',
				'/images/portfolio/project-2/6.jpg',
				'/images/portfolio/project-2/7.jpg',
			],
		},
		details: {
			specialFeatures: ['Handcrafted mirror with decorative ceramic tiles'],
		},
		slug: 'minimalist-entryway-set',
		meta: {
			hashtags: ['#woodjoycyprus', '#customfurniture'],
		},
	},
	{
		id: 'project-3',
		title: 'Warm Cozy Kitchen',
		description:
			'Soft lines, warm tones, and flawless precision in every detail. A perfect example of stylish, cozy, and beautifully balanced interior.',
		category: 'kitchen',
		style: ['modern', 'cozy'],
		materials: ['Premium materials'],
		layout: ['linear'],
		size: 'medium',
		budget: 'premium',
		features: ['Soft lines', 'Warm tones', 'Flawless precision'],
		images: {
			main: '/images/portfolio/project-3/1.jpg',
			gallery: [
				'/images/portfolio/project-3/1.jpg',
				'/images/portfolio/project-3/2.jpg',
				'/images/portfolio/project-3/3.jpg',
				'/images/portfolio/project-3/4.jpg',
				'/images/portfolio/project-3/5.jpg',
				'/images/portfolio/project-3/6.jpg',
				'/images/portfolio/project-3/7.jpg',
				'/images/portfolio/project-3/8.jpg',
				'/images/portfolio/project-3/9.jpg',
				'/images/portfolio/project-3/10.jpg',
			],
		},
		details: {
			specialFeatures: ['Perfect measurements', 'Down to the last millimeter'],
		},
		slug: 'warm-cozy-kitchen',
		meta: {
			hashtags: [
				'#woodjoy',
				'#dreamkitchen',
				'#customfurniture',
				'#kitchendesign',
				'#homelove',
			],
		},
	},
	{
		id: 'project-4',
		title: 'Stylish Office Setup',
		description:
			'A stylish, comfortable, and well-thought-out office setup with solid desk, built-in cabinet, and minimalist wardrobe.',
		category: 'office',
		style: ['minimalist', 'modern'],
		materials: ['Solid wood', 'Premium materials'],
		layout: ['linear'],
		size: 'medium',
		budget: 'standard',
		features: ['Solid desk', 'Built-in cabinet', 'Minimalist wardrobe'],
		images: {
			main: '/images/portfolio/project-4/1.jpg',
			gallery: [
				'/images/portfolio/project-4/1.jpg',
				'/images/portfolio/project-4/2.jpg',
				'/images/portfolio/project-4/3.jpg',
				'/images/portfolio/project-4/4.jpg',
				'/images/portfolio/project-4/5.jpg',
				'/images/portfolio/project-4/6.jpg',
				'/images/portfolio/project-4/7.jpg',
			],
		},
		details: {
			specialFeatures: ['Perfect fit to the millimeter'],
		},
		slug: 'stylish-office-setup',
		meta: {
			hashtags: [
				'#woodjoy',
				'#officefurniture',
				'#customoffice',
				'#interiordesign',
				'#customfurniture',
				'#premiumfurniture',
			],
		},
	},
	{
		id: 'project-5',
		title: 'Comfortable Living Room',
		description:
			'A perfect room for comfort and inspiration with large windows, cozy workspace, spacious wardrobe, elegant mirror, and TV stand.',
		category: 'living',
		style: ['modern', 'functional'],
		materials: ['Premium materials'],
		layout: ['linear'],
		size: 'large',
		budget: 'standard',
		features: [
			'Large windows',
			'Cozy workspace',
			'Spacious wardrobe',
			'Elegant mirror',
			'TV stand',
		],
		images: {
			main: '/images/portfolio/project-5/1.jpg',
			gallery: [
				'/images/portfolio/project-5/1.jpg',
				'/images/portfolio/project-5/2.jpg',
				'/images/portfolio/project-5/3.jpg',
				'/images/portfolio/project-5/4.jpg',
				'/images/portfolio/project-5/5.jpg',
				'/images/portfolio/project-5/6.jpg',
				'/images/portfolio/project-5/7.jpg',
			],
		},
		details: {
			specialFeatures: ['Every detail carefully thought out'],
		},
		slug: 'comfortable-living-room',
		meta: {
			hashtags: ['#woodjoy', '#customfurniture'],
		},
	},
	{
		id: 'project-6',
		title: 'Dream Kitchen with Soul',
		description:
			'A cozy, stylish, and truly alive kitchen where you want to cook, gather, and simply enjoy being home.',
		category: 'kitchen',
		style: ['modern', 'cozy'],
		materials: ['Premium materials'],
		layout: ['linear'],
		size: 'medium',
		budget: 'premium',
		features: [
			'3D kitchen project',
			'Comfort and warmth',
			'Soul and character',
		],
		images: {
			main: '/images/portfolio/project-6/1.jpg',
			gallery: [
				'/images/portfolio/project-6/1.jpg',
				'/images/portfolio/project-6/2.jpg',
				'/images/portfolio/project-6/3.jpg',
				'/images/portfolio/project-6/4.jpg',
				'/images/portfolio/project-6/5.jpg',
				'/images/portfolio/project-6/6.jpg',
				'/images/portfolio/project-6/7.jpg',
			],
		},
		details: {
			specialFeatures: ['3D design refinement', 'Added comfort and warmth'],
		},
		slug: 'dream-kitchen-with-soul',
		meta: {
			hashtags: [
				'#woodjoycyprus',
				'#warmthineverydetail',
				'#dreamkitchen',
				'#customfurniture',
				'#homeandheart',
			],
		},
	},
	{
		id: 'project-7',
		title: 'Dreamy Princess Room',
		description:
			'A unique design crafted with love for a little princess. Soft pink tones and fairy-tale vibe bring warmth and joy.',
		category: 'kids',
		style: ['fairy-tale', 'cozy'],
		materials: ['Premium materials'],
		layout: ['custom'],
		size: 'medium',
		budget: 'premium',
		features: [
			'Cozy art desk',
			'Playful shelves',
			'Magical space for imagination',
		],
		images: {
			main: '/images/portfolio/project-7/1.jpg',
			gallery: [
				'/images/portfolio/project-7/1.jpg',
				'/images/portfolio/project-7/2.jpg',
				'/images/portfolio/project-7/3.jpg',
				'/images/portfolio/project-7/4.jpg',
				'/images/portfolio/project-7/5.jpg',
				'/images/portfolio/project-7/6.jpg',
				'/images/portfolio/project-7/7.jpg',
			],
		},
		details: {
			specialFeatures: ['Soft pink tones', 'Fairy-tale vibe'],
		},
		slug: 'dreamy-princess-room',
		meta: {
			hashtags: [
				'#kidsroom',
				'#pinkfairytale',
				'#customfurniture',
				'#creativedesign',
				'#woodjoy',
			],
		},
	},
	{
		id: 'project-8',
		title: 'Large Family Kitchen',
		description:
			'8 meters of beauty with 18 spacious drawers, 2 convenient dish racks, and 4 meters of generous workspace.',
		category: 'kitchen',
		style: ['modern', 'functional'],
		materials: ['Glossy white fronts', 'Acrylic countertop'],
		layout: ['linear'],
		size: 'large',
		budget: 'premium',
		features: [
			'8 meters length',
			'18 spacious drawers',
			'2 dish racks',
			'4 meters workspace',
			'Acrylic countertop',
		],
		images: {
			main: '/images/portfolio/project-8/1.jpg',
			gallery: [
				'/images/portfolio/project-8/1.jpg',
				'/images/portfolio/project-8/2.jpg',
				'/images/portfolio/project-8/3.jpg',
				'/images/portfolio/project-8/4.jpg',
				'/images/portfolio/project-8/5.jpg',
				'/images/portfolio/project-8/6.jpg',
				'/images/portfolio/project-8/7.jpg',
			],
		},
		details: {
			dimensions: '8 meters',
			drawers: 18,
			worktop: 'Acrylic flowing into window',
			specialFeatures: ['Extra light', 'Sleek style', 'Bright and spacious'],
		},
		slug: 'large-family-kitchen',
		meta: {
			hashtags: [
				'#WoodJoy',
				'#KitchenDesign',
				'#LuxuryKitchen',
				'#CustomKitchen',
				'#AcrylicCountertop',
				'#ModernKitchen',
				'#BrightKitchen',
				'#MadeWithLove',
			],
		},
	},
	{
		id: 'project-9',
		title: 'Light Entryway Design',
		description:
			'Light-toned furniture that visually expands the space with painted, milled fronts in soft Cashmere shade.',
		category: 'entryway',
		style: ['minimalist', 'modern'],
		materials: ['Painted fronts', 'Cashmere shade'],
		layout: ['linear'],
		size: 'compact',
		budget: 'standard',
		features: [
			'Light-toned furniture',
			'Premium Blum hardware',
			'Perfect gaps',
			'Flawless alignment',
		],
		images: {
			main: '/images/portfolio/project-9/1.jpg',
			gallery: [
				'/images/portfolio/project-9/1.jpg',
				'/images/portfolio/project-9/2.jpg',
				'/images/portfolio/project-9/3.jpg',
				'/images/portfolio/project-9/4.jpg',
				'/images/portfolio/project-9/5.jpg',
				'/images/portfolio/project-9/6.jpg',
				'/images/portfolio/project-9/7.jpg',
			],
		},
		details: {
			hardware: 'Premium Blum',
			specialFeatures: [
				'Smooth and silent movement',
				'Perfect gaps',
				'Flawless alignment',
			],
		},
		slug: 'light-entryway-design',
		meta: {
			hashtags: [
				'#entrywaydesign',
				'#customfurniture',
				'#hallwaystorage',
				'#woodjoy',
			],
		},
	},
	{
		id: 'project-10',
		title: 'Modern Kitchen with Island',
		description:
			'Clean lines, warm Hunter Oak texture, matte Grey Fenix, and pastel countertop with black core in perfect harmony.',
		category: 'kitchen',
		style: ['modern', 'minimalist'],
		materials: ['Hunter Oak', 'Grey Fenix', 'Pastel countertop'],
		layout: ['island'],
		size: 'large',
		budget: 'premium',
		features: ['Built-in fridge', 'Spacious drawers', 'Island design'],
		images: {
			main: '/images/portfolio/project-10/1.jpg',
			gallery: [
				'/images/portfolio/project-10/1.jpg',
				'/images/portfolio/project-10/2.jpg',
				'/images/portfolio/project-10/3.jpg',
				'/images/portfolio/project-10/4.jpg',
				'/images/portfolio/project-10/5.jpg',
				'/images/portfolio/project-10/6.jpg',
				'/images/portfolio/project-10/7.jpg',
			],
		},
		details: {
			specialFeatures: ['Built-in fridge', 'Black core countertop'],
		},
		slug: 'modern-kitchen-with-island',
		meta: {
			hashtags: [
				'#kitchendesign',
				'#modernkitchen',
				'#customkitchen',
				'#woodjoy',
			],
		},
	},
	{
		id: 'project-11',
		title: 'Country Modern Fusion',
		description:
			'A bold fusion of country charm and modern minimalism with sleek Gola profile and concrete-look island.',
		category: 'kitchen',
		style: ['country', 'modern'],
		materials: [
			'Gola profile',
			'Nimman fronts',
			'Saviola uppers',
			'Concrete-look island',
		],
		layout: ['island'],
		size: 'large',
		budget: 'premium',
		features: [
			'Handle-free design',
			'Concrete-look island',
			'Perfectly balanced look',
		],
		images: {
			main: '/images/portfolio/project-11/1.jpg',
			gallery: [
				'/images/portfolio/project-11/1.jpg',
				'/images/portfolio/project-11/2.jpg',
				'/images/portfolio/project-11/3.jpg',
				'/images/portfolio/project-11/4.jpg',
				'/images/portfolio/project-11/5.jpg',
				'/images/portfolio/project-11/6.jpg',
				'/images/portfolio/project-11/7.jpg',
			],
		},
		details: {
			specialFeatures: [
				'Sleek Gola profile',
				'Handle-free drawers',
				'Statement island',
			],
		},
		slug: 'country-modern-fusion',
		meta: {
			hashtags: [
				'#WoodJoy',
				'#CustomKitchens',
				'#KitchenDesign',
				'#ModernKitchen',
				'#CountryStyle',
				'#KitchenInspo',
				'#InteriorDesign',
			],
		},
	},
	{
		id: 'project-12',
		title: 'Compact White & Wood Kitchen',
		description:
			'Bright white fronts visually expand the space while warm wood adds cozy atmosphere. Perfect blend of minimalism and natural textures.',
		category: 'kitchen',
		style: ['minimalist', 'scandinavian'],
		materials: ['White fronts', 'Natural wood'],
		layout: ['linear'],
		size: 'compact',
		budget: 'standard',
		features: [
			'Bright white fronts',
			'Warm wood accents',
			'Visually expanded space',
		],
		images: {
			main: '/images/portfolio/project-12/1.jpg',
			gallery: [
				'/images/portfolio/project-12/1.jpg',
				'/images/portfolio/project-12/2.jpg',
				'/images/portfolio/project-12/3.jpg',
				'/images/portfolio/project-12/4.jpg',
				'/images/portfolio/project-12/5.jpg',
				'/images/portfolio/project-12/6.jpg',
				'/images/portfolio/project-12/7.jpg',
			],
		},
		details: {
			specialFeatures: ['Refined down to the millimeter'],
		},
		slug: 'compact-white-wood-kitchen',
		meta: {
			hashtags: [
				'#kitchen',
				'#interior',
				'#smallkitchen',
				'#whitedesign',
				'#naturalwood',
				'#cozyhome',
				'#interiordesign',
				'#HomeInspo',
			],
		},
	},
	{
		id: 'project-13',
		title: 'Bright Cozy Kitchen',
		description:
			'A bright, cozy kitchen that blends beauty, comfort, and smart design - the heart of your home.',
		category: 'kitchen',
		style: ['modern', 'bright'],
		materials: ['White materials'],
		layout: ['linear'],
		size: 'medium',
		budget: 'standard',
		features: ['Bright design', 'Cozy atmosphere', 'Smart design'],
		images: {
			main: '/images/portfolio/project-13/1.jpg',
			gallery: [
				'/images/portfolio/project-13/1.jpg',
				'/images/portfolio/project-13/2.jpg',
				'/images/portfolio/project-13/3.jpg',
				'/images/portfolio/project-13/4.jpg',
				'/images/portfolio/project-13/5.jpg',
				'/images/portfolio/project-13/6.jpg',
				'/images/portfolio/project-13/7.jpg',
			],
		},
		details: {
			specialFeatures: ['Heart of the home'],
		},
		slug: 'bright-cozy-kitchen',
		meta: {
			hashtags: ['#customkitchen', '#whitekitchen', '#woodjoy', '#homedesign'],
		},
	},
	{
		id: 'project-14',
		title: 'Modern Stylish Kitchen',
		description:
			'Modern, stylish, and thoughtfully designed furniture that creates atmosphere and makes cooking feel like joy.',
		category: 'kitchen',
		style: ['modern', 'stylish'],
		materials: ['Premium materials'],
		layout: ['linear'],
		size: 'medium',
		budget: 'premium',
		features: ['Thoughtful design', 'Atmospheric space', 'Joy of cooking'],
		images: {
			main: '/images/portfolio/project-14/1.jpg',
			gallery: [
				'/images/portfolio/project-14/1.jpg',
				'/images/portfolio/project-14/2.jpg',
				'/images/portfolio/project-14/3.jpg',
				'/images/portfolio/project-14/4.jpg',
				'/images/portfolio/project-14/5.jpg',
				'/images/portfolio/project-14/6.jpg',
				'/images/portfolio/project-14/7.jpg',
			],
		},
		details: {
			specialFeatures: [
				'Experience and attention to detail',
				'Love for design',
			],
		},
		slug: 'modern-stylish-kitchen',
		meta: {
			hashtags: ['#customkitchen', '#woodjoy'],
		},
	},
];

// Filter options for portfolio
export const portfolioFilters = {
	categories: [
		{ value: 'kitchen', label: 'Kitchens', count: 9 },
		{ value: 'entryway', label: 'Entryways', count: 2 },
		{ value: 'office', label: 'Office', count: 1 },
		{ value: 'living', label: 'Living Rooms', count: 1 },
		{ value: 'kids', label: 'Kids Rooms', count: 1 },
	],
	styles: [
		{ value: 'modern', label: 'Modern', count: 12 },
		{ value: 'minimalist', label: 'Minimalist', count: 8 },
		{ value: 'cozy', label: 'Cozy', count: 4 },
		{ value: 'scandinavian', label: 'Scandinavian', count: 1 },
		{ value: 'country', label: 'Country', count: 1 },
		{ value: 'bright', label: 'Bright', count: 2 },
		{ value: 'stylish', label: 'Stylish', count: 2 },
		{ value: 'fairy-tale', label: 'Fairy-tale', count: 1 },
		{ value: 'functional', label: 'Functional', count: 2 },
	],
	materials: [
		{ value: 'MDF', label: 'MDF', count: 2 },
		{ value: 'Egger Halifax', label: 'Egger Halifax', count: 1 },
		{ value: 'Hunter Oak', label: 'Hunter Oak', count: 1 },
		{ value: 'Grey Fenix', label: 'Grey Fenix', count: 1 },
		{ value: 'Acrylic', label: 'Acrylic', count: 2 },
		{ value: 'White fronts', label: 'White Fronts', count: 3 },
		{ value: 'Natural wood', label: 'Natural Wood', count: 1 },
		{ value: 'Premium materials', label: 'Premium Materials', count: 6 },
	],
	layouts: [
		{ value: 'linear', label: 'Linear', count: 10 },
		{ value: 'island', label: 'Island', count: 2 },
		{ value: 'custom', label: 'Custom', count: 2 },
	],
	sizes: [
		{ value: 'compact', label: 'Compact', count: 3 },
		{ value: 'medium', label: 'Medium', count: 7 },
		{ value: 'large', label: 'Large', count: 4 },
	],
	budgets: [
		{ value: 'economy', label: 'Economy', count: 0 },
		{ value: 'standard', label: 'Standard', count: 7 },
		{ value: 'premium', label: 'Premium', count: 7 },
	],
};

// Helper functions
export function getProjectBySlug(slug: string): PortfolioProject | undefined {
	return portfolioProjects.find(project => project.slug === slug);
}

export function getProjectsByCategory(category: string): PortfolioProject[] {
	return portfolioProjects.filter(project => project.category === category);
}

export function getFeaturedProjects(limit: number = 6): PortfolioProject[] {
	return portfolioProjects.slice(0, limit);
}

export function getRandomProjects(limit: number = 3): PortfolioProject[] {
	const shuffled = [...portfolioProjects].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, limit);
}

