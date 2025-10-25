import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectBySlug, getRandomProjects } from '../data/portfolio';
import OptimizedImage from '../components/common/OptimizedImage/OptimizedImage';
// import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge/Badge';
import './ProjectDetailPage.css';

const ProjectDetailPage: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const project = slug ? getProjectBySlug(slug) : null;
	const relatedProjects = getRandomProjects(3);

	if (!project) {
		return (
			<div className='project-detail-page'>
				<div className='container'>
					<div className='project-detail__not-found'>
						<h1>Project Not Found</h1>
						<p>The project you're looking for doesn't exist.</p>
						<Link to='/portfolio' className='btn btn--primary'>
							Back to Portfolio
						</Link>
					</div>
				</div>
			</div>
		);
	}

	const handleImageClick = (index: number) => {
		setSelectedImageIndex(index);
	};

	const handlePrevImage = () => {
		setSelectedImageIndex(prev =>
			prev === 0 ? project.images.gallery.length - 1 : prev - 1
		);
	};

	const handleNextImage = () => {
		setSelectedImageIndex(prev =>
			prev === project.images.gallery.length - 1 ? 0 : prev + 1
		);
	};

	return (
		<div className='project-detail-page'>
			{/* Hero Section */}
			<section className='project-detail__hero'>
				<div className='container'>
					<motion.div
						className='project-detail__hero-content'
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<div className='project-detail__breadcrumb'>
							<Link to='/portfolio'>Portfolio</Link>
							<span> / </span>
							<span>{project.title}</span>
						</div>

						<h1 className='project-detail__title'>{project.title}</h1>
						<p className='project-detail__description'>{project.description}</p>

						<div className='project-detail__badges'>
							<Badge variant='info'>{project.category}</Badge>
							<Badge variant='default'>{project.budget}</Badge>
							<Badge variant='default'>{project.size}</Badge>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Image Gallery */}
			<section className='project-detail__gallery'>
				<div className='container'>
					<div className='project-detail__gallery-main'>
						<motion.div
							className='project-detail__main-image'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							<OptimizedImage
								src={project.images.gallery[selectedImageIndex]}
								alt={`${project.title} - Image ${selectedImageIndex + 1}`}
								width={800}
								height={600}
								className='project-detail__main-img'
							/>

							{project.images.gallery.length > 1 && (
								<>
									<button
										className='project-detail__nav-button project-detail__nav-button--prev'
										onClick={handlePrevImage}
										aria-label='Previous image'
									>
										‹
									</button>
									<button
										className='project-detail__nav-button project-detail__nav-button--next'
										onClick={handleNextImage}
										aria-label='Next image'
									>
										›
									</button>
								</>
							)}
						</motion.div>
					</div>

					{project.images.gallery.length > 1 && (
						<div className='project-detail__gallery-thumbnails'>
							{project.images.gallery.map((image, index) => (
								<button
									key={index}
									className={`project-detail__thumbnail ${
										selectedImageIndex === index
											? 'project-detail__thumbnail--active'
											: ''
									}`}
									onClick={() => handleImageClick(index)}
								>
									<OptimizedImage
										src={image}
										alt={`${project.title} - Thumbnail ${index + 1}`}
										width={120}
										height={90}
										className='project-detail__thumbnail-img'
									/>
								</button>
							))}
						</div>
					)}
				</div>
			</section>

			{/* Project Details */}
			<section className='project-detail__details'>
				<div className='container'>
					<div className='project-detail__details-grid'>
						<div className='project-detail__info'>
							<h2>Project Information</h2>

							<div className='project-detail__info-grid'>
								<div className='project-detail__info-item'>
									<h3>Category</h3>
									<p>{project.category}</p>
								</div>

								<div className='project-detail__info-item'>
									<h3>Style</h3>
									<p>{project.style.join(', ')}</p>
								</div>

								<div className='project-detail__info-item'>
									<h3>Size</h3>
									<p>{project.size}</p>
								</div>

								<div className='project-detail__info-item'>
									<h3>Budget</h3>
									<p>{project.budget}</p>
								</div>

								<div className='project-detail__info-item'>
									<h3>Layout</h3>
									<p>{project.layout.join(', ')}</p>
								</div>

								<div className='project-detail__info-item'>
									<h3>Materials</h3>
									<p>{project.materials.join(', ')}</p>
								</div>
							</div>

							{project.details.dimensions && (
								<div className='project-detail__info-item'>
									<h3>Dimensions</h3>
									<p>{project.details.dimensions}</p>
								</div>
							)}

							{project.details.drawers && (
								<div className='project-detail__info-item'>
									<h3>Drawers</h3>
									<p>{project.details.drawers} drawers</p>
								</div>
							)}

							{project.details.worktop && (
								<div className='project-detail__info-item'>
									<h3>Worktop</h3>
									<p>{project.details.worktop}</p>
								</div>
							)}

							{project.details.hardware && (
								<div className='project-detail__info-item'>
									<h3>Hardware</h3>
									<p>{project.details.hardware}</p>
								</div>
							)}
						</div>

						<div className='project-detail__features'>
							<h2>Key Features</h2>
							<ul className='project-detail__features-list'>
								{project.features.map((feature, index) => (
									<li key={index} className='project-detail__feature-item'>
										<span className='project-detail__feature-icon'>✓</span>
										{feature}
									</li>
								))}
							</ul>

							{project.details.specialFeatures && (
								<>
									<h3>Special Features</h3>
									<ul className='project-detail__features-list'>
										{project.details.specialFeatures.map((feature, index) => (
											<li key={index} className='project-detail__feature-item'>
												<span className='project-detail__feature-icon'>★</span>
												{feature}
											</li>
										))}
									</ul>
								</>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* Client Testimonial */}
			{project.clientTestimonial && (
				<section className='project-detail__testimonial'>
					<div className='container'>
						<Card className='project-detail__testimonial-card'>
							<div className='project-detail__testimonial-content'>
								<div className='project-detail__testimonial-rating'>
									{'★'.repeat(project.clientTestimonial.rating)}
								</div>
								<blockquote className='project-detail__testimonial-quote'>
									"{project.clientTestimonial.text}"
								</blockquote>
								<cite className='project-detail__testimonial-author'>
									— {project.clientTestimonial.name}
								</cite>
							</div>
						</Card>
					</div>
				</section>
			)}

			{/* CTA Section */}
			<section className='project-detail__cta'>
				<div className='container'>
					<motion.div
						className='project-detail__cta-content'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<motion.div
							initial={{ scale: 0.8 }}
							whileInView={{ scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<h2>Love This Project?</h2>
						</motion.div>

						<motion.p
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							Let's create something similar for your home. Get a personalized
							quote and start your dream kitchen journey today.
						</motion.p>

						<motion.div
							className='project-detail__cta-actions'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.6 }}
						>
							<Link to='/calculator' className='btn btn--primary btn--lg'>
								<span>Get Price Estimate</span>
								<span className='btn-icon'>→</span>
							</Link>
							<Link to='/contact' className='btn btn--outline btn--lg'>
								<span>Book Free Consultation</span>
								<span className='btn-icon'>📅</span>
							</Link>
						</motion.div>

						<motion.div
							className='project-detail__cta-benefits'
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.8 }}
						>
							<div className='project-detail__cta-benefit'>
								<span className='benefit-icon'>✓</span>
								<span>Free 3D Design</span>
							</div>
							<div className='project-detail__cta-benefit'>
								<span className='benefit-icon'>✓</span>
								<span>No Obligation Quote</span>
							</div>
							<div className='project-detail__cta-benefit'>
								<span className='benefit-icon'>✓</span>
								<span>Expert Consultation</span>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Related Projects */}
			{relatedProjects.length > 0 && (
				<section className='project-detail__related'>
					<div className='container'>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<h2>Related Projects</h2>
							<div className='project-detail__related-grid'>
								{relatedProjects.map((relatedProject, index) => (
									<motion.div
										key={relatedProject.id}
										className='project-detail__related-item'
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4, delay: index * 0.1 }}
									>
										<Link to={`/portfolio/${relatedProject.slug}`}>
											<Card hover className='project-detail__related-card'>
												<div className='project-detail__related-image'>
													<OptimizedImage
														src={relatedProject.images.main}
														alt={relatedProject.title}
														width={300}
														height={200}
														lazy={true}
													/>
												</div>
												<div className='project-detail__related-content'>
													<h3>{relatedProject.title}</h3>
													<p>{relatedProject.category}</p>
												</div>
											</Card>
										</Link>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>
			)}
		</div>
	);
};

export default ProjectDetailPage;
