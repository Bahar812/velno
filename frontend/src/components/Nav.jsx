import React, { useEffect, useMemo, useState } from 'react';
import { useUi } from '../context/UiContext';
import { useLocalizedLandingContent } from '../utils/useLocalizedLandingContent';

function Nav() {
    const { language, toggleLanguage } = useUi();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const content = useLocalizedLandingContent();
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

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <div className={`nav-sticky ${scrolled ? 'nav-sticky--scrolled' : ''}`}>
            <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5 md:flex-nowrap">
                <div className="flex items-center gap-3 text-lg font-semibold text-[#151323]">
                    {logoImage ? (
                        <img
                            src={logoImage}
                            alt={logoText || 'Logo'}
                            className="h-14 w-auto max-w-[260px] object-contain sm:h-16 sm:max-w-[320px] md:h-20 md:max-w-[420px]"
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
                <div className="hidden items-center gap-3 md:flex">
                    <button className="nav-toggle" onClick={toggleLanguage}>
                        {language === 'id' ? 'EN' : 'ID'}
                    </button>
                    <a className="btn-primary" href="#contact">
                        {ctaLabel}
                    </a>
                </div>
                <button
                    type="button"
                    className="inline-flex h-10 w-10 flex-col items-center justify-center rounded-xl border border-slate-300 bg-white/80 text-[#151323] md:hidden"
                    aria-label="Buka atau tutup menu navigasi"
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen((prev) => !prev)}
                >
                    <span className="sr-only">Menu</span>
                    <span className="block h-0.5 w-5 bg-current" />
                    <span className="block h-0.5 w-5 bg-current mt-1.5" />
                    <span className="block h-0.5 w-5 bg-current mt-1.5" />
                </button>
                {mobileOpen ? (
                    <div className="w-full rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur md:hidden">
                        <div className="flex flex-col gap-3 text-sm text-slate-700">
                            {navLinks.map((link) => (
                                <a
                                    key={`mobile-${link.href}`}
                                    href={link.href}
                                    className="rounded-lg px-2 py-2 hover:bg-slate-100"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                            <button className="nav-toggle" onClick={toggleLanguage}>
                                {language === 'id' ? 'EN' : 'ID'}
                            </button>
                            <a
                                className="btn-primary inline-flex flex-1 items-center justify-center"
                                href="#contact"
                                onClick={() => setMobileOpen(false)}
                            >
                                {ctaLabel}
                            </a>
                        </div>
                    </div>
                ) : null}
            </nav>
        </div>
    );
}

export default Nav;
