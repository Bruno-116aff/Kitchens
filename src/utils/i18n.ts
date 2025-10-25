import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import commonEn from '../locales/en/common.json';
import homeEn from '../locales/en/home.json';
import calculatorEn from '../locales/en/calculator.json';
import imagesEn from '../locales/en/images.json';
import aboutEn from '../locales/en/about.json';
import processEn from '../locales/en/process.json';
import faqEn from '../locales/en/faq.json';
import privacyEn from '../locales/en/privacy.json';
import termsEn from '../locales/en/terms.json';

import commonRu from '../locales/ru/common.json';
import homeRu from '../locales/ru/home.json';
import calculatorRu from '../locales/ru/calculator.json';
import imagesRu from '../locales/ru/images.json';
import aboutRu from '../locales/ru/about.json';
import processRu from '../locales/ru/process.json';
import faqRu from '../locales/ru/faq.json';
import privacyRu from '../locales/ru/privacy.json';
import termsRu from '../locales/ru/terms.json';

const resources = {
	en: {
		common: commonEn,
		home: homeEn,
		calculator: calculatorEn,
		images: imagesEn,
		about: aboutEn,
		process: processEn,
		faq: faqEn,
		privacy: privacyEn,
		terms: termsEn,
	},
	ru: {
		common: commonRu,
		home: homeRu,
		calculator: calculatorRu,
		images: imagesRu,
		about: aboutRu,
		process: processRu,
		faq: faqRu,
		privacy: privacyRu,
		terms: termsRu,
	},
};

// Get saved language preference or default to English
const savedLanguage = localStorage.getItem('preferred-language');
const defaultLanguage =
	savedLanguage && ['en', 'ru'].includes(savedLanguage) ? savedLanguage : 'en';

i18n.use(initReactI18next).init({
	resources,
	lng: defaultLanguage,
	fallbackLng: 'en',

	// have a common namespace used around the full app
	defaultNS: 'common',
	ns: [
		'common',
		'home',
		'calculator',
		'images',
		'about',
		'process',
		'faq',
		'privacy',
		'terms',
	],

	interpolation: {
		escapeValue: false, // react already does escaping
	},

	// Save language preference to localStorage
	saveMissing: true,
	debug:
		typeof window !== 'undefined' && window.location.hostname === 'localhost',
});

export default i18n;
