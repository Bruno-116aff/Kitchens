import React, { useState } from 'react';
import FinanceCalculator from '../components/finance/FinanceCalculator/FinanceCalculator';
import FinanceComparison from '../components/finance/FinanceComparison/FinanceComparison';
import type { FinanceCalculationResult } from '../components/finance/FinanceCalculator/FinanceCalculator';
import './FinancingPage.css';

const FinancingPage: React.FC = () => {
	const [calculationResult, setCalculationResult] =
		useState<FinanceCalculationResult | null>(null);

	const handleCalculate = (result: FinanceCalculationResult) => {
		setCalculationResult(result);
	};

	return (
		<div className='financing-page'>
			<div className='container'>
				<div className='financing-page__header'>
					<h1>Kitchen Financing Options</h1>
					<p>Flexible payment plans to make your dream kitchen affordable</p>
				</div>

				<div className='financing-page__content'>
					<div className='financing-page__calculator'>
						<FinanceCalculator onCalculate={handleCalculate} />
					</div>

					{calculationResult && (
						<div className='financing-page__comparison'>
							<FinanceComparison baseResult={calculationResult} />
						</div>
					)}
				</div>

				<div className='financing-page__info'>
					<div className='financing-page__info-grid'>
						<div className='financing-page__info-card'>
							<h3>🏦 Flexible Terms</h3>
							<p>
								Choose from 12 to 60-month payment plans that fit your budget
							</p>
						</div>
						<div className='financing-page__info-card'>
							<h3>⚡ Quick Approval</h3>
							<p>
								Get approved in minutes with our streamlined application process
							</p>
						</div>
						<div className='financing-page__info-card'>
							<h3>💰 Competitive Rates</h3>
							<p>Enjoy competitive interest rates starting from 4.9% APR</p>
						</div>
						<div className='financing-page__info-card'>
							<h3>🔒 No Hidden Fees</h3>
							<p>Transparent pricing with no hidden fees or surprises</p>
						</div>
					</div>
				</div>

				<div className='financing-page__cta'>
					<h2>Ready to Get Started?</h2>
					<p>
						Contact us today to discuss your financing options and get
						pre-approved
					</p>
					<div className='financing-page__cta-buttons'>
						<a
							href='/contact'
							className='financing-page__cta-btn financing-page__cta-btn--primary'
						>
							Get Pre-Approved
						</a>
						<a href='/calculator' className='financing-page__cta-btn'>
							Calculate Your Quote
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FinancingPage;
