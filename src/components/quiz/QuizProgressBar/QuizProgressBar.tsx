import React from 'react';
import ProgressBar from '../../common/ProgressBar/ProgressBar';
import './QuizProgressBar.css';

interface QuizProgressBarProps {
	progress: number; // 0-100
	className?: string;
}

const QuizProgressBar: React.FC<QuizProgressBarProps> = ({
	progress,
	className = '',
}) => {
	const progressClasses = ['quiz-progress-bar', className]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={progressClasses}>
			<div className='quiz-progress-bar__header'>
				<h3 className='quiz-progress-bar__title'>Kitchen Price Calculator</h3>
				<span className='quiz-progress-bar__step'>
					Step {Math.ceil((progress / 100) * 7)} of 7
				</span>
			</div>

			<div className='quiz-progress-bar__progress'>
				<ProgressBar
					progress={progress}
					variant='success'
					animated
					showPercentage
				/>
			</div>

			<div className='quiz-progress-bar__description'>
				<p>Answer a few questions to get your personalized kitchen quote</p>
			</div>
		</div>
	);
};

export default QuizProgressBar;
