import React from 'react';
import './Stepper.css';

interface Step {
	id: string;
	title: string;
	description?: string;
}

interface StepperProps {
	steps: string[] | Step[];
	currentStep: number;
	completed?: number[];
	className?: string;
	onStepClick?: (stepIndex: number) => void;
}

const Stepper: React.FC<StepperProps> = ({
	steps,
	currentStep,
	completed = [],
	className = '',
	onStepClick,
}) => {
	const stepperClasses = ['stepper', className].filter(Boolean).join(' ');

	return (
		<div className={stepperClasses}>
			{steps.map((step, index) => {
				const stepNumber = index + 1;
				const isCompleted = completed.includes(stepNumber);
				const isCurrent = stepNumber === currentStep;
				const isActive = isCompleted || isCurrent;
				
				// Handle both string and object steps
				const stepTitle = typeof step === 'string' ? step : step.title;
				const stepId = typeof step === 'string' ? `step-${index}` : step.id;

				const stepClasses = [
					'stepper__step',
					isCompleted && 'stepper__step--completed',
					isCurrent && 'stepper__step--current',
					isActive && 'stepper__step--active',
					onStepClick && 'stepper__step--clickable',
				]
					.filter(Boolean)
					.join(' ');

				return (
					<div 
						key={stepId} 
						className={stepClasses}
						onClick={() => onStepClick?.(index)}
					>
						<div className='stepper__step-number'>
							{isCompleted ? (
								<svg
									className='stepper__check-icon'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M9 12L11 14L15 10'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							) : (
								stepNumber
							)}
						</div>
						<div className='stepper__step-label'>{stepTitle}</div>
						{index < steps.length - 1 && <div className='stepper__connector' />}
					</div>
				);
			})}
		</div>
	);
};

export default Stepper;
