import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { trackLanguageSwitch } from '../../../utils/analytics';
import './LanguageSwitcher.css';

interface LanguageSwitcherProps {
	className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
	className = '',
}) => {
	const { i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

	const languages = [
		{ code: 'en', name: 'English', flag: '🇬🇧' },
		{ code: 'ru', name: 'Русский', flag: '🇷🇺' },
	];

	useEffect(() => {
		setCurrentLanguage(i18n.language);
	}, [i18n.language]);

	const handleLanguageChange = (languageCode: string) => {
		if (languageCode !== currentLanguage) {
			const fromLang = currentLanguage;
			const toLang = languageCode;

			i18n.changeLanguage(languageCode);
			setCurrentLanguage(languageCode);

			// Save language preference to localStorage
			localStorage.setItem('preferred-language', languageCode);

			// Track language switch
			trackLanguageSwitch(fromLang, toLang);

			setIsOpen(false);
		}
	};

	const currentLang =
		languages.find(lang => lang.code === currentLanguage) || languages[0];

	return (
		<div className={`language-switcher ${className}`}>
			<button
				className='language-switcher__button'
				onClick={() => setIsOpen(!isOpen)}
				aria-label='Выбрать язык'
				aria-expanded={isOpen}
			>
				<span className='language-switcher__flag'>{currentLang.flag}</span>
				<span className='language-switcher__code'>
					{currentLang.code.toUpperCase()}
				</span>
				<span
					className={`language-switcher__arrow ${
						isOpen ? 'language-switcher__arrow--open' : ''
					}`}
				>
					▼
				</span>
			</button>

			{isOpen && (
				<div className='language-switcher__dropdown'>
					{languages.map(language => (
						<button
							key={language.code}
							className={`language-switcher__option ${
								language.code === currentLanguage
									? 'language-switcher__option--active'
									: ''
							}`}
							onClick={() => handleLanguageChange(language.code)}
						>
							<span className='language-switcher__flag'>{language.flag}</span>
							<span className='language-switcher__name'>{language.name}</span>
							{language.code === currentLanguage && (
								<span className='language-switcher__check'>✓</span>
							)}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default LanguageSwitcher;
