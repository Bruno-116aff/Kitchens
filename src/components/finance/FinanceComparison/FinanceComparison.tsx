import React, { useState, useEffect } from 'react';
import type { FinanceCalculationResult } from '../FinanceCalculator/FinanceCalculator';
import './FinanceComparison.css';

interface FinanceComparisonProps {
	baseResult?: FinanceCalculationResult;
	onCompare?: (results: FinanceComparisonResult[]) => void;
}

export interface FinanceComparisonResult {
	name: string;
	description: string;
	interestRate: number;
	loanTermMonths: number;
	monthlyPayment: number;
	totalInterest: number;
	totalCost: number;
	downPayment: number;
	features: string[];
	recommended?: boolean;
}

const FinanceComparison: React.FC<FinanceComparisonProps> = ({
	baseResult,
	onCompare,
}) => {
	const [comparisonResults, setComparisonResults] = useState<
		FinanceComparisonResult[]
	>([]);

	useEffect(() => {
		if (baseResult) {
			generateComparisonResults(baseResult);
		}
	}, [baseResult]);

	const generateComparisonResults = (base: FinanceCalculationResult) => {
		const results: FinanceComparisonResult[] = [
			{
				name: 'Standard Financing',
				description: 'Our standard financing option with competitive rates',
				interestRate: base.interestRate,
				loanTermMonths: base.loanTermMonths,
				monthlyPayment: base.monthlyPayment,
				totalInterest: base.totalInterest,
				totalCost: base.totalCost,
				downPayment: base.downPayment,
				features: ['Flexible terms', 'No prepayment penalty', 'Quick approval'],
			},
			{
				name: 'Extended Terms',
				description: 'Lower monthly payments with extended repayment period',
				interestRate: base.interestRate + 1.5,
				loanTermMonths: Math.min(base.loanTermMonths + 12, 60),
				monthlyPayment: calculateMonthlyPayment(
					base.financingAmount,
					base.interestRate + 1.5,
					Math.min(base.loanTermMonths + 12, 60)
				),
				totalInterest: calculateTotalInterest(
					calculateMonthlyPayment(
						base.financingAmount,
						base.interestRate + 1.5,
						Math.min(base.loanTermMonths + 12, 60)
					),
					Math.min(base.loanTermMonths + 12, 60),
					base.financingAmount
				),
				totalCost:
					base.totalAmount +
					calculateTotalInterest(
						calculateMonthlyPayment(
							base.financingAmount,
							base.interestRate + 1.5,
							Math.min(base.loanTermMonths + 12, 60)
						),
						Math.min(base.loanTermMonths + 12, 60),
						base.financingAmount
					),
				downPayment: base.downPayment,
				features: [
					'Lower monthly payments',
					'Extended terms',
					'Same approval process',
				],
			},
			{
				name: 'Premium Package',
				description:
					'Best rates for qualified customers with larger down payments',
				interestRate: Math.max(base.interestRate - 2, 4.9),
				loanTermMonths: base.loanTermMonths,
				monthlyPayment: calculateMonthlyPayment(
					base.financingAmount,
					Math.max(base.interestRate - 2, 4.9),
					base.loanTermMonths
				),
				totalInterest: calculateTotalInterest(
					calculateMonthlyPayment(
						base.financingAmount,
						Math.max(base.interestRate - 2, 4.9),
						base.loanTermMonths
					),
					base.loanTermMonths,
					base.financingAmount
				),
				totalCost:
					base.totalAmount +
					calculateTotalInterest(
						calculateMonthlyPayment(
							base.financingAmount,
							Math.max(base.interestRate - 2, 4.9),
							base.loanTermMonths
						),
						base.loanTermMonths,
						base.financingAmount
					),
				downPayment: Math.max(base.downPayment * 1.5, base.totalAmount * 0.3),
				features: [
					'Lowest interest rates',
					'Priority support',
					'Flexible payment options',
					'Early payoff benefits',
				],
				recommended: true,
			},
			{
				name: 'Quick Approval',
				description:
					'Fast approval with slightly higher rates for immediate financing',
				interestRate: base.interestRate + 3,
				loanTermMonths: base.loanTermMonths,
				monthlyPayment: calculateMonthlyPayment(
					base.financingAmount,
					base.interestRate + 3,
					base.loanTermMonths
				),
				totalInterest: calculateTotalInterest(
					calculateMonthlyPayment(
						base.financingAmount,
						base.interestRate + 3,
						base.loanTermMonths
					),
					base.loanTermMonths,
					base.financingAmount
				),
				totalCost:
					base.totalAmount +
					calculateTotalInterest(
						calculateMonthlyPayment(
							base.financingAmount,
							base.interestRate + 3,
							base.loanTermMonths
						),
						base.loanTermMonths,
						base.financingAmount
					),
				downPayment: base.downPayment,
				features: [
					'Same-day approval',
					'Minimal documentation',
					'Quick funding',
				],
			},
		];

		setComparisonResults(results);

		if (onCompare) {
			onCompare(results);
		}
	};

	const calculateMonthlyPayment = (
		amount: number,
		rate: number,
		months: number
	): number => {
		const monthlyRate = rate / 100 / 12;
		return (
			(amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
			(Math.pow(1 + monthlyRate, months) - 1)
		);
	};

	const calculateTotalInterest = (
		monthlyPayment: number,
		months: number,
		principal: number
	): number => {
		return monthlyPayment * months - principal;
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	const formatPercentage = (rate: number) => {
		return `${rate.toFixed(1)}%`;
	};

	const handleSelectOption = (option: FinanceComparisonResult) => {
		console.log('Selected financing option:', option);
		// In a real app, this would initiate the application process
		alert(
			`You selected: ${option.name}\nMonthly Payment: ${formatCurrency(
				option.monthlyPayment
			)}`
		);
	};

	if (!baseResult || comparisonResults.length === 0) {
		return (
			<div className='finance-comparison'>
				<div className='finance-comparison__placeholder'>
					<h3>Finance Comparison</h3>
					<p>Complete the calculator above to see financing options</p>
				</div>
			</div>
		);
	}

	return (
		<div className='finance-comparison'>
			<div className='finance-comparison__header'>
				<h3>Compare Financing Options</h3>
				<p>Choose the financing option that works best for your budget</p>
			</div>

			<div className='finance-comparison__options'>
				{comparisonResults.map((option, index) => (
					<div
						key={index}
						className={`finance-comparison__option ${
							option.recommended
								? 'finance-comparison__option--recommended'
								: ''
						}`}
					>
						{option.recommended && (
							<div className='finance-comparison__recommended-badge'>
								⭐ Recommended
							</div>
						)}

						<div className='finance-comparison__option-header'>
							<h4>{option.name}</h4>
							<p>{option.description}</p>
						</div>

						<div className='finance-comparison__option-details'>
							<div className='finance-comparison__detail-row'>
								<span>Monthly Payment:</span>
								<span className='finance-comparison__detail-value finance-comparison__detail-value--primary'>
									{formatCurrency(option.monthlyPayment)}
								</span>
							</div>
							<div className='finance-comparison__detail-row'>
								<span>Interest Rate:</span>
								<span>{formatPercentage(option.interestRate)}</span>
							</div>
							<div className='finance-comparison__detail-row'>
								<span>Loan Term:</span>
								<span>{option.loanTermMonths} months</span>
							</div>
							<div className='finance-comparison__detail-row'>
								<span>Down Payment:</span>
								<span>{formatCurrency(option.downPayment)}</span>
							</div>
							<div className='finance-comparison__detail-row'>
								<span>Total Interest:</span>
								<span>{formatCurrency(option.totalInterest)}</span>
							</div>
							<div className='finance-comparison__detail-row'>
								<span>Total Cost:</span>
								<span>{formatCurrency(option.totalCost)}</span>
							</div>
						</div>

						<div className='finance-comparison__option-features'>
							<h5>Features:</h5>
							<ul>
								{option.features.map((feature, featureIndex) => (
									<li key={featureIndex}>{feature}</li>
								))}
							</ul>
						</div>

						<button
							className='finance-comparison__select-btn'
							onClick={() => handleSelectOption(option)}
						>
							Select This Option
						</button>
					</div>
				))}
			</div>

			<div className='finance-comparison__disclaimer'>
				<p>
					<strong>Disclaimer:</strong> All rates and terms are estimates and
					subject to credit approval. Actual rates may vary based on credit
					history, income, and other factors. Contact us for personalized
					financing options.
				</p>
			</div>
		</div>
	);
};

export default FinanceComparison;
