import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer: React.FC = () => {
	const { t } = useTranslation('common');
	const currentYear = new Date().getFullYear();

	const footerLinks = {
		company: [
			{ label: t('navigation.about'), href: '/about' },
			{ label: t('navigation.services'), href: '/services' },
			{ label: t('navigation.portfolio'), href: '/portfolio' },
			{ label: t('navigation.process'), href: '/process' },
		],
		tools: [
			{ label: 'Price Calculator', href: '/calculator' },
			{ label: '3D Planner', href: '/planner' },
			{ label: 'Book Consultation', href: '/book' },
			{ label: 'Financing Options', href: '/financing' },
		],
		support: [
			{ label: t('navigation.faq'), href: '/faq' },
			{ label: t('navigation.contact'), href: '/contact' },
			{ label: 'Privacy Policy', href: '/privacy-policy' },
			{ label: 'Terms of Service', href: '/terms' },
		],
		contact: {
			phone: '+357 99 123 456',
			email: 'info@customkitchens.cy',
			address: '123 Kitchen Street, Nicosia, Cyprus',
		},
	};

	const socialLinks = [
		{ name: 'Facebook', href: '#', icon: 'facebook' },
		{ name: 'Instagram', href: '#', icon: 'instagram' },
		{ name: 'LinkedIn', href: '#', icon: 'linkedin' },
		{ name: 'WhatsApp', href: '#', icon: 'whatsapp' },
	];

	return (
		<footer className='footer'>
			<div className='container'>
				<div className='footer__content'>
					{/* Company Info */}
					<div className='footer__section'>
						<div className='footer__brand'>
							<Link to='/' className='footer__logo'>
								<img
									src='/logo.svg'
									alt='Custom Kitchens'
									className='footer__logo-img'
								/>
								<span className='footer__logo-text'>Custom Kitchens</span>
							</Link>
							<p className='footer__description'>
								Your trusted partner for custom kitchen design, manufacturing,
								and installation in Cyprus. We handle everything in-house for
								the best results.
							</p>
						</div>
					</div>

					{/* Company Links */}
					<div className='footer__section'>
						<h3 className='footer__heading'>Company</h3>
						<ul className='footer__links'>
							{footerLinks.company.map(link => (
								<li key={link.href}>
									<Link to={link.href} className='footer__link'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Tools Links */}
					<div className='footer__section'>
						<h3 className='footer__heading'>Tools</h3>
						<ul className='footer__links'>
							{footerLinks.tools.map(link => (
								<li key={link.href}>
									<Link to={link.href} className='footer__link'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Support Links */}
					<div className='footer__section'>
						<h3 className='footer__heading'>Support</h3>
						<ul className='footer__links'>
							{footerLinks.support.map(link => (
								<li key={link.href}>
									<Link to={link.href} className='footer__link'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div className='footer__section'>
						<h3 className='footer__heading'>Contact</h3>
						<div className='footer__contact'>
							<div className='footer__contact-item'>
								<svg
									className='footer__contact-icon'
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
								>
									<path
										d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
								<a
									href={`tel:${footerLinks.contact.phone}`}
									className='footer__contact-link'
								>
									{footerLinks.contact.phone}
								</a>
							</div>
							<div className='footer__contact-item'>
								<svg
									className='footer__contact-icon'
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
								>
									<path
										d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<polyline
										points='22,6 12,13 2,6'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
								<a
									href={`mailto:${footerLinks.contact.email}`}
									className='footer__contact-link'
								>
									{footerLinks.contact.email}
								</a>
							</div>
							<div className='footer__contact-item'>
								<svg
									className='footer__contact-icon'
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
								>
									<path
										d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<circle
										cx='12'
										cy='10'
										r='3'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
								<span className='footer__contact-text'>
									{footerLinks.contact.address}
								</span>
							</div>
						</div>

						{/* Social Links */}
						<div className='footer__social'>
							<h4 className='footer__social-heading'>Follow Us</h4>
							<div className='footer__social-links'>
								{socialLinks.map(social => (
									<a
										key={social.name}
										href={social.href}
										className='footer__social-link'
										aria-label={`Follow us on ${social.name}`}
										target='_blank'
										rel='noopener noreferrer'
									>
										<svg
											className='footer__social-icon'
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='none'
										>
											<circle
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='2'
											/>
											<path
												d='M8 12h8'
												stroke='currentColor'
												strokeWidth='2'
												strokeLinecap='round'
											/>
											<path
												d='M12 8v8'
												stroke='currentColor'
												strokeWidth='2'
												strokeLinecap='round'
											/>
										</svg>
									</a>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Footer Bottom */}
				<div className='footer__bottom'>
					<div className='footer__bottom-content'>
						<p className='footer__copyright'>
							© {currentYear} Custom Kitchens. All rights reserved.
						</p>
						<div className='footer__legal'>
							<Link to='/privacy-policy' className='footer__legal-link'>
								Privacy Policy
							</Link>
							<Link to='/terms' className='footer__legal-link'>
								Terms of Service
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
