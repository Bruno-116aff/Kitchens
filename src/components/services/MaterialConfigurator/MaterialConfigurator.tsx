import React, { useState, useEffect } from 'react';
import type { MaterialConfig } from '../../../types';
import './MaterialConfigurator.css';

interface MaterialConfiguratorProps {
	onConfigChange?: (config: MaterialConfig) => void;
}

const MaterialConfigurator: React.FC<MaterialConfiguratorProps> = ({
	onConfigChange,
}) => {
	const [config, setConfig] = useState<MaterialConfig>({
		facade: 'mdf',
		countertop: 'laminate',
		hardware: 'standard',
		appliances: 'basic',
	});

	const [totalPrice, setTotalPrice] = useState<number>(0);

	const materialOptions = {
		facade: [
			{
				id: 'mdf',
				name: 'MDF',
				description: 'Средняя плотность, доступная цена',
				price: 0,
				image: '/Kitchens/images/portfolio/project-1/3.jpg',
			},
			{
				id: 'ldsp',
				name: 'ЛДСП',
				description: 'Ламинированная ДСП, практичность',
				price: 100,
				image: '/Kitchens/images/portfolio/project-3/3.jpg',
			},
			{
				id: 'solid-wood',
				name: 'Массив дерева',
				description: 'Натуральное дерево, премиум качество',
				price: 500,
				image: '/Kitchens/images/portfolio/project-11/3.jpg',
			},
			{
				id: 'acrylic',
				name: 'Акрил',
				description: 'Современный глянцевый фасад',
				price: 300,
				image: '/Kitchens/images/portfolio/project-6/3.jpg',
			},
		],
		countertop: [
			{
				id: 'laminate',
				name: 'Ламинат',
				description: 'Доступно и практично',
				price: 0,
				image: '/Kitchens/images/portfolio/project-5/3.jpg',
			},
			{
				id: 'acrylic',
				name: 'Акриловая столешница',
				description: 'Бесшовная, современная',
				price: 200,
				image: '/Kitchens/images/portfolio/project-1/4.jpg',
			},
			{
				id: 'quartz',
				name: 'Кварц',
				description: 'Прочность и красота',
				price: 400,
				image: '/Kitchens/images/portfolio/project-8/4.jpg',
			},
			{
				id: 'natural-stone',
				name: 'Натуральный камень',
				description: 'Эксклюзивность и долговечность',
				price: 600,
				image: '/Kitchens/images/portfolio/project-11/4.jpg',
			},
		],
		hardware: [
			{
				id: 'standard',
				name: 'Стандартная фурнитура',
				description: 'Blum, Hettich - надежность',
				price: 0,
			},
			{
				id: 'premium',
				name: 'Премиум фурнитура',
				description: 'Blum Legrabox, Hettich InnoTech',
				price: 150,
			},
			{
				id: 'luxury',
				name: 'Люкс фурнитура',
				description: 'Скрытые механизмы, мягкое закрытие',
				price: 300,
			},
		],
		appliances: [
			{
				id: 'basic',
				name: 'Базовая комплектация',
				description: 'Электрическая плита, холодильник',
				price: 0,
			},
			{
				id: 'standard',
				name: 'Стандартная комплектация',
				description: 'Встраиваемая техника Bosch, Electrolux',
				price: 800,
			},
			{
				id: 'premium',
				name: 'Премиум комплектация',
				description: 'Техника Miele, Siemens, кофемашина',
				price: 1500,
			},
			{
				id: 'luxury',
				name: 'Люкс комплектация',
				description: 'Техника Gaggenau, Sub-Zero, винный холодильник',
				price: 3000,
			},
		],
	};

	useEffect(() => {
		calculateTotalPrice();
	}, [config]);

	const calculateTotalPrice = () => {
		let total = 8000; // Базовая цена кухни

		// Добавляем стоимость материалов
		const facadePrice =
			materialOptions.facade.find(f => f.id === config.facade)?.price || 0;
		const countertopPrice =
			materialOptions.countertop.find(c => c.id === config.countertop)?.price ||
			0;
		const hardwarePrice =
			materialOptions.hardware.find(h => h.id === config.hardware)?.price || 0;
		const appliancesPrice =
			materialOptions.appliances.find(a => a.id === config.appliances)?.price ||
			0;

		total += facadePrice + countertopPrice + hardwarePrice + appliancesPrice;

		setTotalPrice(total);

		if (onConfigChange) {
			onConfigChange({
				...config,
				totalPrice: total,
			});
		}
	};

	const handleMaterialChange = (
		category: keyof MaterialConfig,
		value: string
	) => {
		setConfig(prev => ({
			...prev,
			[category]: value,
		}));
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<div className='material-configurator'>
			<div className='material-configurator__header'>
				<h3>Material Configurator</h3>
				<p>Choose materials and get instant pricing</p>
				<div className='material-configurator__total-price'>
					<span>Total Price:</span>
					<span className='material-configurator__price'>
						{formatCurrency(totalPrice)}
					</span>
				</div>
			</div>

			<div className='material-configurator__sections'>
				{Object.entries(materialOptions).map(([category, options]) => (
					<div key={category} className='material-configurator__section'>
						<h4 className='material-configurator__section-title'>
							{category === 'facade' && 'Facade Material'}
							{category === 'countertop' && 'Countertop'}
							{category === 'hardware' && 'Hardware'}
							{category === 'appliances' && 'Appliances'}
						</h4>
						<div className='material-configurator__options'>
							{options.map(option => (
								<div
									key={option.id}
									className={`material-configurator__option ${
										config[category as keyof MaterialConfig] === option.id
											? 'material-configurator__option--selected'
											: ''
									}`}
									onClick={() =>
										handleMaterialChange(
											category as keyof MaterialConfig,
											option.id
										)
									}
								>
									{(option as any).image && (
										<div className='material-configurator__option-image'>
											<img src={(option as any).image} alt={option.name} />
										</div>
									)}
									<div className='material-configurator__option-content'>
										<div className='material-configurator__option-header'>
											<h5>{option.name}</h5>
											{option.price > 0 && (
												<span className='material-configurator__option-price'>
													+{formatCurrency(option.price)}
												</span>
											)}
										</div>
										<p className='material-configurator__option-description'>
											{option.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<div className='material-configurator__actions'>
				<button className='material-configurator__btn material-configurator__btn--primary'>
					Get Quote
				</button>
				<button className='material-configurator__btn'>
					Save Configuration
				</button>
			</div>
		</div>
	);
};

export default MaterialConfigurator;
