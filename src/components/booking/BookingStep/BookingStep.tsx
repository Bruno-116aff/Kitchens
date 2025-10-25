import React from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import Card from '../../common/Card';
import './BookingStep.css';

interface BookingStepProps {
	step: {
		id: string;
		title: string;
		description: string;
		type: string;
	};
	currentValue: any;
	onComplete: (stepId: string, value: any) => void;
	onGoBack?: () => void;
	isLoading?: boolean;
	availableSlots?: any[];
	bookingData?: any;
}

const BookingStep: React.FC<BookingStepProps> = ({
	step,
	currentValue,
	onComplete,
	onGoBack,
	isLoading = false,
	availableSlots = [],
	bookingData = {},
}) => {
	const handleServiceSelect = (serviceType: string) => {
		onComplete(step.id, serviceType);
	};

	const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const contactData = {
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			phone: formData.get('phone') as string,
			message: formData.get('message') as string,
		};
		onComplete(step.id, contactData);
	};

	const handleDateTimeSelect = (date: string, timeSlot: string) => {
		onComplete(step.id, { date, timeSlot });
	};

	const handleConfirmationSubmit = () => {
		onComplete(step.id, true);
	};

	const renderContent = () => {
		switch (step.type) {
			case 'service-selection':
				return (
					<div className='booking-step__services'>
						<div className='booking-step__service-options'>
							<div
								className={`booking-step__service-card ${
									currentValue === 'measurement'
										? 'booking-step__service-card--selected'
										: ''
								}`}
								onClick={() => handleServiceSelect('measurement')}
							>
								<div className='booking-step__service-icon'>📏</div>
								<h3>Free Measurement</h3>
								<p>We'll visit your home to take precise measurements</p>
								<div className='booking-step__service-duration'>
									Duration: 45 minutes
								</div>
							</div>

							<div
								className={`booking-step__service-card ${
									currentValue === 'online-consultation'
										? 'booking-step__service-card--selected'
										: ''
								}`}
								onClick={() => handleServiceSelect('online-consultation')}
							>
								<div className='booking-step__service-icon'>💻</div>
								<h3>Online Consultation</h3>
								<p>Video call to discuss your kitchen project</p>
								<div className='booking-step__service-duration'>
									Duration: 30 minutes
								</div>
							</div>

							<div
								className={`booking-step__service-card ${
									currentValue === 'showroom-visit'
										? 'booking-step__service-card--selected'
										: ''
								}`}
								onClick={() => handleServiceSelect('showroom-visit')}
							>
								<div className='booking-step__service-icon'>🏪</div>
								<h3>Showroom Visit</h3>
								<p>Visit our showroom to see materials and designs</p>
								<div className='booking-step__service-duration'>
									Duration: 60 minutes
								</div>
							</div>
						</div>
					</div>
				);

			case 'contact-form':
				return (
					<form
						onSubmit={handleContactSubmit}
						className='booking-step__contact-form'
					>
						<div className='booking-step__form-group'>
							<Input
								name='name'
								label='Full Name'
								placeholder='Enter your full name'
								required
								disabled={isLoading}
							/>
						</div>

						<div className='booking-step__form-group'>
							<Input
								name='email'
								type='email'
								label='Email Address'
								placeholder='Enter your email'
								required
								disabled={isLoading}
							/>
						</div>

						<div className='booking-step__form-group'>
							<Input
								name='phone'
								type='tel'
								label='Phone Number'
								placeholder='Enter your phone number'
								required
								disabled={isLoading}
							/>
						</div>

						<div className='booking-step__form-group'>
							<Input
								name='message'
								type='textarea'
								label='Additional Notes (Optional)'
								placeholder='Tell us about your project or any specific requirements'
								disabled={isLoading}
							/>
						</div>

						<Button
							type='submit'
							variant='primary'
							size='lg'
							disabled={isLoading}
							className='booking-step__submit-button'
						>
							Continue to Date Selection
						</Button>
					</form>
				);

			case 'datetime-picker':
				return (
					<div className='booking-step__datetime'>
						<p>Available time slots:</p>
						{availableSlots.length > 0 ? (
							<div className='booking-step__time-slots'>
								{availableSlots.map((slot, index) => (
									<button
										key={index}
										className='booking-step__time-slot'
										onClick={() =>
											handleDateTimeSelect('2024-01-15', slot.time)
										}
									>
										{slot.time}
									</button>
								))}
							</div>
						) : (
							<p>Loading available slots...</p>
						)}
						<Button
							variant='primary'
							size='lg'
							onClick={() => handleDateTimeSelect('2024-01-15', '10:00')}
							disabled={isLoading}
							className='booking-step__continue-button'
						>
							Continue to Confirmation
						</Button>
					</div>
				);

			case 'confirmation':
				return (
					<div className='booking-step__confirmation'>
						<Card className='booking-step__summary-card'>
							<h3>Booking Summary</h3>
							<div className='booking-step__summary-item'>
								<strong>Service:</strong> {bookingData.serviceType}
							</div>
							<div className='booking-step__summary-item'>
								<strong>Name:</strong> {bookingData.contact?.name}
							</div>
							<div className='booking-step__summary-item'>
								<strong>Email:</strong> {bookingData.contact?.email}
							</div>
							<div className='booking-step__summary-item'>
								<strong>Phone:</strong> {bookingData.contact?.phone}
							</div>
							<div className='booking-step__summary-item'>
								<strong>Date:</strong> {bookingData.datetime?.date || 'TBD'}
							</div>
							<div className='booking-step__summary-item'>
								<strong>Time:</strong> {bookingData.datetime?.timeSlot || 'TBD'}
							</div>
						</Card>

						<div className='booking-step__consent'>
							<label className='booking-step__checkbox-label'>
								<input
									type='checkbox'
									checked={currentValue || false}
									onChange={e => onComplete('consent', e.target.checked)}
									disabled={isLoading}
								/>
								<span className='booking-step__checkbox-text'>
									I agree to the terms and conditions and privacy policy
								</span>
							</label>
						</div>

						<Button
							variant='primary'
							size='lg'
							onClick={handleConfirmationSubmit}
							disabled={!currentValue || isLoading}
							className='booking-step__confirm-button'
						>
							Confirm Booking
						</Button>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className='booking-step'>
			<div className='booking-step__header'>
				<h2 className='booking-step__title'>{step.title}</h2>
				<p className='booking-step__description'>{step.description}</p>
				{onGoBack && (
					<button
						className='booking-step__back-button'
						onClick={onGoBack}
						disabled={isLoading}
					>
						<svg
							width='20'
							height='20'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M19 12H5M12 19L5 12L12 5'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						Back
					</button>
				)}
			</div>

			<div className='booking-step__content'>{renderContent()}</div>

			{isLoading && (
				<div className='booking-step__loading'>
					<div className='booking-step__spinner' />
					<p>Processing your booking...</p>
				</div>
			)}
		</div>
	);
};

export default BookingStep;
