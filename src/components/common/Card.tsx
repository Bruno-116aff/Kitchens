import React from 'react';
import type { CardProps } from '../../types';
import './Card.css';

const Card: React.FC<CardProps> = ({
	children,
	className = '',
	hover = false,
	...props
}) => {
	const baseClasses = 'card';
	const hoverClasses = hover ? 'card--hover' : '';

	const classes = [baseClasses, hoverClasses, className]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
};

export default Card;
