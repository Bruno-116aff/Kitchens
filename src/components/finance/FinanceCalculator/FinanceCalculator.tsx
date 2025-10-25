import React, { useState, useEffect, useCallback } from 'react';
import type { QuizResult } from '../../../types';
import {
	calculateMonthlyPayment,
	calculateTotalInterest,
	getPaymentSchedule,
} from '../../../utils/financeCalculator';
import './FinanceCalculator.css';

interface FinanceCalculatorProps {
	quizResult?: QuizResult;
	onCalculate?: (result: FinanceCalculationResult) => void;
}

export interface FinanceCalculationResult {
	totalAmount: number;
	downPayment: number;
	financingAmount: number;
	interestRate: number;
	loanTermMonths: number;
	monthlyPayment: number;
	totalInterest: number;
	totalCost: number;
	paymentSchedule: PaymentScheduleEntry[];
}

export interface PaymentScheduleEntry {
	month: number;
	payment: number;
	principal: number;
	interest: number;
	remainingBalance: number;
}

const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({
	quizResult,
	onCalculate,
}) => {
	const [totalAmount, setTotalAmount] = useState<number>(15000);
	const [downPayment, setDownPayment] = useState<number>(3000);
	const [interestRate, setInterestRate] = useState<number>(8.5);
	const [loanTermMonths, setLoanTermMonths] = useState<number>(24);
	const [calculationResult, setCalculationResult] =
		useState<FinanceCalculationResult | null>(null);

	// Update total amount from quiz result
	useEffect(() => {
		if (quizResult && quizResult.priceRange) {
			// Use the average of the price range
			const averagePrice =
				(quizResult.priceRange.min + quizResult.priceRange.max) / 2;
			setTotalAmount(Math.round(averagePrice));
		}
	}, [quizResult]);

	// Calculate financing when inputs change
	useEffect(() => {
		calculateFinancing();
	}, [totalAmount, downPayment, interestRate, loanTermMonths]);

	const calculateFinancing = useCallback(() => {
		const financingAmount = totalAmount - downPayment;

		if (financingAmount <= 0) {
			setCalculationResult(null);
			return;
		}

		const monthlyPayment = calculateMonthlyPayment(
			financingAmount,
			interestRate,
			loanTermMonths
		);

		const totalInterest = calculateTotalInterest(
			monthlyPayment,
			loanTermMonths,
			financingAmount
		);

		const totalCost = totalAmount + totalInterest;
		const paymentSchedule = getPaymentSchedule(
			financingAmount,
			interestRate,
			loanTermMonths
		);

		const result: FinanceCalculationResult = {
			totalAmount,
			downPayment,
			financingAmount,
			interestRate,
			loanTermMonths,
			monthlyPayment,
			totalInterest,
			totalCost,
			paymentSchedule,
		};

		setCalculationResult(result);

		if (onCalculate) {
			onCalculate(result);
		}
	}, [totalAmount, downPayment, interestRate, loanTermMonths, onCalculate]);

	const handleTotalAmountChange = (value: number) => {
		setTotalAmount(value);
	};

	const handleDownPaymentChange = (value: number) => {
		setDownPayment(value);
	};

	const handleInterestRateChange = (value: number) => {
		setInterestRate(value);
	};

	const handleLoanTermChange = (value: number) => {
		setLoanTermMonths(value);
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

	return (
		<div className='finance-calculator'>
			<div className='finance-calculator__header'>
				<h3>Finance Calculator</h3>
				<p>Calculate your monthly payment and financing options</p>
			</div>

			<div className='finance-calculator__inputs'>
				<div className='finance-calculator__input-group'>
					<label htmlFor='total-amount'>Total Kitchen Cost</label>
					<input
						id='total-amount'
						type='number'
						value={totalAmount}
						onChange={e => handleTotalAmountChange(Number(e.target.value))}
						min='1000'
						max='100000'
						step='500'
					/>
					<span className='finance-calculator__currency'>€</span>
				</div>

				<div className='finance-calculator__input-group'>
					<label htmlFor='down-payment'>Down Payment</label>
					<input
						id='down-payment'
						type='number'
						value={downPayment}
						onChange={e => handleDownPaymentChange(Number(e.target.value))}
						min='0'
						max={totalAmount}
						step='100'
					/>
					<span className='finance-calculator__currency'>€</span>
				</div>

				<div className='finance-calculator__input-group'>
					<label htmlFor='interest-rate'>Interest Rate (%)</label>
					<input
						id='interest-rate'
						type='number'
						value={interestRate}
						onChange={e => handleInterestRateChange(Number(e.target.value))}
						min='0'
						max='30'
						step='0.1'
					/>
					<span className='finance-calculator__percentage'>%</span>
				</div>

				<div className='finance-calculator__input-group'>
					<label htmlFor='loan-term'>Loan Term</label>
					<select
						id='loan-term'
						value={loanTermMonths}
						onChange={e => handleLoanTermChange(Number(e.target.value))}
					>
						<option value={12}>12 months (1 year)</option>
						<option value={18}>18 months (1.5 years)</option>
						<option value={24}>24 months (2 years)</option>
						<option value={36}>36 months (3 years)</option>
						<option value={48}>48 months (4 years)</option>
						<option value={60}>60 months (5 years)</option>
					</select>
				</div>
			</div>

			{calculationResult && (
				<div className='finance-calculator__results'>
					<div className='finance-calculator__summary'>
						<div className='finance-calculator__summary-item'>
							<span className='finance-calculator__label'>Monthly Payment</span>
							<span className='finance-calculator__value finance-calculator__value--primary'>
								{formatCurrency(calculationResult.monthlyPayment)}
							</span>
						</div>
						<div className='finance-calculator__summary-item'>
							<span className='finance-calculator__label'>Total Interest</span>
							<span className='finance-calculator__value'>
								{formatCurrency(calculationResult.totalInterest)}
							</span>
						</div>
						<div className='finance-calculator__summary-item'>
							<span className='finance-calculator__label'>Total Cost</span>
							<span className='finance-calculator__value'>
								{formatCurrency(calculationResult.totalCost)}
							</span>
						</div>
					</div>

					<div className='finance-calculator__details'>
						<h4>Financing Details</h4>
						<div className='finance-calculator__detail-grid'>
							<div className='finance-calculator__detail-item'>
								<span>Financing Amount:</span>
								<span>{formatCurrency(calculationResult.financingAmount)}</span>
							</div>
							<div className='finance-calculator__detail-item'>
								<span>Interest Rate:</span>
								<span>{formatPercentage(calculationResult.interestRate)}</span>
							</div>
							<div className='finance-calculator__detail-item'>
								<span>Loan Term:</span>
								<span>{calculationResult.loanTermMonths} months</span>
							</div>
						</div>
					</div>

					<div className='finance-calculator__payment-schedule'>
						<h4>Payment Schedule</h4>
						<div className='finance-calculator__schedule-table'>
							<div className='finance-calculator__schedule-header'>
								<span>Month</span>
								<span>Payment</span>
								<span>Principal</span>
								<span>Interest</span>
								<span>Balance</span>
							</div>
							<div className='finance-calculator__schedule-body'>
								{calculationResult.paymentSchedule
									.slice(0, 12)
									.map((entry, index) => (
										<div
											key={index}
											className='finance-calculator__schedule-row'
										>
											<span>{entry.month}</span>
											<span>{formatCurrency(entry.payment)}</span>
											<span>{formatCurrency(entry.principal)}</span>
											<span>{formatCurrency(entry.interest)}</span>
											<span>{formatCurrency(entry.remainingBalance)}</span>
										</div>
									))}
								{calculationResult.paymentSchedule.length > 12 && (
									<div className='finance-calculator__schedule-more'>
										<span>...</span>
										<span>
											+{calculationResult.paymentSchedule.length - 12} more
											months
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FinanceCalculator;
