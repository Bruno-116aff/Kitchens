import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BookingData } from '../../../types';
import BookingStep from '../BookingStep/BookingStep';
import BookingProgressBar from '../BookingProgressBar/BookingProgressBar';
import BookingConfirmation from '../BookingConfirmation/BookingConfirmation';
import { apiService } from '../../../services/api';
import './BookingFlow.css';

interface BookingFlowProps {
	onComplete?: (data: BookingData, confirmation: any) => void;
	className?: string;
}

const BOOKING_STEPS = [
	{
		id: 'serviceType',
		title: 'Choose Service Type',
		description: 'Select the type of consultation you need',
		type: 'service-selection',
	},
	{
		id: 'contact',
		title: 'Contact Information',
		description: 'Provide your contact details',
		type: 'contact-form',
	},
	{
		id: 'datetime',
		title: 'Select Date & Time',
		description: 'Choose your preferred appointment time',
		type: 'datetime-picker',
	},
	{
		id: 'confirmation',
		title: 'Confirm Booking',
		description: 'Review and confirm your appointment',
		type: 'confirmation',
	},
];

const BookingFlow: React.FC<BookingFlowProps> = ({
	onComplete,
	className = '',
}) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [bookingData, setBookingData] = useState<Partial<BookingData>>({
		consent: false,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [confirmation, setConfirmation] = useState<any>(null);
	const [availableSlots, setAvailableSlots] = useState<any[]>([]);

	const progress = ((currentStep + 1) / BOOKING_STEPS.length) * 100;

	const handleStepComplete = (stepId: string, value: any) => {
		setBookingData(prev => ({
			...prev,
			[stepId]: value,
		}));

		// Load available slots when service type is selected
		if (stepId === 'serviceType') {
			loadAvailableSlots(value);
		}

		// Auto-advance to next step
		if (currentStep < BOOKING_STEPS.length - 1) {
			setTimeout(() => {
				setCurrentStep(prev => prev + 1);
			}, 300);
		} else {
			// Last step completed, submit booking
			handleBookingSubmit();
		}
	};

	const loadAvailableSlots = async (serviceType: string) => {
		try {
			const today = new Date();
			const slots = await apiService.getAvailableSlots(today, serviceType);
			setAvailableSlots(slots);
		} catch (error) {
			console.error('Error loading available slots:', error);
		}
	};

	const handleBookingSubmit = async () => {
		setIsLoading(true);

		try {
			const completeData = bookingData as BookingData;
			const bookingConfirmation = await apiService.bookAppointment(
				completeData
			);
			setConfirmation(bookingConfirmation);

			if (onComplete) {
				onComplete(completeData, bookingConfirmation);
			}
		} catch (error) {
			console.error('Booking submission error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoBack = () => {
		if (currentStep > 0) {
			setCurrentStep(prev => prev - 1);
		}
	};

	const handleRestart = () => {
		setCurrentStep(0);
		setBookingData({ consent: false });
		setConfirmation(null);
		setAvailableSlots([]);
	};

	// Save progress to localStorage
	useEffect(() => {
		if (Object.keys(bookingData).length > 1) {
			localStorage.setItem(
				'booking-progress',
				JSON.stringify({
					currentStep,
					bookingData,
				})
			);
		}
	}, [currentStep, bookingData]);

	// Load progress from localStorage on mount
	useEffect(() => {
		const savedProgress = localStorage.getItem('booking-progress');
		if (savedProgress) {
			try {
				const { currentStep: savedStep, bookingData: savedData } =
					JSON.parse(savedProgress);
				setCurrentStep(savedStep);
				setBookingData(savedData);

				// Load slots if service type is already selected
				if (savedData.serviceType) {
					loadAvailableSlots(savedData.serviceType);
				}
			} catch (error) {
				console.error('Error loading booking progress:', error);
			}
		}
	}, []);

	const bookingClasses = ['booking-flow', className].filter(Boolean).join(' ');

	if (confirmation) {
		return (
			<BookingConfirmation
				confirmation={confirmation}
				bookingData={bookingData as BookingData}
				onRestart={handleRestart}
			/>
		);
	}

	return (
		<div className={bookingClasses}>
			<BookingProgressBar progress={progress} />

			<div className='booking-flow__content'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={currentStep}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
					>
						<BookingStep
							step={BOOKING_STEPS[currentStep]}
							currentValue={
								bookingData[BOOKING_STEPS[currentStep].id as keyof BookingData]
							}
							onComplete={handleStepComplete}
							onGoBack={currentStep > 0 ? handleGoBack : undefined}
							isLoading={isLoading}
							availableSlots={availableSlots}
							bookingData={bookingData}
						/>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default BookingFlow;
