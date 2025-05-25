import { LanguageSwitcherProps } from '@/types/components/global';
import Link from 'next/link';
import { capitalizeFirstLetter } from '@/utils/string';

export default function LanguageSwitcher({ router }: LanguageSwitcherProps) {
    const getLocales = () => {
        const locales = router.locales ?? [];
        return locales.filter((l) => l !== router.locale);
    };

    const locales = getLocales();

    // Just use router.pathname as href, no translation helper
    // fallback to '/' if it's the 404 page
    const href = router.route !== '/404' ? router.pathname : '/';

    return (
        <>
            {locales.map((locale: string) => (
                <Link
                    key={locale}
                    href={href}
                    locale={locale} // Next.js built-in locale routing
                    scroll={false}
                >
                    {capitalizeFirstLetter(locale)}
                </Link>
            ))}
        </>
    );
}
