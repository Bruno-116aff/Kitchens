import React from 'react';
import type { KitchenModule } from '../../../types';
import './ModuleLibrary.css';

interface ModuleLibraryProps {
	onModuleSelect?: (moduleType: KitchenModule['type']) => void;
	onModuleAdd?: (module: Omit<KitchenModule, 'id'>) => void;
}

const ModuleLibrary: React.FC<ModuleLibraryProps> = ({
	onModuleSelect,
	onModuleAdd,
}) => {
	const moduleCategories = [
		{
			name: 'Cabinets',
			modules: [
				{
					type: 'cabinet' as const,
					name: 'Base Cabinet',
					icon: '📦',
					description: 'Standard base cabinet',
					width: 80,
					height: 60,
				},
				{
					type: 'cabinet' as const,
					name: 'Wall Cabinet',
					icon: '📦',
					description: 'Wall-mounted cabinet',
					width: 80,
					height: 40,
				},
				{
					type: 'cabinet' as const,
					name: 'Tall Cabinet',
					icon: '📦',
					description: 'Floor-to-ceiling cabinet',
					width: 60,
					height: 120,
				},
				{
					type: 'cabinet' as const,
					name: 'Corner Cabinet',
					icon: '📦',
					description: 'Corner cabinet with lazy susan',
					width: 100,
					height: 60,
				},
			],
		},
		{
			name: 'Counters',
			modules: [
				{
					type: 'counter' as const,
					name: 'Counter Top',
					icon: '🪑',
					description: 'Standard counter top',
					width: 120,
					height: 40,
				},
				{
					type: 'counter' as const,
					name: 'Peninsula',
					icon: '🪑',
					description: 'Counter peninsula',
					width: 160,
					height: 40,
				},
				{
					type: 'counter' as const,
					name: 'Breakfast Bar',
					icon: '🪑',
					description: 'Breakfast bar counter',
					width: 100,
					height: 30,
				},
			],
		},
		{
			name: 'Appliances',
			modules: [
				{
					type: 'appliance' as const,
					name: 'Refrigerator',
					icon: '🧊',
					description: 'Standard refrigerator',
					width: 70,
					height: 80,
				},
				{
					type: 'appliance' as const,
					name: 'Dishwasher',
					icon: '🍽️',
					description: 'Built-in dishwasher',
					width: 60,
					height: 60,
				},
				{
					type: 'appliance' as const,
					name: 'Oven',
					icon: '🔥',
					description: 'Built-in oven',
					width: 60,
					height: 60,
				},
				{
					type: 'appliance' as const,
					name: 'Microwave',
					icon: '📡',
					description: 'Microwave oven',
					width: 50,
					height: 40,
				},
				{
					type: 'appliance' as const,
					name: 'Hob',
					icon: '🔥',
					description: 'Cooktop/hob',
					width: 80,
					height: 50,
				},
			],
		},
		{
			name: 'Fixtures',
			modules: [
				{
					type: 'sink' as const,
					name: 'Single Sink',
					icon: '🚰',
					description: 'Single bowl sink',
					width: 70,
					height: 50,
				},
				{
					type: 'sink' as const,
					name: 'Double Sink',
					icon: '🚰',
					description: 'Double bowl sink',
					width: 100,
					height: 50,
				},
				{
					type: 'sink' as const,
					name: 'Island Sink',
					icon: '🚰',
					description: 'Island sink with disposal',
					width: 80,
					height: 60,
				},
			],
		},
		{
			name: 'Islands',
			modules: [
				{
					type: 'island' as const,
					name: 'Kitchen Island',
					icon: '🏝️',
					description: 'Freestanding kitchen island',
					width: 120,
					height: 80,
				},
				{
					type: 'island' as const,
					name: 'Peninsula Island',
					icon: '🏝️',
					description: 'Connected peninsula island',
					width: 160,
					height: 60,
				},
			],
		},
	];

	const handleModuleClick = (moduleInfo: any) => {
		if (onModuleSelect) {
			onModuleSelect(moduleInfo.type);
		}

		if (onModuleAdd) {
			const newModule: Omit<KitchenModule, 'id'> = {
				type: moduleInfo.type,
				name: moduleInfo.name,
				x: 100 + Math.random() * 200,
				y: 100 + Math.random() * 100,
				width: moduleInfo.width,
				height: moduleInfo.height,
				rotation: 0,
			};
			onModuleAdd(newModule);
		}
	};

	return (
		<div className='module-library'>
			<div className='module-library__header'>
				<h3>Module Library</h3>
				<p>Drag and drop modules to add them to your kitchen</p>
			</div>

			<div className='module-library__content'>
				{moduleCategories.map((category, categoryIndex) => (
					<div key={categoryIndex} className='module-library__category'>
						<h4 className='module-library__category-title'>{category.name}</h4>
						<div className='module-library__modules'>
							{category.modules.map((module, moduleIndex) => (
								<div
									key={`${categoryIndex}-${moduleIndex}`}
									className='module-library__module'
									onClick={() => handleModuleClick(module)}
									title={module.description}
								>
									<div className='module-library__module-icon'>
										{module.icon}
									</div>
									<div className='module-library__module-info'>
										<div className='module-library__module-name'>
											{module.name}
										</div>
										<div className='module-library__module-size'>
											{module.width}×{module.height}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ModuleLibrary;
