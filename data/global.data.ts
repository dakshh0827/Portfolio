import { CallToActionContent, FooterContent, Lang, MetaDataProps, NavigationRoutes, Translations } from '@/types/components/global';
import { BasicHeaderProps } from '@/types/components/headers';

export const NAVIGATION_ROUTES: Lang<NavigationRoutes> = {
    en: [
        {
            href: '/projects',
            title: 'Projects'
        },
        {
            href: '/about',
            title: 'About'
        },
        {
            href: '/contact',
            title: 'Contact'
        }
    ],
};

export const FOOTER: Lang<FooterContent> = {
    en: {
        title: 'Full-Stack Developer'
    },
};

export const CALL_TO_ACTION: Lang<CallToActionContent> = {
    en: {
        title: 'Get in touch',
        buttonLabel: 'Contact me',
        buttonHref: '/contact'

    },
};

export const META_404: Lang<MetaDataProps> = {
    en: {
        title: `Error 404 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
    },
};

export const PAGE_NOT_FOUND_HEADER: Lang<BasicHeaderProps> = {
    en: {
        title: 'Page not found',
        content: 'Cannot read properties of undefined. The page you are looking for could not be found.',
        button: {
            label: 'Please get me out of here'
        }
    },
};

export const TRANSLATIONS: Lang<Translations> = {
    en: [
        {
            key: 'Front-end Developer Full stack capable, passionate about building appealing and interactive web experiences.',
            value: 'Front-end Developer Full stack capable, passionate about building appealing and interactive web experiences.'
        },
        {
            key: 'Visit website',
            value: 'Visit website'
        },
        {
            key: 'All rights reserved',
            value: 'All rights reserved'
        },
        {
            key: 'First name',
            value: 'First name'
        },
        {
            key: 'Last name',
            value: 'Last name'
        },
        {
            key: 'Email',
            value: 'Email'
        },
        {
            key: 'Send',
            value: 'Send'
        },
        {
            key: 'Sending',
            value: 'Sending'
        },
        {
            key: 'This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" title="Privacy Policy">Privacy Policy</a> and <a href="https://policies.google.com/terms" title="Terms of Service">Terms of Service</a> apply.',
            value: 'This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" title="Privacy Policy">Privacy Policy</a> and <a href="https://policies.google.com/terms" title="Terms of Service">Terms of Service</a> apply.'
        },
        {
            key: 'Your message is on its way!',
            value: 'Your message is on its way!'
        },
        {
            key: 'Thank you, your message has been sent successfully.',
            value: 'Thank you, your message has been sent successfully.'
        },
        {
            key: 'Form has errors.',
            value: 'Form has errors.'
        },
        {
            key: 'This field is required.',
            value: 'This field is required.'
        },
        {
            key: 'The specified email address is invalid.',
            value: 'The specified email address is invalid.'
        },
        {
            key: 'An error occurred while sending the email.',
            value: 'An error occurred while sending the email.'
        },
        {
            key: 'Internal Server Error.',
            value: 'Internal Server Error.'
        },
        {
            key: 'ReCaptcha validation failed.',
            value: 'ReCaptcha validation failed.'
        },
        {
            key: 'Error validating captcha',
            value: 'Error validating captcha'
        },
        {
            key: 'Close',
            value: 'Close'
        }
    ],
};