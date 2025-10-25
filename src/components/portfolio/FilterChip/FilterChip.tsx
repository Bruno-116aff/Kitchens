import React from 'react';
import './FilterChip.css';

interface FilterChipProps {
	label: string;
	onRemove: () => void;
	className?: string;
}

const FilterChip: React.FC<FilterChipProps> = ({
	label,
	onRemove,
	className = '',
}) => {
	const chipClasses = ['filter-chip', className].filter(Boolean).join(' ');

	return (
		<div className={chipClasses}>
			<span className='filter-chip__label'>{label}</span>
			<button
				className='filter-chip__remove'
				onClick={onRemove}
				aria-label={`Remove ${label} filter`}
			>
				<svg
					width='12'
					height='12'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M18 6L6 18M6 6L18 18'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
		</div>
	);
};

export default FilterChip;
