import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';
import ContactForm from '../components/common/ContactForm';
import QuizPreviewSection from '../components/sections/QuizPreviewSection/QuizPreviewSection';
import OptimizedImage from '../components/common/OptimizedImage/OptimizedImage';
import { images } from '../data/images';
import { getFeaturedProjects } from '../data/portfolio';
import './HomePage.css';

const HomePage: React.FC = () => {
	const { t } = useTranslation('home');
	const featuredProjects = getFeaturedProjects(3);

	return (
		<div className='home-page'>
			{/* Hero Section */}
			<section className='hero'>
				<div className='hero__background'>
					<div className='hero__background-gradient'></div>
					<div className='hero__background-pattern'></div>
				</div>
				<div className='container'>
					<div className='hero__content'>
						<motion.div
							className='hero__text'
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							<motion.div
								className='hero__badge'
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								<span>🏆 #1 Kitchen Designers in Cyprus</span>
							</motion.div>

							<h1 className='hero__title'>
								<span className='hero__title-highlight'>Dream Kitchen</span>
								<br />
								Made to Reality
							</h1>

							<p className='hero__subtitle'>
								Transform your space with custom kitchens designed, built &
								installed by Cyprus experts
							</p>

							<p className='hero__description'>
								From concept to completion in 4 weeks. Free 3D design, 5-year
								warranty, and 0% financing available.
							</p>

							<div className='hero__actions'>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Link
										to='/planner'
										className='btn btn--primary btn--lg hero__cta-primary'
									>
										<svg
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z'
												fill='currentColor'
											/>
										</svg>
										Get Free 3D Design
									</Link>
								</motion.div>

								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Link
										to='/calculator'
										className='btn btn--outline btn--lg hero__cta-secondary'
									>
										<svg
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M9 7H7v10h2V7zm4 0h-2v10h2V7zm4 0h-2v10h2V7z'
												fill='currentColor'
											/>
										</svg>
										Calculate Price
									</Link>
								</motion.div>
							</div>

							<motion.div
								className='hero__stats'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								<div className='hero__stat'>
									<span className='hero__stat-number'>4</span>
									<span className='hero__stat-label'>Weeks</span>
								</div>
								<div className='hero__stat'>
									<span className='hero__stat-number'>1000+</span>
									<span className='hero__stat-label'>Happy Clients</span>
								</div>
								<div className='hero__stat'>
									<span className='hero__stat-number'>5</span>
									<span className='hero__stat-label'>Year Warranty</span>
								</div>
							</motion.div>
						</motion.div>

						<motion.div
							className='hero__image'
							initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
							animate={{ opacity: 1, scale: 1, rotate: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							<div className='hero__image-container'>
								<OptimizedImage
									src={images.hero.main}
									alt='Custom Kitchen Design'
									className='hero__img'
									width={600}
									height={400}
									lazy={false}
								/>
								<div className='hero__image-badge'>
									<span>Free 3D Design</span>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Trust Indicators */}
			<section className='trust-indicators'>
				<div className='container'>
					<div className='trust-indicators__content'>
						<motion.div
							className='trust-indicators__item'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
						>
							<div className='trust-indicators__icon'>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z'
										fill='currentColor'
									/>
								</svg>
							</div>
							<div className='trust-indicators__content-text'>
								<span className='trust-indicators__number'>5</span>
								<span className='trust-indicators__label'>Year Guarantee</span>
							</div>
						</motion.div>

						<motion.div
							className='trust-indicators__item'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
						>
							<div className='trust-indicators__icon'>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
										fill='currentColor'
									/>
								</svg>
							</div>
							<div className='trust-indicators__content-text'>
								<span className='trust-indicators__number'>0%</span>
								<span className='trust-indicators__label'>
									Interest Financing
								</span>
							</div>
						</motion.div>

						<motion.div
							className='trust-indicators__item'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							viewport={{ once: true }}
						>
							<div className='trust-indicators__icon'>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
										fill='currentColor'
									/>
								</svg>
							</div>
							<div className='trust-indicators__content-text'>
								<span className='trust-indicators__number'>1000+</span>
								<span className='trust-indicators__label'>
									Projects Completed
								</span>
							</div>
						</motion.div>

						<motion.div
							className='trust-indicators__item'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							viewport={{ once: true }}
						>
							<div className='trust-indicators__icon'>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
										fill='currentColor'
									/>
								</svg>
							</div>
							<div className='trust-indicators__content-text'>
								<span className='trust-indicators__number'>Certified</span>
								<span className='trust-indicators__label'>Installers</span>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Quiz Preview Section */}
			<QuizPreviewSection />

			{/* Features Section */}
			<section className='features'>
				<div className='container'>
					<div className='features__content'>
						<motion.div
							className='features__header'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
						>
							<h2 className='features__title'>
								Why Choose Our Kitchen Solutions?
							</h2>
							<p className='features__subtitle'>
								Experience the difference with our comprehensive kitchen
								services designed for Cyprus homes
							</p>
						</motion.div>

						<div className='features__grid'>
							<motion.div
								className='features__card'
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.1 }}
								viewport={{ once: true }}
								whileHover={{ y: -8 }}
							>
								<div className='features__card-icon'>
									<svg
										width='32'
										height='32'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z'
											fill='currentColor'
										/>
									</svg>
								</div>
								<h3 className='features__card-title'>Premium Materials</h3>
								<p className='features__card-description'>
									Only the finest European materials and hardware. Every
									component is carefully selected for durability and style.
								</p>
								<Link to='/services' className='features__card-link'>
									Learn More →
								</Link>
							</motion.div>

							<motion.div
								className='features__card'
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								viewport={{ once: true }}
								whileHover={{ y: -8 }}
							>
								<div className='features__card-icon'>
									<svg
										width='32'
										height='32'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
											fill='currentColor'
										/>
									</svg>
								</div>
								<h3 className='features__card-title'>Expert Installation</h3>
								<p className='features__card-description'>
									Certified installers with 10+ years experience. Professional
									installation with 5-year warranty included.
								</p>
								<Link to='/process' className='features__card-link'>
									Our Process →
								</Link>
							</motion.div>

							<motion.div
								className='features__card'
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
								viewport={{ once: true }}
								whileHover={{ y: -8 }}
							>
								<div className='features__card-icon'>
									<svg
										width='32'
										height='32'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
											fill='currentColor'
										/>
									</svg>
								</div>
								<h3 className='features__card-title'>Free 3D Design</h3>
								<p className='features__card-description'>
									See your kitchen before it's built. Interactive 3D
									visualization helps you make the perfect choices.
								</p>
								<Link to='/planner' className='features__card-link'>
									Try 3D Planner →
								</Link>
							</motion.div>

							<motion.div
								className='features__card'
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
								viewport={{ once: true }}
								whileHover={{ y: -8 }}
							>
								<div className='features__card-icon'>
									<svg
										width='32'
										height='32'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
											fill='currentColor'
										/>
									</svg>
								</div>
								<h3 className='features__card-title'>Fast Delivery</h3>
								<p className='features__card-description'>
									Complete your kitchen in just 4 weeks. From design approval to
									final installation, we keep our promises.
								</p>
								<Link to='/about' className='features__card-link'>
									About Us →
								</Link>
							</motion.div>
						</div>

						<motion.div
							className='features__cta'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.5 }}
							viewport={{ once: true }}
						>
							<div className='features__cta-content'>
								<h3>Ready to Start Your Kitchen Journey?</h3>
								<p>Get a free consultation and 3D design today</p>
								<div className='features__cta-actions'>
									<Link to='/calculator' className='btn btn--primary btn--lg'>
										Get Free Quote
									</Link>
									<Link to='/portfolio' className='btn btn--outline btn--lg'>
										View Our Work
									</Link>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Portfolio Preview */}
			<section className='portfolio-preview'>
				<div className='container'>
					<motion.div
						className='portfolio-preview__header'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h2 className='portfolio-preview__title'>{t('portfolio.title')}</h2>
						<p className='portfolio-preview__subtitle'>
							{t('portfolio.subtitle')}
						</p>
					</motion.div>

					<div className='portfolio-preview__grid'>
						{featuredProjects.map((project, index) => (
							<motion.div
								key={project.id}
								className='portfolio-preview__item'
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<Card hover className='portfolio-card'>
									<div className='portfolio-card__image'>
										<OptimizedImage
											src={project.images.main}
											alt={project.title}
											className='portfolio-card__img'
											width={400}
											height={300}
											lazy={true}
										/>
									</div>
									<div className='portfolio-card__content'>
										<h3 className='portfolio-card__title'>{project.title}</h3>
										<p className='portfolio-card__description'>
											{project.description}
										</p>
										<Link
											to={`/portfolio/${project.slug}`}
											className='btn btn--outline btn--sm'
										>
											{t('portfolio.cta')}
										</Link>
									</div>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className='testimonials'>
				<div className='container'>
					<div className='testimonials__content'>
						<motion.div
							className='testimonials__header'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
						>
							<h2 className='testimonials__title'>What Our Clients Say</h2>
							<p className='testimonials__subtitle'>
								Real feedback from satisfied customers across Cyprus
							</p>
						</motion.div>

						<div className='testimonials__grid'>
							<motion.div
								className='testimonials__card'
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.1 }}
								viewport={{ once: true }}
							>
								<div className='testimonials__stars'>⭐⭐⭐⭐⭐</div>
								<p className='testimonials__text'>
									"Absolutely fantastic! The 3D design helped us visualize
									everything perfectly. The installation was flawless and
									completed on time."
								</p>
								<div className='testimonials__author'>
									<div className='testimonials__avatar'>M</div>
									<div className='testimonials__info'>
										<span className='testimonials__name'>
											Maria Konstantinou
										</span>
										<span className='testimonials__location'>
											Nicosia, Cyprus
										</span>
									</div>
								</div>
							</motion.div>

							<motion.div
								className='testimonials__card'
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								viewport={{ once: true }}
							>
								<div className='testimonials__stars'>⭐⭐⭐⭐⭐</div>
								<p className='testimonials__text'>
									"Professional team from start to finish. The quality of
									materials and craftsmanship exceeded our expectations. Highly
									recommended!"
								</p>
								<div className='testimonials__author'>
									<div className='testimonials__avatar'>A</div>
									<div className='testimonials__info'>
										<span className='testimonials__name'>Andreas Petrou</span>
										<span className='testimonials__location'>
											Limassol, Cyprus
										</span>
									</div>
								</div>
							</motion.div>

							<motion.div
								className='testimonials__card'
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
								viewport={{ once: true }}
							>
								<div className='testimonials__stars'>⭐⭐⭐⭐⭐</div>
								<p className='testimonials__text'>
									"The price calculator gave us an accurate estimate, and they
									delivered exactly what they promised. Great value for money!"
								</p>
								<div className='testimonials__author'>
									<div className='testimonials__avatar'>E</div>
									<div className='testimonials__info'>
										<span className='testimonials__name'>Elena Georgiou</span>
										<span className='testimonials__location'>
											Paphos, Cyprus
										</span>
									</div>
								</div>
							</motion.div>
						</div>

						<motion.div
							className='testimonials__cta'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							viewport={{ once: true }}
						>
							<Link to='/portfolio' className='btn btn--primary btn--lg'>
								View More Reviews
							</Link>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Services Overview */}
			<section className='services-overview'>
				<div className='container'>
					<div className='services-overview__content'>
						<motion.div
							className='services-overview__header'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
						>
							<h2 className='services-overview__title'>
								Complete Kitchen Solutions
							</h2>
							<p className='services-overview__subtitle'>
								From design to installation, we handle everything for your dream
								kitchen
							</p>
						</motion.div>

						<div className='services-overview__grid'>
							<motion.div
								className='services-overview__item'
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.1 }}
								viewport={{ once: true }}
							>
								<div className='services-overview__icon'>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
											fill='currentColor'
										/>
									</svg>
								</div>
								<h3>Design & Planning</h3>
								<p>Custom 3D designs tailored to your space and lifestyle</p>
								<Link to='/services' className='services-overview__link'>
									Explore Services →
								</Link>
							</motion.div>

							<motion.div
								className='services-overview__item'
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								viewport={{ once: true }}
							>
								<div className='services-overview__icon'>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z'
											fill='currentColor'
										/>
									</svg>
								</div>
								<h3>Manufacturing</h3>
								<p>High-quality production in our state-of-the-art facility</p>
								<Link to='/process' className='services-overview__link'>
									Our Process →
								</Link>
							</motion.div>

							<motion.div
								className='services-overview__item'
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
								viewport={{ once: true }}
							>
								<div className='services-overview__icon'>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
											fill='currentColor'
										/>
									</svg>
								</div>
								<h3>Installation</h3>
								<p>Professional installation by certified experts</p>
								<Link to='/booking' className='services-overview__link'>
									Book Installation →
								</Link>
							</motion.div>

							<motion.div
								className='services-overview__item'
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
								viewport={{ once: true }}
							>
								<div className='services-overview__icon'>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
											fill='currentColor'
										/>
									</svg>
								</div>
								<h3>Support & Warranty</h3>
								<p>5-year warranty and ongoing support for peace of mind</p>
								<Link to='/contact' className='services-overview__link'>
									Contact Support →
								</Link>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='cta-section'>
				<div className='container'>
					<div className='cta-section__content'>
						<motion.div
							className='cta-section__text'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
						>
							<h2 className='cta-section__title'>
								Ready to Start Your Dream Kitchen?
							</h2>
							<p className='cta-section__subtitle'>
								Get a free consultation, 3D design, and detailed quote today. No
								obligations, just expert advice.
							</p>
							<div className='cta-section__benefits'>
								<div className='cta-section__benefit'>
									<svg
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
											fill='currentColor'
										/>
									</svg>
									<span>Free 3D Design</span>
								</div>
								<div className='cta-section__benefit'>
									<svg
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
											fill='currentColor'
										/>
									</svg>
									<span>No Obligation Quote</span>
								</div>
								<div className='cta-section__benefit'>
									<svg
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
											fill='currentColor'
										/>
									</svg>
									<span>Expert Consultation</span>
								</div>
							</div>
						</motion.div>

						<motion.div
							className='cta-section__form'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
						>
							<ContactForm />
							<div className='cta-section__additional-actions'>
								<Link to='/planner' className='btn btn--outline btn--lg'>
									🎨 3D Kitchen Planner
								</Link>
								<Link to='/calculator' className='btn btn--outline btn--lg'>
									💰 Price Calculator
								</Link>
								<Link to='/booking' className='btn btn--outline btn--lg'>
									📅 Book Consultation
								</Link>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
