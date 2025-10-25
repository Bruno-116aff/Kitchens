import React from 'react';
import MaterialConfigurator from '../components/services/MaterialConfigurator/MaterialConfigurator';
import PackageComparison from '../components/services/PackageComparison/PackageComparison';
import type { MaterialConfig, ServicePackage } from '../types';
import { servicePackages, kitchenTypes } from '../data/services';
import './ServicesPage.css';

const ServicesPage: React.FC = () => {
	const handleConfigChange = (config: MaterialConfig) => {
		console.log('Config changed:', config);
	};

	const handlePackageSelect = (pkg: ServicePackage) => {
		console.log('Package selected:', pkg);
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<div className='services-page'>
			<div className='container'>
				<div className='services-page__header'>
					<h1>Kitchen Services</h1>
					<p>
						Comprehensive kitchen design, manufacturing, and installation
						services
					</p>
				</div>

				<div className='services-page__kitchen-types'>
					<h2>Kitchen Types</h2>
					<div className='services-page__types-grid'>
						{kitchenTypes.map(type => (
							<div key={type.id} className='services-page__type-card'>
								<div className='services-page__type-image'>
									<img src={type.image} alt={type.name} />
									{type.popular && (
										<div className='services-page__popular-badge'>
											⭐ Popular
										</div>
									)}
								</div>
								<div className='services-page__type-content'>
									<h3>{type.name}</h3>
									<p>{type.description}</p>
									<div className='services-page__type-price'>
										{formatCurrency(type.priceRange.min)} -{' '}
										{formatCurrency(type.priceRange.max)}
									</div>
									<div className='services-page__type-features'>
										{type.features.slice(0, 3).map((feature, index) => (
											<span key={index} className='services-page__feature-tag'>
												{feature}
											</span>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='services-page__configurator'>
					<h2>Material Configurator</h2>
					<p>Choose your materials and get instant pricing</p>
					<MaterialConfigurator onConfigChange={handleConfigChange} />
				</div>

				<div className='services-page__packages'>
					<h2>Service Packages</h2>
					<p>
						Compare our service packages and choose the one that fits your needs
					</p>
					<PackageComparison
						packages={servicePackages}
						onSelectPackage={handlePackageSelect}
					/>
				</div>

				<div className='services-page__process'>
					<h2>Our Process</h2>
					<div className='services-page__process-steps'>
						<div className='services-page__step'>
							<div className='services-page__step-number'>1</div>
							<h3>Consultation</h3>
							<p>
								Free design consultation to understand your needs and
								preferences
							</p>
						</div>
						<div className='services-page__step'>
							<div className='services-page__step-number'>2</div>
							<h3>Design</h3>
							<p>
								Custom 3D design with material selection and layout optimization
							</p>
						</div>
						<div className='services-page__step'>
							<div className='services-page__step-number'>3</div>
							<h3>Manufacturing</h3>
							<p>
								Professional manufacturing in our workshop with quality control
							</p>
						</div>
						<div className='services-page__step'>
							<div className='services-page__step-number'>4</div>
							<h3>Installation</h3>
							<p>Expert installation by our certified technicians</p>
						</div>
					</div>
				</div>

				<div className='services-page__cta'>
					<h2>Ready to Start Your Kitchen Project?</h2>
					<p>Get a free consultation and quote for your dream kitchen</p>
					<div className='services-page__cta-buttons'>
						<a
							href='/calculator'
							className='services-page__cta-btn services-page__cta-btn--primary'
						>
							Get Free Quote
						</a>
						<a href='/contact' className='services-page__cta-btn'>
							Contact Us
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServicesPage;
