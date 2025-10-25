import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './QuizPreviewSection.css';
import Button from '../../common/Button';
import Card from '../../common/Card';

interface QuizPreviewSectionProps {
	className?: string;
}

const QuizPreviewSection: React.FC<QuizPreviewSectionProps> = ({
	className = '',
}) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [selectedOption, setSelectedOption] = useState(1);

	const quizSteps = [
		{
			question: 'What type of kitchen do you need?',
			options: ['Modular Kitchen', 'Custom Kitchen', 'Premium Kitchen'],
			step: 1,
		},
		{
			question: 'What layout fits your space?',
			options: ['Linear', 'L-Shaped', 'U-Shaped', 'Island'],
			step: 2,
		},
		{
			question: "What's your preferred style?",
			options: ['Modern', 'Classic', 'Scandinavian', 'Minimalist'],
			step: 3,
		},
		{
			question: "What's your budget range?",
			options: ['€5-10k', '€10-20k', '€20-30k', '€30k+'],
			step: 4,
		},
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentStep(prev => (prev + 1) % quizSteps.length);
			setSelectedOption(prev => (prev + 1) % 3);
		}, 3000);

		return () => clearInterval(interval);
	}, [quizSteps.length]);

	const handleStartQuiz = () => {
		window.location.href = '/calculator';
	};

	const sectionClasses = ['quiz-preview-section', className]
		.filter(Boolean)
		.join(' ');

	return (
		<section className={sectionClasses}>
			<div className='container'>
				<div className='quiz-preview-section__content'>
					<div className='quiz-preview-section__text'>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
						>
							Get Your Kitchen Price in 60 Seconds
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className='quiz-preview-section__description'
						>
							Answer 7 simple questions about your kitchen preferences and get
							an instant price estimate with personalized recommendations.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							viewport={{ once: true }}
							className='quiz-preview-section__features'
						>
							<div className='quiz-preview-section__feature'>
								<svg
									width='20'
									height='20'
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
								<span>Personalized recommendations</span>
							</div>
							<div className='quiz-preview-section__feature'>
								<svg
									width='20'
									height='20'
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
								<span>3 ready-made packages</span>
							</div>
							<div className='quiz-preview-section__feature'>
								<svg
									width='20'
									height='20'
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
								<span>Free consultation booking</span>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
							viewport={{ once: true }}
							className='quiz-preview-section__actions'
						>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Button
									variant='primary'
									size='lg'
									onClick={handleStartQuiz}
									className='quiz-preview-section__cta'
								>
									Start Price Calculator
								</Button>
							</motion.div>
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						viewport={{ once: true }}
						className='quiz-preview-section__visual'
					>
						<div
							className='quiz-preview-section__card quiz-preview-section__card--clickable'
							onClick={handleStartQuiz}
						>
							<Card className='quiz-preview-section__card-inner'>
								<div className='quiz-preview-section__quiz-preview'>
									<div className='quiz-preview-section__quiz-header'>
										<h3>Kitchen Price Calculator</h3>
										<div className='quiz-preview-section__click-indicator'>
											<span>Click to start</span>
										</div>
									</div>
									<div className='quiz-preview-section__step-indicator'>
										<span>Step {quizSteps[currentStep].step} of 7</span>
									</div>
									<div className='quiz-preview-section__quiz-progress'>
										<div className='quiz-preview-section__progress-bar'>
											<motion.div
												className='quiz-preview-section__progress-fill'
												animate={{
													width: `${(quizSteps[currentStep].step / 7) * 100}%`,
												}}
												transition={{ duration: 0.5, ease: 'easeInOut' }}
											/>
										</div>
									</div>
									<motion.div
										className='quiz-preview-section__quiz-question'
										key={currentStep}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3 }}
									>
										<h4>{quizSteps[currentStep].question}</h4>
									</motion.div>
									<motion.div
										className='quiz-preview-section__quiz-options'
										key={`options-${currentStep}`}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.3, delay: 0.1 }}
									>
										{quizSteps[currentStep].options.map((option, index) => (
											<motion.div
												key={`${currentStep}-${index}`}
												className={`quiz-preview-section__option quiz-preview-section__option--demo ${
													index === selectedOption
														? 'quiz-preview-section__option--selected'
														: ''
												}`}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.3, delay: index * 0.1 }}
												whileHover={{ scale: 1.02 }}
											>
												<span>{option}</span>
												{index === selectedOption && (
													<div className='quiz-preview-section__demo-indicator'>
														<div className='quiz-preview-section__demo-pulse'></div>
													</div>
												)}
											</motion.div>
										))}
									</motion.div>

									{/* Interactive elements */}
									<div className='quiz-preview-section__quiz-footer'>
										<div className='quiz-preview-section__demo-notice'>
											<span>
												This is a demo preview. Click anywhere on this card to
												begin the real quiz.
											</span>
										</div>
										<div className='quiz-preview-section__quiz-stats'>
											<div className='quiz-preview-section__stat'>
												<span className='quiz-preview-section__stat-number'>
													60s
												</span>
												<span className='quiz-preview-section__stat-label'>
													Duration
												</span>
											</div>
											<div className='quiz-preview-section__stat'>
												<span className='quiz-preview-section__stat-number'>
													7
												</span>
												<span className='quiz-preview-section__stat-label'>
													Questions
												</span>
											</div>
											<div className='quiz-preview-section__stat'>
												<span className='quiz-preview-section__stat-number'>
													3
												</span>
												<span className='quiz-preview-section__stat-label'>
													Packages
												</span>
											</div>
										</div>
									</div>
								</div>
							</Card>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default QuizPreviewSection;
