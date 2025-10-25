import React from 'react';
import './Textarea.css';

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
	helperText?: string;
	required?: boolean;
	resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea: React.FC<TextareaProps> = ({
	label,
	error,
	helperText,
	required = false,
	resize = 'vertical',
	className = '',
	id,
	...props
}) => {
	const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
	const hasError = !!error;

	const textareaClasses = [
		'textarea',
		hasError ? 'textarea--error' : '',
		props.disabled ? 'textarea--disabled' : '',
		`textarea--${resize}`,
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className='textarea-group'>
			{label && (
				<label htmlFor={inputId} className='textarea-label'>
					{label}
					{required && <span className='textarea-required'>*</span>}
				</label>
			)}
			<textarea id={inputId} className={textareaClasses} {...props} />
			{error && (
				<div className='textarea-error' role='alert'>
					{error}
				</div>
			)}
			{helperText && !error && (
				<div className='textarea-helper'>{helperText}</div>
			)}
		</div>
	);
};

export default Textarea;

