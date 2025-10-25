import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterSidebar from '../components/portfolio/FilterSidebar/FilterSidebar';
import FilterChip from '../components/portfolio/FilterChip/FilterChip';
import ProjectGrid from '../components/portfolio/ProjectGrid/ProjectGrid';
import {
	portfolioProjects,
	portfolioFilters,
	type PortfolioProject,
} from '../data/portfolio';
import './PortfolioPage.css';

interface ProjectFilters {
	categories?: string[];
	styles?: string[];
	materials?: string[];
	layouts?: string[];
	sizes?: string[];
	budgets?: string[];
}

const PortfolioPage: React.FC = () => {
	const [filters, setFilters] = useState<ProjectFilters>({});
	const [loading, setLoading] = useState(false);

	// Memoized filtered projects for better performance
	const filteredProjects = useMemo(() => {
		let filtered = portfolioProjects;

		// Apply filters
		if (filters.categories && filters.categories.length > 0) {
			filtered = filtered.filter(project =>
				filters.categories!.includes(project.category)
			);
		}

		if (filters.styles && filters.styles.length > 0) {
			filtered = filtered.filter(project =>
				project.style.some(style => filters.styles!.includes(style))
			);
		}

		if (filters.materials && filters.materials.length > 0) {
			filtered = filtered.filter(project =>
				project.materials.some(material =>
					filters.materials!.includes(material)
				)
			);
		}

		if (filters.layouts && filters.layouts.length > 0) {
			filtered = filtered.filter(project =>
				project.layout.some(layout => filters.layouts!.includes(layout))
			);
		}

		if (filters.sizes && filters.sizes.length > 0) {
			filtered = filtered.filter(project =>
				filters.sizes!.includes(project.size)
			);
		}

		if (filters.budgets && filters.budgets.length > 0) {
			filtered = filtered.filter(project =>
				filters.budgets!.includes(project.budget)
			);
		}

		return filtered;
	}, [filters]);

	// Simulate loading state
	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => setLoading(false), 300);
		return () => clearTimeout(timer);
	}, [filters]);

	const handleFiltersChange = useCallback((newFilters: ProjectFilters) => {
		setFilters(newFilters);
	}, []);

	const handleClearFilters = useCallback(() => {
		setFilters({});
	}, []);

	const handleRemoveFilter = useCallback(
		(filterType: keyof ProjectFilters, value: string) => {
			const currentValues = filters[filterType] || [];
			const newValues = currentValues.filter(v => v !== value);

			setFilters(prev => ({
				...prev,
				[filterType]: newValues.length > 0 ? newValues : undefined,
			}));
		},
		[filters]
	);

	const handleProjectClick = useCallback((project: PortfolioProject) => {
		window.location.href = `/portfolio/${project.slug}`;
	}, []);

	const getActiveFilters = useMemo(() => {
		const activeFilters: Array<{
			type: keyof ProjectFilters;
			value: string;
			label: string;
		}> = [];

		Object.entries(filters).forEach(([filterType, values]) => {
			if (values && values.length > 0) {
				values.forEach((value: string) => {
					// Get label for display
					let label = value;
					if (filterType === 'categories') {
						const category = portfolioFilters.categories.find(
							c => c.value === value
						);
						label = category ? category.label : value;
					} else if (filterType === 'styles') {
						const style = portfolioFilters.styles.find(s => s.value === value);
						label = style ? style.label : value;
					} else if (filterType === 'materials') {
						const material = portfolioFilters.materials.find(
							m => m.value === value
						);
						label = material ? material.label : value;
					} else if (filterType === 'layouts') {
						const layout = portfolioFilters.layouts.find(
							l => l.value === value
						);
						label = layout ? layout.label : value;
					} else if (filterType === 'sizes') {
						const size = portfolioFilters.sizes.find(s => s.value === value);
						label = size ? size.label : value;
					} else if (filterType === 'budgets') {
						const budget = portfolioFilters.budgets.find(
							b => b.value === value
						);
						label = budget ? budget.label : value;
					}

					activeFilters.push({
						type: filterType as keyof ProjectFilters,
						value,
						label,
					});
				});
			}
		});

		return activeFilters;
	}, [filters]);

	return (
		<div className='portfolio-page'>
			<div className='container'>
				<motion.div
					className='portfolio-page__header'
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1>Our Portfolio</h1>
					<p>Browse our latest kitchen projects and get inspired</p>
				</motion.div>

				<div className='portfolio-page__content'>
					<div className='portfolio-page__sidebar'>
						<FilterSidebar
							filters={filters}
							onFiltersChange={handleFiltersChange}
							onClearFilters={handleClearFilters}
						/>
					</div>

					<div className='portfolio-page__main'>
						<AnimatePresence>
							{getActiveFilters.length > 0 && (
								<motion.div
									className='portfolio-page__active-filters'
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.3 }}
								>
									<h3>Active Filters:</h3>
									<div className='portfolio-page__filter-chips'>
										{getActiveFilters.map((filter, index) => (
											<motion.div
												key={`${filter.type}-${filter.value}-${index}`}
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0, scale: 0.8 }}
												transition={{ duration: 0.2, delay: index * 0.05 }}
											>
												<FilterChip
													label={filter.label}
													onRemove={() =>
														handleRemoveFilter(filter.type, filter.value)
													}
												/>
											</motion.div>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>

						<div className='portfolio-page__results'>
							<motion.div
								className='portfolio-page__results-header'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4 }}
							>
								<h2>
									{loading
										? 'Loading...'
										: `${filteredProjects.length} projects found`}
								</h2>
							</motion.div>

							<ProjectGrid
								projects={filteredProjects}
								loading={loading}
								onProjectClick={handleProjectClick}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PortfolioPage;
