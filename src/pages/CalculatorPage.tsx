import React from 'react';
import QuizFlow from '../components/quiz/QuizFlow/QuizFlow';
import './CalculatorPage.css';

const CalculatorPage: React.FC = () => {
	const handleQuizComplete = (data: any, result: any) => {
		console.log('Quiz completed:', { data, result });
		// Here you could track analytics, redirect to booking, etc.
	};

	return (
		<div className='calculator-page'>
			<div className='container'>
				<div className='calculator-page__header'>
					<h1>Kitchen Price Calculator</h1>
					<p>Get your personalized kitchen quote in just 60 seconds</p>
				</div>

				<div className='calculator-page__content'>
					<QuizFlow onComplete={handleQuizComplete} />
				</div>
			</div>
		</div>
	);
};

export default CalculatorPage;
