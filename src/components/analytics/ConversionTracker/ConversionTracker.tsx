import React, { useEffect } from 'react';
import {
	trackLeadGenerated,
	trackAppointmentBooked,
	trackQuoteRequested,
	trackCallBackRequested,
} from '../../../utils/analytics';

interface ConversionTrackerProps {
	type: 'lead' | 'appointment' | 'quote' | 'callback';
	data: any;
	trigger?: boolean; // Manually trigger tracking
}

const ConversionTracker: React.FC<ConversionTrackerProps> = ({
	type,
	data,
	trigger = true,
}) => {
	useEffect(() => {
		if (!trigger) return;

		switch (type) {
			case 'lead':
				trackLeadGenerated(data);
				break;
			case 'appointment':
				trackAppointmentBooked(data);
				break;
			case 'quote':
				trackQuoteRequested(data);
				break;
			case 'callback':
				trackCallBackRequested(data);
				break;
		}
	}, [type, data, trigger]);

	return null;
};

export default ConversionTracker;
