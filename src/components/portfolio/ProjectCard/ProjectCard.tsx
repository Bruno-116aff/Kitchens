import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../common/Button';
import OptimizedImage from '../../common/OptimizedImage/OptimizedImage';
import './ProjectCard.css';
import Badge from '../../common/Badge/Badge';
import type { PortfolioProject } from '../../../data/portfolio';

interface ProjectCardProps {
	project: PortfolioProject;
	onClick?: () => void;
	className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
	project,
	onClick,
	className = '',
}) => {
	const handleCardClick = () => {
		if (onClick) {
			onClick();
		} else {
			// Default behavior: navigate to project detail
			window.location.href = `/portfolio/${project.slug}`;
		}
	};

	const cardClasses = ['project-card', className].filter(Boolean).join(' ');

	return (
		<motion.div
			className={cardClasses}
			whileHover={{ y: -4 }}
			transition={{ duration: 0.2 }}
		>
			<div className='project-card__container' onClick={handleCardClick}>
				<div className='project-card__image-container'>
					<OptimizedImage
						src={project.images.main}
						alt={project.title}
						className='project-card__image'
						width={400}
						height={300}
						lazy={true}
					/>
					<div className='project-card__overlay'>
						<Button
							variant='outline'
							size='sm'
							className='project-card__view-button'
						>
							View Project
						</Button>
					</div>
				</div>

				<div className='project-card__content'>
					<div className='project-card__header'>
						<h3 className='project-card__title'>{project.title}</h3>
						<div className='project-card__badges'>
							<Badge variant='info' size='sm'>
								{project.style[0]}
							</Badge>
							<Badge variant='default' size='sm'>
								{project.budget}
							</Badge>
						</div>
					</div>

					<p className='project-card__description'>{project.description}</p>

					<div className='project-card__details'>
						<div className='project-card__detail-item'>
							<span className='project-card__detail-label'>Category:</span>
							<span className='project-card__detail-value'>
								{project.category}
							</span>
						</div>
						<div className='project-card__detail-item'>
							<span className='project-card__detail-label'>Size:</span>
							<span className='project-card__detail-value'>{project.size}</span>
						</div>
						<div className='project-card__detail-item'>
							<span className='project-card__detail-label'>Materials:</span>
							<span className='project-card__detail-value'>
								{project.materials.slice(0, 2).join(', ')}
							</span>
						</div>
					</div>

					<div className='project-card__actions'>
						<Button variant='primary' size='sm'>
							View Details
						</Button>
						<Button variant='ghost' size='sm'>
							Like This Style
						</Button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ProjectCard;
