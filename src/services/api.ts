import {
	type LeadFormData,
	type ContactFormData,
	type QuizData,
	type BookingData,
	type ProjectFilters,
} from '../types';

// Mock data interfaces
export interface TimeSlot {
	id: string;
	time: string;
	available: boolean;
}

export interface BookingConfirmation {
	bookingId: string;
	status: 'confirmed' | 'pending' | 'cancelled';
	date: string;
	time: string;
	serviceType: string;
	confirmationCode: string;
}

export interface QuizResult {
	priceRange: {
		min: number;
		max: number;
	};
	presets: Array<{
		id: string;
		name: string;
		price: number;
		description: string;
		image: string;
	}>;
	recommendations: string[];
}

class APIService {
	constructor() {
		// In production, this would be your actual API endpoint
		console.log('API Service initialized');
	}

	/**
	 * Submit lead form data
	 */
	async submitLead(
		data: LeadFormData
	): Promise<{ success: boolean; leadId: string }> {
		console.log('[API] Submitting lead:', data);

		// Simulate API call delay
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Mock response
		const leadId = `LEAD-${Date.now()}-${Math.random()
			.toString(36)
			.substr(2, 9)}`;

		console.log(`[API] Lead submitted successfully: ${leadId}`);

		return {
			success: true,
			leadId,
		};
	}

	/**
	 * Submit contact form data
	 */
	async submitContact(
		data: ContactFormData
	): Promise<{ success: boolean; messageId: string }> {
		console.log('[API] Submitting contact form:', data);

		// Simulate API call delay
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Mock response
		const messageId = `MSG-${Date.now()}-${Math.random()
			.toString(36)
			.substr(2, 9)}`;

		console.log(`[API] Contact form submitted successfully: ${messageId}`);

		return {
			success: true,
			messageId,
		};
	}

	/**
	 * Submit quiz data and get price calculation
	 */
	async submitQuiz(data: QuizData): Promise<QuizResult> {
		console.log('[API] Submitting quiz data:', data);

		// Simulate API call delay
		await new Promise(resolve => setTimeout(resolve, 1500));

		// Mock calculation based on quiz answers
		const basePrice = this.calculateBasePrice(data);
		const priceRange = this.calculatePriceRange(basePrice, data);
		const presets = this.generatePresets(priceRange);

		const result: QuizResult = {
			priceRange,
			presets,
			recommendations: this.generateRecommendations(data),
		};

		console.log('[API] Quiz result:', result);

		return result;
	}

	/**
	 * Get available time slots for booking
	 */
	async getAvailableSlots(
		date: Date,
		serviceType: string
	): Promise<TimeSlot[]> {
		console.log('[API] Getting available slots for:', date, serviceType);

		// Simulate API call delay
		await new Promise(resolve => setTimeout(resolve, 500));

		// Mock available slots (9:00 to 18:00 with 1-hour intervals)
		const slots: TimeSlot[] = [];
		const startHour = 9;
		const endHour = 18;

		for (let hour = startHour; hour < endHour; hour++) {
			// Randomly mark some slots as unavailable (20% chance)
			const available = Math.random() > 0.2;

			slots.push({
				id: `${hour.toString().padStart(2, '0')}:00`,
				time: `${hour.toString().padStart(2, '0')}:00`,
				available,
			});
		}

		console.log('[API] Available slots:', slots);

		return slots;
	}

	/**
	 * Book an appointment
	 */
	async bookAppointment(data: BookingData): Promise<BookingConfirmation> {
		console.log('[API] Booking appointment:', data);

		// Simulate API call delay
		await new Promise(resolve => setTimeout(resolve, 1500));

		// Mock confirmation
		const confirmation: BookingConfirmation = {
			bookingId: `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			status: 'confirmed',
			date: data.date,
			time: data.timeSlot,
			serviceType: data.serviceType,
			confirmationCode: Math.random().toString(36).substr(2, 8).toUpperCase(),
		};

		console.log('[API] Appointment booked successfully:', confirmation);

		return confirmation;
	}

	/**
	 * Get projects with filters
	 */
	async getProjects(filters: ProjectFilters): Promise<any[]> {
		console.log('[API] Getting projects with filters:', filters);

		// Simulate API call delay
		await new Promise(resolve => setTimeout(resolve, 800));

		// Mock projects data (will be replaced with real data later)
		const mockProjects = [
			{
				id: '1',
				title: 'Modern Linear Kitchen',
				layout: 'linear',
				style: 'modern',
				budget: '€10-20k',
				material: 'MDF',
				appliances: 'premium',
				images: ['/Kitchens/images/portfolio/project-1/1.jpg'],
				slug: 'modern-linear-kitchen',
			},
			{
				id: '2',
				title: 'Classic L-Shaped Kitchen',
				layout: 'l-shaped',
				style: 'classic',
				budget: '€20-30k',
				material: 'solid-wood',
				appliances: 'premium',
				images: ['/Kitchens/images/portfolio/project-3/1.jpg'],
				slug: 'classic-l-shaped-kitchen',
			},
			{
				id: '3',
				title: 'Scandinavian U-Shaped Kitchen',
				layout: 'u-shaped',
				style: 'scandinavian',
				budget: '€15-25k',
				material: 'MDF',
				appliances: 'standard',
				images: ['/Kitchens/images/portfolio/project-8/1.jpg'],
				slug: 'scandinavian-u-shaped-kitchen',
			},
		];

		// Apply filters (mock filtering logic)
		let filteredProjects = mockProjects;

		if (filters.layout && filters.layout.length > 0) {
			filteredProjects = filteredProjects.filter(project =>
				filters.layout!.includes(project.layout)
			);
		}

		if (filters.style && filters.style.length > 0) {
			filteredProjects = filteredProjects.filter(project =>
				filters.style!.includes(project.style)
			);
		}

		if (filters.budget && filters.budget.length > 0) {
			filteredProjects = filteredProjects.filter(project =>
				filters.budget!.includes(project.budget)
			);
		}

		console.log('[API] Filtered projects:', filteredProjects);

		return filteredProjects;
	}

	/**
	 /**
	  * Get project by slug
	  */
	async getProject(slug: string): Promise<Record<string, unknown> | null> {
		console.log('[API] Getting project:', slug);

		// Simulate API call delay
		await new Promise(resolve => setTimeout(resolve, 600));

		// Mock project data
		const mockProject = {
			id: '1',
			title: 'Modern Linear Kitchen',
			slug,
			description: 'A beautiful modern linear kitchen with premium finishes.',
			layout: 'linear',
			style: 'modern',
			budget: '€15,000 - €18,500',
			material: 'High-gloss MDF',
			appliances: 'Premium appliance package',
			timeline: '4-6 weeks',
			images: [
				'/Kitchens/images/portfolio/project-1/1.jpg',
				'/Kitchens/images/portfolio/project-1/2.jpg',
				'/Kitchens/images/portfolio/project-1/3.jpg',
			],
			beforeAfter: {
				before: '/Kitchens/images/portfolio/project-2/1.jpg',
				after: '/Kitchens/images/portfolio/project-2/2.jpg',
			},
			testimonial: {
				text: 'Absolutely love our new kitchen! The team was professional and delivered exactly what we wanted.',
				author: 'Sarah & John',
				rating: 5,
			},
		};

		console.log('[API] Project data:', mockProject);

		return mockProject;
	}

	// Private helper methods for quiz calculation
	private calculateBasePrice(data: QuizData): number {
		const typeMultipliers = {
			modular: 1.0,
			custom: 1.3,
			premium: 1.6,
			individual: 2.0,
		};

		const layoutMultipliers = {
			linear: 1.0,
			'l-shaped': 1.2,
			'u-shaped': 1.4,
			island: 1.5,
			'two-row': 1.3,
		};

		const basePrice = 8000; // Base price in EUR
		const typeMultiplier =
			typeMultipliers[data.kitchenType as keyof typeof typeMultipliers] || 1.0;
		const layoutMultiplier =
			layoutMultipliers[data.layout as keyof typeof layoutMultipliers] || 1.0;

		return basePrice * typeMultiplier * layoutMultiplier;
	}

	private calculatePriceRange(
		basePrice: number,
		data: QuizData
	): { min: number; max: number } {
		const dimensionMultiplier = data.dimensions.width * data.dimensions.depth;
		const materialMultiplier = this.getMaterialMultiplier(data.countertop);
		const applianceMultiplier = this.getApplianceMultiplier(data.appliances);

		const adjustedPrice =
			basePrice *
			dimensionMultiplier *
			materialMultiplier *
			applianceMultiplier;

		return {
			min: Math.round(adjustedPrice * 0.85),
			max: Math.round(adjustedPrice * 1.15),
		};
	}

	private getMaterialMultiplier(material: string): number {
		const multipliers = {
			laminate: 1.0,
			acrylic: 1.2,
			quartz: 1.4,
			'natural-stone': 1.8,
			wood: 1.6,
		};

		return multipliers[material as keyof typeof multipliers] || 1.0;
	}

	private getApplianceMultiplier(appliances: string): number {
		const multipliers = {
			basic: 1.0,
			standard: 1.3,
			premium: 1.8,
			none: 0.8,
		};

		return multipliers[appliances as keyof typeof multipliers] || 1.0;
	}

	private generatePresets(priceRange: {
		min: number;
		max: number;
	}): QuizResult['presets'] {
		const range = priceRange.max - priceRange.min;

		return [
			{
				id: 'economy',
				name: 'Economy Package',
				price: priceRange.min,
				description: 'Essential features with quality materials',
				image: '/Kitchens/images/presets/economy.jpg',
			},
			{
				id: 'optimal',
				name: 'Optimal Package',
				price: priceRange.min + range * 0.4,
				description: 'Best value with premium touches',
				image: '/Kitchens/images/presets/optimal.jpg',
			},
			{
				id: 'premium',
				name: 'Premium Package',
				price: priceRange.max,
				description: 'Luxury finishes and premium appliances',
				image: '/Kitchens/images/presets/premium.jpg',
			},
		];
	}

	private generateRecommendations(data: QuizData): string[] {
		const recommendations = [];

		if (data.budget === 'budget-low') {
			recommendations.push('Consider modular options for cost savings');
			recommendations.push('Laminate countertops offer great value');
		} else if (data.budget === 'budget-high') {
			recommendations.push('Premium materials will enhance your investment');
			recommendations.push('Consider high-end appliances for luxury feel');
		}

		if (data.layout === 'island') {
			recommendations.push('Island layout maximizes workspace and storage');
		}

		if (data.style === 'modern') {
			recommendations.push('High-gloss finishes complement modern design');
		}

		return recommendations;
	}
}

// Create and export singleton instance
export const apiService = new APIService();
export default apiService;
