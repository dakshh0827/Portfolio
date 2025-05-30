import { FormData, Labels } from '@/types/form';
import styles from '../../styles/modules/Form.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useIsMounted from '@/hooks/useIsMounted';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import useNavigationContext from '@/context/navigationContext';
import { getFormSchema } from '@/schemas/form';
import { getTranslation } from '@/utils/translation';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import FormRecaptchaNote from './FormRecaptchaNote';
import Button from '../shared/Button';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import TranslateInOut from '../shared/gsap/TranslateInOut';
import FadeInOut from '../shared/gsap/FadeInOut';
import classNames from 'classnames';

const labels: Labels = {
    firstname: 'First name',
    lastname: 'Last name',
    email: 'Email',
    message: 'Message'
}

async function sendFormData(data: FormData, recaptchaToken: string, locale: string): Promise<Response> {
    return await fetch('/api/form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': locale
        },
        body: JSON.stringify({
            data,
            labels,
            recaptchaToken
        })
    });
}

export default function Form() {
    const { currentLocale } = useNavigationContext();
    const { locale } = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { isSubmitting, errors },
        trigger
    } = useForm<FormData>({
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            message: ''
        },
        resolver: yupResolver(getFormSchema(locale ?? ''))
    });
    const isMounted = useIsMounted();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const firstnameLabel = getTranslation('First name', locale ?? '');
    const lastnameLabel = getTranslation('Last name', locale ?? '');
    const emailLabel = getTranslation('Email', locale ?? '');
    const messageLabel = getTranslation('Message', locale ?? '');
    const toastLoadingMessage = getTranslation('Your message is on its way!', locale ?? '');
    const formErrorsMessage = getTranslation('Form has errors.', locale ?? '');
    const buttonLabel = getTranslation('Send', locale ?? '');
    const networkErrorMessage = getTranslation('Network error. Please check your connection and try again.', locale ?? '');

    const submitForm = async (data: FormData, recaptchaToken: string) => {
        const toastConfig = {
            isLoading: false,
            autoClose: 5000, // Increased from 3000 for better UX
            closeButton: true,
            draggable: true
        }

        const toastId = toast.loading(toastLoadingMessage);

        try {
            const response = await sendFormData(data, recaptchaToken, locale ?? '');

            const _data = await response.json();

            if (!response.ok) {
                /* Clear previous server errors */
                setError('root.serverError', {
                    type: response.status.toString(),
                });
                
                if (_data.errors && typeof _data.errors === 'object') {
                    /* Validation error, expect response to be a JSON response {"field": "error message for that field"} */
                    for (const [fieldName, errorMessage] of Object.entries(_data.errors) as [keyof FormData, string][]) {
                        setError(fieldName, {
                            type: 'server', 
                            message: errorMessage
                        });
                    }
                }
                throw new Error(_data.message || formErrorsMessage);
            }

            toast.update(toastId, {
                render: _data.message,
                type: 'success',
                ...toastConfig
            });

            /* Reset form after success */
            reset();

        } catch (error) {
            let errorMessage = formErrorsMessage;
            
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            
            // Handle network errors
            if (error instanceof TypeError && error.message.includes('fetch')) {
                errorMessage = networkErrorMessage;
            }

            toast.update(toastId, {
                render: errorMessage,
                type: 'error',
                ...toastConfig
            });
        }
    };

    const handleSubmitForm = async (data: FormData) => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            toast.error(getTranslation('reCAPTCHA not ready. Please try again.', locale ?? ''));
            return;
        }

        try {
            const recaptchaToken = await executeRecaptcha('submit');
            await submitForm(data, recaptchaToken);
        } catch (error) {
            console.error(`Form - Recaptcha Error: ${error}`);
            toast.error(getTranslation('reCAPTCHA verification failed. Please try again.', locale ?? ''));
        }
    }

    useEffect(() => {
        if (currentLocale !== locale && Object.keys(errors).length) {
            trigger();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locale]);

    return(
        <>
            <section className={classNames
                (
                    'u-spacing--responsive--bottom',
                    styles['c-form']
                )}
            >
                <div className="o-container">
                    <div className="o-grid">
                        <form className={styles['c-form__element']} onSubmit={handleSubmit(handleSubmitForm)} noValidate>
                            <div className={styles['c-form__row']}>
                                <div className={styles['c-form__item']}>
                                    <TranslateInOut
                                        delay={0.1}
                                        durationIn={0.6}
                                        outro={{
                                            opacity: 0
                                        }}
                                        y="100%"
                                        start="-100% bottom"
                                        end="top top"
                                        watch
                                    >
                                        <FormInput
                                            htmlFor="firstname"
                                            label={firstnameLabel}
                                            id="firstname"
                                            required={true}
                                            className="c-formElement--bordered"
                                            register={register('firstname')}
                                            errors={errors['firstname']}
                                        />
                                    </TranslateInOut>
                                </div>
                                <div className={styles['c-form__item']}>
                                    <TranslateInOut
                                        delay={0.15}
                                        durationIn={0.6}
                                        outro={{
                                            opacity: 0
                                        }}
                                        y="100%"
                                        start="-100% bottom"
                                        end="top top"
                                        watch
                                    >
                                        <FormInput
                                            htmlFor="lastname"
                                            label={lastnameLabel}
                                            id="lastname"
                                            required={true}
                                            className="c-formElement--bordered"
                                            register={register('lastname')}
                                            errors={errors['lastname']}
                                        />
                                    </TranslateInOut>
                                </div>
                                <div className={styles['c-form__itemFull']}>
                                    <TranslateInOut
                                        delay={0.20}
                                        durationIn={0.6}
                                        outro={{
                                            opacity: 0
                                        }}
                                        y="100%"
                                        start="-100% bottom"
                                        end="top top"
                                        watch
                                    >
                                        <FormInput
                                            htmlFor="email"
                                            label={emailLabel}
                                            type="email"
                                            id="email"
                                            required={true}
                                            className="c-formElement--bordered"
                                            register={register('email')}
                                            errors={errors['email']}
                                        />
                                    </TranslateInOut>
                                </div>
                                <div className={styles['c-form__itemFull']}>
                                    <TranslateInOut
                                        delay={0.25}
                                        durationIn={0.6}
                                        outro={{
                                            opacity: 0
                                        }}
                                        y="100%"
                                        start="-100% bottom"
                                        end="top top"
                                        watch
                                    >
                                        <FormTextarea
                                            htmlFor="message"
                                            label={messageLabel}
                                            id="message"
                                            required={true}
                                            className="c-formElement--bordered"
                                            register={register('message')}
                                            errors={errors['message']}
                                        />
                                    </TranslateInOut>
                                </div>
                            </div>
                            <div className="u-overflow--hidden">
                                <TranslateInOut
                                    fade={false}
                                    y="100%"
                                    start="-100% bottom"
                                    end="top top"
                                    watch
                                >
                                    <FormRecaptchaNote />
                                </TranslateInOut>
                            </div>
                            <FadeInOut
                                watch
                            >
                                <div className={styles['c-form__btn']}>
                                    <Button
                                        label={buttonLabel}
                                        className="c-btn"
                                        wrapperClassName={classNames({'c-formElement--submit': isSubmitting})}
                                        type="submit"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </FadeInOut>
                        </form>
                    </div>
                    {isMounted() &&
                        <ToastContainer
                            position={toast.POSITION.BOTTOM_CENTER}
                            transition={Zoom}
                            className="c-toastify"
                        />
                    }
                </div>
            </section>
        </>
    );
}