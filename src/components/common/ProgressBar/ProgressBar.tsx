import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
	progress: number; // 0-100
	size?: 'sm' | 'md' | 'lg';
	variant?: 'default' | 'success' | 'warning' | 'error';
	showPercentage?: boolean;
	animated?: boolean;
	className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	progress,
	size = 'md',
	variant = 'default',
	showPercentage = false,
	animated = false,
	className = '',
}) => {
	const clampedProgress = Math.min(Math.max(progress, 0), 100);

	const progressClasses = [
		'progress-bar',
		`progress-bar--${size}`,
		`progress-bar--${variant}`,
		animated && 'progress-bar--animated',
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={progressClasses}>
			<div className='progress-bar__track'>
				<div
					className='progress-bar__fill'
					style={{ width: `${clampedProgress}%` }}
				/>
			</div>
			{showPercentage && (
				<span className='progress-bar__percentage'>
					{Math.round(clampedProgress)}%
				</span>
			)}
		</div>
	);
};

export default ProgressBar;
