import { Lang, MetaDataProps } from '@/types/components/global';
import { AboutHeaderProps } from '@/types/components/headers';
import { AboutIntroductionContent } from '@/types/components/introductions';

export const META_ABOUT: Lang<MetaDataProps> = {
    en: {
        title: `About | ${process.env.NEXT_PUBLIC_SITE_NAME}`
    },
};

export const ABOUT_HEADER: Lang<AboutHeaderProps> = {
    en: {
        titles: ['Passionate', 'Full-Stack', 'Developer'],
        image: '/static/images/about-header.png'
    },
};

export const ABOUT_INTRODUCTION: Lang<AboutIntroductionContent> = {
    en: {
        content: [
            'I’m a full-stack developer pursuing a B.E. in Computer Science at Chandigarh University with hands-on experience in the MERN stack. I’ve led impactful projects like MentorMe and a Blood Shortage Reporting Platform, integrating real-time and AI-powered features. With 450+ DSA problems solved and hackathon experience, I excel under pressure. I value adaptability, collaboration, and continuous learning, and I’m eager to apply my skills in dynamic, growth-focused environments.',
            'The things we create and the quality of our work reflect our true selves, so I always strive to give my best effort.'
        ],
        image: '/static/images/about-portrait.jpg'
    },
};