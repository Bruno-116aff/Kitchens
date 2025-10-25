import React from 'react';
import './Input.css';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	helperText?: string;
	required?: boolean;
}

const Input: React.FC<InputProps> = ({
	label,
	error,
	helperText,
	required = false,
	className = '',
	id,
	...props
}) => {
	const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
	const hasError = !!error;

	const inputClasses = [
		'input',
		hasError ? 'input--error' : '',
		props.disabled ? 'input--disabled' : '',
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className='input-group'>
			{label && (
				<label htmlFor={inputId} className='input-label'>
					{label}
					{required && <span className='input-required'>*</span>}
				</label>
			)}
			<input id={inputId} className={inputClasses} {...props} />
			{error && (
				<div className='input-error' role='alert'>
					{error}
				</div>
			)}
			{helperText && !error && <div className='input-helper'>{helperText}</div>}
		</div>
	);
};

export default Input;

