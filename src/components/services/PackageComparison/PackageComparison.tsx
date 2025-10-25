import React from 'react';
import type { ServicePackage } from '../../../types';
import './PackageComparison.css';

interface PackageComparisonProps {
	packages: ServicePackage[];
	onSelectPackage?: (pkg: ServicePackage) => void;
}

const PackageComparison: React.FC<PackageComparisonProps> = ({
	packages,
	onSelectPackage,
}) => {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	const handleSelectPackage = (pkg: ServicePackage) => {
		if (onSelectPackage) {
			onSelectPackage(pkg);
		}
	};

	return (
		<div className='package-comparison'>
			<div className='package-comparison__header'>
				<h3>Kitchen Packages Comparison</h3>
				<p>Choose the package that best fits your needs and budget</p>
			</div>

			<div className='package-comparison__table-wrapper'>
				<table className='package-comparison__table'>
					<thead>
						<tr>
							<th className='package-comparison__feature-column'>Features</th>
							{packages.map(pkg => (
								<th key={pkg.id} className='package-comparison__package-column'>
									<div className='package-comparison__package-header'>
										<h4 className='package-comparison__package-name'>
											{pkg.name}
										</h4>
										<div className='package-comparison__package-price'>
											<span className='package-comparison__price-amount'>
												{formatCurrency(pkg.price)}
											</span>
											{pkg.originalPrice && pkg.originalPrice > pkg.price && (
												<span className='package-comparison__price-original'>
													{formatCurrency(pkg.originalPrice)}
												</span>
											)}
										</div>
										<p className='package-comparison__package-description'>
											{pkg.description}
										</p>
										{pkg.popular && (
											<div className='package-comparison__popular-badge'>
												⭐ Most Popular
											</div>
										)}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{getComparisonFeatures().map((feature, index) => (
							<tr key={index} className='package-comparison__feature-row'>
								<td className='package-comparison__feature-name'>
									{feature.name}
								</td>
								{packages.map(pkg => (
									<td key={pkg.id} className='package-comparison__feature-cell'>
										{getFeatureValue(pkg, feature.key)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='package-comparison__actions'>
				{packages.map(pkg => (
					<button
						key={pkg.id}
						className={`package-comparison__select-btn ${
							pkg.popular ? 'package-comparison__select-btn--popular' : ''
						}`}
						onClick={() => handleSelectPackage(pkg)}
					>
						Select {pkg.name}
					</button>
				))}
			</div>
		</div>
	);
};

// Helper functions for comparison features
const getComparisonFeatures = () => [
	{ name: 'Kitchen Type', key: 'kitchenType' },
	{ name: 'Facade Material', key: 'facadeMaterial' },
	{ name: 'Countertop', key: 'countertop' },
	{ name: 'Hardware', key: 'hardware' },
	{ name: 'Appliances', key: 'appliances' },
	{ name: 'Installation', key: 'installation' },
	{ name: 'Warranty', key: 'warranty' },
	{ name: 'Design Consultation', key: 'designConsultation' },
	{ name: 'Project Management', key: 'projectManagement' },
	{ name: 'Delivery & Installation', key: 'deliveryInstallation' },
];

const getFeatureValue = (pkg: ServicePackage, featureKey: string) => {
	const feature = pkg.features.find(f => f.key === featureKey);

	if (!feature) {
		return (
			<span className='package-comparison__not-included'>Not included</span>
		);
	}

	if (feature.type === 'boolean') {
		return feature.value ? (
			<span className='package-comparison__included'>✓</span>
		) : (
			<span className='package-comparison__not-included'>✗</span>
		);
	}

	return (
		<span className='package-comparison__feature-value'>{feature.value}</span>
	);
};

export default PackageComparison;
