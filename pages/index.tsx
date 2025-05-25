import { HOME_FEATURED_PROJECT_CONTENT, HOME_HEADER, HOME_INTRODUCTION } from '@/data/home.data';
import { FEATURED_PROJECT } from '@/data/projects.data';
import { CALL_TO_ACTION } from '@/data/global.data';
import { CallToActionContent } from '@/types/components/global';
import { HomeHeaderProps } from '@/types/components/headers';
import { HomeIntroductionContent } from '@/types/components/introductions';
import { HomeFeaturedProjectContent } from '@/types/components/sections';
import { ProjectProps } from '@/types/projects';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import HomeHeader from '@/components/HomeHeader';
import HomeIntroduction from '@/components/HomeIntroduction';
import HomeFeaturedProject from '@/components/HomeFeaturedProject';
import CallToAction from '@/components/CallToAction';

// Recursive function to remove all undefined values from an object or array
function cleanUndefined(obj: any): any {
  if (Array.isArray(obj)) return obj.map(cleanUndefined);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, cleanUndefined(v)])
    );
  }
  return obj;
}

export default function Home({
  homeHeader,
  homeIntroduction,
  homeFeaturedProjectContent,
  featuredProject,
  callToAction
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <HomeHeader {...homeHeader} />
      <HomeIntroduction index="01" {...homeIntroduction} />
      <HomeFeaturedProject
        index="02"
        {...homeFeaturedProjectContent}
        project={featuredProject}
      />
      <CallToAction index="04" {...callToAction} />
    </>
  );
}
 
export const getStaticProps: GetStaticProps<{
  homeHeader: HomeHeaderProps;
  homeIntroduction: HomeIntroductionContent;
  homeFeaturedProjectContent: HomeFeaturedProjectContent;
  featuredProject: ProjectProps[];
  callToAction: CallToActionContent;
}> = async ({ locale }) => {
  const lang = locale ?? '';
  const homeHeader = HOME_HEADER[lang];
  const homeIntroduction = HOME_INTRODUCTION[lang];
  const homeFeaturedProjectContent = HOME_FEATURED_PROJECT_CONTENT[lang];
  const featuredProject = FEATURED_PROJECT[lang];
  const callToAction = CALL_TO_ACTION[lang];

  // Clean all undefined values from all props
  return {
    props: {
      homeHeader: cleanUndefined(homeHeader),
      homeIntroduction: cleanUndefined(homeIntroduction),
      homeFeaturedProjectContent: cleanUndefined(homeFeaturedProjectContent),
      featuredProject: cleanUndefined(featuredProject),
      callToAction: cleanUndefined(callToAction),
    }
  };
};
