import { ABOUT_HEADER, ABOUT_INTRODUCTION, META_ABOUT } from '@/data/about.data';
import { HOBBIES_TABS, MODELS } from '@/data/hobbies.data';
import { CALL_TO_ACTION } from '@/data/global.data';
import { AboutHeaderProps } from '@/types/components/headers';
import { AboutIntroductionContent } from '@/types/components/introductions';
import { HobbiesTabsContent } from '@/types/hobbies/tabs';
import { CallToActionContent, MetaDataProps } from '@/types/components/global';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import AboutHeader from '@/components/AboutHeader';
import AboutIntroduction from '@/components/AboutIntroduction';
import HobbiesTabs from '@/components/HobbiesTabs';
import CallToAction from '@/components/CallToAction';

export default function About({
    aboutHeader,
    aboutIntroduction,
    tabs,
    callToAction
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <AboutHeader
                {...aboutHeader}
                titles={aboutHeader?.titles ?? []}
                image={aboutHeader?.image ?? ''}
            />
            <AboutIntroduction
                index="01"
                {...aboutIntroduction}
                content={aboutIntroduction?.content ?? []}
                image={aboutIntroduction?.image ?? ''}
            />
            <HobbiesTabs
                index="02"
                {...tabs}
                title={tabs?.title ?? ''}
                models={MODELS}
                tabs={tabs?.tabs ?? []}
            />
            <CallToAction
                index="03"
                title={callToAction?.title ?? ''}
                buttonLabel={callToAction?.buttonLabel ?? ''}
                buttonHref={callToAction?.buttonHref ?? ''}
            />
        </>
    );
};

export const getStaticProps: GetStaticProps<{
    metaData: MetaDataProps | null;
    aboutHeader: AboutHeaderProps | null;
    aboutIntroduction: AboutIntroductionContent | null;
    tabs: HobbiesTabsContent | null;
    callToAction: CallToActionContent | null;
}> = async ({ locale }) => {
    const fallbackLang = 'en';
    const lang = locale && ABOUT_HEADER[locale] ? locale : fallbackLang;

    const metaData = META_ABOUT[lang] ?? null;
    const aboutHeader = ABOUT_HEADER[lang] ?? null;
    const aboutIntroduction = ABOUT_INTRODUCTION[lang] ?? null;
    const tabs = HOBBIES_TABS[lang] ?? null;
    const callToAction = CALL_TO_ACTION[lang] ?? null;

    return {
        props: {
            metaData,
            aboutHeader,
            aboutIntroduction,
            tabs,
            callToAction
        }
    }
};
