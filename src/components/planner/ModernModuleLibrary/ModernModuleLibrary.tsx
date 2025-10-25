import React from 'react';
import { useDrag } from 'react-dnd';
import type { KitchenModule } from '../../../types';
import './ModernModuleLibrary.css';

interface ModernModuleLibraryProps {
	onModuleSelect?: (moduleType: KitchenModule['type']) => void;
	onModuleAdd?: (module: Omit<KitchenModule, 'id'>) => void;
}

interface DraggedModule {
	type: 'module';
	moduleType: KitchenModule['type'];
	moduleData: Partial<KitchenModule>;
}

const ModernModuleLibrary: React.FC<ModernModuleLibraryProps> = ({
	onModuleSelect,
	onModuleAdd,
}) => {
	const moduleCategories = [
		{
			name: 'Cabinets',
			icon: '📦',
			color: '#8b5cf6',
			modules: [
				{
					type: 'cabinet' as const,
					name: 'Base Cabinet',
					icon: '📦',
					description: 'Standard base cabinet with drawers',
					width: 80,
					height: 60,
					price: 250,
					materials: ['Wood', 'Hardware'],
				},
				{
					type: 'cabinet' as const,
					name: 'Wall Cabinet',
					icon: '📦',
					description: 'Wall-mounted cabinet with glass doors',
					width: 80,
					height: 40,
					price: 180,
					materials: ['Wood', 'Glass'],
				},
				{
					type: 'cabinet' as const,
					name: 'Tall Cabinet',
					icon: '📦',
					description: 'Floor-to-ceiling pantry cabinet',
					width: 60,
					height: 120,
					price: 450,
					materials: ['Wood', 'Shelving'],
				},
				{
					type: 'cabinet' as const,
					name: 'Corner Cabinet',
					icon: '📦',
					description: 'Corner cabinet with lazy susan',
					width: 100,
					height: 60,
					price: 320,
					materials: ['Wood', 'Lazy Susan'],
				},
			],
		},
		{
			name: 'Counters',
			icon: '🪑',
			color: '#06b6d4',
			modules: [
				{
					type: 'counter' as const,
					name: 'Granite Counter',
					icon: '🪑',
					description: 'Premium granite countertop',
					width: 120,
					height: 40,
					price: 800,
					materials: ['Granite', 'Sealant'],
				},
				{
					type: 'counter' as const,
					name: 'Quartz Counter',
					icon: '🪑',
					description: 'Engineered quartz countertop',
					width: 120,
					height: 40,
					price: 650,
					materials: ['Quartz', 'Resin'],
				},
				{
					type: 'counter' as const,
					name: 'Wood Counter',
					icon: '🪑',
					description: 'Solid wood butcher block',
					width: 120,
					height: 40,
					price: 400,
					materials: ['Hardwood', 'Oil Finish'],
				},
				{
					type: 'counter' as const,
					name: 'Peninsula',
					icon: '🪑',
					description: 'Kitchen peninsula with seating',
					width: 160,
					height: 40,
					price: 1200,
					materials: ['Granite', 'Wood Base'],
				},
			],
		},
		{
			name: 'Appliances',
			icon: '🔥',
			color: '#ef4444',
			modules: [
				{
					type: 'appliance' as const,
					name: 'Refrigerator',
					icon: '🧊',
					description: 'French door refrigerator',
					width: 70,
					height: 80,
					price: 1200,
					materials: ['Stainless Steel', 'Compressor'],
				},
				{
					type: 'appliance' as const,
					name: 'Dishwasher',
					icon: '🍽️',
					description: 'Built-in dishwasher',
					width: 60,
					height: 60,
					price: 600,
					materials: ['Stainless Steel', 'Motor'],
				},
				{
					type: 'appliance' as const,
					name: 'Gas Range',
					icon: '🔥',
					description: 'Professional gas range',
					width: 80,
					height: 50,
					price: 1500,
					materials: ['Stainless Steel', 'Gas Burners'],
				},
				{
					type: 'appliance' as const,
					name: 'Microwave',
					icon: '📡',
					description: 'Over-the-range microwave',
					width: 50,
					height: 40,
					price: 300,
					materials: ['Stainless Steel', 'Magnetron'],
				},
			],
		},
		{
			name: 'Fixtures',
			icon: '🚰',
			color: '#10b981',
			modules: [
				{
					type: 'sink' as const,
					name: 'Single Sink',
					icon: '🚰',
					description: 'Single bowl stainless steel sink',
					width: 70,
					height: 50,
					price: 200,
					materials: ['Stainless Steel', 'Faucet'],
				},
				{
					type: 'sink' as const,
					name: 'Double Sink',
					icon: '🚰',
					description: 'Double bowl sink with disposal',
					width: 100,
					height: 50,
					price: 350,
					materials: ['Stainless Steel', 'Disposal'],
				},
				{
					type: 'sink' as const,
					name: 'Farmhouse Sink',
					icon: '🚰',
					description: 'Apron front farmhouse sink',
					width: 80,
					height: 60,
					price: 500,
					materials: ['Fireclay', 'Faucet'],
				},
			],
		},
		{
			name: 'Islands',
			icon: '🏝️',
			color: '#f59e0b',
			modules: [
				{
					type: 'island' as const,
					name: 'Kitchen Island',
					icon: '🏝️',
					description: 'Freestanding kitchen island',
					width: 120,
					height: 80,
					price: 2000,
					materials: ['Wood', 'Granite', 'Storage'],
				},
				{
					type: 'island' as const,
					name: 'Peninsula Island',
					icon: '🏝️',
					description: 'Connected peninsula island',
					width: 160,
					height: 60,
					price: 1800,
					materials: ['Wood', 'Quartz', 'Seating'],
				},
			],
		},
	];

	const DraggableModule: React.FC<{
		module: any;
		categoryColor: string;
	}> = ({ module, categoryColor }) => {
		const [{ isDragging }, drag] = useDrag({
			type: 'module',
			item: {
				type: 'module',
				moduleType: module.type,
				moduleData: {
					name: module.name,
					width: module.width,
					height: module.height,
				},
			} as DraggedModule,
			collect: monitor => ({
				isDragging: monitor.isDragging(),
			}),
		});

		return (
			<div
				ref={drag as any}
				className={`modern-module-library__module ${
					isDragging ? 'modern-module-library__module--dragging' : ''
				}`}
				style={{ borderLeftColor: categoryColor }}
				onClick={() => {
					if (onModuleSelect) {
						onModuleSelect(module.type);
					}
					if (onModuleAdd) {
						const newModule: Omit<KitchenModule, 'id'> = {
							type: module.type,
							name: module.name,
							x: 100 + Math.random() * 200,
							y: 100 + Math.random() * 100,
							width: module.width,
							height: module.height,
							rotation: 0,
						};
						onModuleAdd(newModule);
					}
				}}
			>
				<div className='modern-module-library__module-header'>
					<div className='modern-module-library__module-icon'>
						{module.icon}
					</div>
					<div className='modern-module-library__module-info'>
						<h4 className='modern-module-library__module-name'>
							{module.name}
						</h4>
						<p className='modern-module-library__module-description'>
							{module.description}
						</p>
					</div>
				</div>

				<div className='modern-module-library__module-details'>
					<div className='modern-module-library__module-specs'>
						<span className='modern-module-library__module-size'>
							{module.width}×{module.height} cm
						</span>
						<span className='modern-module-library__module-price'>
							€{module.price}
						</span>
					</div>
					<div className='modern-module-library__module-materials'>
						{module.materials.map((material: string, index: number) => (
							<span
								key={index}
								className='modern-module-library__module-material'
							>
								{material}
							</span>
						))}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className='modern-module-library'>
			<div className='modern-module-library__header'>
				<h3>Module Library</h3>
				<p>Drag modules to add them to your kitchen design</p>
			</div>

			<div className='modern-module-library__content'>
				{moduleCategories.map((category, categoryIndex) => (
					<div key={categoryIndex} className='modern-module-library__category'>
						<div
							className='modern-module-library__category-header'
							style={{ borderLeftColor: category.color }}
						>
							<div className='modern-module-library__category-icon'>
								{category.icon}
							</div>
							<h4 className='modern-module-library__category-title'>
								{category.name}
							</h4>
						</div>

						<div className='modern-module-library__modules'>
							{category.modules.map((module, moduleIndex) => (
								<DraggableModule
									key={`${categoryIndex}-${moduleIndex}`}
									module={module}
									categoryColor={category.color}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ModernModuleLibrary;
