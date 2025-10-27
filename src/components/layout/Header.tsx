import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { images } from '../../data/images';
import './Header.css';

const Header: React.FC = () => {
	const { t } = useTranslation('common');
	const location = useLocation();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setIsScrolled(scrollTop > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navigationItems = [
		{ label: t('navigation.home'), href: '/Kitchens/' },
		{ label: t('navigation.services'), href: '/Kitchens/services' },
		{ label: t('navigation.about'), href: '/Kitchens/about' },
		{ label: t('navigation.portfolio'), href: '/Kitchens/portfolio' },
		{ label: t('navigation.process'), href: '/Kitchens/process' },
		{ label: t('navigation.faq'), href: '/Kitchens/faq' },
		{ label: t('navigation.contact'), href: '/Kitchens/contact' },
	];

	const quickActions = [
		{ label: 'Calculator', href: '/Kitchens/calculator' },
		{ label: '3D Planner', href: '/Kitchens/planner' },
	];

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
			<div className='container'>
				<div className='header__content'>
					{/* Logo */}
					<Link
						to='/Kitchens/'
						className='header__logo'
						onClick={closeMobileMenu}
					>
						<img
							src={images.logo}
							alt='Custom Kitchens'
							className='header__logo-img'
						/>
						<span className='header__logo-text'>Custom Kitchens</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className='header__nav' aria-label='Main navigation'>
						<ul className='header__nav-list'>
							{navigationItems.map(item => (
								<li key={item.href} className='header__nav-item'>
									<Link
										to={item.href}
										className={`header__nav-link ${
											location.pathname === item.href
												? 'header__nav-link--active'
												: ''
										}`}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* CTA and Quick Actions */}
					<div className='header__actions'>
						<div className='header__cta'>
							<Link
								to='/Kitchens/contact'
								className='btn btn--primary btn--sm header__cta-button'
							>
								{t('buttons.getQuote')}
							</Link>
						</div>
						<div className='header__quick-actions'>
							{quickActions.map(action => (
								<Link
									key={action.href}
									to={action.href}
									className='btn btn--outline btn--xs header__quick-action'
								>
									{action.label}
								</Link>
							))}
						</div>
					</div>

					{/* Mobile Menu Button */}
					<button
						className='header__mobile-toggle'
						onClick={toggleMobileMenu}
						aria-label='Toggle mobile menu'
						aria-expanded={isMobileMenuOpen}
					>
						<span
							className={`header__hamburger ${
								isMobileMenuOpen ? 'header__hamburger--open' : ''
							}`}
						>
							<span></span>
							<span></span>
							<span></span>
						</span>
					</button>
				</div>

				{/* Mobile Navigation */}
				<motion.nav
					className='header__mobile-nav'
					initial={false}
					animate={{
						height: isMobileMenuOpen ? 'auto' : 0,
						opacity: isMobileMenuOpen ? 1 : 0,
					}}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					style={{ overflow: 'hidden' }}
				>
					<ul className='header__mobile-nav-list'>
						{navigationItems.map(item => (
							<li key={item.href} className='header__mobile-nav-item'>
								<Link
									to={item.href}
									className={`header__mobile-nav-link ${
										location.pathname === item.href
											? 'header__mobile-nav-link--active'
											: ''
									}`}
									onClick={closeMobileMenu}
								>
									{item.label}
								</Link>
							</li>
						))}
						<li className='header__mobile-nav-item'>
							<div className='header__mobile-quick-actions'>
								{quickActions.map(action => (
									<Link
										key={action.href}
										to={action.href}
										className='btn btn--outline btn--sm header__mobile-quick-action'
										onClick={closeMobileMenu}
									>
										{action.label}
									</Link>
								))}
							</div>
						</li>
						<li className='header__mobile-nav-item'>
							<Link
								to='/Kitchens/contact'
								className='btn btn--primary btn--md header__mobile-cta'
								onClick={closeMobileMenu}
							>
								{t('buttons.getQuote')}
							</Link>
						</li>
					</ul>
				</motion.nav>
			</div>
		</header>
	);
};

export default Header;
