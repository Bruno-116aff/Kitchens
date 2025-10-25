import React from 'react';
import type { ButtonProps } from '../../types';
import './Button.css';

const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	size = 'md',
	children,
	onClick,
	type = 'button',
	disabled = false,
	className = '',
	...props
}) => {
	const baseClasses = 'btn';
	const variantClasses = `btn--${variant}`;
	const sizeClasses = `btn--${size}`;
	const disabledClasses = disabled ? 'btn--disabled' : '';

	const classes = [
		baseClasses,
		variantClasses,
		sizeClasses,
		disabledClasses,
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<button
			type={type}
			className={classes}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
