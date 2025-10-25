import React from 'react';
import './Badge.css';

interface BadgeProps {
	children: React.ReactNode;
	variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

const Badge: React.FC<BadgeProps> = ({
	children,
	variant = 'default',
	size = 'md',
	className = '',
}) => {
	const badgeClasses = [
		'badge',
		`badge--${variant}`,
		`badge--${size}`,
		className,
	]
		.filter(Boolean)
		.join(' ');

	return <span className={badgeClasses}>{children}</span>;
};

export default Badge;
