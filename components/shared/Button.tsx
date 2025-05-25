import { ButtonProps } from '@/types/components/button';
import styles from '@/styles/modules/Button.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ArrowOutward from './svg/ArrowOutward';
import Circle from './svg/Circle';

export default function Button({
    label,
    href,
    isExternal,
    externalHref,
    icon,
    anchor,
    type,
    onClick,
    disabled,
    className = 'c-btn',
    wrapperClassName
}: ButtonProps) {
    // We keep useRouter if you want access to locale or other router props later,
    // but no translation functions are used anymore
    const { locale } = useRouter();

    if (label && href) {
        return (
            <div className={wrapperClassName}>
                <Link
                    href={href}
                    scroll={false}
                    onClick={onClick}
                    className={styles[className]}
                >
                    {label}
                </Link>
            </div>
        );
    }

    if (label && (isExternal && externalHref || anchor)) {
        return (
            <div className={wrapperClassName}>
                <a
                    className={styles[className]}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    href={externalHref ? externalHref : `#${anchor}`}
                >
                    {label}
                    {icon && <ArrowOutward />}
                </a>
            </div>
        );
    }

    return (
        <div className={wrapperClassName}>
            <button
                type={type}
                className={styles[className]}
                onClick={onClick}
                disabled={disabled}
            >
                {disabled ? 'Sending...' : label}
                {disabled && <Circle />}
            </button>
        </div>
    );
}
