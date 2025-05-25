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
            title: 'Books',
            description: 'Books App is a full-stack platform to buy, sell, lend, and read books online, featuring multi-language support, secure Razorpay payments, Gmail OAuth2 notifications, and seamless cart and profile management using MERN and Zustand.',
            image: '/static/images/projects/books.png',
            url: 'https://books-epo1.onrender.com'
        },
        {
            title: 'MentorME',
            description: 'MentorMe connects school students with college mentors for personalized career guidance through one-on-one mentorship, AI-based mentor matching, and real-time chat. Built with MERN Stack, Socket.io, and Zustand. Think. Link. Grow.',
            image: '/static/images/projects/MentorME.png',
            url: 'https://mentorme-qs6s.onrender.com'
        },
        {
            title: 'Texts',
            description: 'Texts is a full-stack web application that enables seamless real-time communication between users. Built with Node.js, Express, and React, the app leverages WebSocket technology to deliver instant message updates and a responsive, user-friendly interface.',
            image: '/static/images/projects/Texts.png',
            url: 'https://realtime-chat-app-gdsx.onrender.com'
        },
        {
            title: 'BloodLink',
            description: 'BloodLink is a real-time platform connecting blood donors and healthcare providers. It allows doctors to report shortages instantly and enables users to book donation appointments, ensuring quicker, more efficient responses to critical blood supply needs.',
            image: '/static/images/projects/BloodLink.png',
            url: 'https://github.com/dakshh0827/BloodLink'
        },
        {
            title: 'News',
            description: 'News is a responsive React-based application delivering real-time updates across categories like sports, entertainment, and politics. It ensures users stay informed with the latest global happenings through a clean, fast, and user-friendly interface.',
            image: '/static/images/projects/News.png',
            url: 'https://github.com/dakshh0827/News-App'
        },
    ],
};

export const FEATURED_PROJECT: Lang<ProjectProps[]> = {
    en: [
        {
            title: 'Books',
            description: 'Books App is a full-stack platform to buy, sell, lend, and read books online, featuring multi-language support, secure Razorpay payments, Gmail OAuth2 notifications, and seamless cart and profile management using MERN and Zustand.',
            image: '/static/images/projects/Books.png',
            url: 'https://books-epo1.onrender.com'
        },
        {
            title: 'MentorME',
            description: 'MentorMe connects school students with college mentors for personalized career guidance through one-on-one mentorship, AI-based mentor matching, and real-time chat. Built with MERN Stack, Socket.io, and Zustand. Think. Link. Grow.',
            image: '/static/images/projects/MentorME.png',
            url: 'https://mentorme-qs6s.onrender.com'
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