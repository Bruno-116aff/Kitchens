import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import {
	contactFormSchema,
	type ContactFormData,
} from '../../utils/validation';
import { trackFormSubmit } from '../../utils/analytics';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import Select, { type SelectOption } from './Select';
import './ContactForm.css';

interface ContactFormProps {
	onSubmit?: (data: ContactFormData) => void;
	className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
	onSubmit,
	className = '',
}) => {
	const { t } = useTranslation('common');
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			serviceType: '',
			message: '',
			agreeToPrivacy: false,
		},
	});

	const serviceTypeOptions: SelectOption[] = [
		{ value: '', label: t('forms.serviceType'), disabled: true },
		{ value: 'kitchenDesign', label: t('serviceTypes.kitchenDesign') },
		{ value: 'fullInstallation', label: t('serviceTypes.fullInstallation') },
		{ value: 'consultation', label: t('serviceTypes.consultation') },
		{ value: 'other', label: t('serviceTypes.other') },
	];

	const handleFormSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true);

		try {
			// Track the form submission
			trackFormSubmit(data);

			// Call the onSubmit callback if provided
			if (onSubmit) {
				await onSubmit(data);
			}

			// Reset form after successful submission
			reset();

			// TODO: Show success message
			console.log('Form submitted successfully:', data);
		} catch (error) {
			console.error('Form submission error:', error);
			// TODO: Show error message
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			className={`contact-form ${className}`}
			onSubmit={handleSubmit(handleFormSubmit)}
			noValidate
		>
			<div className='contact-form__header'>
				<h3>Get Your Free Quote</h3>
				<p>
					Fill out the form below and we'll get back to you within 24 hours.
				</p>
			</div>

			<div className='contact-form__fields'>
				<Input
					label={t('forms.name')}
					required
					error={errors.name?.message}
					{...register('name')}
				/>

				<Input
					label={t('forms.email')}
					type='email'
					error={errors.email?.message}
					{...register('email')}
				/>

				<Input
					label={t('forms.phone')}
					type='tel'
					error={errors.phone?.message}
					{...register('phone')}
				/>

				<Select
					label={t('forms.serviceType')}
					required
					options={serviceTypeOptions}
					error={errors.serviceType?.message}
					{...register('serviceType')}
				/>

				<Textarea
					label={t('forms.message')}
					placeholder='Tell us about your project...'
					error={errors.message?.message}
					{...register('message')}
				/>

				<div className='contact-form__checkbox'>
					<label className='checkbox-label'>
						<input
							type='checkbox'
							{...register('agreeToPrivacy')}
							className='checkbox-input'
						/>
						<span className='checkbox-text'>{t('forms.agreePrivacy')}</span>
					</label>
					{errors.agreeToPrivacy && (
						<div className='checkbox-error' role='alert'>
							{errors.agreeToPrivacy.message}
						</div>
					)}
				</div>
			</div>

			<div className='contact-form__footer'>
				<Button
					type='submit'
					variant='primary'
					size='lg'
					disabled={isSubmitting}
					className='contact-form__submit'
				>
					{isSubmitting ? 'Submitting...' : t('buttons.submit')}
				</Button>
			</div>
		</form>
	);
};

export default ContactForm;
