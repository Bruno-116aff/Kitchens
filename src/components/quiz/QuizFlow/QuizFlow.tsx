import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizData } from '../../../types';
import QuizStep from '../QuizStep/QuizStep';
import QuizProgressBar from '../QuizProgressBar/QuizProgressBar';
import QuizResult from '../QuizResult/QuizResult';
import { apiService } from '../../../services/api';
import './QuizFlow.css';

interface QuizFlowProps {
	onComplete?: (data: QuizData, result: any) => void;
	className?: string;
}

const QUIZ_STEPS = [
	{
		id: 'kitchenType',
		title: 'What type of kitchen do you need?',
		options: [
			{
				value: 'modular',
				label: 'Modular Kitchen',
				description: 'Pre-designed modules, faster delivery',
			},
			{
				value: 'custom',
				label: 'Custom Kitchen',
				description: 'Tailored to your space and needs',
			},
			{
				value: 'premium',
				label: 'Premium Kitchen',
				description: 'High-end materials and finishes',
			},
			{
				value: 'individual',
				label: 'Individual Project',
				description: 'Completely bespoke design',
			},
		],
	},
	{
		id: 'layout',
		title: 'What layout fits your space?',
		options: [
			{
				value: 'linear',
				label: 'Linear',
				description: 'Straight line along one wall',
			},
			{
				value: 'l-shaped',
				label: 'L-Shaped',
				description: 'Two walls forming an L',
			},
			{
				value: 'u-shaped',
				label: 'U-Shaped',
				description: 'Three walls forming a U',
			},
			{
				value: 'island',
				label: 'Island',
				description: 'Central island with surrounding cabinets',
			},
			{
				value: 'two-row',
				label: 'Two-Row',
				description: 'Kitchen facing dining area',
			},
		],
	},
	{
		id: 'dimensions',
		title: 'What are your room dimensions?',
		type: 'dimensions',
	},
	{
		id: 'style',
		title: 'What style appeals to you?',
		options: [
			{
				value: 'modern',
				label: 'Modern',
				description: 'Clean lines, minimalist design',
			},
			{
				value: 'classic',
				label: 'Classic',
				description: 'Traditional, timeless elegance',
			},
			{
				value: 'scandinavian',
				label: 'Scandinavian',
				description: 'Light wood, natural materials',
			},
			{
				value: 'loft',
				label: 'Loft',
				description: 'Industrial, exposed elements',
			},
			{
				value: 'minimalist',
				label: 'Minimalist',
				description: 'Simple, uncluttered spaces',
			},
			{
				value: 'provence',
				label: 'Provence',
				description: 'French country, rustic charm',
			},
		],
	},
	{
		id: 'countertop',
		title: 'What countertop material do you prefer?',
		options: [
			{
				value: 'laminate',
				label: 'Laminate',
				description: 'Budget-friendly, many colors',
			},
			{
				value: 'acrylic',
				label: 'Acrylic',
				description: 'Seamless, modern look',
			},
			{
				value: 'quartz',
				label: 'Quartz',
				description: 'Durable, low maintenance',
			},
			{
				value: 'natural-stone',
				label: 'Natural Stone',
				description: 'Marble, granite luxury',
			},
			{ value: 'wood', label: 'Wood', description: 'Warm, natural finish' },
		],
	},
	{
		id: 'appliances',
		title: 'What appliance package do you need?',
		options: [
			{
				value: 'basic',
				label: 'Basic',
				description: 'Essential appliances only',
			},
			{
				value: 'standard',
				label: 'Standard',
				description: 'Good quality, mid-range',
			},
			{
				value: 'premium',
				label: 'Premium',
				description: 'High-end, professional grade',
			},
			{
				value: 'none',
				label: 'None',
				description: 'I already have appliances',
			},
		],
	},
	{
		id: 'budget',
		title: 'What is your budget range?',
		options: [
			{
				value: 'budget-low',
				label: 'Under €5,000',
				description: 'Essential features, quality materials',
			},
			{
				value: 'budget-medium',
				label: '€5,000 - €10,000',
				description: 'Good value, premium touches',
			},
			{
				value: 'budget-high',
				label: '€10,000 - €20,000',
				description: 'Premium materials and features',
			},
			{
				value: 'budget-premium',
				label: '€20,000+',
				description: 'Luxury finishes and appliances',
			},
		],
	},
];

const QuizFlow: React.FC<QuizFlowProps> = ({ onComplete, className = '' }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [quizData, setQuizData] = useState<Partial<QuizData>>({
		dimensions: { width: 3, height: 2.5, depth: 0.6 },
	});
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState<any>(null);

	const progress = ((currentStep + 1) / QUIZ_STEPS.length) * 100;

	const handleStepComplete = (stepId: string, value: any) => {
		setQuizData(prev => ({
			...prev,
			[stepId]: value,
		}));

		// Auto-advance to next step
		if (currentStep < QUIZ_STEPS.length - 1) {
			setTimeout(() => {
				setCurrentStep(prev => prev + 1);
			}, 300);
		} else {
			// Last step completed, calculate result
			handleQuizComplete();
		}
	};

	const handleQuizComplete = async () => {
		setIsLoading(true);

		try {
			const completeData = quizData as QuizData;
			const quizResult = await apiService.submitQuiz(completeData);
			setResult(quizResult);

			if (onComplete) {
				onComplete(completeData, quizResult);
			}
		} catch (error) {
			console.error('Quiz completion error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoBack = () => {
		if (currentStep > 0) {
			setCurrentStep(prev => prev - 1);
		}
	};

	const handleRestart = () => {
		setCurrentStep(0);
		setQuizData({ dimensions: { width: 3, height: 2.5, depth: 0.6 } });
		setResult(null);
	};

	// Save progress to localStorage
	useEffect(() => {
		if (Object.keys(quizData).length > 1) {
			localStorage.setItem(
				'kitchen-quiz-progress',
				JSON.stringify({
					currentStep,
					quizData,
				})
			);
		}
	}, [currentStep, quizData]);

	// Load progress from localStorage on mount
	useEffect(() => {
		const savedProgress = localStorage.getItem('kitchen-quiz-progress');
		if (savedProgress) {
			try {
				const { currentStep: savedStep, quizData: savedData } =
					JSON.parse(savedProgress);
				setCurrentStep(savedStep);
				setQuizData(savedData);
			} catch (error) {
				console.error('Error loading quiz progress:', error);
			}
		}
	}, []);

	const quizClasses = ['quiz-flow', className].filter(Boolean).join(' ');

	if (result) {
		return (
			<QuizResult
				result={result}
				quizData={quizData as QuizData}
				onRestart={handleRestart}
			/>
		);
	}

	return (
		<div className={quizClasses}>
			<QuizProgressBar progress={progress} />

			<div className='quiz-flow__content'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={currentStep}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
					>
						<QuizStep
							step={QUIZ_STEPS[currentStep]}
							currentValue={
								quizData[QUIZ_STEPS[currentStep].id as keyof QuizData]
							}
							onComplete={handleStepComplete}
							onGoBack={currentStep > 0 ? handleGoBack : undefined}
							isLoading={isLoading}
						/>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default QuizFlow;
