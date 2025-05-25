import { FEATURED_PROJECT } from './projects.data';
import { Lang } from '@/types/components/global';
import { HomeHeaderProps } from '@/types/components/headers';
import { HomeIntroductionContent } from '@/types/components/introductions';
import { HomeFeaturedProjectContent } from '@/types/components/sections';

export const HOME_HEADER: Lang<HomeHeaderProps> = {
    en: {
        titles: ['Full-Stack', 'Developer'],
        subfield: 'Hi there! I’m Daksh Thakran, an aspiring Software Engineer',
        image: '/static/images/home-portrait.jpg',
        content: 'Maker of things with passion and excellence',
        name: ['Daksh', 'Thakran']
    },
};

export const HOME_INTRODUCTION: Lang<HomeIntroductionContent> = {
    en: {
        titles: [
            'Passionate full-stack developer skilled in MERN stack, with experience leading projects like MentorMe and a book-store. Strong problem-solving skills backed by 450+ DSA challenges and a passion for building impactful, real-world applications.',
            'When I\'m not coding or exploring new web technologies, I am playing video games or watching the latest movies and tv shows released.'
        ],
        content: [
            'Over two years of college, I’ve built accessible, responsive, and high-performance web applications. Each project has helped me sharpen my skills in full-stack development, problem-solving, and real-world implementation across multiple domains.',
            'I simply love working on ambitious projects on my own or with positive people.'
        ],
        button: {
            label: 'More about me',
            href: '/about'
        }
    },
};

export const HOME_FEATURED_PROJECT_CONTENT: Lang<HomeFeaturedProjectContent> = {
    en: {
        title: 'Projects',
        button: {
            label: 'See all projects',
            href: {
                pathname: '/projects',
                query: {
                    type: FEATURED_PROJECT['en'][0].type
                }
            }
        }
    },
};