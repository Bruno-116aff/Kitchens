import { useCallback, useEffect, useRef } from 'react';
import {
	trackEvent,
	trackQuizStart,
	trackQuizStepComplete,
	trackQuizAbandon,
	trackBookingStart,
	trackBookingStepComplete,
	trackBookingComplete,
	trackBookingAbandon,
	trackPlannerOpen,
	trackPlannerModuleAdd,
	trackPlannerSave,
	trackFinanceCalculate,
	trackPortfolioFilter,
	trackServiceConfiguratorUse,
	trackServicePackageSelect,
} from '../utils/analytics';
import { AnalyticsEvent, type AnalyticsEventType } from '../types';

interface UseAnalyticsReturn {
	trackEvent: (event: AnalyticsEventType, data?: any) => void;
	trackQuizStart: (quizType?: string) => void;
	trackQuizStepComplete: (stepNumber: number, stepData: any) => void;
	trackQuizAbandon: (stepNumber: number, timeSpent: number) => void;
	trackBookingStart: (serviceType: string) => void;
	trackBookingStepComplete: (stepNumber: number, stepData: any) => void;
	trackBookingComplete: (bookingData: any) => void;
	trackBookingAbandon: (stepNumber: number, timeSpent: number) => void;
	trackPlannerOpen: (source?: string) => void;
	trackPlannerModuleAdd: (moduleType: string, moduleData: any) => void;
	trackPlannerSave: (projectData: any) => void;
	trackFinanceCalculate: (calculationData: any) => void;
	trackPortfolioFilter: (filterData: any) => void;
	trackServiceConfiguratorUse: (configData: any) => void;
	trackServicePackageSelect: (packageData: any) => void;
}

export const useAnalytics = (): UseAnalyticsReturn => {
	const sessionStart = useRef<number>(Date.now());
	const currentPage = useRef<string>(window.location.pathname);

	// Track page view on mount
	useEffect(() => {
		trackEvent(AnalyticsEvent.PAGE_VIEW, {
			page_url: currentPage.current,
			timestamp: new Date().toISOString(),
		});
	}, []);

	// Track quiz abandonment on page leave
	useEffect(() => {
		const handleBeforeUnload = () => {
			const timeSpent = Math.round((Date.now() - sessionStart.current) / 1000);

			// Check if user was in the middle of a quiz or booking
			const quizData = localStorage.getItem('quiz_progress');
			const bookingData = localStorage.getItem('booking_progress');

			if (quizData) {
				const progress = JSON.parse(quizData);
				trackQuizAbandon(progress.currentStep || 0, timeSpent);
			}

			if (bookingData) {
				const progress = JSON.parse(bookingData);
				trackBookingAbandon(progress.currentStep || 0, timeSpent);
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	// Wrapped tracking functions
	const wrappedTrackEvent = useCallback(
		(event: AnalyticsEventType, data?: any) => {
			trackEvent(event, {
				...data,
				session_duration: Math.round(
					(Date.now() - sessionStart.current) / 1000
				),
				page_url: currentPage.current,
			});
		},
		[]
	);

	const wrappedTrackQuizStart = useCallback(
		(quizType: string = 'kitchen_calculator') => {
			trackQuizStart(quizType);
		},
		[]
	);

	const wrappedTrackQuizStepComplete = useCallback(
		(stepNumber: number, stepData: any) => {
			trackQuizStepComplete(stepNumber, stepData);

			// Save progress to localStorage
			localStorage.setItem(
				'quiz_progress',
				JSON.stringify({
					currentStep: stepNumber,
					stepData,
					timestamp: Date.now(),
				})
			);
		},
		[]
	);

	const wrappedTrackQuizAbandon = useCallback(
		(stepNumber: number, timeSpent: number) => {
			trackQuizAbandon(stepNumber, timeSpent);
			localStorage.removeItem('quiz_progress');
		},
		[]
	);

	const wrappedTrackBookingStart = useCallback((serviceType: string) => {
		trackBookingStart(serviceType);
	}, []);

	const wrappedTrackBookingStepComplete = useCallback(
		(stepNumber: number, stepData: any) => {
			trackBookingStepComplete(stepNumber, stepData);

			// Save progress to localStorage
			localStorage.setItem(
				'booking_progress',
				JSON.stringify({
					currentStep: stepNumber,
					stepData,
					timestamp: Date.now(),
				})
			);
		},
		[]
	);

	const wrappedTrackBookingComplete = useCallback((bookingData: any) => {
		trackBookingComplete(bookingData);
		localStorage.removeItem('booking_progress');
	}, []);

	const wrappedTrackBookingAbandon = useCallback(
		(stepNumber: number, timeSpent: number) => {
			trackBookingAbandon(stepNumber, timeSpent);
			localStorage.removeItem('booking_progress');
		},
		[]
	);

	const wrappedTrackPlannerOpen = useCallback((source: string = 'direct') => {
		trackPlannerOpen(source);
	}, []);

	const wrappedTrackPlannerModuleAdd = useCallback(
		(moduleType: string, moduleData: any) => {
			trackPlannerModuleAdd(moduleType, moduleData);
		},
		[]
	);

	const wrappedTrackPlannerSave = useCallback((projectData: any) => {
		trackPlannerSave(projectData);
	}, []);

	const wrappedTrackFinanceCalculate = useCallback((calculationData: any) => {
		trackFinanceCalculate(calculationData);
	}, []);

	const wrappedTrackPortfolioFilter = useCallback((filterData: any) => {
		trackPortfolioFilter(filterData);
	}, []);

	const wrappedTrackServiceConfiguratorUse = useCallback((configData: any) => {
		trackServiceConfiguratorUse(configData);
	}, []);

	const wrappedTrackServicePackageSelect = useCallback((packageData: any) => {
		trackServicePackageSelect(packageData);
	}, []);

	return {
		trackEvent: wrappedTrackEvent,
		trackQuizStart: wrappedTrackQuizStart,
		trackQuizStepComplete: wrappedTrackQuizStepComplete,
		trackQuizAbandon: wrappedTrackQuizAbandon,
		trackBookingStart: wrappedTrackBookingStart,
		trackBookingStepComplete: wrappedTrackBookingStepComplete,
		trackBookingComplete: wrappedTrackBookingComplete,
		trackBookingAbandon: wrappedTrackBookingAbandon,
		trackPlannerOpen: wrappedTrackPlannerOpen,
		trackPlannerModuleAdd: wrappedTrackPlannerModuleAdd,
		trackPlannerSave: wrappedTrackPlannerSave,
		trackFinanceCalculate: wrappedTrackFinanceCalculate,
		trackPortfolioFilter: wrappedTrackPortfolioFilter,
		trackServiceConfiguratorUse: wrappedTrackServiceConfiguratorUse,
		trackServicePackageSelect: wrappedTrackServicePackageSelect,
	};
};
