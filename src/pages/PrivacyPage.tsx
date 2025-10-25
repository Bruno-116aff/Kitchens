import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './PrivacyPage.css';

const PrivacyPage: React.FC = () => {
	const { t } = useTranslation('privacy');

	return (
		<div className='privacy-page'>
			{/* Hero Section */}
			<section className='privacy-hero'>
				<div className='container'>
					<motion.div
						className='privacy-hero__content'
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h1 className='privacy-hero__title'>{t('hero.title')}</h1>
						<p className='privacy-hero__subtitle'>{t('hero.subtitle')}</p>
						<p className='privacy-hero__lastUpdated'>{t('hero.lastUpdated')}</p>
					</motion.div>
				</div>
			</section>

			{/* Content Section */}
			<section className='privacy-content'>
				<div className='container'>
					<motion.div
						className='privacy-content__wrapper'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<div className='privacy-content__main'>
							{/* Introduction */}
							<section className='privacy-section'>
								<h2 className='privacy-section__title'>
									{t('introduction.title')}
								</h2>
								<div className='privacy-section__content'>
									<p>{t('introduction.content')}</p>
								</div>
							</section>

							{/* Information Collection */}
							<section className='privacy-section'>
								<h2 className='privacy-section__title'>
									{t('informationCollection.title')}
								</h2>
								<div className='privacy-section__content'>
									<h3>{t('informationCollection.personalData.title')}</h3>
									<p>{t('informationCollection.personalData.content')}</p>
									<ul>
										<li>{t('informationCollection.personalData.items.0')}</li>
										<li>{t('informationCollection.personalData.items.1')}</li>
										<li>{t('informationCollection.personalData.items.2')}</li>
										<li>{t('informationCollection.personalData.items.3')}</li>
										<li>{t('informationCollection.personalData.items.4')}</li>
									</ul>

									<h3>{t('informationCollection.automaticData.title')}</h3>
									<p>{t('informationCollection.automaticData.content')}</p>
									<ul>
										<li>{t('informationCollection.automaticData.items.0')}</li>
										<li>{t('informationCollection.automaticData.items.1')}</li>
										<li>{t('informationCollection.automaticData.items.2')}</li>
										<li>{t('informationCollection.automaticData.items.3')}</li>
									</ul>
								</div>
							</section>

							{/* Use of Information */}
							<section className='privacy-section'>
								<h2 className='privacy-section__title'>
									{t('useOfInformation.title')}
								</h2>
								<div className='privacy-section__content'>
									<p>{t('useOfInformation.content')}</p>
									<ul>
										<li>{t('useOfInformation.items.0')}</li>
										<li>{t('useOfInformation.items.1')}</li>
										<li>{t('useOfInformation.items.2')}</li>
										<li>{t('useOfInformation.items.3')}</li>
										<li>{t('useOfInformation.items.4')}</li>
										<li>{t('useOfInformation.items.5')}</li>
									</ul>
								</div>
							</section>

							{/* Information Sharing */}
							<section className='privacy-section'>
								<h2 className='privacy-section__title'>
									{t('informationSharing.title')}
								</h2>
								<div className='privacy-section__content'>
									<p>{t('informationSharing.content')}</p>
									<h3>{t('informationSharing.thirdParties.title')}</h3>
									<p>{t('informationSharing.thirdParties.content')}</p>
									<ul>
										<li>{t('informationSharing.thirdParties.items.0')}</li>
										<li>{t('informationSharing.thirdParties.items.1')}</li>
										<li>{t('informationSharing.thirdParties.items.2')}</li>
									</ul>
								</div>
							</section>

							{/* Data Security */}
							<section className='privacy-section'>
								<h2 className='privacy-section__title'>
									{t('dataSecurity.title')}
								</h2>
								<div className='privacy-section__content'>
									<p>{t('dataSecurity.content')}</p>
									<ul>
										<li>{t('dataSecurity.items.0')}</li>
										<li>{t('dataSecurity.items.1')}</li>
										<li>{t('dataSecurity.items.2')}</li>
										<li>{t('dataSecurity.items.3')}</li>
									</ul>
								</div>
							</section>

							{/* Cookies */}
							<section className='privacy-section'>
								<h2 className='privacy-section__title'>{t('cookies.title')}</h2>
								<div className='privacy-section__content'>
									<p>{t('cookies.content')}</p>
									<h3>{t('cookies.types.title')}</h3>
									<ul>
										<li>{t('cookies.types.items.0')}</li>
										<li>{t('cookies.types.items.1')}</li>
										<li>{t('cookies.types.items.2')}</li>
									</ul>
									<p>{t('cookies.management')}</p>
								</div>
							</section>

							{/* Your Rights */}
							<section className='privacy-section'>
								<h2 className='privacy-section__title'>
									{t('yourRights.title')}
								</h2>
								<div className='privacy-section__content'>
									<p>{t('yourRights.content')}</p>
									<ul>
										<li>{t('yourRights.items.0')}</li>
										<li>{t('yourRights.items.1')}</li>
										<li>{t('yourRights.items.2')}</li>
										<li>{t('yourRights.items.3')}</li>
										<li>{t('yourRights.items.4')}</li>
									</ul>
								</div>
							</section>

							{/* Data Retention */}
							<section className='privacy-section'>
								<h2 className='privacy-section__title'>
									{t('dataRetention.title')}
								</h2>
								<div className='privacy-section__content'>
									<p>{t('dataRetention.content')}</p>
								</div>
							</section>

							{/* Children's Privacy */}
							<section className='privacy-section'>
								<h2 className='privacy-section__title'>
									{t('childrensPrivacy.title')}
								</h2>
								<div className='privacy-section__content'>
									<p>{t('childrensPrivacy.content')}</p>
								</div>
							</section>

							{/* Changes to Policy */}
							<section className='privacy-section'>
								<h2 className='privacy-section__title'>
									{t('changesToPolicy.title')}
								</h2>
								<div className='privacy-section__content'>
									<p>{t('changesToPolicy.content')}</p>
								</div>
							</section>

							{/* Contact Information */}
							<section className='privacy-section'>
								<h2 className='privacy-section__title'>
									{t('contactInformation.title')}
								</h2>
								<div className='privacy-section__content'>
									<p>{t('contactInformation.content')}</p>
									<div className='privacy-contact'>
										<p>
											<strong>{t('contactInformation.email')}</strong>
										</p>
										<p>
											<strong>{t('contactInformation.phone')}</strong>
										</p>
										<p>
											<strong>{t('contactInformation.address')}</strong>
										</p>
									</div>
								</div>
							</section>
						</div>

						{/* Sidebar */}
						<div className='privacy-content__sidebar'>
							<div className='privacy-nav'>
								<h3>{t('navigation.title')}</h3>
								<ul>
									<li>
										<a href='#introduction'>{t('navigation.introduction')}</a>
									</li>
									<li>
										<a href='#information-collection'>
											{t('navigation.informationCollection')}
										</a>
									</li>
									<li>
										<a href='#use-of-information'>
											{t('navigation.useOfInformation')}
										</a>
									</li>
									<li>
										<a href='#information-sharing'>
											{t('navigation.informationSharing')}
										</a>
									</li>
									<li>
										<a href='#data-security'>{t('navigation.dataSecurity')}</a>
									</li>
									<li>
										<a href='#cookies'>{t('navigation.cookies')}</a>
									</li>
									<li>
										<a href='#your-rights'>{t('navigation.yourRights')}</a>
									</li>
									<li>
										<a href='#data-retention'>
											{t('navigation.dataRetention')}
										</a>
									</li>
									<li>
										<a href='#childrens-privacy'>
											{t('navigation.childrensPrivacy')}
										</a>
									</li>
									<li>
										<a href='#changes-to-policy'>
											{t('navigation.changesToPolicy')}
										</a>
									</li>
									<li>
										<a href='#contact-information'>
											{t('navigation.contactInformation')}
										</a>
									</li>
								</ul>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default PrivacyPage;
