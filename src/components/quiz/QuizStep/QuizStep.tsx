import React from 'react';
import QuizOption from '../QuizOption/QuizOption';
import './QuizStep.css';

interface QuizStepProps {
	step: {
		id: string;
		title: string;
		options?: Array<{
			value: string;
			label: string;
			description: string;
		}>;
		type?: string;
	};
	currentValue: any;
	onComplete: (stepId: string, value: any) => void;
	onGoBack?: () => void;
	isLoading?: boolean;
}

const QuizStep: React.FC<QuizStepProps> = ({
	step,
	currentValue,
	onComplete,
	onGoBack,
	isLoading = false,
}) => {
	const handleOptionSelect = (value: string) => {
		onComplete(step.id, value);
	};

	const handleDimensionsChange = (dimension: string, value: number) => {
		const newDimensions = {
			...currentValue,
			[dimension]: value,
		};
		onComplete(step.id, newDimensions);
	};

	const renderContent = () => {
		if (step.type === 'dimensions') {
			return (
				<div className='quiz-step__dimensions'>
					<div className='quiz-step__dimension-input'>
						<label htmlFor='width'>Width (meters)</label>
						<input
							id='width'
							type='number'
							min='1'
							max='10'
							step='0.1'
							value={currentValue?.width || 3}
							onChange={e =>
								handleDimensionsChange('width', parseFloat(e.target.value))
							}
							disabled={isLoading}
						/>
					</div>

					<div className='quiz-step__dimension-input'>
						<label htmlFor='height'>Height (meters)</label>
						<input
							id='height'
							type='number'
							min='2'
							max='3'
							step='0.1'
							value={currentValue?.height || 2.5}
							onChange={e =>
								handleDimensionsChange('height', parseFloat(e.target.value))
							}
							disabled={isLoading}
						/>
					</div>

					<div className='quiz-step__dimension-input'>
						<label htmlFor='depth'>Depth (meters)</label>
						<input
							id='depth'
							type='number'
							min='0.3'
							max='1'
							step='0.1'
							value={currentValue?.depth || 0.6}
							onChange={e =>
								handleDimensionsChange('depth', parseFloat(e.target.value))
							}
							disabled={isLoading}
						/>
					</div>

					<div className='quiz-step__dimension-summary'>
						<p>
							Room size: {currentValue?.width || 3}m ×{' '}
							{currentValue?.height || 2.5}m × {currentValue?.depth || 0.6}m
						</p>
						<p className='quiz-step__dimension-area'>
							Area:{' '}
							{(
								(currentValue?.width || 3) * (currentValue?.depth || 0.6)
							).toFixed(1)}{' '}
							m²
						</p>
					</div>
				</div>
			);
		}

		if (step.options) {
			return (
				<div className='quiz-step__options'>
					{step.options.map(option => (
						<QuizOption
							key={option.value}
							option={option}
							isSelected={currentValue === option.value}
							onSelect={handleOptionSelect}
							disabled={isLoading}
						/>
					))}
				</div>
			);
		}

		return null;
	};

	return (
		<div className='quiz-step'>
			<div className='quiz-step__header'>
				<h2 className='quiz-step__title'>{step.title}</h2>
				{onGoBack && (
					<button
						className='quiz-step__back-button'
						onClick={onGoBack}
						disabled={isLoading}
					>
						<svg
							width='20'
							height='20'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M19 12H5M12 19L5 12L12 5'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						Back
					</button>
				)}
			</div>

			<div className='quiz-step__content'>{renderContent()}</div>

			{isLoading && (
				<div className='quiz-step__loading'>
					<div className='quiz-step__spinner' />
					<p>Calculating your kitchen price...</p>
				</div>
			)}
		</div>
	);
};

export default QuizStep;
