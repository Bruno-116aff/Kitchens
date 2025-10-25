import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './TermsPage.css';

const TermsPage: React.FC = () => {
	const { t } = useTranslation('terms');

	return (
		<div className='terms-page'>
			{/* Hero Section */}
			<section className='terms-hero'>
				<div className='container'>
					<motion.div
						className='terms-hero__content'
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h1 className='terms-hero__title'>{t('hero.title')}</h1>
						<p className='terms-hero__subtitle'>{t('hero.subtitle')}</p>
						<p className='terms-hero__lastUpdated'>{t('hero.lastUpdated')}</p>
					</motion.div>
				</div>
			</section>

			{/* Content Section */}
			<section className='terms-content'>
				<div className='container'>
					<motion.div
						className='terms-content__wrapper'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<div className='terms-content__main'>
							{/* Introduction */}
							<section className='terms-section'>
								<h2 className='terms-section__title'>
									{t('introduction.title')}
								</h2>
								<div className='terms-section__content'>
									<p>{t('introduction.content')}</p>
								</div>
							</section>

							{/* Acceptance of Terms */}
							<section className='terms-section'>
								<h2 className='terms-section__title'>
									{t('acceptanceOfTerms.title')}
								</h2>
								<div className='terms-section__content'>
									<p>{t('acceptanceOfTerms.content')}</p>
								</div>
							</section>

							{/* Services Description */}
							<section className='terms-section'>
								<h2 className='terms-section__title'>
									{t('servicesDescription.title')}
								</h2>
								<div className='terms-section__content'>
									<p>{t('servicesDescription.content')}</p>
									<ul>
										<li>{t('servicesDescription.items.0')}</li>
										<li>{t('servicesDescription.items.1')}</li>
										<li>{t('servicesDescription.items.2')}</li>
										<li>{t('servicesDescription.items.3')}</li>
										<li>{t('servicesDescription.items.4')}</li>
									</ul>
								</div>
							</section>

							{/* Orders and Pricing */}
							<section className='terms-section'>
								<h2 className='terms-section__title'>
									{t('ordersAndPricing.title')}
								</h2>
								<div className='terms-section__content'>
									<h3>{t('ordersAndPricing.orderProcess.title')}</h3>
									<p>{t('ordersAndPricing.orderProcess.content')}</p>
									<ul>
										<li>{t('ordersAndPricing.orderProcess.items.0')}</li>
										<li>{t('ordersAndPricing.orderProcess.items.1')}</li>
										<li>{t('ordersAndPricing.orderProcess.items.2')}</li>
										<li>{t('ordersAndPricing.orderProcess.items.3')}</li>
									</ul>

									<h3>{t('ordersAndPricing.pricing.title')}</h3>
									<p>{t('ordersAndPricing.pricing.content')}</p>
									<ul>
										<li>{t('ordersAndPricing.pricing.items.0')}</li>
										<li>{t('ordersAndPricing.pricing.items.1')}</li>
										<li>{t('ordersAndPricing.pricing.items.2')}</li>
									</ul>
								</div>
							</section>

							{/* Payment Terms */}
							<section className='terms-section'>
								<h2 className='terms-section__title'>
									{t('paymentTerms.title')}
								</h2>
								<div className='terms-section__content'>
									<p>{t('paymentTerms.content')}</p>
									<h3>{t('paymentTerms.paymentSchedule.title')}</h3>
									<ul>
										<li>{t('paymentTerms.paymentSchedule.items.0')}</li>
										<li>{t('paymentTerms.paymentSchedule.items.1')}</li>
										<li>{t('paymentTerms.paymentSchedule.items.2')}</li>
									</ul>

									<h3>{t('paymentTerms.latePayments.title')}</h3>
									<p>{t('paymentTerms.latePayments.content')}</p>
								</div>
							</section>

							{/* Delivery and Installation */}
							<section className='terms-section'>
								<h2 className='terms-section__title'>
									{t('deliveryAndInstallation.title')}
								</h2>
								<div className='terms-section__content'>
									<h3>{t('deliveryAndInstallation.delivery.title')}</h3>
									<p>{t('deliveryAndInstallation.delivery.content')}</p>
									<ul>
										<li>{t('deliveryAndInstallation.delivery.items.0')}</li>
										<li>{t('deliveryAndInstallation.delivery.items.1')}</li>
										<li>{t('deliveryAndInstallation.delivery.items.2')}</li>
									</ul>

									<h3>{t('deliveryAndInstallation.installation.title')}</h3>
									<p>{t('deliveryAndInstallation.installation.content')}</p>
									<ul>
										<li>{t('deliveryAndInstallation.installation.items.0')}</li>
										<li>{t('deliveryAndInstallation.installation.items.1')}</li>
										<li>{t('deliveryAndInstallation.installation.items.2')}</li>
									</ul>
								</div>
							</section>

							{/* Warranties */}
							<section className='terms-section'>
								<h2 className='terms-section__title'>
									{t('warranties.title')}
								</h2>
								<div className='terms-section__content'>
									<p>{t('warranties.content')}</p>
									<h3>{t('warranties.materials.title')}</h3>
									<p>{t('warranties.materials.content')}</p>

									<h3>{t('warranties.workmanship.title')}</h3>
									<p>{t('warranties.workmanship.content')}</p>

									<h3>{t('warranties.exclusions.title')}</h3>
									<p>{t('warranties.exclusions.content')}</p>
									<ul>
										<li>{t('warranties.exclusions.items.0')}</li>
										<li>{t('warranties.exclusions.items.1')}</li>
										<li>{t('warranties.exclusions.items.2')}</li>
										<li>{t('warranties.exclusions.items.3')}</li>
									</ul>
								</div>
							</section>

							{/* Cancellation and Refunds */}
							<section className='terms-section'>
								<h2 className='terms-section__title'>
									{t('cancellationAndRefunds.title')}
								</h2>
								<div className='terms-section__content'>
									<h3>{t('cancellationAndRefunds.cancellation.title')}</h3>
									<p>{t('cancellationAndRefunds.cancellation.content')}</p>
									<ul>
										<li>{t('cancellationAndRefunds.cancellation.items.0')}</li>
										<li>{t('cancellationAndRefunds.cancellation.items.1')}</li>
										<li>{t('cancellationAndRefunds.cancellation.items.2')}</li>
									</ul>

									<h3>{t('cancellationAndRefunds.refunds.title')}</h3>
									<p>{t('cancellationAndRefunds.refunds.content')}</p>
								</div>
							</section>

							{/* Limitation of Liability */}
							<section className='terms-section'>
								<h2 className='terms-section__title'>
									{t('limitationOfLiability.title')}
								</h2>
								<div className='terms-section__content'>
									<p>{t('limitationOfLiability.content')}</p>
									<ul>
										<li>{t('limitationOfLiability.items.0')}</li>
										<li>{t('limitationOfLiability.items.1')}</li>
										<li>{t('limitationOfLiability.items.2')}</li>
									</ul>
								</div>
							</section>

							{/* Intellectual Property */}
							<section className='terms-section'>
								<h2 className='terms-section__title'>
									{t('intellectualProperty.title')}
								</h2>
								<div className='terms-section__content'>
									<p>{t('intellectualProperty.content')}</p>
									<ul>
										<li>{t('intellectualProperty.items.0')}</li>
										<li>{t('intellectualProperty.items.1')}</li>
										<li>{t('intellectualProperty.items.2')}</li>
									</ul>
								</div>
							</section>

							{/* Governing Law */}
							<section className='terms-section'>
								<h2 className='terms-section__title'>
									{t('governingLaw.title')}
								</h2>
								<div className='terms-section__content'>
									<p>{t('governingLaw.content')}</p>
								</div>
							</section>

							{/* Changes to Terms */}
							<section className='terms-section'>
								<h2 className='terms-section__title'>
									{t('changesToTerms.title')}
								</h2>
								<div className='terms-section__content'>
									<p>{t('changesToTerms.content')}</p>
								</div>
							</section>

							{/* Contact Information */}
							<section className='terms-section'>
								<h2 className='terms-section__title'>
									{t('contactInformation.title')}
								</h2>
								<div className='terms-section__content'>
									<p>{t('contactInformation.content')}</p>
									<div className='terms-contact'>
										<p>
											<strong>{t('contactInformation.email')}</strong>
										</p>
										<p>
											<strong>{t('contactInformation.phone')}</strong>
										</p>
										<p>
											<strong>{t('contactInformation.address')}</strong>
										</p>
									</div>
								</div>
							</section>
						</div>

						{/* Sidebar */}
						<div className='terms-content__sidebar'>
							<div className='terms-nav'>
								<h3>{t('navigation.title')}</h3>
								<ul>
									<li>
										<a href='#introduction'>{t('navigation.introduction')}</a>
									</li>
									<li>
										<a href='#acceptance-of-terms'>
											{t('navigation.acceptanceOfTerms')}
										</a>
									</li>
									<li>
										<a href='#services-description'>
											{t('navigation.servicesDescription')}
										</a>
									</li>
									<li>
										<a href='#orders-and-pricing'>
											{t('navigation.ordersAndPricing')}
										</a>
									</li>
									<li>
										<a href='#payment-terms'>{t('navigation.paymentTerms')}</a>
									</li>
									<li>
										<a href='#delivery-and-installation'>
											{t('navigation.deliveryAndInstallation')}
										</a>
									</li>
									<li>
										<a href='#warranties'>{t('navigation.warranties')}</a>
									</li>
									<li>
										<a href='#cancellation-and-refunds'>
											{t('navigation.cancellationAndRefunds')}
										</a>
									</li>
									<li>
										<a href='#limitation-of-liability'>
											{t('navigation.limitationOfLiability')}
										</a>
									</li>
									<li>
										<a href='#intellectual-property'>
											{t('navigation.intellectualProperty')}
										</a>
									</li>
									<li>
										<a href='#governing-law'>{t('navigation.governingLaw')}</a>
									</li>
									<li>
										<a href='#changes-to-terms'>
											{t('navigation.changesToTerms')}
										</a>
									</li>
									<li>
										<a href='#contact-information'>
											{t('navigation.contactInformation')}
										</a>
									</li>
								</ul>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default TermsPage;
