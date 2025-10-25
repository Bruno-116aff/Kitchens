import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import './FAQPage.css';

interface FAQItem {
	id: string;
	category: string;
	question: string;
	answer: string;
	helpful?: boolean;
}

const FAQPage: React.FC = () => {
	const { t } = useTranslation('faq');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

	const faqData: FAQItem[] = [
		// Ordering & Design
		{
			id: 'order-process',
			category: 'ordering',
			question: t('questions.orderProcess.question'),
			answer: t('questions.orderProcess.answer'),
		},
		{
			id: 'design-time',
			category: 'ordering',
			question: t('questions.designTime.question'),
			answer: t('questions.designTime.answer'),
		},
		{
			id: 'custom-design',
			category: 'ordering',
			question: t('questions.customDesign.question'),
			answer: t('questions.customDesign.answer'),
		},
		{
			id: 'design-changes',
			category: 'ordering',
			question: t('questions.designChanges.question'),
			answer: t('questions.designChanges.answer'),
		},

		// Materials & Quality
		{
			id: 'material-quality',
			category: 'materials',
			question: t('questions.materialQuality.question'),
			answer: t('questions.materialQuality.answer'),
		},
		{
			id: 'material-options',
			category: 'materials',
			question: t('questions.materialOptions.question'),
			answer: t('questions.materialOptions.answer'),
		},
		{
			id: 'countertop-materials',
			category: 'materials',
			question: t('questions.countertopMaterials.question'),
			answer: t('questions.countertopMaterials.answer'),
		},
		{
			id: 'hardware-quality',
			category: 'materials',
			question: t('questions.hardwareQuality.question'),
			answer: t('questions.hardwareQuality.answer'),
		},

		// Delivery & Installation
		{
			id: 'delivery-time',
			category: 'delivery',
			question: t('questions.deliveryTime.question'),
			answer: t('questions.deliveryTime.answer'),
		},
		{
			id: 'delivery-area',
			category: 'delivery',
			question: t('questions.deliveryArea.question'),
			answer: t('questions.deliveryArea.answer'),
		},
		{
			id: 'installation-process',
			category: 'delivery',
			question: t('questions.installationProcess.question'),
			answer: t('questions.installationProcess.answer'),
		},
		{
			id: 'installation-time',
			category: 'delivery',
			question: t('questions.installationTime.question'),
			answer: t('questions.installationTime.answer'),
		},

		// Payment & Financing
		{
			id: 'payment-methods',
			category: 'payment',
			question: t('questions.paymentMethods.question'),
			answer: t('questions.paymentMethods.answer'),
		},
		{
			id: 'financing-options',
			category: 'payment',
			question: t('questions.financingOptions.question'),
			answer: t('questions.financingOptions.answer'),
		},
		{
			id: 'payment-schedule',
			category: 'payment',
			question: t('questions.paymentSchedule.question'),
			answer: t('questions.paymentSchedule.answer'),
		},
		{
			id: 'price-guarantee',
			category: 'payment',
			question: t('questions.priceGuarantee.question'),
			answer: t('questions.priceGuarantee.answer'),
		},

		// Warranty & Support
		{
			id: 'warranty-coverage',
			category: 'warranty',
			question: t('questions.warrantyCoverage.question'),
			answer: t('questions.warrantyCoverage.answer'),
		},
		{
			id: 'maintenance-service',
			category: 'warranty',
			question: t('questions.maintenanceService.question'),
			answer: t('questions.maintenanceService.answer'),
		},
		{
			id: 'repair-service',
			category: 'warranty',
			question: t('questions.repairService.question'),
			answer: t('questions.repairService.answer'),
		},
		{
			id: 'support-contact',
			category: 'warranty',
			question: t('questions.supportContact.question'),
			answer: t('questions.supportContact.answer'),
		},

		// General
		{
			id: 'showroom-visit',
			category: 'general',
			question: t('questions.showroomVisit.question'),
			answer: t('questions.showroomVisit.answer'),
		},
		{
			id: 'consultation-cost',
			category: 'general',
			question: t('questions.consultationCost.question'),
			answer: t('questions.consultationCost.answer'),
		},
		{
			id: 'project-timeline',
			category: 'general',
			question: t('questions.projectTimeline.question'),
			answer: t('questions.projectTimeline.answer'),
		},
		{
			id: 'eco-friendly',
			category: 'general',
			question: t('questions.ecoFriendly.question'),
			answer: t('questions.ecoFriendly.answer'),
		},
	];

	const categories = [
		{ id: 'all', label: t('categories.all') },
		{ id: 'ordering', label: t('categories.ordering') },
		{ id: 'materials', label: t('categories.materials') },
		{ id: 'delivery', label: t('categories.delivery') },
		{ id: 'payment', label: t('categories.payment') },
		{ id: 'warranty', label: t('categories.warranty') },
		{ id: 'general', label: t('categories.general') },
	];

	const filteredFAQs = useMemo(() => {
		return faqData.filter(item => {
			const matchesSearch =
				item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.answer.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesCategory =
				selectedCategory === 'all' || item.category === selectedCategory;

			return matchesSearch && matchesCategory;
		});
	}, [searchTerm, selectedCategory, faqData]);

	const toggleExpanded = (id: string) => {
		const newExpanded = new Set(expandedItems);
		if (newExpanded.has(id)) {
			newExpanded.delete(id);
		} else {
			newExpanded.add(id);
		}
		setExpandedItems(newExpanded);
	};

	const handleHelpful = (id: string, helpful: boolean) => {
		// In a real app, this would send feedback to the server
		console.log(
			`FAQ ${id} was marked as ${helpful ? 'helpful' : 'not helpful'}`
		);
	};

	return (
		<div className='faq-page'>
			{/* Hero Section */}
			<section className='faq-hero'>
				<div className='container'>
					<motion.div
						className='faq-hero__content'
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h1 className='faq-hero__title'>{t('hero.title')}</h1>
						<p className='faq-hero__subtitle'>{t('hero.subtitle')}</p>
						<p className='faq-hero__description'>{t('hero.description')}</p>
					</motion.div>
				</div>
			</section>

			{/* Search and Filter Section */}
			<section className='faq-search'>
				<div className='container'>
					<motion.div
						className='faq-search__content'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<div className='faq-search__input'>
							<Input
								type='text'
								placeholder={t('search.placeholder')}
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='faq-search__input-field'
							/>
						</div>

						<div className='faq-categories'>
							{categories.map(category => (
								<button
									key={category.id}
									className={`faq-category ${
										selectedCategory === category.id
											? 'faq-category--active'
											: ''
									}`}
									onClick={() => setSelectedCategory(category.id)}
								>
									{category.label}
								</button>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* FAQ Items */}
			<section className='faq-items'>
				<div className='container'>
					<motion.div
						className='faq-items__content'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						{filteredFAQs.length === 0 ? (
							<div className='faq-no-results'>
								<h3>{t('noResults.title')}</h3>
								<p>{t('noResults.description')}</p>
								<button
									className='btn btn--primary'
									onClick={() => {
										setSearchTerm('');
										setSelectedCategory('all');
									}}
								>
									{t('noResults.reset')}
								</button>
							</div>
						) : (
							<div className='faq-grid'>
								<AnimatePresence>
									{filteredFAQs.map((item, index) => (
										<motion.div
											key={item.id}
											className='faq-item'
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -20 }}
											transition={{ duration: 0.3, delay: index * 0.05 }}
										>
											<Card className='faq-card'>
												<div
													className='faq-question'
													onClick={() => toggleExpanded(item.id)}
												>
													<h3 className='faq-question__text'>
														{item.question}
													</h3>
													<div
														className={`faq-question__icon ${
															expandedItems.has(item.id)
																? 'faq-question__icon--expanded'
																: ''
														}`}
													>
														<svg
															width='24'
															height='24'
															viewBox='0 0 24 24'
															fill='none'
														>
															<path
																d='M6 9L12 15L18 9'
																stroke='currentColor'
																strokeWidth='2'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
														</svg>
													</div>
												</div>

												<AnimatePresence>
													{expandedItems.has(item.id) && (
														<motion.div
															className='faq-answer'
															initial={{ height: 0, opacity: 0 }}
															animate={{ height: 'auto', opacity: 1 }}
															exit={{ height: 0, opacity: 0 }}
															transition={{ duration: 0.3 }}
														>
															<div className='faq-answer__content'>
																<p>{item.answer}</p>

																<div className='faq-feedback'>
																	<p className='faq-feedback__question'>
																		{t('feedback.question')}
																	</p>
																	<div className='faq-feedback__buttons'>
																		<button
																			className='faq-feedback__button faq-feedback__button--yes'
																			onClick={() =>
																				handleHelpful(item.id, true)
																			}
																		>
																			{t('feedback.yes')}
																		</button>
																		<button
																			className='faq-feedback__button faq-feedback__button--no'
																			onClick={() =>
																				handleHelpful(item.id, false)
																			}
																		>
																			{t('feedback.no')}
																		</button>
																	</div>
																</div>
															</div>
														</motion.div>
													)}
												</AnimatePresence>
											</Card>
										</motion.div>
									))}
								</AnimatePresence>
							</div>
						)}
					</motion.div>
				</div>
			</section>

			{/* Contact Section */}
			<section className='faq-contact'>
				<div className='container'>
					<motion.div
						className='faq-contact__content'
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className='faq-contact__title'>{t('contact.title')}</h2>
						<p className='faq-contact__description'>
							{t('contact.description')}
						</p>
						<div className='faq-contact__actions'>
							<a href='/contact' className='btn btn--primary btn--lg'>
								{t('contact.contactUs')}
							</a>
							<a href='/calculator' className='btn btn--outline btn--lg'>
								{t('contact.calculator')}
							</a>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default FAQPage;
