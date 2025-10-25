import React from 'react';
import ContactForm from '../components/common/ContactForm';

const ContactPage: React.FC = () => {
	return (
		<div className='contact-page'>
			<div className='container'>
				<div style={{ padding: '4rem 0', textAlign: 'center' }}>
					<h1>Contact Us</h1>
					<p>Get in touch for a free consultation and quote.</p>

					<div style={{ maxWidth: '600px', margin: '2rem auto' }}>
						<ContactForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;

