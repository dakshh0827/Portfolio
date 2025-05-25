import { META_404, PAGE_NOT_FOUND_HEADER } from '@/data/global.data';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MetaDataProps } from '@/types/components/global';
import { BasicHeaderProps } from '@/types/components/headers';
import BasicHeader from '@/components/BasicHeader';

// Default header to use if none found for locale
const defaultHeader: BasicHeaderProps = {
  title: 'Page Not Found',
  // Add other required props here with safe defaults if needed
  // For example:
  // subtitle: '',
  // button: undefined,
};

export default function PageNotFound({
  header,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // If header is null, fallback to defaultHeader
  const safeHeader = header ?? defaultHeader;

  return (
    <BasicHeader
      {...safeHeader}
      button={safeHeader.button ? { ...safeHeader.button, href: '/' } : undefined}
      className="c-basicHeader--fullHeight"
    />
  );
}

export const getStaticProps: GetStaticProps<{
  metaData: MetaDataProps | null;
  header: BasicHeaderProps | null;
}> = async ({ locale }) => {
  const lang = locale ?? '';

  const metaData = META_404[lang] ?? null;
  const header = PAGE_NOT_FOUND_HEADER[lang] ?? null;

  return {
    props: {
      metaData,
      header,
    },
  };
};
