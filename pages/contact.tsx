import { CONTACT_HEADER, META_CONTACT } from '@/data/contact.data';
import { MetaDataProps } from '@/types/components/global';
import { BasicHeaderProps } from '@/types/components/headers';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import BasicHeader from '@/components/BasicHeader';
import Form from '@/components/form/Form';

export default function Contact({
    contactHeader
}: InferGetStaticPropsType<typeof getStaticProps>) {
    if (!contactHeader || !contactHeader.title || !contactHeader.content) {
        // Optionally render a fallback UI or nothing if required fields are missing
        return null;
    }
    return (
        <>
            <BasicHeader
                {...contactHeader}
            />
            <Form />
        </>
    );
};

export const getStaticProps: GetStaticProps<{
    metaData: MetaDataProps | null;
    contactHeader: BasicHeaderProps | null;
}> = async ({ locale }) => {
    const lang = locale ?? '';
    const metaData = META_CONTACT[lang] ?? null;
    const contactHeader = CONTACT_HEADER[lang] ?? null;

    return {
        props: {
            metaData,
            contactHeader
        }
    }
};
