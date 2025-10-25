import React from 'react';
import './Select.css';

export interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface SelectProps
	extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
	label?: string;
	error?: string;
	helperText?: string;
	required?: boolean;
	options: SelectOption[];
	placeholder?: string;
	size?: 'sm' | 'md' | 'lg';
}

const Select: React.FC<SelectProps> = ({
	label,
	error,
	helperText,
	required = false,
	options,
	placeholder,
	size = 'md',
	className = '',
	id,
	...props
}) => {
	const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
	const hasError = !!error;

	const selectClasses = [
		'select',
		hasError ? 'select--error' : '',
		props.disabled ? 'select--disabled' : '',
		`select--${size}`,
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className='select-group'>
			{label && (
				<label htmlFor={selectId} className='select-label'>
					{label}
					{required && <span className='select-required'>*</span>}
				</label>
			)}
			<div className='select-wrapper'>
				<select id={selectId} className={selectClasses} {...props}>
					{placeholder && (
						<option value='' disabled>
							{placeholder}
						</option>
					)}
					{options.map(option => (
						<option
							key={option.value}
							value={option.value}
							disabled={option.disabled}
						>
							{option.label}
						</option>
					))}
				</select>
				<div className='select-arrow'>
					<svg
						width='12'
						height='8'
						viewBox='0 0 12 8'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M1 1.5L6 6.5L11 1.5'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</div>
			</div>
			{error && (
				<div className='select-error' role='alert'>
					{error}
				</div>
			)}
			{helperText && !error && (
				<div className='select-helper'>{helperText}</div>
			)}
		</div>
	);
};

export default Select;
