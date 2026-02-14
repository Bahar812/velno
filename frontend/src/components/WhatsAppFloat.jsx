import React from 'react';
import { useUi } from '../context/UiContext';
import { useLocalizedLandingContent } from '../utils/useLocalizedLandingContent';

const normalizeWhatsappNumber = (value) => `${value ?? ''}`.replace(/\D/g, '');
const buildWhatsappLink = (value) => {
    const normalized = normalizeWhatsappNumber(value);
    return normalized ? `https://wa.me/${normalized}` : '';
};

function WhatsAppFloat() {
    const { language } = useUi();
    const content = useLocalizedLandingContent();
    const whatsapp = content?.whatsapp ?? {};
    const label = whatsapp.floatLabel ?? 'Yuk konsultasi bisnismu';
    const link = buildWhatsappLink(whatsapp.phone);
    const isDisabled = !link;
    const ariaSuffix = language === 'id' ? 'lewat WhatsApp' : 'via WhatsApp';
    return (
        <a
            className="wa-float"
            href={link || 'https://wa.me/'}
            target="_blank"
            rel="noreferrer"
            aria-label={`${label} ${ariaSuffix}`}
            aria-disabled={isDisabled ? 'true' : undefined}
            onClick={(event) => {
                if (isDisabled) {
                    event.preventDefault();
                }
            }}
        >
            <span className="wa-float-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" role="presentation">
                    <path
                        fill="currentColor"
                        d="M19.11 17.41c-.29-.15-1.71-.84-1.98-.94-.27-.1-.47-.15-.66.15-.2.29-.76.94-.94 1.13-.17.2-.35.22-.64.07-.29-.15-1.24-.45-2.36-1.45-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.44.13-.59.13-.13.29-.35.44-.52.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.58-.49-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.23 5.12 4.53.72.31 1.28.49 1.72.63.72.23 1.37.2 1.89.12.58-.09 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.12-.27-.2-.56-.35ZM16 5.33c-5.9 0-10.69 4.79-10.69 10.69 0 1.88.49 3.66 1.35 5.23L5.33 26.67l5.58-1.29c1.5.82 3.21 1.28 5.09 1.28 5.9 0 10.69-4.79 10.69-10.69S21.9 5.33 16 5.33Zm0 19.44c-1.69 0-3.26-.48-4.6-1.31l-.33-.2-3.31.77.9-3.22-.21-.34c-.85-1.36-1.35-2.96-1.35-4.7 0-4.79 3.9-8.69 8.69-8.69s8.69 3.9 8.69 8.69-3.9 8.69-8.69 8.69Z"
                    />
                </svg>
            </span>
            <span className="wa-float-text">{label}</span>
        </a>
    );
}

export default WhatsAppFloat;
