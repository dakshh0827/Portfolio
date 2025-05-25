import { Lang } from '@/types/components/global';
import { Models } from '@/types/hobbies/models';
import { HobbiesTabsContent } from '@/types/hobbies/tabs';
import Controller from '@/components/models/XboxController';
import Headphone from '@/components/models/Headphone';
import Basketball from '@/components/models/Basketball';

export const MODELS: Models = [Basketball, Headphone, Controller];

export const HOBBIES_TABS: Lang<HobbiesTabsContent> = {
    en: {
        title: 'Personal interests',
        tabs: [
            {
                id: 0,
                title: 'B-ball',
                description: 'Basketball has been a big part of my life—I’ve played it up to the state level. It keeps me agile and sharp, both mentally and physically. More than just a game, it’s taught me teamwork, discipline, and how to stay composed under pressure.'
            },
            {
                id: 1,
                title: 'Music',
                description: 'I listen to a broad range of genres, but my favorites would be R&B, jazz, and pop music. I particularly enjoy listening to music while coding or during trips. It helps me stay focused and relaxed.'
            },
            {
                id: 2,
                title: 'Gaming',
                description: 'I play a lot of video games, but I mostly enjoy first-person shooters, survival games, open world games, and action role-playing games.'
            },
        ]
    },
};