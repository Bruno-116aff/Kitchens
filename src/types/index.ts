// Основные типы для проекта

export interface LeadFormData {
	name: string;
	contact: string; // email or phone
	serviceType: string;
	message?: string;
	language: 'en' | 'ru';
	source: string; // page URL
	timestamp: string;
}

export interface Project {
	id: string;
	slug: string;
	title: string;
	description: string;
	images: string[];
	style: string;
	budget: string;
	material: string;
	layout: string;
	duration: string;
	price: string;
	clientTestimonial?: {
		name: string;
		text: string;
		avatar?: string;
	};
}

export interface ServiceType {
	id: string;
	title: string;
	description: string;
	features: string[];
	priceRange?: string;
	duration?: string;
}

export interface ProcessStep {
	id: string;
	title: string;
	description: string;
	duration: string;
	icon?: string;
}

export interface FAQItem {
	id: string;
	question: string;
	answer: string;
	category: string;
}

export interface Testimonial {
	id: string;
	name: string;
	text: string;
	avatar?: string;
	project?: string;
	rating?: number;
}

// События аналитики
export const AnalyticsEvent = {
	PAGE_VIEW: 'page_view',
	FORM_SUBMIT: 'form_submit',
	CTA_CLICK: 'cta_click',
	PHONE_CLICK: 'phone_click',
	PORTFOLIO_VIEW: 'portfolio_view',
	QUIZ_COMPLETE: 'quiz_complete',
	LANGUAGE_SWITCH: 'language_switch',

	// Quiz events
	QUIZ_START: 'quiz_start',
	QUIZ_STEP_COMPLETE: 'quiz_step_complete',
	QUIZ_ABANDON: 'quiz_abandon',
	QUIZ_RESULT_VIEW: 'quiz_result_view',

	// Booking events
	BOOKING_START: 'booking_start',
	BOOKING_STEP_COMPLETE: 'booking_step_complete',
	BOOKING_COMPLETE: 'booking_complete',
	BOOKING_ABANDON: 'booking_abandon',

	// Planner events
	PLANNER_OPEN: 'planner_open',
	PLANNER_MODULE_ADD: 'planner_module_add',
	PLANNER_MODULE_REMOVE: 'planner_module_remove',
	PLANNER_SAVE: 'planner_save',
	PLANNER_EXPORT: 'planner_export',
	PLANNER_SHARE: 'planner_share',

	// Finance events
	FINANCE_CALCULATE: 'finance_calculate',
	FINANCE_COMPARE: 'finance_compare',
	FINANCE_SELECT_OPTION: 'finance_select_option',

	// Portfolio events
	PORTFOLIO_FILTER: 'portfolio_filter',
	PORTFOLIO_PROJECT_VIEW: 'portfolio_project_view',
	PORTFOLIO_PROJECT_SHARE: 'portfolio_project_share',

	// Service events
	SERVICE_CONFIGURATOR_USE: 'service_configurator_use',
	SERVICE_PACKAGE_SELECT: 'service_package_select',
	SERVICE_MATERIAL_CHANGE: 'service_material_change',

	// Engagement events
	SCROLL_DEPTH: 'scroll_depth',
	TIME_ON_PAGE: 'time_on_page',
	VIDEO_PLAY: 'video_play',
	VIDEO_COMPLETE: 'video_complete',

	// Conversion events
	LEAD_GENERATED: 'lead_generated',
	APPOINTMENT_BOOKED: 'appointment_booked',
	QUOTE_REQUESTED: 'quote_requested',
	CALL_BACK_REQUESTED: 'call_back_requested',
} as const;

export type AnalyticsEventType =
	(typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

// Типы для форм
export interface ContactFormData {
	name: string;
	email?: string;
	phone?: string;
	serviceType: string;
	message?: string;
	agreeToPrivacy: boolean;
}

// Типы для навигации
export interface NavItem {
	label: string;
	href: string;
	external?: boolean;
}

// Типы для компонентов
export interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	children: React.ReactNode;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	className?: string;
}

export interface CardProps {
	children: React.ReactNode;
	className?: string;
	hover?: boolean;
}

// Языки
export type Language = 'en' | 'ru';

// SEO типы
export interface SEOData {
	title: string;
	description: string;
	keywords?: string;
	image?: string;
	url?: string;
}

// Quiz data interface
export interface QuizData {
	kitchenType: 'modular' | 'custom' | 'premium' | 'individual';
	layout: 'linear' | 'l-shaped' | 'u-shaped' | 'island' | 'two-row';
	dimensions: {
		width: number;
		height: number;
		depth: number;
	};
	style:
		| 'modern'
		| 'classic'
		| 'scandinavian'
		| 'loft'
		| 'minimalist'
		| 'provence';
	countertop: 'laminate' | 'acrylic' | 'quartz' | 'natural-stone' | 'wood';
	appliances: 'basic' | 'standard' | 'premium' | 'none';
	budget: 'budget-low' | 'budget-medium' | 'budget-high' | 'budget-premium';
	contactInfo?: {
		name: string;
		email: string;
		phone: string;
	};
}

// Quiz result interface
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

// Booking data interface
export interface BookingData {
	serviceType: 'measurement' | 'online-consultation' | 'showroom-visit';
	name: string;
	email: string;
	phone: string;
	date: string;
	timeSlot: string;
	message?: string;
	consent: boolean;
}

// Project filters interface
export interface ProjectFilters {
	layout?: string[];
	style?: string[];
	budget?: string[];
	material?: string[];
	appliances?: string[];
}

// Kitchen module interface for planner
export interface KitchenModule {
	id: string;
	type: 'cabinet' | 'counter' | 'appliance' | 'sink' | 'island';
	name: string;
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	properties?: {
		material?: string;
		color?: string;
		applianceType?: string;
		features?: string[];
	};
}

// Planner project interface
export interface PlannerProject {
	id: string;
	name: string;
	modules: KitchenModule[];
	roomSize: {
		width: number;
		height: number;
	};
	createdAt: string;
	updatedAt: string;
	metadata?: {
		description?: string;
		tags?: string[];
		thumbnail?: string;
	};
}

// Material configuration interface
export interface MaterialConfig {
	facade: 'mdf' | 'ldsp' | 'solid-wood' | 'acrylic';
	countertop: 'laminate' | 'acrylic' | 'quartz' | 'natural-stone';
	hardware: 'standard' | 'premium' | 'luxury';
	appliances: 'basic' | 'standard' | 'premium' | 'luxury';
	totalPrice?: number;
}

// Material option interface
export interface MaterialOption {
	id: string;
	name: string;
	description: string;
	price: number;
	image?: string;
}

// Service package interface
export interface ServicePackage {
	id: string;
	name: string;
	description: string;
	price: number;
	originalPrice?: number;
	popular?: boolean;
	features: Array<{
		key: string;
		value: string | boolean;
		type: 'string' | 'boolean';
	}>;
}

// Kitchen type interface
export interface KitchenType {
	id: string;
	name: string;
	description: string;
	priceRange: {
		min: number;
		max: number;
	};
	features: string[];
	image: string;
	popular?: boolean;
}
