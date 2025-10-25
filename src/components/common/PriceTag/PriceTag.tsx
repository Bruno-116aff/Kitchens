import React from 'react';
import './PriceTag.css';

interface PriceTagProps {
	price: number;
	currency?: string;
	period?: string;
	size?: 'sm' | 'md' | 'lg';
	variant?: 'default' | 'sale' | 'highlight';
	className?: string;
}

const PriceTag: React.FC<PriceTagProps> = ({
	price,
	currency = '€',
	period,
	size = 'md',
	variant = 'default',
	className = '',
}) => {
	const formatPrice = (price: number): string => {
		return new Intl.NumberFormat('en-EU', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(price);
	};

	const priceClasses = [
		'price-tag',
		`price-tag--${size}`,
		`price-tag--${variant}`,
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={priceClasses}>
			<span className='price-tag__currency'>{currency}</span>
			<span className='price-tag__amount'>{formatPrice(price)}</span>
			{period && <span className='price-tag__period'>{period}</span>}
		</div>
	);
};

export default PriceTag;
