import React, { useEffect, useRef, useState } from 'react';
import {
    ArrowUpRight,
    BarChart3,
    Cable,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Code2,
    Globe2,
    GripVertical,
    MessageCircle,
    PlugZap,
    Server,
    ShieldCheck,
    Sliders,
    Smartphone,
    Sparkles,
    Wrench,
    XCircle,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HowWeWork from '../components/HowWeWork';
import ContainerScroll from '../components/ui/container-scroll-animation';
import TestimonialsColumn from '../components/ui/testimonials-columns-1';
import { useUi } from '../context/UiContext';
import { useLocalizedLandingContent } from '../utils/useLocalizedLandingContent';

const iconMap = {
    PlugZap,
    ShieldCheck,
    Sparkles,
    BarChart3,
    Sliders,
    Smartphone,
    Code2,
    Globe2,
    Server,
    Cable,
    Wrench,
};

const wrapIndex = (length, value) => ((value % length) + length) % length;

const normalizeWhatsappNumber = (value) => `${value ?? ''}`.replace(/\D/g, '');
const buildWhatsappLink = (value) => {
    const normalized = normalizeWhatsappNumber(value);
    return normalized ? `https://wa.me/${normalized}` : '';
};

function Home() {
    const { language } = useUi();
    const [whyComparisonInset, setWhyComparisonInset] = useState(52);
    const [isWhyComparisonDragging, setIsWhyComparisonDragging] = useState(false);
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);
    const serviceWheelLockRef = useRef(0);
    const serviceSwipeRef = useRef(null);
    const serviceClickBlockRef = useRef(0);
    const content = useLocalizedLandingContent();
    const {
        hero,
        about,
        whyWebsite,
        vsWebsite,
        services,
        solutions,
        howWeWork,
        portfolio,
        pricing: pricingContent,
        testimonials,
        contact,
    } = content;
    const heroImages = hero?.collageImages?.filter(Boolean) ?? [];
    const heroPreviewImage =
        heroImages[0] ??
        'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop';
    const heroSecondaryImage = heroImages[1] ?? heroPreviewImage;
    const heroTertiaryImage = heroImages[2] ?? heroPreviewImage;
    const whyBeforeImage =
        whyWebsite?.beforeImage ??
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop';
    const whyAfterImage =
        whyWebsite?.afterImage ??
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop';
    const heroStats = hero?.floats ?? [];
    const serviceItems = services?.items?.filter(Boolean) ?? [];
    const activeService = serviceItems.length
        ? serviceItems[wrapIndex(serviceItems.length, activeServiceIndex)]
        : null;
    const testimonialItems = testimonials?.items?.filter(Boolean) ?? [];
    const firstTestimonialsColumn = testimonialItems.slice(0, 3);
    const secondTestimonialsColumn = testimonialItems.slice(3, 6);
    const thirdTestimonialsColumn = testimonialItems.slice(6, 9);
    const homeText =
        language === 'id'
            ? {
                happyClients: 'Klien Puas',
                modernDesignTitle: 'Desain Modern',
                modernDesignBody: 'Website profesional',
                quickConsultTitle: 'Konsultasi Yuk',
                quickConsultBody: 'Respon cepat',
                freeRequest: 'Permintaan Gratis',
                visitWebsite: 'Kunjungi Website',
                includeLabel: 'Termasuk:',
                profileLabels: ['Website', 'Branding', 'SEO', 'Sistem'],
                serviceCount: 'Layanan',
                serviceAction: 'Explore',
            }
            : {
                happyClients: 'Happy Clients',
                modernDesignTitle: 'Modern Design',
                modernDesignBody: 'Professional website',
                quickConsultTitle: 'Let us talk',
                quickConsultBody: 'Fast response',
                freeRequest: 'Free Request',
                visitWebsite: 'Visit Website',
                includeLabel: 'Include:',
                profileLabels: ['Website', 'Branding', 'SEO', 'Systems'],
                serviceCount: 'Services',
                serviceAction: 'Explore',
            };
    const agentDesktopLink = buildWhatsappLink(vsWebsite?.agentDesktopNumber);
    const agentMobileLink = buildWhatsappLink(vsWebsite?.agentMobileNumber);
    const vsGalleryImages = vsWebsite?.galleryImages?.filter(Boolean) ?? [];
    const vsProfileImages = [
        vsGalleryImages[0] ??
            vsWebsite?.mainImage ??
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
        vsGalleryImages[1] ??
            'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1000&auto=format&fit=crop',
        vsGalleryImages[2] ??
            vsWebsite?.miniCardImage ??
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop',
        vsGalleryImages[3] ??
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    ];
    const handleServiceWheel = (event) => {
        if (serviceItems.length < 2) {
            return;
        }

        const wheelDelta =
            Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;

        if (Math.abs(wheelDelta) < 12) {
            return;
        }

        const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
        if (now - serviceWheelLockRef.current < 260) {
            return;
        }

        serviceWheelLockRef.current = now;
        setActiveServiceIndex((value) => value + (wheelDelta > 0 ? 1 : -1));
    };
    const handleServiceSwipeStart = (event) => {
        if (serviceItems.length < 2 || event.pointerType === 'mouse') {
            return;
        }

        serviceSwipeRef.current = {
            pointerId: event.pointerId,
            x: event.clientX,
            y: event.clientY,
        };
        event.currentTarget.setPointerCapture?.(event.pointerId);
    };
    const handleServiceSwipeEnd = (event) => {
        const swipeStart = serviceSwipeRef.current;
        if (!swipeStart || swipeStart.pointerId !== event.pointerId) {
            return;
        }

        const deltaX = event.clientX - swipeStart.x;
        const deltaY = event.clientY - swipeStart.y;
        const isHorizontalSwipe = Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY) * 1.15;

        serviceSwipeRef.current = null;
        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
            event.currentTarget.releasePointerCapture?.(event.pointerId);
        }

        if (!isHorizontalSwipe) {
            return;
        }

        serviceClickBlockRef.current = Date.now() + 260;
        setActiveServiceIndex((value) => value + (deltaX < 0 ? 1 : -1));
    };
    const handleServiceSwipeCancel = (event) => {
        serviceSwipeRef.current = null;
        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
            event.currentTarget.releasePointerCapture?.(event.pointerId);
        }
    };
    const handleServiceCardClick = (index) => {
        if (Date.now() < serviceClickBlockRef.current) {
            return;
        }
        setActiveServiceIndex(index);
    };
    const updateWhyComparisonInset = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const next = ((event.clientX - rect.left) / rect.width) * 100;
        setWhyComparisonInset(Math.min(100, Math.max(0, next)));
    };
    const startWhyComparisonDrag = (event) => {
        setIsWhyComparisonDragging(true);
        updateWhyComparisonInset(event);
        event.currentTarget.setPointerCapture?.(event.pointerId);
    };
    const moveWhyComparisonDrag = (event) => {
        if (!isWhyComparisonDragging) return;
        updateWhyComparisonInset(event);
    };
    const stopWhyComparisonDrag = (event) => {
        setIsWhyComparisonDragging(false);
        event.currentTarget.releasePointerCapture?.(event.pointerId);
    };
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.reveal').forEach((node) => {
            gsap.fromTo(
                node,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: node,
                        start: 'top 80%',
                    },
                }
            );
        });

        gsap.to('.float-card', {
            y: -14,
            rotation: 1,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.4,
        });

        const aboutCards = gsap.utils.toArray('.about-card');
        if (aboutCards.length) {
            gsap.to(aboutCards, {
                yPercent: -40,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.about-left',
                    start: 'top 20%',
                    end: 'bottom 10%',
                    scrub: true,
                },
            });

            gsap.fromTo(
                aboutCards,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.22,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.about-left',
                        start: 'top 75%',
                    },
                }
            );
        }

        const introWords = document.querySelectorAll('.intro-words span');
        if (introWords.length) {
            gsap.fromTo(
                introWords,
                { y: 16, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.08,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.intro-words',
                        start: 'top 85%',
                        end: 'top 35%',
                        scrub: true,
                    },
                }
            );
        }

        gsap.utils.toArray('.gsap-zoom-in').forEach((node) => {
            gsap.fromTo(
                node,
                { scale: 0.96, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: node,
                        start: 'top 80%',
                    },
                }
            );
        });

        gsap.utils.toArray('.gsap-zoom-out').forEach((node) => {
            gsap.fromTo(
                node,
                { scale: 1.05, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.85,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: node,
                        start: 'top 80%',
                    },
                }
            );
        });

        gsap.utils.toArray('.gsap-slide-left').forEach((node) => {
            gsap.fromTo(
                node,
                { x: -40, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: node,
                        start: 'top 80%',
                    },
                }
            );
        });

        gsap.utils.toArray('.gsap-slide-right').forEach((node) => {
            gsap.fromTo(
                node,
                { x: 40, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: node,
                        start: 'top 80%',
                    },
                }
            );
        });

    }, []);

    return (
        <div>
            <header id="home" className="home-aurora-hero -mt-20 pt-20">
                <ContainerScroll
                    className="home-aurora-scroll"
                    titleComponent={
                        <div className="reveal home-aurora-copy">
                            <span className="portfolio-hero-kicker home-aurora-kicker">
                                {hero.kicker}
                            </span>
                            <h1 className="home-aurora-title font-display">
                                {hero.title}
                            </h1>
                            <p className="portfolio-hero-subtitle home-aurora-subtitle">
                                {hero.subtitle}
                            </p>
                            <div className="home-aurora-actions home-aurora-actions--desktop">
                                <a className="portfolio-hero-cta home-aurora-cta" href="#contact">
                                    {hero.ctaLabel}
                                </a>
                            </div>
                        </div>
                    }
                    footerComponent={
                        <div className="home-aurora-actions home-aurora-actions--mobile">
                            <a className="portfolio-hero-cta home-aurora-cta" href="#contact">
                                {hero.ctaLabel}
                            </a>
                        </div>
                    }
                >
                    <div className="home-scroll-preview home-aurora-scroll-preview">
                        <div className="home-scroll-browser">
                            <div className="home-scroll-browser-bar">
                                <div className="home-scroll-browser-dots">
                                    <span />
                                    <span />
                                    <span />
                                </div>
                                <div className="home-scroll-address">velno.cloud/studio</div>
                            </div>
                            <div className="home-scroll-screen">
                                <div
                                    className="home-scroll-feature-image"
                                    style={{ backgroundImage: `url(${heroPreviewImage})` }}
                                >
                                    <div className="home-scroll-feature-overlay">
                                        <span>{hero.kicker}</span>
                                        <strong>{hero.title}</strong>
                                    </div>
                                </div>
                                <div className="home-scroll-side">
                                    {heroStats.slice(0, 2).map((item, index) => (
                                        <div key={`${item.title}-${index}`} className="home-scroll-stat">
                                            <strong>{item.title}</strong>
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                    <div className="home-scroll-stack">
                                        <div
                                            className="home-scroll-thumb"
                                            style={{ backgroundImage: `url(${heroSecondaryImage})` }}
                                        />
                                        <div
                                            className="home-scroll-thumb"
                                            style={{ backgroundImage: `url(${heroTertiaryImage})` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ContainerScroll>
            </header>

            <section id="about" className="section-white py-20 gsap-zoom-in">
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <span className="badge">{about.badge}</span>
                    <p className="intro-words mt-6 text-2xl font-semibold leading-snug md:text-4xl">
                        {about.sentence.split(' ').map((word, index) => (
                            <span key={`${word}-${index}`}>{word}</span>
                        ))}
                    </p>
                    <div className="mt-8">
                        <a className="btn-primary" href="#contact">
                            {about.buttonLabel}
                        </a>
                    </div>
                </div>
            </section>

            <section id="why-website" className="why-website-section py-24 gsap-zoom-in">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="why-website-heading reveal">
                        <span className="badge">{whyWebsite.badge}</span>
                        <h2 className="font-display">
                            {whyWebsite.title}
                        </h2>
                        <p>
                            {whyWebsite.description}
                        </p>
                    </div>
                    <div className="why-comparison-grid">
                        <div className="why-education-list reveal">
                            {whyWebsite.cards.map((item, index) => (
                                <article key={item.title} className="why-lesson-card">
                                    <span className="why-lesson-index">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div>
                                        <strong>{item.stat}</strong>
                                        <h3>{item.title}</h3>
                                        <p>{item.detail}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                        <div
                            className="why-comparison-frame reveal"
                            style={{ '--why-inset': `${whyComparisonInset}%` }}
                            onPointerDown={startWhyComparisonDrag}
                            onPointerMove={moveWhyComparisonDrag}
                            onPointerUp={stopWhyComparisonDrag}
                            onPointerCancel={stopWhyComparisonDrag}
                            onPointerLeave={() => setIsWhyComparisonDragging(false)}
                            role="presentation"
                        >
                            <div className="why-comparison-panel why-comparison-panel--before">
                                <div className="why-browser">
                                    <div className="why-browser-top">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    <div className="why-person-visual why-person-visual--sad">
                                        <img
                                            src={whyBeforeImage}
                                            alt="Ilustrasi bisnis tanpa website terlihat kurang siap online"
                                            draggable="false"
                                        />
                                    </div>
                                    <div className="why-before-content">
                                        <div className="why-copy-stack">
                                            <span className="why-status-pill why-status-pill--muted">
                                                Tanpa Website
                                            </span>
                                            <h3>Calon pelanggan ragu sebelum bertanya.</h3>
                                            <p>
                                                Informasi tersebar di chat dan media sosial, sulit ditemukan di Google,
                                                dan kepercayaan harus dibangun dari nol setiap kali ada calon klien baru.
                                            </p>
                                            <div className="why-friction-list">
                                                <span>Tidak muncul saat dicari</span>
                                                <span>Portofolio sulit dibuktikan</span>
                                                <span>Tim menjawab pertanyaan berulang</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="why-comparison-panel why-comparison-panel--after">
                                <div className="why-browser why-browser--after">
                                    <div className="why-browser-top">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    <div className="why-person-visual why-person-visual--happy">
                                        <img
                                            src={whyAfterImage}
                                            alt="Ilustrasi bisnis dengan website dan dashboard digital"
                                            draggable="false"
                                        />
                                    </div>
                                    <div className="why-after-content">
                                        <div className="why-copy-stack">
                                            <span className="why-status-pill">
                                                Dengan Website
                                            </span>
                                            <h3>Bisnis terlihat siap, jelas, dan mudah dipercaya.</h3>
                                            <p>
                                                Website menjadi pusat informasi 24/7: layanan, bukti kerja, testimoni,
                                                dan CTA tertata sehingga calon klien paham alasan harus menghubungi Anda.
                                            </p>
                                            <div className="why-signal-grid">
                                                <div>
                                                    <strong>24/7</strong>
                                                    <span>akses informasi</span>
                                                </div>
                                                <div>
                                                    <strong>SEO</strong>
                                                    <span>ditemukan Google</span>
                                                </div>
                                                <div>
                                                    <strong>CTA</strong>
                                                    <span>arah kontak jelas</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="why-comparison-divider">
                                <button type="button" aria-label="Geser perbandingan website">
                                    <GripVertical size={18} strokeWidth={2.4} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="vs-website" className="vs-profile-section py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="vs-profile">
                        <div className="vs-profile-copy reveal gsap-slide-left">
                            <span className="vs-profile-kicker">{vsWebsite.pill}</span>
                            <h2 className="vs-profile-title font-display">
                                {vsWebsite.title.split('\n').map((line, index, lines) => (
                                    <span className="vs-profile-title-line" key={`${line}-${index}`}>
                                        {line}
                                        {index < lines.length - 1 ? <br /> : null}
                                    </span>
                                ))}
                            </h2>
                            <div className="vs-profile-body">
                                {vsWebsite.paragraphs.filter(Boolean).map((text, index) => (
                                    <p key={`${text}-${index}`}>{text}</p>
                                ))}
                            </div>
                            <div className="vs-profile-cta">
                                <p>{vsWebsite.label}</p>
                                <div className="vs-profile-buttons">
                                    {agentDesktopLink ? (
                                        <a
                                            className="vs-profile-button vs-profile-button--primary"
                                            href={agentDesktopLink}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <MessageCircle size={17} strokeWidth={2.4} />
                                            {vsWebsite.agentDesktop}
                                        </a>
                                    ) : (
                                        <button
                                            className="vs-profile-button vs-profile-button--primary"
                                            type="button"
                                        >
                                            <MessageCircle size={17} strokeWidth={2.4} />
                                            {vsWebsite.agentDesktop}
                                        </button>
                                    )}
                                    {agentMobileLink ? (
                                        <a
                                            className="vs-profile-button vs-profile-button--secondary"
                                            href={agentMobileLink}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <MessageCircle size={17} strokeWidth={2.4} />
                                            {vsWebsite.agentMobile}
                                        </a>
                                    ) : (
                                        <button
                                            className="vs-profile-button vs-profile-button--secondary"
                                            type="button"
                                        >
                                            <MessageCircle size={17} strokeWidth={2.4} />
                                            {vsWebsite.agentMobile}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="vs-profile-gallery reveal gsap-slide-right">
                            {vsProfileImages.map((image, index) => (
                                <figure
                                    key={`${image}-${index}`}
                                    className={`vs-profile-image vs-profile-image--${index + 1}`}
                                >
                                    <img
                                        src={image}
                                        alt={`${homeText.profileLabels[index]} Velno`}
                                        draggable="false"
                                    />
                                    <figcaption>{homeText.profileLabels[index]}</figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="services-focus-section py-24 gsap-zoom-in">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal services-focus-heading">
                        <span className="services-focus-kicker">{services.badge}</span>
                        <h2 className="services-focus-title font-display">
                            {services.title}
                        </h2>
                        <p>{services.description}</p>
                    </div>

                    {serviceItems.length ? (
                        <div
                            className="services-focus-shell reveal"
                            onWheel={handleServiceWheel}
                            onPointerDown={handleServiceSwipeStart}
                            onPointerUp={handleServiceSwipeEnd}
                            onPointerCancel={handleServiceSwipeCancel}
                        >
                            <div className="services-focus-ambience" aria-hidden="true">
                                <img src={activeService?.image} alt="" />
                            </div>
                            <div className="services-focus-rail" aria-label={services.title}>
                                {serviceItems.map((item, index) => {
                                    const normalizedActive = wrapIndex(
                                        serviceItems.length,
                                        activeServiceIndex
                                    );
                                    let offset = index - normalizedActive;
                                    if (offset > serviceItems.length / 2) {
                                        offset -= serviceItems.length;
                                    }
                                    if (offset < -serviceItems.length / 2) {
                                        offset += serviceItems.length;
                                    }
                                    const isActive = offset === 0;
                                    const clampedOffset = Math.max(-3, Math.min(3, offset));
                                    const offsetClass =
                                        clampedOffset < 0
                                            ? `offset-neg-${Math.abs(clampedOffset)}`
                                            : `offset-${clampedOffset}`;
                                    const ServiceIcon = iconMap[item.icon] ?? PlugZap;

                                    return (
                                        <button
                                            key={item.title}
                                            className={`services-focus-card ${offsetClass} ${
                                                isActive ? 'is-active' : ''
                                            }`}
                                            type="button"
                                            onClick={() => handleServiceCardClick(index)}
                                            aria-label={item.title}
                                        >
                                            <img src={item.image} alt="" draggable="false" />
                                            <span className="services-focus-card-shade" />
                                            <span className="services-focus-card-icon">
                                                <ServiceIcon size={18} strokeWidth={2.3} />
                                            </span>
                                            <span className="services-focus-card-title">
                                                {item.title}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="services-focus-info">
                                <div className="services-focus-copy">
                                    <span>
                                        {wrapIndex(serviceItems.length, activeServiceIndex) + 1} /{' '}
                                        {serviceItems.length} {homeText.serviceCount}
                                    </span>
                                    <h3>{activeService?.title}</h3>
                                    <p>{activeService?.detail}</p>
                                </div>
                                <div className="services-focus-actions">
                                    <div className="services-focus-controls">
                                        <button
                                            type="button"
                                            onClick={() => setActiveServiceIndex((value) => value - 1)}
                                            aria-label="Layanan sebelumnya"
                                        >
                                            <ChevronLeft size={20} strokeWidth={2.4} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveServiceIndex((value) => value + 1)}
                                            aria-label="Layanan berikutnya"
                                        >
                                            <ChevronRight size={20} strokeWidth={2.4} />
                                        </button>
                                    </div>
                                    <a className="services-focus-action" href="#contact">
                                        {homeText.serviceAction}
                                        <ArrowUpRight size={16} strokeWidth={2.5} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </section>

            <section id="solutions" className="solutions-showcase py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="badge">{solutions.badge}</span>
                            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                                {solutions.title}
                            </h2>
                        </div>
                        <p className="max-w-xl text-white/70">
                            {solutions.description}
                        </p>
                    </div>
                    <div className="solutions-grid">
                        <div className="solutions-col gsap-slide-left">
                            {solutions.highlights.slice(0, 2).map((item) => {
                                const SolutionIcon = iconMap[item.icon] ?? BarChart3;
                                return (
                                <div key={item.title} className="solutions-card">
                                    <span className="solutions-icon">
                                        <SolutionIcon size={18} />
                                    </span>
                                    <div>
                                        <p className="solutions-title">{item.title}</p>
                                        <p className="solutions-text">{item.detail}</p>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                        <div className="solutions-image gsap-zoom-in">
                            <div
                                className="solutions-photo"
                                style={{ backgroundImage: `url(${solutions.heroImage})` }}
                            />
                        </div>
                        <div className="solutions-col gsap-slide-right">
                            {solutions.highlights.slice(2).map((item) => {
                                const SolutionIcon = iconMap[item.icon] ?? BarChart3;
                                return (
                                <div key={item.title} className="solutions-card">
                                    <span className="solutions-icon">
                                        <SolutionIcon size={18} />
                                    </span>
                                    <div>
                                        <p className="solutions-title">{item.title}</p>
                                        <p className="solutions-text">{item.detail}</p>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <HowWeWork content={howWeWork} />

            <section id="portfolio" className="py-24 gsap-zoom-in">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="badge">{portfolio.badge}</span>
                            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                                {portfolio.title}
                            </h2>
                            <p className="mt-4 max-w-2xl text-white/70">
                                {portfolio.description}
                            </p>
                        </div>
                    </div>
                    <div className="mt-12 grid gap-8">
                        {portfolio.projects.map((project) => (
                            <div key={project.name} className="grid gap-6 md:grid-cols-[1.1fr_1.9fr]">
                                <div className="order-2 panel reveal flex flex-col gap-5 md:order-1">
                                    <div className="text-xs uppercase tracking-[0.3em] text-white/50">
                                        {project.name}
                                    </div>
                                    <div className="space-y-3 text-sm text-white/70">
                                        {project.bullets.filter(Boolean).map((item) => (
                                            <div key={item} className="flex items-center gap-3">
                                                <span className="h-2 w-2 rounded-full bg-violet-400" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <a
                                        className="portfolio-link"
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {homeText.visitWebsite}
                                    </a>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        {project.tags.filter(Boolean).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-white/15 px-4 py-1 text-xs uppercase tracking-[0.25em] text-white/60"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="order-1 grid gap-4 md:order-2 md:grid-cols-2">
                                    {project.images.map((image, index) => (
                                        <div
                                            key={`${project.name}-${index}`}
                                            className="panel reveal overflow-hidden"
                                        >
                                            <div
                                                className="h-44 rounded-2xl bg-cover bg-center sm:h-52 md:h-56"
                                                style={{ backgroundImage: `url(${image})` }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="pricing" className="bg-slate-50 py-24 gsap-zoom-in">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="badge">{pricingContent.badge}</span>
                            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                                {pricingContent.title}
                            </h2>
                        </div>
                        <p className="max-w-xl text-white/70">
                            {pricingContent.description}
                        </p>
                    </div>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {pricingContent.plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`reveal ${plan.highlight ? 'md:scale-105 md:z-10' : ''}`}
                            >
                                {plan.highlight ? (
                                    <div className="rounded-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 p-[2px] shadow-2xl">
                                        <div className="flex h-full flex-col rounded-2xl bg-white p-8">
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-semibold text-slate-800">
                                                    {plan.name}
                                                </span>
                                            </div>
                                            <p className="mt-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
                                                {plan.price}
                                            </p>
                                            <div className="mt-6 space-y-3 text-sm">
                                                {plan.features.filter(Boolean).map((item) => (
                                                    <div key={item} className="flex items-start gap-2 text-slate-700">
                                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-teal-500" />
                                                        <span>{item}</span>
                                                    </div>
                                                ))}
                                                {plan.unavailable.filter(Boolean).map((item) => (
                                                    <div
                                                        key={item}
                                                        className="flex items-start gap-2 text-slate-400 line-through"
                                                    >
                                                        <XCircle className="mt-0.5 h-4 w-4 text-pink-400" />
                                                        <span>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="pricing-cta mt-8 inline-flex w-full items-center justify-center gap-2">
                                                <MessageCircle className="h-4 w-4" />
                                                {pricingContent.ctaLabel}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-lg">
                                        <h3 className="text-2xl font-semibold text-slate-800">{plan.name}</h3>
                                        <p className="mt-4 text-4xl font-bold text-slate-900">{plan.price}</p>
                                        <p className="mt-2 text-sm text-slate-500">{homeText.includeLabel}</p>
                                        <div className="mt-4 space-y-3 text-sm">
                                            {plan.features.filter(Boolean).map((item) => (
                                                <div key={item} className="flex items-start gap-2 text-slate-700">
                                                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-teal-500" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                            {plan.unavailable.filter(Boolean).map((item) => (
                                                <div
                                                    key={item}
                                                    className="flex items-start gap-2 text-slate-400 line-through"
                                                >
                                                    <XCircle className="mt-0.5 h-4 w-4 text-pink-400" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="pricing-cta mt-8 inline-flex w-full items-center justify-center gap-2">
                                            <MessageCircle className="h-4 w-4" />
                                            {pricingContent.ctaLabel}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {testimonialItems.length ? (
                <section id="testimonials" className="testimonials-section py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="reveal testimonials-heading">
                            <span className="badge">{testimonials.badge}</span>
                            <h2 className="font-display mt-5 text-3xl font-semibold md:text-5xl">
                                {testimonials.title}
                            </h2>
                            <p>{testimonials.description}</p>
                        </div>
                        <div className="testimonials-columns-wrap">
                            <TestimonialsColumn
                                testimonials={firstTestimonialsColumn}
                                duration={15}
                            />
                            <TestimonialsColumn
                                testimonials={secondTestimonialsColumn}
                                className="testimonials-column--middle"
                                duration={19}
                            />
                            <TestimonialsColumn
                                testimonials={thirdTestimonialsColumn}
                                className="testimonials-column--last"
                                duration={17}
                            />
                        </div>
                    </div>
                </section>
            ) : null}

            <section id="contact" className="py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div
                        className="panel contact-cta reveal gsap-zoom-out"
                        style={
                            contact.backgroundImage
                                ? { backgroundImage: `url(${contact.backgroundImage})` }
                                : undefined
                        }
                    >
                        <div className="contact-cta-overlay" />
                        <div className="contact-cta-content">
                            <span className="badge">{contact.badge}</span>
                            <h2 className="font-display mt-5 text-3xl font-semibold text-white md:text-4xl">
                                {contact.title}
                            </h2>
                            <p className="mt-4 text-white">
                                {contact.description}
                            </p>
                            <button className="contact-cta-btn">{contact.buttonLabel}</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
