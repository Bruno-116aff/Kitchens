import { z } from 'zod';

// Validation schemas using Zod

export const contactFormSchema = z
	.object({
		name: z
			.string()
			.min(2, 'Name must be at least 2 characters')
			.max(50, 'Name must be less than 50 characters'),
		email: z.string().email('Please enter a valid email').optional(),
		phone: z.string().min(10, 'Please enter a valid phone number').optional(),
		serviceType: z.string().min(1, 'Please select a service type'),
		message: z
			.string()
			.max(500, 'Message must be less than 500 characters')
			.optional(),
		agreeToPrivacy: z
			.boolean()
			.refine(val => val === true, 'You must agree to the privacy policy'),
	})
	.refine(data => data.email || data.phone, {
		message: 'Please provide either email or phone number',
		path: ['contact'],
	});

export const leadFormSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	contact: z.string().min(5, 'Please enter a valid contact'),
	serviceType: z.string().min(1, 'Please select a service type'),
	message: z.string().optional(),
	language: z.enum(['en', 'ru']),
	source: z.string(),
	timestamp: z.string(),
});

// Email validation regex
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (international format)
export const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

// Cyprus phone number format
export const cyprusPhoneRegex = /^(\+357|00357|357)?[0-9]{8}$/;

export const validateEmail = (email: string): boolean => {
	return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
	return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const validateCyprusPhone = (phone: string): boolean => {
	return cyprusPhoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// Format phone number for display
export const formatPhone = (phone: string): string => {
	const cleaned = phone.replace(/[\s\-\(\)]/g, '');
	if (cleaned.startsWith('+357')) {
		return `+357 ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
	}
	if (cleaned.startsWith('357')) {
		return `+357 ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
	}
	return phone;
};

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type LeadFormData = z.infer<typeof leadFormSchema>;

