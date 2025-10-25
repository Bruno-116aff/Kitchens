import React from 'react';
import BookingFlow from '../components/booking/BookingFlow/BookingFlow';
import './BookingPage.css';

const BookingPage: React.FC = () => {
	const handleBookingComplete = (data: any, confirmation: any) => {
		console.log('Booking completed:', { data, confirmation });
		// Here you could track analytics, redirect to thank you page, etc.
	};

	return (
		<div className='booking-page'>
			<div className='container'>
				<div className='booking-page__header'>
					<h1>Book Your Appointment</h1>
					<p>Schedule your free consultation or measurement visit</p>
				</div>

				<div className='booking-page__content'>
					<BookingFlow onComplete={handleBookingComplete} />
				</div>
			</div>
		</div>
	);
};

export default BookingPage;
