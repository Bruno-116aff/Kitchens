import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage: React.FC = () => {
	return (
		<div className='thank-you-page'>
			<div className='container'>
				<div
					style={{
						padding: '4rem 0',
						textAlign: 'center',
						maxWidth: '600px',
						margin: '0 auto',
					}}
				>
					<h1>Thank You!</h1>
					<p>Your message has been received successfully.</p>
					<p>We will get back to you within 24 hours.</p>

					<div style={{ marginTop: '2rem' }}>
						<Link to='/' className='btn btn--primary btn--lg'>
							Back to Home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThankYouPage;
