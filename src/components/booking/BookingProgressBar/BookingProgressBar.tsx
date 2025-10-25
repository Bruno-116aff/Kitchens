import React from 'react';
import ProgressBar from '../../common/ProgressBar/ProgressBar';
import './BookingProgressBar.css';

interface BookingProgressBarProps {
	progress: number; // 0-100
	className?: string;
}

const BookingProgressBar: React.FC<BookingProgressBarProps> = ({
	progress,
	className = '',
}) => {
	const progressClasses = ['booking-progress-bar', className]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={progressClasses}>
			<div className='booking-progress-bar__header'>
				<h3 className='booking-progress-bar__title'>Book Your Appointment</h3>
				<span className='booking-progress-bar__step'>
					Step {Math.ceil((progress / 100) * 4)} of 4
				</span>
			</div>

			<div className='booking-progress-bar__progress'>
				<ProgressBar
					progress={progress}
					variant='success'
					animated
					showPercentage
				/>
			</div>

			<div className='booking-progress-bar__description'>
				<p>Schedule your free consultation in just a few steps</p>
			</div>
		</div>
	);
};

export default BookingProgressBar;
