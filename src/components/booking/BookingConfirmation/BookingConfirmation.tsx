import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../common/Button';
import Card from '../../common/Card';
import Badge from '../../common/Badge/Badge';
import './BookingConfirmation.css';

interface BookingConfirmationProps {
	confirmation: {
		bookingId: string;
		status: string;
		date: string;
		time: string;
		serviceType: string;
		confirmationCode: string;
	};
	bookingData: any;
	onRestart: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
	confirmation,
	bookingData,
	onRestart,
}) => {
	const handleDownloadCalendar = () => {
		// Create calendar event data
		const eventData = {
			title: `Kitchen Consultation - ${bookingData.serviceType}`,
			start: new Date(`${confirmation.date}T${confirmation.time}`),
			end: new Date(`${confirmation.date}T${confirmation.time}`),
			description: `Kitchen consultation appointment with ${bookingData.contact?.name}`,
			location: 'Custom Kitchens Cyprus',
		};

		// Create ICS file content
		const icsContent = [
			'BEGIN:VCALENDAR',
			'VERSION:2.0',
			'PRODID:-//Custom Kitchens//Booking System//EN',
			'BEGIN:VEVENT',
			`UID:${confirmation.bookingId}@customkitchens.cy`,
			`DTSTART:${
				eventData.start.toISOString().replace(/[-:]/g, '').split('.')[0]
			}Z`,
			`DTEND:${
				eventData.end.toISOString().replace(/[-:]/g, '').split('.')[0]
			}Z`,
			`SUMMARY:${eventData.title}`,
			`DESCRIPTION:${eventData.description}`,
			`LOCATION:${eventData.location}`,
			'STATUS:CONFIRMED',
			'END:VEVENT',
			'END:VCALENDAR',
		].join('\r\n');

		// Download file
		const blob = new Blob([icsContent], { type: 'text/calendar' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `kitchen-consultation-${confirmation.bookingId}.ics`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	const handleContactUs = () => {
		window.location.href = '/contact';
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'confirmed':
				return 'success';
			case 'pending':
				return 'warning';
			case 'cancelled':
				return 'error';
			default:
				return 'info';
		}
	};

	return (
		<motion.div
			className='booking-confirmation'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className='booking-confirmation__header'>
				<div className='booking-confirmation__icon'>✅</div>
				<h1>Appointment Confirmed!</h1>
				<p>Your consultation has been successfully booked</p>
			</div>

			<div className='booking-confirmation__details'>
				<Card className='booking-confirmation__details-card'>
					<div className='booking-confirmation__details-header'>
						<h2>Appointment Details</h2>
						<Badge variant={getStatusColor(confirmation.status)}>
							{confirmation.status.toUpperCase()}
						</Badge>
					</div>

					<div className='booking-confirmation__details-content'>
						<div className='booking-confirmation__detail-item'>
							<strong>Booking ID:</strong>
							<span>{confirmation.bookingId}</span>
						</div>
						<div className='booking-confirmation__detail-item'>
							<strong>Confirmation Code:</strong>
							<span className='booking-confirmation__code'>
								{confirmation.confirmationCode}
							</span>
						</div>
						<div className='booking-confirmation__detail-item'>
							<strong>Service Type:</strong>
							<span>{confirmation.serviceType}</span>
						</div>
						<div className='booking-confirmation__detail-item'>
							<strong>Date:</strong>
							<span>{confirmation.date}</span>
						</div>
						<div className='booking-confirmation__detail-item'>
							<strong>Time:</strong>
							<span>{confirmation.time}</span>
						</div>
						<div className='booking-confirmation__detail-item'>
							<strong>Contact:</strong>
							<span>{bookingData.contact?.name}</span>
						</div>
						<div className='booking-confirmation__detail-item'>
							<strong>Email:</strong>
							<span>{bookingData.contact?.email}</span>
						</div>
						<div className='booking-confirmation__detail-item'>
							<strong>Phone:</strong>
							<span>{bookingData.contact?.phone}</span>
						</div>
					</div>
				</Card>
			</div>

			<div className='booking-confirmation__actions'>
				<Button
					variant='primary'
					size='lg'
					onClick={handleDownloadCalendar}
					className='booking-confirmation__calendar-button'
				>
					📅 Add to Calendar
				</Button>

				<Button variant='secondary' size='lg' onClick={handleContactUs}>
					📞 Contact Us
				</Button>

				<Button
					variant='ghost'
					onClick={onRestart}
					className='booking-confirmation__restart'
				>
					Book Another Appointment
				</Button>
			</div>

			<div className='booking-confirmation__next-steps'>
				<h3>What's Next?</h3>
				<ul>
					<li>You will receive a confirmation email shortly</li>
					<li>Our team will contact you 24 hours before your appointment</li>
					<li>Please prepare any questions or inspiration photos</li>
					<li>
						If you need to reschedule, contact us at least 24 hours in advance
					</li>
				</ul>
			</div>

			<div className='booking-confirmation__disclaimer'>
				<p>
					<strong>Important:</strong> Please save this confirmation code for
					your records. You may need it for future reference or to make changes
					to your appointment.
				</p>
			</div>
		</motion.div>
	);
};

export default BookingConfirmation;
