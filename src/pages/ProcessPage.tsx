import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';
import { images } from '../data/images';
import './ProcessPage.css';
import OptimizedImage from '../components/common/OptimizedImage/OptimizedImage';
import Stepper from '../components/common/Stepper/Stepper';

const ProcessPage: React.FC = () => {
	const { t } = useTranslation('process');
	const [activeStep, setActiveStep] = useState(0);

	const processSteps = [
		{
			id: 'consultation',
			title: t('steps.consultation.title'),
			description: t('steps.consultation.description'),
			duration: t('steps.consultation.duration'),
			image: images.process.consultation,
			details: [
				t('steps.consultation.details.0'),
				t('steps.consultation.details.1'),
				t('steps.consultation.details.2'),
				t('steps.consultation.details.3'),
			],
			guarantees: [
				t('steps.consultation.guarantees.0'),
				t('steps.consultation.guarantees.1'),
			],
		},
		{
			id: 'measurement',
			title: t('steps.measurement.title'),
			description: t('steps.measurement.description'),
			duration: t('steps.measurement.duration'),
			image: images.process.measurement,
			details: [
				t('steps.measurement.details.0'),
				t('steps.measurement.details.1'),
				t('steps.measurement.details.2'),
				t('steps.measurement.details.3'),
			],
			guarantees: [
				t('steps.measurement.guarantees.0'),
				t('steps.measurement.guarantees.1'),
			],
		},
		{
			id: 'design',
			title: t('steps.design.title'),
			description: t('steps.design.description'),
			duration: t('steps.design.duration'),
			image: images.process.design,
			details: [
				t('steps.design.details.0'),
				t('steps.design.details.1'),
				t('steps.design.details.2'),
				t('steps.design.details.3'),
			],
			guarantees: [
				t('steps.design.guarantees.0'),
				t('steps.design.guarantees.1'),
			],
		},
		{
			id: 'production',
			title: t('steps.production.title'),
			description: t('steps.production.description'),
			duration: t('steps.production.duration'),
			image: images.process.production,
			details: [
				t('steps.production.details.0'),
				t('steps.production.details.1'),
				t('steps.production.details.2'),
				t('steps.production.details.3'),
			],
			guarantees: [
				t('steps.production.guarantees.0'),
				t('steps.production.guarantees.1'),
			],
		},
		{
			id: 'delivery',
			title: t('steps.delivery.title'),
			description: t('steps.delivery.description'),
			duration: t('steps.delivery.duration'),
			image: images.process.delivery,
			details: [
				t('steps.delivery.details.0'),
				t('steps.delivery.details.1'),
				t('steps.delivery.details.2'),
				t('steps.delivery.details.3'),
			],
			guarantees: [
				t('steps.delivery.guarantees.0'),
				t('steps.delivery.guarantees.1'),
			],
		},
		{
			id: 'installation',
			title: t('steps.installation.title'),
			description: t('steps.installation.description'),
			duration: t('steps.installation.duration'),
			image: images.process.installation,
			details: [
				t('steps.installation.details.0'),
				t('steps.installation.details.1'),
				t('steps.installation.details.2'),
				t('steps.installation.details.3'),
			],
			guarantees: [
				t('steps.installation.guarantees.0'),
				t('steps.installation.guarantees.1'),
			],
		},
	];

	const timeline = [
		{
			week: 'Week 1',
			title: t('timeline.week1.title'),
			description: t('timeline.week1.description'),
		},
		{
			week: 'Week 2-3',
			title: t('timeline.week2.title'),
			description: t('timeline.week2.description'),
		},
		{
			week: 'Week 4-6',
			title: t('timeline.week4.title'),
			description: t('timeline.week4.description'),
		},
		{
			week: 'Week 7-8',
			title: t('timeline.week7.title'),
			description: t('timeline.week7.description'),
		},
	];

	return (
		<div className='process-page'>
			{/* Hero Section */}
			<section className='process-hero'>
				<div className='container'>
					<motion.div
						className='process-hero__content'
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<div className='process-hero__text'>
							<h1 className='process-hero__title'>{t('hero.title')}</h1>
							<p className='process-hero__subtitle'>{t('hero.subtitle')}</p>
							<p className='process-hero__description'>
								{t('hero.description')}
							</p>
						</div>
						<div className='process-hero__image'>
							<OptimizedImage
								src={images.process.consultation}
								alt={t('hero.imageAlt')}
								className='process-hero__img'
								width={600}
								height={400}
							/>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Process Overview */}
			<section className='process-overview'>
				<div className='container'>
					<motion.div
						className='process-overview__content'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className='process-overview__title'>{t('overview.title')}</h2>
						<p className='process-overview__subtitle'>
							{t('overview.subtitle')}
						</p>

						<div className='process-overview__steps'>
							<Stepper
								steps={processSteps.map(step => ({
									id: step.id,
									title: step.title,
									description: step.description,
								}))}
								currentStep={activeStep + 1}
								onStepClick={setActiveStep}
							/>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Interactive Process Steps */}
			<section className='process-steps'>
				<div className='container'>
					<div className='process-steps__content'>
						{processSteps.map((step, index) => (
							<motion.div
								key={step.id}
								className={`process-step ${
									activeStep === index ? 'process-step--active' : ''
								}`}
								initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, delay: index * 0.1 }}
							>
								<div className='process-step__content'>
									<div className='process-step__text'>
										<div className='process-step__header'>
											<div className='process-step__number'>{index + 1}</div>
											<div className='process-step__info'>
												<h3 className='process-step__title'>{step.title}</h3>
												<p className='process-step__duration'>
													{step.duration}
												</p>
											</div>
										</div>
										<p className='process-step__description'>
											{step.description}
										</p>

										<div className='process-step__details'>
											<h4>{t('stepDetails.title')}</h4>
											<ul className='process-step__details-list'>
												{step.details.map((detail, detailIndex) => (
													<li key={detailIndex}>{detail}</li>
												))}
											</ul>
										</div>

										<div className='process-step__guarantees'>
											<h4>{t('stepGuarantees.title')}</h4>
											<ul className='process-step__guarantees-list'>
												{step.guarantees.map((guarantee, guaranteeIndex) => (
													<li key={guaranteeIndex}>
														<span className='process-step__guarantee-icon'>
															✓
														</span>
														{guarantee}
													</li>
												))}
											</ul>
										</div>
									</div>
									<div className='process-step__image'>
										<OptimizedImage
											src={step.image}
											alt={step.title}
											className='process-step__img'
											width={500}
											height={350}
										/>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Timeline Section */}
			<section className='process-timeline'>
				<div className='container'>
					<motion.div
						className='process-timeline__content'
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className='process-timeline__title'>{t('timeline.title')}</h2>
						<p className='process-timeline__subtitle'>
							{t('timeline.subtitle')}
						</p>

						<div className='process-timeline__grid'>
							{timeline.map((item, index) => (
								<motion.div
									key={index}
									className='process-timeline__item'
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<Card className='process-timeline__card'>
										<div className='process-timeline__week'>{item.week}</div>
										<h3 className='process-timeline__item-title'>
											{item.title}
										</h3>
										<p className='process-timeline__item-description'>
											{item.description}
										</p>
									</Card>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Quality Guarantees */}
			<section className='process-guarantees'>
				<div className='container'>
					<motion.div
						className='process-guarantees__content'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className='process-guarantees__title'>
							{t('guarantees.title')}
						</h2>
						<p className='process-guarantees__subtitle'>
							{t('guarantees.subtitle')}
						</p>

						<div className='process-guarantees__grid'>
							<div className='process-guarantees__item'>
								<div className='process-guarantees__icon'>🛡️</div>
								<h3>{t('guarantees.quality.title')}</h3>
								<p>{t('guarantees.quality.description')}</p>
							</div>
							<div className='process-guarantees__item'>
								<div className='process-guarantees__icon'>⏰</div>
								<h3>{t('guarantees.timeline.title')}</h3>
								<p>{t('guarantees.timeline.description')}</p>
							</div>
							<div className='process-guarantees__item'>
								<div className='process-guarantees__icon'>💰</div>
								<h3>{t('guarantees.pricing.title')}</h3>
								<p>{t('guarantees.pricing.description')}</p>
							</div>
							<div className='process-guarantees__item'>
								<div className='process-guarantees__icon'>🔧</div>
								<h3>{t('guarantees.support.title')}</h3>
								<p>{t('guarantees.support.description')}</p>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='process-cta'>
				<div className='container'>
					<motion.div
						className='process-cta__content'
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className='process-cta__title'>{t('cta.title')}</h2>
						<p className='process-cta__description'>{t('cta.description')}</p>
						<div className='process-cta__actions'>
							<a href='/contact' className='btn btn--primary btn--lg'>
								{t('cta.start')}
							</a>
							<a href='/calculator' className='btn btn--outline btn--lg'>
								{t('cta.calculator')}
							</a>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default ProcessPage;
