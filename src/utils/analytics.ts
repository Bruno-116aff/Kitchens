import { AnalyticsEvent, type AnalyticsEventType } from '../types';

// Utility functions for analytics tracking
// These will be integrated with GA4, Facebook Pixel, etc. later

export const trackEvent = (
	event: AnalyticsEventType,
	data?: Record<string, any>
) => {
	// For now, just log to console
	console.log('Analytics Event:', event, data);

	// TODO: Integrate with Google Analytics 4
	// if (typeof gtag !== 'undefined') {
	//   gtag('event', event, data)
	// }

	// TODO: Integrate with Facebook Pixel
	// if (typeof fbq !== 'undefined') {
	//   fbq('track', event, data)
	// }
};

export const trackFormSubmit = (formData: any) => {
	trackEvent(AnalyticsEvent.FORM_SUBMIT, {
		form_type: 'contact',
		...formData,
	});
};

export const trackCTAClick = (ctaType: string, location: string) => {
	trackEvent(AnalyticsEvent.CTA_CLICK, {
		cta_type: ctaType,
		location: location,
	});
};

export const trackPhoneClick = (phoneNumber: string) => {
	trackEvent(AnalyticsEvent.PHONE_CLICK, {
		phone_number: phoneNumber,
	});
};

export const trackPortfolioView = (projectId: string) => {
	trackEvent(AnalyticsEvent.PORTFOLIO_VIEW, {
		project_id: projectId,
	});
};

export const trackQuizComplete = (quizData: any) => {
	trackEvent(AnalyticsEvent.QUIZ_COMPLETE, quizData);
};

export const trackLanguageSwitch = (fromLang: string, toLang: string) => {
	trackEvent(AnalyticsEvent.LANGUAGE_SWITCH, {
		from_language: fromLang,
		to_language: toLang,
	});
};

// Quiz tracking functions
export const trackQuizStart = (quizType: string = 'kitchen_calculator') => {
	trackEvent(AnalyticsEvent.QUIZ_START, {
		quiz_type: quizType,
		timestamp: new Date().toISOString(),
	});
};

export const trackQuizStepComplete = (stepNumber: number, stepData: any) => {
	trackEvent(AnalyticsEvent.QUIZ_STEP_COMPLETE, {
		step_number: stepNumber,
		step_data: stepData,
		progress_percentage: (stepNumber / 7) * 100,
	});
};

export const trackQuizAbandon = (stepNumber: number, timeSpent: number) => {
	trackEvent(AnalyticsEvent.QUIZ_ABANDON, {
		abandoned_at_step: stepNumber,
		time_spent_seconds: timeSpent,
	});
};

export const trackQuizResultView = (resultData: any) => {
	trackEvent(AnalyticsEvent.QUIZ_RESULT_VIEW, {
		price_range: resultData.priceRange,
		selected_preset: resultData.selectedPreset,
		...resultData,
	});
};

// Booking tracking functions
export const trackBookingStart = (serviceType: string) => {
	trackEvent(AnalyticsEvent.BOOKING_START, {
		service_type: serviceType,
		timestamp: new Date().toISOString(),
	});
};

export const trackBookingStepComplete = (stepNumber: number, stepData: any) => {
	trackEvent(AnalyticsEvent.BOOKING_STEP_COMPLETE, {
		step_number: stepNumber,
		step_data: stepData,
		progress_percentage: (stepNumber / 4) * 100,
	});
};

export const trackBookingComplete = (bookingData: any) => {
	trackEvent(AnalyticsEvent.BOOKING_COMPLETE, {
		booking_id: bookingData.bookingId,
		service_type: bookingData.serviceType,
		appointment_date: bookingData.date,
		...bookingData,
	});
};

export const trackBookingAbandon = (stepNumber: number, timeSpent: number) => {
	trackEvent(AnalyticsEvent.BOOKING_ABANDON, {
		abandoned_at_step: stepNumber,
		time_spent_seconds: timeSpent,
	});
};

// Planner tracking functions
export const trackPlannerOpen = (source: string = 'direct') => {
	trackEvent(AnalyticsEvent.PLANNER_OPEN, {
		source: source,
		timestamp: new Date().toISOString(),
	});
};

export const trackPlannerModuleAdd = (moduleType: string, moduleData: any) => {
	trackEvent(AnalyticsEvent.PLANNER_MODULE_ADD, {
		module_type: moduleType,
		module_data: moduleData,
	});
};

export const trackPlannerModuleRemove = (moduleType: string) => {
	trackEvent(AnalyticsEvent.PLANNER_MODULE_REMOVE, {
		module_type: moduleType,
	});
};

export const trackPlannerSave = (projectData: any) => {
	trackEvent(AnalyticsEvent.PLANNER_SAVE, {
		project_id: projectData.id,
		modules_count: projectData.modules.length,
		...projectData,
	});
};

export const trackPlannerExport = (exportType: string, projectData: any) => {
	trackEvent(AnalyticsEvent.PLANNER_EXPORT, {
		export_type: exportType,
		project_id: projectData.id,
		modules_count: projectData.modules.length,
	});
};

export const trackPlannerShare = (shareMethod: string, projectData: any) => {
	trackEvent(AnalyticsEvent.PLANNER_SHARE, {
		share_method: shareMethod,
		project_id: projectData.id,
	});
};

// Finance tracking functions
export const trackFinanceCalculate = (calculationData: any) => {
	trackEvent(AnalyticsEvent.FINANCE_CALCULATE, {
		total_amount: calculationData.totalAmount,
		down_payment: calculationData.downPayment,
		interest_rate: calculationData.interestRate,
		loan_term: calculationData.loanTermMonths,
		monthly_payment: calculationData.monthlyPayment,
	});
};

export const trackFinanceCompare = (comparisonData: any) => {
	trackEvent(AnalyticsEvent.FINANCE_COMPARE, {
		options_count: comparisonData.optionsCount,
		selected_option: comparisonData.selectedOption,
	});
};

export const trackFinanceSelectOption = (optionData: any) => {
	trackEvent(AnalyticsEvent.FINANCE_SELECT_OPTION, {
		option_name: optionData.name,
		monthly_payment: optionData.monthlyPayment,
		total_cost: optionData.totalCost,
	});
};

// Portfolio tracking functions
export const trackPortfolioFilter = (filterData: any) => {
	trackEvent(AnalyticsEvent.PORTFOLIO_FILTER, {
		active_filters: filterData.activeFilters,
		results_count: filterData.resultsCount,
	});
};

export const trackPortfolioProjectView = (
	projectId: string,
	projectData: any
) => {
	trackEvent(AnalyticsEvent.PORTFOLIO_PROJECT_VIEW, {
		project_id: projectId,
		project_style: projectData.style,
		project_layout: projectData.layout,
		project_budget: projectData.budget,
	});
};

export const trackPortfolioProjectShare = (
	projectId: string,
	shareMethod: string
) => {
	trackEvent(AnalyticsEvent.PORTFOLIO_PROJECT_SHARE, {
		project_id: projectId,
		share_method: shareMethod,
	});
};

// Service tracking functions
export const trackServiceConfiguratorUse = (configData: any) => {
	trackEvent(AnalyticsEvent.SERVICE_CONFIGURATOR_USE, {
		selected_facade: configData.facade,
		selected_countertop: configData.countertop,
		selected_hardware: configData.hardware,
		selected_appliances: configData.appliances,
		total_price: configData.totalPrice,
	});
};

export const trackServicePackageSelect = (packageData: any) => {
	trackEvent(AnalyticsEvent.SERVICE_PACKAGE_SELECT, {
		package_name: packageData.name,
		package_price: packageData.price,
		package_features: packageData.features,
	});
};

export const trackServiceMaterialChange = (
	materialType: string,
	materialValue: string
) => {
	trackEvent(AnalyticsEvent.SERVICE_MATERIAL_CHANGE, {
		material_type: materialType,
		material_value: materialValue,
	});
};

// Engagement tracking functions
export const trackScrollDepth = (depth: number) => {
	trackEvent(AnalyticsEvent.SCROLL_DEPTH, {
		scroll_depth_percentage: depth,
	});
};

export const trackTimeOnPage = (timeSpent: number, pageUrl: string) => {
	trackEvent(AnalyticsEvent.TIME_ON_PAGE, {
		time_spent_seconds: timeSpent,
		page_url: pageUrl,
	});
};

export const trackVideoPlay = (videoId: string, videoTitle: string) => {
	trackEvent(AnalyticsEvent.VIDEO_PLAY, {
		video_id: videoId,
		video_title: videoTitle,
	});
};

export const trackVideoComplete = (
	videoId: string,
	videoTitle: string,
	duration: number
) => {
	trackEvent(AnalyticsEvent.VIDEO_COMPLETE, {
		video_id: videoId,
		video_title: videoTitle,
		video_duration: duration,
	});
};

// Conversion tracking functions
export const trackLeadGenerated = (leadData: any) => {
	trackEvent(AnalyticsEvent.LEAD_GENERATED, {
		lead_source: leadData.source,
		lead_type: leadData.type,
		estimated_value: leadData.estimatedValue,
		...leadData,
	});
};

export const trackAppointmentBooked = (appointmentData: any) => {
	trackEvent(AnalyticsEvent.APPOINTMENT_BOOKED, {
		appointment_id: appointmentData.bookingId,
		service_type: appointmentData.serviceType,
		appointment_date: appointmentData.date,
		estimated_value: appointmentData.estimatedValue,
	});
};

export const trackQuoteRequested = (quoteData: any) => {
	trackEvent(AnalyticsEvent.QUOTE_REQUESTED, {
		quote_type: quoteData.type,
		estimated_budget: quoteData.budget,
		project_details: quoteData.details,
	});
};

export const trackCallBackRequested = (callbackData: any) => {
	trackEvent(AnalyticsEvent.CALL_BACK_REQUESTED, {
		callback_time: callbackData.preferredTime,
		contact_method: callbackData.contactMethod,
		urgency: callbackData.urgency,
	});
};
