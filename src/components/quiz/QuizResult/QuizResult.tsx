import React from 'react';
import { motion } from 'framer-motion';
import PriceTag from '../../common/PriceTag/PriceTag';
import './QuizResult.css';
import Card from '../../common/Card';
import Button from '../../common/Button';

interface QuizResultProps {
	result: {
		priceRange: {
			min: number;
			max: number;
		};
		presets: Array<{
			id: string;
			name: string;
			price: number;
			description: string;
			image: string;
		}>;
		recommendations: string[];
	};
	quizData: any;
	onRestart: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ result, onRestart }) => {
	const handleBookAppointment = () => {
		// Navigate to booking page with pre-filled data
		window.location.href = '/book?source=quiz';
	};

	const handleGetQuote = () => {
		// Navigate to contact page with pre-filled data
		window.location.href = '/contact?source=quiz';
	};

	return (
		<motion.div
			className='quiz-result'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className='quiz-result__header'>
				<h1>Your Kitchen Price Estimate</h1>
				<p>Based on your preferences, here's what we recommend:</p>
			</div>

			<div className='quiz-result__price-range'>
				<Card className='quiz-result__price-card'>
					<div className='quiz-result__price-display'>
						<PriceTag
							price={result.priceRange.min}
							size='lg'
							variant='default'
						/>
						<span className='quiz-result__price-separator'>-</span>
						<PriceTag
							price={result.priceRange.max}
							size='lg'
							variant='highlight'
						/>
					</div>
					<p className='quiz-result__price-note'>
						This estimate includes design, materials, and installation
					</p>
				</Card>
			</div>

			<div className='quiz-result__presets'>
				<h2>Recommended Packages</h2>
				<div className='quiz-result__preset-grid'>
					{result.presets.map(preset => (
						<Card key={preset.id} className='quiz-result__preset-card'>
							<div className='quiz-result__preset-image'>
								<img
									src={preset.image}
									alt={preset.name}
									onError={e => {
										e.currentTarget.src = '/images/portfolio/project-1/1.jpg';
									}}
								/>
							</div>
							<div className='quiz-result__preset-content'>
								<h3>{preset.name}</h3>
								<PriceTag price={preset.price} size='md' variant='default' />
								<p>{preset.description}</p>
							</div>
						</Card>
					))}
				</div>
			</div>

			{result.recommendations.length > 0 && (
				<div className='quiz-result__recommendations'>
					<h2>Our Recommendations</h2>
					<ul>
						{result.recommendations.map((recommendation, index) => (
							<li key={index}>{recommendation}</li>
						))}
					</ul>
				</div>
			)}

			<div className='quiz-result__actions'>
				<Button
					variant='primary'
					size='lg'
					onClick={handleBookAppointment}
					className='quiz-result__cta'
				>
					Book Free Consultation
				</Button>

				<Button variant='secondary' size='lg' onClick={handleGetQuote}>
					Get Detailed Quote
				</Button>

				<Button
					variant='ghost'
					onClick={onRestart}
					className='quiz-result__restart'
				>
					Start Over
				</Button>
			</div>

			<div className='quiz-result__disclaimer'>
				<p>
					<strong>Disclaimer:</strong> This is an estimate based on your inputs.
					Final pricing may vary based on specific requirements, materials, and
					current market conditions. Contact us for a detailed quote.
				</p>
			</div>
		</motion.div>
	);
};

export default QuizResult;
