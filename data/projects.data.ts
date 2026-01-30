import { Lang, MetaDataProps } from '@/types/components/global';
import { ProjectsTabsType } from '@/types/projects/tabs';
import { ProjectProps, Projects, ProjectsList, ProjectsType } from '@/types/projects';
import { toTwoDigits } from '@/utils/number';

export const META_PROJECTS: Lang<MetaDataProps> = {
    en: {
        title: `Projects | ${process.env.NEXT_PUBLIC_SITE_NAME}`
    },
};

export const PERSONAL_PROJECTS: Lang<Projects> = {
    en: [
        {
            title: 'MaViK-39',
            description: 'MaViK-39 is a comprehensive full-stack IoT platform designed for industrial training institutes (ITIs) to monitor, manage, and maintain laboratory equipment in real-time. The system integrates hardware sensors (ESP32/Arduino) with a cloud backend to track equipment health, predict failures using machine learning, and enforce biometric-based access control for student safety and accountability.',
            image: '/static/images/projects/Mavik.png',
            url: 'https://mavik-39.vercel.app/'
        },
        {
            title: 'Wrap-Up',
            description: 'Wrap-Up is a decentralized article curation platform on Mantle blockchain that uses Groq AI to scrape and summarize web content, storing it on IPFS with immutable on-chain records. Users earn $MFD tokens for curating quality articles through community voting, featuring nested comments, engagement-based leaderboards, and a MERN stack with Web3 integration that ensures transparent, censorship-resistant content verification where every action is cryptographically recorded.',
            image: '/static/images/projects/Wrap.png',
            url: 'https://wrap-up-one.vercel.app/'
        },
        {
            title: 'AyurTrace',
            description: 'AyurTrace is a full-stack supply chain traceability system designed specifically for the Ayurvedic medicine industry. It addresses the critical need for transparency and authenticity verification in herbal product manufacturing by creating an immutable, end-to-end tracking system from farm harvest to consumer purchase. The platform combats counterfeit products and builds consumer trust through verifiable documentation at every stage of the supply chain.',
            image: '/static/images/projects/Ayurtrace.png',
            url: 'https://ayurtrace-sepia.vercel.app/'
        },
        {
            title: 'Books',
            description: 'Books App is a full-stack platform to buy, sell, lend, and read books online, featuring multi-language support, secure Razorpay payments, Gmail OAuth2 notifications, and seamless cart and profile management using MERN and Zustand.',
            image: '/static/images/projects/Books.png',
            url: 'https://books-epo1.onrender.com'
        },
        {
            title: 'MentorME',
            description: 'MentorMe connects school students with college mentors for personalized career guidance through one-on-one mentorship, AI-based mentor matching, and real-time chat. Built with MERN Stack, Socket.io, and Zustand. Think. Link. Grow.',
            image: '/static/images/projects/MentorMe.png',
            url: 'https://mentorme-qs6s.onrender.com'
        },
    ],
};

export const FEATURED_PROJECT: Lang<ProjectProps[]> = {
    en: [
        {
            title: 'MaViK-39',
            description: 'MaViK-39 is a comprehensive full-stack IoT platform designed for industrial training institutes (ITIs) to monitor, manage, and maintain laboratory equipment in real-time. The system integrates hardware sensors (ESP32/Arduino) with a cloud backend to track equipment health, predict failures using machine learning, and enforce biometric-based access control for student safety and accountability.',
            image: '/static/images/projects/Mavik.png',
            url: 'https://mavik-39.vercel.app/'
        },
        {
            title: 'Wrap-Up',
            description: 'Wrap-Up is a decentralized article curation platform on Mantle blockchain that uses Groq AI to scrape and summarize web content, storing it on IPFS with immutable on-chain records. Users earn $MFD tokens for curating quality articles through community voting, featuring nested comments, engagement-based leaderboards, and a MERN stack with Web3 integration that ensures transparent, censorship-resistant content verification where every action is cryptographically recorded.',
            image: '/static/images/projects/Wrap.png',
            url: 'https://wrap-up-one.vercel.app/'
        },
    ],
};

export const TOTAL_PERSONAL_PROJECTS = {
    en: PERSONAL_PROJECTS['en'].length
};

export const PROJECTS_TABS: Lang<ProjectsTabsType> = {
    en: [
        {
            title: 'Personal',
            description: 'A selected set of personal projects I\'m building as I navigate through ideas and technologies.',
            type: ProjectsType.PERSONAL_PROJECTS,
            total: toTwoDigits(TOTAL_PERSONAL_PROJECTS['en'])
        }
    ],
};

export const PROJECTS_LIST: Lang<ProjectsList> = {
    en: {
        [ProjectsType.PROJECTS]: [],
        [ProjectsType.PERSONAL_PROJECTS]: PERSONAL_PROJECTS['en']
    },
};
