import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';
import { images } from '../data/images';
import './AboutPage.css';
import OptimizedImage from '../components/common/OptimizedImage/OptimizedImage';

const AboutPage: React.FC = () => {
	const { t } = useTranslation('about');

	const teamMembers = [
		{
			id: 'designer1',
			name: t('team.designer1.name'),
			position: t('team.designer1.position'),
			experience: t('team.designer1.experience'),
			specialization: t('team.designer1.specialization'),
			image: images.team.designer1,
		},
		{
			id: 'designer2',
			name: t('team.designer2.name'),
			position: t('team.designer2.position'),
			experience: t('team.designer2.experience'),
			specialization: t('team.designer2.specialization'),
			image: images.team.designer2,
		},
		{
			id: 'manager1',
			name: t('team.manager1.name'),
			position: t('team.manager1.position'),
			experience: t('team.manager1.experience'),
			specialization: t('team.manager1.specialization'),
			image: images.team.manager1,
		},
		{
			id: 'installer1',
			name: t('team.installer1.name'),
			position: t('team.installer1.position'),
			experience: t('team.installer1.experience'),
			specialization: t('team.installer1.specialization'),
			image: images.team.installer1,
		},
	];

	const achievements = [
		{
			number: '500+',
			label: t('achievements.projects'),
			description: t('achievements.projectsDesc'),
		},
		{
			number: '15',
			label: t('achievements.years'),
			description: t('achievements.yearsDesc'),
		},
		{
			number: '98%',
			label: t('achievements.satisfaction'),
			description: t('achievements.satisfactionDesc'),
		},
		{
			number: '24/7',
			label: t('achievements.support'),
			description: t('achievements.supportDesc'),
		},
	];

	const values = [
		{
			icon: '🎯',
			title: t('values.quality.title'),
			description: t('values.quality.description'),
		},
		{
			icon: '🤝',
			title: t('values.trust.title'),
			description: t('values.trust.description'),
		},
		{
			icon: '⚡',
			title: t('values.innovation.title'),
			description: t('values.innovation.description'),
		},
		{
			icon: '💎',
			title: t('values.excellence.title'),
			description: t('values.excellence.description'),
		},
	];

	return (
		<div className='about-page'>
			{/* Hero Section */}
			<section className='about-hero'>
				<div className='container'>
					<motion.div
						className='about-hero__content'
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<div className='about-hero__text'>
							<h1 className='about-hero__title'>{t('hero.title')}</h1>
							<p className='about-hero__subtitle'>{t('hero.subtitle')}</p>
							<p className='about-hero__description'>{t('hero.description')}</p>
						</div>
						<div className='about-hero__image'>
							<OptimizedImage
								src={images.about.company}
								alt={t('hero.imageAlt')}
								className='about-hero__img'
								width={600}
								height={400}
							/>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Story Section */}
			<section className='about-story'>
				<div className='container'>
					<motion.div
						className='about-story__content'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<div className='about-story__text'>
							<h2 className='about-story__title'>{t('story.title')}</h2>
							<div className='about-story__timeline'>
								<div className='about-story__timeline-item'>
									<div className='about-story__timeline-year'>2009</div>
									<div className='about-story__timeline-content'>
										<h3>{t('story.founded.title')}</h3>
										<p>{t('story.founded.description')}</p>
									</div>
								</div>
								<div className='about-story__timeline-item'>
									<div className='about-story__timeline-year'>2015</div>
									<div className='about-story__timeline-content'>
										<h3>{t('story.expansion.title')}</h3>
										<p>{t('story.expansion.description')}</p>
									</div>
								</div>
								<div className='about-story__timeline-item'>
									<div className='about-story__timeline-year'>2020</div>
									<div className='about-story__timeline-content'>
										<h3>{t('story.digital.title')}</h3>
										<p>{t('story.digital.description')}</p>
									</div>
								</div>
								<div className='about-story__timeline-item'>
									<div className='about-story__timeline-year'>2024</div>
									<div className='about-story__timeline-content'>
										<h3>{t('story.today.title')}</h3>
										<p>{t('story.today.description')}</p>
									</div>
								</div>
							</div>
						</div>
						<div className='about-story__image'>
							<OptimizedImage
								src={images.about.showroom}
								alt={t('story.imageAlt')}
								className='about-story__img'
								width={500}
								height={400}
							/>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Achievements Section */}
			<section className='about-achievements'>
				<div className='container'>
					<motion.div
						className='about-achievements__content'
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className='about-achievements__title'>
							{t('achievements.title')}
						</h2>
						<div className='about-achievements__grid'>
							{achievements.map((achievement, index) => (
								<motion.div
									key={achievement.label}
									className='about-achievements__item'
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<div className='about-achievements__number'>
										{achievement.number}
									</div>
									<div className='about-achievements__label'>
										{achievement.label}
									</div>
									<div className='about-achievements__description'>
										{achievement.description}
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Values Section */}
			<section className='about-values'>
				<div className='container'>
					<motion.div
						className='about-values__content'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className='about-values__title'>{t('values.title')}</h2>
						<div className='about-values__grid'>
							{values.map((value, index) => (
								<motion.div
									key={value.title}
									className='about-values__item'
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<div className='about-values__icon'>{value.icon}</div>
									<h3 className='about-values__item-title'>{value.title}</h3>
									<p className='about-values__item-description'>
										{value.description}
									</p>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Team Section */}
			<section className='about-team'>
				<div className='container'>
					<motion.div
						className='about-team__content'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className='about-team__title'>{t('team.title')}</h2>
						<p className='about-team__subtitle'>{t('team.subtitle')}</p>
						<div className='about-team__grid'>
							{teamMembers.map((member, index) => (
								<motion.div
									key={member.id}
									className='about-team__member'
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<Card className='about-team__card'>
										<div className='about-team__member-image'>
											<OptimizedImage
												src={member.image}
												alt={member.name}
												className='about-team__member-img'
												width={200}
												height={200}
											/>
										</div>
										<div className='about-team__member-info'>
											<h3 className='about-team__member-name'>{member.name}</h3>
											<p className='about-team__member-position'>
												{member.position}
											</p>
											<p className='about-team__member-experience'>
												{member.experience}
											</p>
											<p className='about-team__member-specialization'>
												{member.specialization}
											</p>
										</div>
									</Card>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Workshop Section */}
			<section className='about-workshop'>
				<div className='container'>
					<motion.div
						className='about-workshop__content'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<div className='about-workshop__text'>
							<h2 className='about-workshop__title'>{t('workshop.title')}</h2>
							<p className='about-workshop__description'>
								{t('workshop.description')}
							</p>
							<div className='about-workshop__features'>
								<div className='about-workshop__feature'>
									<div className='about-workshop__feature-icon'>🏭</div>
									<div className='about-workshop__feature-content'>
										<h3>{t('workshop.production.title')}</h3>
										<p>{t('workshop.production.description')}</p>
									</div>
								</div>
								<div className='about-workshop__feature'>
									<div className='about-workshop__feature-icon'>🔧</div>
									<div className='about-workshop__feature-content'>
										<h3>{t('workshop.equipment.title')}</h3>
										<p>{t('workshop.equipment.description')}</p>
									</div>
								</div>
								<div className='about-workshop__feature'>
									<div className='about-workshop__feature-icon'>✅</div>
									<div className='about-workshop__feature-content'>
										<h3>{t('workshop.quality.title')}</h3>
										<p>{t('workshop.quality.description')}</p>
									</div>
								</div>
							</div>
						</div>
						<div className='about-workshop__image'>
							<OptimizedImage
								src={images.about.workshop}
								alt={t('workshop.imageAlt')}
								className='about-workshop__img'
								width={600}
								height={400}
							/>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Awards Section */}
			<section className='about-awards'>
				<div className='container'>
					<motion.div
						className='about-awards__content'
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className='about-awards__title'>{t('awards.title')}</h2>
						<p className='about-awards__subtitle'>{t('awards.subtitle')}</p>
						<div className='about-awards__grid'>
							<div className='about-awards__award'>
								<div className='about-awards__award-icon'>🏆</div>
								<h3>{t('awards.excellence.title')}</h3>
								<p>{t('awards.excellence.description')}</p>
								<span className='about-awards__award-year'>2023</span>
							</div>
							<div className='about-awards__award'>
								<div className='about-awards__award-icon'>⭐</div>
								<h3>{t('awards.innovation.title')}</h3>
								<p>{t('awards.innovation.description')}</p>
								<span className='about-awards__award-year'>2022</span>
							</div>
							<div className='about-awards__award'>
								<div className='about-awards__award-icon'>🎖️</div>
								<h3>{t('awards.customer.title')}</h3>
								<p>{t('awards.customer.description')}</p>
								<span className='about-awards__award-year'>2021</span>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='about-cta'>
				<div className='container'>
					<motion.div
						className='about-cta__content'
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className='about-cta__title'>{t('cta.title')}</h2>
						<p className='about-cta__description'>{t('cta.description')}</p>
						<div className='about-cta__actions'>
							<a href='/contact' className='btn btn--primary btn--lg'>
								{t('cta.contact')}
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

export default AboutPage;
