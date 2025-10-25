import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../ProjectCard/ProjectCard';
import type { PortfolioProject } from '../../../data/portfolio';
import './ProjectGrid.css';

interface ProjectGridProps {
	projects: PortfolioProject[];
	loading?: boolean;
	onProjectClick?: (project: PortfolioProject) => void;
	className?: string;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({
	projects,
	loading = false,
	onProjectClick,
	className = '',
}) => {
	const gridClasses = ['project-grid', className].filter(Boolean).join(' ');

	if (loading) {
		return (
			<div className={gridClasses}>
				<div className='project-grid__loading'>
					{[1, 2, 3, 4, 5, 6].map(i => (
						<div key={i} className='project-grid__skeleton'>
							<div className='project-grid__skeleton-image' />
							<div className='project-grid__skeleton-content'>
								<div className='project-grid__skeleton-title' />
								<div className='project-grid__skeleton-description' />
								<div className='project-grid__skeleton-button' />
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (projects.length === 0) {
		return (
			<div className={gridClasses}>
				<div className='project-grid__empty'>
					<div className='project-grid__empty-icon'>🔍</div>
					<h3>No projects found</h3>
					<p>Try adjusting your filters to see more results</p>
				</div>
			</div>
		);
	}

	return (
		<div className={gridClasses}>
			<div className='project-grid__content'>
				{projects.map((project, index) => (
					<motion.div
						key={project.id}
						className='project-grid__item'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: index * 0.1 }}
					>
						<ProjectCard
							project={project}
							onClick={() => onProjectClick?.(project)}
						/>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default ProjectGrid;
