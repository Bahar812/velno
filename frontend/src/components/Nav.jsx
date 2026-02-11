import React, { useEffect, useMemo, useState } from 'react';
import { useUi } from '../context/UiContext';
import { loadLandingContent } from '../utils/landingStorage';

function Nav() {
    const { language, toggleLanguage } = useUi();
    const [scrolled, setScrolled] = useState(false);
    const content = useMemo(() => loadLandingContent(), []);
    const brand = content?.brand ?? {};
    const navLinks = useMemo(
        () => [
            { label: language === 'id' ? 'Beranda' : 'Home', href: '#home' },
            { label: language === 'id' ? 'Layanan' : 'Services', href: '#services' },
            { label: language === 'id' ? 'Portofolio' : 'Portfolio', href: '#portfolio' },
            { label: language === 'id' ? 'Harga' : 'Pricing', href: '#pricing' },
            { label: language === 'id' ? 'Tentang' : 'About', href: '#about' },
            { label: language === 'id' ? 'Kontak' : 'Contact', href: '#contact' },
        ],
        [language]
    );
    const logoText = brand.logoText ?? 'Velno Softwarehouse';
    const logoInitials = brand.logoInitials ?? 'V';
    const logoImage = brand.logoImage ?? '';
    const ctaLabel =
        language === 'id'
            ? brand.ctaLabelId ?? 'Hubungi Kami'
            : brand.ctaLabelEn ?? 'Book a Call';

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className={`nav-sticky ${scrolled ? 'nav-sticky--scrolled' : ''}`}>
            <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5 md:flex-nowrap">
                <div className="flex items-center gap-3 text-lg font-semibold text-[#151323]">
                    {logoImage ? (
                        <img
                            src={logoImage}
                            alt={logoText || 'Logo'}
                            className="h-12 w-auto max-w-[220px] object-contain sm:h-14 sm:max-w-[260px] md:h-16 md:max-w-none"
                        />
                    ) : (
                        <>
                            <span
                                className="h-10 w-10 rounded-xl bg-black/5 text-center text-2xl font-bold leading-10 text-[#151323]"
                            >
                                {logoInitials}
                            </span>
                            {logoText ? <span>{logoText}</span> : null}
                        </>
                    )}
                </div>
                <div className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="hover:text-[#151323]"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <button className="nav-toggle" onClick={toggleLanguage}>
                        {language === 'id' ? 'ID' : 'EN'}
                    </button>
                    <a className="btn-primary" href="#contact">
                        {ctaLabel}
                    </a>
                </div>
            </nav>
        </div>
    );
}

export default Nav;
