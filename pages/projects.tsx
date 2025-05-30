import { META_PROJECTS, PROJECTS_LIST, PROJECTS_TABS } from '@/data/projects.data';
import { CALL_TO_ACTION } from '@/data/global.data';
import { CallToActionContent, MetaDataProps } from '@/types/components/global';
import { ProjectsTabsType } from '@/types/projects/tabs';
import { ProjectsList, ProjectsType } from '@/types/projects';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProjectsTabs from '@/components/ProjectsTabs';
import CallToAction from '@/components/CallToAction';

export default function Projects({
    projectsList,
    tabs,
    callToAction
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const { query } = useRouter();

    // Default to "work" tab
    const defaultType: ProjectsType = ProjectsType.PERSONAL_PROJECTS;
    const [projectsType, setProjectsType] = useState<ProjectsType>(defaultType);

    // Override default if `?type=` param matches
    useEffect(() => {
        const queryType = query.type;
        if (typeof queryType === 'string') {
            const matched = Object.values(ProjectsType).find(t => t === queryType);
            if (matched) setProjectsType(matched);
        }
    }, [query.type]);

    const projects = useMemo(() => {
        return projectsList?.[projectsType] ?? [];
    }, [projectsList, projectsType]);

    useIsomorphicLayoutEffect(() => {
        ScrollTrigger.refresh(true);
    }, [projectsType]);

    return (
        <>
            <ProjectsTabs
                index="01"
                tabs={tabs}
                projects={projects}
                projectsType={projectsType}
                setProjectsType={setProjectsType}
            />
            <CallToAction
                index="02"
                title={callToAction?.title ?? ''}
                buttonLabel={callToAction?.buttonLabel ?? ''}
                buttonHref={callToAction?.buttonHref ?? ''}
            />
        </>
    );
};

export const getStaticProps: GetStaticProps<{
    metaData: MetaDataProps | null;
    projectsList: ProjectsList | null;
    tabs: ProjectsTabsType;
    callToAction: CallToActionContent | null;
}> = async ({ locale }) => {
    const lang = locale ?? '';

    // Safely assign, fallback to null or empty array where appropriate
    const metaData = META_PROJECTS[lang] ?? null;
    const projectsList = PROJECTS_LIST[lang] ?? null;
    const tabs = PROJECTS_TABS[lang] ?? [];
    const callToAction = CALL_TO_ACTION[lang] ?? null;

    // You can add more default values for required nested props if needed

    return {
        props: {
            metaData,
            projectsList,
            tabs,
            callToAction,
        },
    };
};
