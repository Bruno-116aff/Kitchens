import React from 'react';
import { portfolioFilters } from '../../../data/portfolio';
import './FilterSidebar.css';

interface ProjectFilters {
	categories?: string[];
	styles?: string[];
	materials?: string[];
	layouts?: string[];
	sizes?: string[];
	budgets?: string[];
}

interface FilterSidebarProps {
	filters: ProjectFilters;
	onFiltersChange: (filters: ProjectFilters) => void;
	onClearFilters: () => void;
	className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
	filters,
	onFiltersChange,
	onClearFilters,
	className = '',
}) => {
	const handleFilterChange = (
		filterType: keyof ProjectFilters,
		value: string,
		checked: boolean
	) => {
		const currentValues = filters[filterType] || [];
		let newValues: string[];

		if (checked) {
			newValues = [...currentValues, value];
		} else {
			newValues = currentValues.filter(v => v !== value);
		}

		onFiltersChange({
			...filters,
			[filterType]: newValues.length > 0 ? newValues : undefined,
		});
	};

	const hasActiveFilters = Object.values(filters).some(
		filterArray => filterArray && filterArray.length > 0
	);

	const filterClasses = ['filter-sidebar', className].filter(Boolean).join(' ');

	return (
		<div className={filterClasses}>
			<div className='filter-sidebar__header'>
				<h3>Filters</h3>
				{hasActiveFilters && (
					<button
						className='filter-sidebar__clear-button'
						onClick={onClearFilters}
					>
						Clear All
					</button>
				)}
			</div>

			<div className='filter-sidebar__content'>
				{/* Categories */}
				<div className='filter-sidebar__group'>
					<h4 className='filter-sidebar__group-title'>Categories</h4>
					<div className='filter-sidebar__options'>
						{portfolioFilters.categories.map(option => {
							const isChecked =
								filters.categories?.includes(option.value) || false;
							return (
								<label key={option.value} className='filter-sidebar__option'>
									<input
										type='checkbox'
										checked={isChecked}
										onChange={e =>
											handleFilterChange(
												'categories',
												option.value,
												e.target.checked
											)
										}
									/>
									<span className='filter-sidebar__option-label'>
										{option.label} ({option.count})
									</span>
								</label>
							);
						})}
					</div>
				</div>

				{/* Styles */}
				<div className='filter-sidebar__group'>
					<h4 className='filter-sidebar__group-title'>Styles</h4>
					<div className='filter-sidebar__options'>
						{portfolioFilters.styles.map(option => {
							const isChecked = filters.styles?.includes(option.value) || false;
							return (
								<label key={option.value} className='filter-sidebar__option'>
									<input
										type='checkbox'
										checked={isChecked}
										onChange={e =>
											handleFilterChange(
												'styles',
												option.value,
												e.target.checked
											)
										}
									/>
									<span className='filter-sidebar__option-label'>
										{option.label} ({option.count})
									</span>
								</label>
							);
						})}
					</div>
				</div>

				{/* Materials */}
				<div className='filter-sidebar__group'>
					<h4 className='filter-sidebar__group-title'>Materials</h4>
					<div className='filter-sidebar__options'>
						{portfolioFilters.materials.map(option => {
							const isChecked =
								filters.materials?.includes(option.value) || false;
							return (
								<label key={option.value} className='filter-sidebar__option'>
									<input
										type='checkbox'
										checked={isChecked}
										onChange={e =>
											handleFilterChange(
												'materials',
												option.value,
												e.target.checked
											)
										}
									/>
									<span className='filter-sidebar__option-label'>
										{option.label} ({option.count})
									</span>
								</label>
							);
						})}
					</div>
				</div>

				{/* Layouts */}
				<div className='filter-sidebar__group'>
					<h4 className='filter-sidebar__group-title'>Layouts</h4>
					<div className='filter-sidebar__options'>
						{portfolioFilters.layouts.map(option => {
							const isChecked =
								filters.layouts?.includes(option.value) || false;
							return (
								<label key={option.value} className='filter-sidebar__option'>
									<input
										type='checkbox'
										checked={isChecked}
										onChange={e =>
											handleFilterChange(
												'layouts',
												option.value,
												e.target.checked
											)
										}
									/>
									<span className='filter-sidebar__option-label'>
										{option.label} ({option.count})
									</span>
								</label>
							);
						})}
					</div>
				</div>

				{/* Sizes */}
				<div className='filter-sidebar__group'>
					<h4 className='filter-sidebar__group-title'>Sizes</h4>
					<div className='filter-sidebar__options'>
						{portfolioFilters.sizes.map(option => {
							const isChecked = filters.sizes?.includes(option.value) || false;
							return (
								<label key={option.value} className='filter-sidebar__option'>
									<input
										type='checkbox'
										checked={isChecked}
										onChange={e =>
											handleFilterChange(
												'sizes',
												option.value,
												e.target.checked
											)
										}
									/>
									<span className='filter-sidebar__option-label'>
										{option.label} ({option.count})
									</span>
								</label>
							);
						})}
					</div>
				</div>

				{/* Budgets */}
				<div className='filter-sidebar__group'>
					<h4 className='filter-sidebar__group-title'>Budgets</h4>
					<div className='filter-sidebar__options'>
						{portfolioFilters.budgets.map(option => {
							const isChecked =
								filters.budgets?.includes(option.value) || false;
							return (
								<label key={option.value} className='filter-sidebar__option'>
									<input
										type='checkbox'
										checked={isChecked}
										onChange={e =>
											handleFilterChange(
												'budgets',
												option.value,
												e.target.checked
											)
										}
									/>
									<span className='filter-sidebar__option-label'>
										{option.label} ({option.count})
									</span>
								</label>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FilterSidebar;
