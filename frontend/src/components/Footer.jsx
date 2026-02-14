import React from 'react';
import { useUi } from '../context/UiContext';
import { useLocalizedLandingContent } from '../utils/useLocalizedLandingContent';

function Footer() {
    const { language } = useUi();
    const content = useLocalizedLandingContent();
    const footer = content?.footer ?? {};
    const brand = content?.brand ?? {};
    const logoText = brand.logoText ?? 'Velno Softwarehouse';
    const logoInitials = brand.logoInitials ?? 'V';
    const logoImage = brand.logoImage ?? '';
    const description =
        footer.description ??
        'Perusahaan pengembang perangkat lunak premium yang berfokus pada produk digital, sistem merek, dan otomatisasi.';
    const email = footer.email ?? 'hello@velno.studio';
    const studioLabel = footer.studioLabel ?? 'Kantor';
    const studioLocation = footer.studioLocation ?? 'Jakarta - Singapore - Jarak Jauh';
    const studioPhone = footer.studioPhone ?? '+62 811 234 567';
    const studioHours = footer.studioHours ?? 'Sen - Jum, 09.00 - 18.00';
    const linksLabel = footer.linksLabel ?? 'Tautan';
    const copyright =
        footer.copyright ?? '(c) 2026 Velno Softwarehouse. Semua hak dilindungi.';
    const navLinks = [
        { label: language === 'id' ? 'Beranda' : 'Home', href: '#home' },
        { label: language === 'id' ? 'Layanan' : 'Services', href: '#services' },
        { label: language === 'id' ? 'Portofolio' : 'Portfolio', href: '#portfolio' },
        { label: language === 'id' ? 'Harga' : 'Pricing', href: '#pricing' },
        { label: language === 'id' ? 'Tentang' : 'About', href: '#about' },
        { label: language === 'id' ? 'Kontak' : 'Contact', href: '#contact' },
    ];
    return (
        <footer className="border-t border-white/10 py-12">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.4fr_1fr_1fr]">
                <div className="space-y-4 text-sm text-white/60">
                    <div className="flex items-center gap-3 text-lg font-semibold text-white">
                        {logoImage ? (
                            <img
                                src={logoImage}
                                alt={logoText || 'Logo'}
                                className="h-12 w-auto max-w-[220px] object-contain sm:h-14 sm:max-w-[260px] md:h-16 md:max-w-none"
                            />
                        ) : (
                            <>
                                <span className="h-10 w-10 rounded-xl bg-white/10 text-center text-2xl font-bold leading-10 text-white">
                                    {logoInitials}
                                </span>
                                {logoText ? <span>{logoText}</span> : null}
                            </>
                        )}
                    </div>
                    <p>{description}</p>
                    <p>{email}</p>
                </div>
                <div className="text-sm text-white/60">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">{studioLabel}</p>
                    <div className="mt-4 space-y-2">
                        <p>{studioLocation}</p>
                        <p>{studioPhone}</p>
                        <p>{studioHours}</p>
                    </div>
                </div>
                <div className="text-sm text-white/60">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">{linksLabel}</p>
                    <div className="mt-4 space-y-2">
                        {navLinks.map((link) => (
                            <a key={link.href} className="block hover:text-white" href={link.href}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-10 max-w-6xl px-6 text-xs uppercase tracking-[0.3em] text-white/30">
                {copyright}
            </div>
        </footer>
    );
}

export default Footer;
