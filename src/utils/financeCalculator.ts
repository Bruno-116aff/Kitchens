// Financial calculation utilities

export interface PaymentScheduleEntry {
	month: number;
	payment: number;
	principal: number;
	interest: number;
	remainingBalance: number;
}

/**
 * Calculate monthly payment using the standard loan formula
 */
export function calculateMonthlyPayment(
	principal: number,
	annualRate: number,
	months: number
): number {
	if (annualRate === 0) {
		return principal / months;
	}

	const monthlyRate = annualRate / 100 / 12;
	const monthlyPayment =
		(principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
		(Math.pow(1 + monthlyRate, months) - 1);

	return Math.round(monthlyPayment * 100) / 100;
}

/**
 * Calculate total interest paid over the loan term
 */
export function calculateTotalInterest(
	monthlyPayment: number,
	months: number,
	principal: number
): number {
	const totalPaid = monthlyPayment * months;
	return Math.round((totalPaid - principal) * 100) / 100;
}

/**
 * Generate payment schedule for the loan
 */
export function getPaymentSchedule(
	principal: number,
	annualRate: number,
	months: number
): PaymentScheduleEntry[] {
	const monthlyRate = annualRate / 100 / 12;
	const monthlyPayment = calculateMonthlyPayment(principal, annualRate, months);
	const schedule: PaymentScheduleEntry[] = [];

	let remainingBalance = principal;

	for (let month = 1; month <= months; month++) {
		const interestPayment = remainingBalance * monthlyRate;
		const principalPayment = monthlyPayment - interestPayment;
		remainingBalance = Math.max(0, remainingBalance - principalPayment);

		schedule.push({
			month,
			payment: Math.round(monthlyPayment * 100) / 100,
			principal: Math.round(principalPayment * 100) / 100,
			interest: Math.round(interestPayment * 100) / 100,
			remainingBalance: Math.round(remainingBalance * 100) / 100,
		});
	}

	return schedule;
}

/**
 * Calculate loan-to-value ratio
 */
export function calculateLTV(
	loanAmount: number,
	propertyValue: number
): number {
	return Math.round((loanAmount / propertyValue) * 100 * 100) / 100;
}

/**
 * Calculate debt-to-income ratio
 */
export function calculateDTI(
	monthlyDebtPayments: number,
	monthlyIncome: number
): number {
	return Math.round((monthlyDebtPayments / monthlyIncome) * 100 * 100) / 100;
}

/**
 * Calculate affordability based on income
 */
export function calculateAffordability(
	monthlyIncome: number,
	downPayment: number,
	interestRate: number,
	loanTermMonths: number,
	maxDTI: number = 0.28
): {
	maxLoanAmount: number;
	maxHomePrice: number;
	monthlyPayment: number;
} {
	const maxMonthlyPayment = monthlyIncome * maxDTI;
	const maxLoanAmount =
		interestRate === 0
			? maxMonthlyPayment * loanTermMonths
			: (maxMonthlyPayment *
					(Math.pow(1 + interestRate / 100 / 12, loanTermMonths) - 1)) /
			  ((interestRate / 100 / 12) *
					Math.pow(1 + interestRate / 100 / 12, loanTermMonths));

	const maxHomePrice = maxLoanAmount + downPayment;

	return {
		maxLoanAmount: Math.round(maxLoanAmount),
		maxHomePrice: Math.round(maxHomePrice),
		monthlyPayment: Math.round(maxMonthlyPayment),
	};
}
