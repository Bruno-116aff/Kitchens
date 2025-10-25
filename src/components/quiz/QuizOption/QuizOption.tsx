import React from 'react';
import { motion } from 'framer-motion';
import './QuizOption.css';

interface QuizOptionProps {
	option: {
		value: string;
		label: string;
		description: string;
	};
	isSelected: boolean;
	onSelect: (value: string) => void;
	disabled?: boolean;
}

const QuizOption: React.FC<QuizOptionProps> = ({
	option,
	isSelected,
	onSelect,
	disabled = false,
}) => {
	const handleClick = () => {
		if (!disabled) {
			onSelect(option.value);
		}
	};

	const optionClasses = [
		'quiz-option',
		isSelected && 'quiz-option--selected',
		disabled && 'quiz-option--disabled',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<motion.div
			className={optionClasses}
			onClick={handleClick}
			whileHover={!disabled ? { scale: 1.02 } : {}}
			whileTap={!disabled ? { scale: 0.98 } : {}}
			transition={{ duration: 0.2 }}
		>
			<div className='quiz-option__content'>
				<div className='quiz-option__header'>
					<h3 className='quiz-option__label'>{option.label}</h3>
					<div className='quiz-option__indicator'>
						{isSelected && (
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M20 6L9 17L4 12'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						)}
					</div>
				</div>

				<p className='quiz-option__description'>{option.description}</p>
			</div>
		</motion.div>
	);
};

export default QuizOption;
