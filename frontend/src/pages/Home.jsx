import React, { useEffect, useMemo } from 'react';
import {
    BarChart3,
    CheckCircle2,
    MessageCircle,
    PlugZap,
    ShieldCheck,
    Sliders,
    Smartphone,
    Sparkles,
    XCircle,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HowWeWork from '../components/HowWeWork';
import { loadLandingContent } from '../utils/landingStorage';

const iconMap = {
    PlugZap,
    ShieldCheck,
    Sparkles,
    BarChart3,
    Sliders,
    Smartphone,
};

const normalizeWhatsappNumber = (value) => `${value ?? ''}`.replace(/\D/g, '');
const buildWhatsappLink = (value) => {
    const normalized = normalizeWhatsappNumber(value);
    return normalized ? `https://wa.me/${normalized}` : '';
};

function Home() {
    const content = useMemo(() => loadLandingContent(), []);
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
        contact,
    } = content;
    const heroCards = hero?.collageImages?.length ? hero.collageImages : [];
    const heroFloats = hero?.floats ?? [];
    const heroFloatClasses = ['portfolio-hero-float--top', 'portfolio-hero-float--right'];
    const heroCardClasses = [
        'portfolio-hero-card portfolio-hero-card--tall',
        'portfolio-hero-card',
        'portfolio-hero-card',
        'portfolio-hero-card portfolio-hero-card--wide',
    ];
    const agentDesktopLink = buildWhatsappLink(vsWebsite?.agentDesktopNumber);
    const agentMobileLink = buildWhatsappLink(vsWebsite?.agentMobileNumber);
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
            <header id="home" className="portfolio-hero -mt-20 pt-20">
                <section className="mx-auto max-w-6xl px-6 pb-20 pt-8">
                    <div className="grid gap-12 grid-cols-1 sm:grid-cols-[1.05fr_0.95fr] sm:items-center">
                        <div className="reveal order-1 sm:order-1">
                            <span className="portfolio-hero-kicker">{hero.kicker}</span>
                            <h1 className="font-display mt-5 text-4xl font-semibold leading-tight md:text-6xl">
                                {hero.title}
                            </h1>
                            <p className="portfolio-hero-subtitle mt-5 max-w-xl text-base md:text-lg">
                                {hero.subtitle}
                            </p>
                            <div className="portfolio-hero-form mt-8">
                                <div className="portfolio-hero-field">
                                    <span className="portfolio-hero-field-icon">BR</span>
                                    <div>
                                        <p className="portfolio-hero-field-title">{hero.focus.label}</p>
                                        <p className="portfolio-hero-field-sub">
                                            {hero.focus.value}
                                        </p>
                                    </div>
                                </div>
                                <div className="portfolio-hero-field">
                                    <span className="portfolio-hero-field-icon">DT</span>
                                    <div>
                                        <p className="portfolio-hero-field-title">{hero.launch.label}</p>
                                        <p className="portfolio-hero-field-sub">
                                            {hero.launch.value}
                                        </p>
                                    </div>
                                </div>
                                <button className="portfolio-hero-cta">{hero.ctaLabel}</button>
                            </div>
                        </div>
                        <div className="reveal order-2 sm:order-2">
                            <div className="portfolio-hero-collage">
                                {heroFloats.map((item, index) => (
                                    <div
                                        key={`${item.title}-${index}`}
                                        className={`portfolio-hero-float ${heroFloatClasses[index] ?? ''}`}
                                    >
                                        <strong>{item.title}</strong>
                                        {item.text}
                                    </div>
                                ))}
                                {heroCards.map((image, index) => (
                                    <div
                                        key={`${image}-${index}`}
                                        className={heroCardClasses[index] ?? 'portfolio-hero-card'}
                                        style={{
                                            backgroundImage: image ? `url(${image})` : 'none',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
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

            <section id="why-website" className="section-purple-strong py-24 gsap-zoom-in">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal space-y-5 text-white">
                        <span className="badge">{whyWebsite.badge}</span>
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">
                            {whyWebsite.title}
                        </h2>
                        <p className="max-w-3xl text-base text-white/70 md:text-lg">
                            {whyWebsite.description}
                        </p>
                    </div>
                    <div className="mt-10 grid gap-5 sm:grid-cols-2">
                        {whyWebsite.cards.map((item) => (
                            <div key={item.title} className="panel reason-card reveal">
                                <p className="reason-stat">{item.stat}</p>
                                <h3 className="text-sm font-semibold">{item.title}</h3>
                                <p className="text-xs text-white/60">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="vs-website" className="section-white py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="vs-modern">
                        <div className="vs-modern-left reveal gsap-slide-left">
                            <span className="vs-pill">{vsWebsite.pill}</span>
                            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                                {vsWebsite.title.split('\n').map((line, index, lines) => (
                                    <React.Fragment key={`${line}-${index}`}>
                                        {line}
                                        {index < lines.length - 1 ? <br /> : null}
                                    </React.Fragment>
                                ))}
                            </h2>
                            {vsWebsite.paragraphs.filter(Boolean).map((text, index) => (
                                <p
                                    key={`${text}-${index}`}
                                    className={index === 0 ? 'mt-4 text-white/70' : 'text-white/70'}
                                >
                                    {text}
                                </p>
                            ))}
                            <p className="vs-label">{vsWebsite.label}</p>
                            <div className="vs-actions vs-actions--desktop">
                                {agentDesktopLink ? (
                                    <a
                                        className="vs-btn vs-btn--secondary"
                                        href={agentDesktopLink}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="vs-btn-icon" aria-hidden="true">
                                            <svg viewBox="0 0 32 32" role="presentation">
                                                <path
                                                    fill="currentColor"
                                                    d="M19.11 17.41c-.29-.15-1.71-.84-1.98-.94-.27-.1-.47-.15-.66.15-.2.29-.76.94-.94 1.13-.17.2-.35.22-.64.07-.29-.15-1.24-.45-2.36-1.45-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.44.13-.59.13-.13.29-.35.44-.52.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.58-.49-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.23 5.12 4.53.72.31 1.28.49 1.72.63.72.23 1.37.2 1.89.12.58-.09 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.12-.27-.2-.56-.35ZM16 5.33c-5.9 0-10.69 4.79-10.69 10.69 0 1.88.49 3.66 1.35 5.23L5.33 26.67l5.58-1.29c1.5.82 3.21 1.28 5.09 1.28 5.9 0 10.69-4.79 10.69-10.69S21.9 5.33 16 5.33Zm0 19.44c-1.69 0-3.26-.48-4.6-1.31l-.33-.2-3.31.77.9-3.22-.21-.34c-.85-1.36-1.35-2.96-1.35-4.7 0-4.79 3.9-8.69 8.69-8.69s8.69 3.9 8.69 8.69-3.9 8.69-8.69 8.69Z"
                                                />
                                            </svg>
                                        </span>
                                        {vsWebsite.agentDesktop}
                                    </a>
                                ) : (
                                    <button className="vs-btn vs-btn--secondary" type="button">
                                        <span className="vs-btn-icon" aria-hidden="true">
                                            <svg viewBox="0 0 32 32" role="presentation">
                                                <path
                                                    fill="currentColor"
                                                    d="M19.11 17.41c-.29-.15-1.71-.84-1.98-.94-.27-.1-.47-.15-.66.15-.2.29-.76.94-.94 1.13-.17.2-.35.22-.64.07-.29-.15-1.24-.45-2.36-1.45-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.44.13-.59.13-.13.29-.35.44-.52.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.58-.49-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.23 5.12 4.53.72.31 1.28.49 1.72.63.72.23 1.37.2 1.89.12.58-.09 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.12-.27-.2-.56-.35ZM16 5.33c-5.9 0-10.69 4.79-10.69 10.69 0 1.88.49 3.66 1.35 5.23L5.33 26.67l5.58-1.29c1.5.82 3.21 1.28 5.09 1.28 5.9 0 10.69-4.79 10.69-10.69S21.9 5.33 16 5.33Zm0 19.44c-1.69 0-3.26-.48-4.6-1.31l-.33-.2-3.31.77.9-3.22-.21-.34c-.85-1.36-1.35-2.96-1.35-4.7 0-4.79 3.9-8.69 8.69-8.69s8.69 3.9 8.69 8.69-3.9 8.69-8.69 8.69Z"
                                                />
                                            </svg>
                                        </span>
                                        {vsWebsite.agentDesktop}
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="vs-modern-right reveal gsap-slide-right">
                            <div className="vs-showcase">
                                <div className="vs-browser">
                                    <div className="vs-browser-bar">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    <div
                                        className="vs-browser-screen vs-browser-screen--main"
                                        style={{
                                            '--vs-main-image': vsWebsite.mainImage
                                                ? `url(${vsWebsite.mainImage})`
                                                : undefined,
                                        }}
                                    />
                                </div>
                                <div className="vs-float-card vs-float-card--left">
                                    <strong>120+</strong>
                                    Happy Client
                                </div>
                                <div className="vs-float-card vs-float-card--right">
                                    <strong>Desain Modern</strong>
                                    Website profesional
                                </div>
                                <div className="vs-float-card vs-float-card--bottom">
                                    <strong>Konsultasi Yuk</strong>
                                    Respon cepat
                                </div>
                                <div
                                    className="vs-mini-card vs-mini-card--a"
                                    style={{
                                        '--vs-mini-image': vsWebsite.miniCardImage
                                            ? `url(${vsWebsite.miniCardImage})`
                                            : undefined,
                                    }}
                                >
                                    <span>Free Request</span>
                                </div>
                            </div>
                        </div>
                        <div className="vs-actions vs-actions--mobile">
                            {agentMobileLink ? (
                                <a
                                    className="vs-btn vs-btn--secondary"
                                    href={agentMobileLink}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span className="vs-btn-icon" aria-hidden="true">
                                        <svg viewBox="0 0 32 32" role="presentation">
                                            <path
                                                fill="currentColor"
                                                d="M19.11 17.41c-.29-.15-1.71-.84-1.98-.94-.27-.1-.47-.15-.66.15-.2.29-.76.94-.94 1.13-.17.2-.35.22-.64.07-.29-.15-1.24-.45-2.36-1.45-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.44.13-.59.13-.13.29-.35.44-.52.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.58-.49-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.23 5.12 4.53.72.31 1.28.49 1.72.63.72.23 1.37.2 1.89.12.58-.09 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.12-.27-.2-.56-.35ZM16 5.33c-5.9 0-10.69 4.79-10.69 10.69 0 1.88.49 3.66 1.35 5.23L5.33 26.67l5.58-1.29c1.5.82 3.21 1.28 5.09 1.28 5.9 0 10.69-4.79 10.69-10.69S21.9 5.33 16 5.33Zm0 19.44c-1.69 0-3.26-.48-4.6-1.31l-.33-.2-3.31.77.9-3.22-.21-.34c-.85-1.36-1.35-2.96-1.35-4.7 0-4.79 3.9-8.69 8.69-8.69s8.69 3.9 8.69 8.69-3.9 8.69-8.69 8.69Z"
                                            />
                                        </svg>
                                    </span>
                                    {vsWebsite.agentMobile}
                                </a>
                            ) : (
                                <button className="vs-btn vs-btn--secondary" type="button">
                                    <span className="vs-btn-icon" aria-hidden="true">
                                        <svg viewBox="0 0 32 32" role="presentation">
                                            <path
                                                fill="currentColor"
                                                d="M19.11 17.41c-.29-.15-1.71-.84-1.98-.94-.27-.1-.47-.15-.66.15-.2.29-.76.94-.94 1.13-.17.2-.35.22-.64.07-.29-.15-1.24-.45-2.36-1.45-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.44.13-.59.13-.13.29-.35.44-.52.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.58-.49-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.23 5.12 4.53.72.31 1.28.49 1.72.63.72.23 1.37.2 1.89.12.58-.09 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.12-.27-.2-.56-.35ZM16 5.33c-5.9 0-10.69 4.79-10.69 10.69 0 1.88.49 3.66 1.35 5.23L5.33 26.67l5.58-1.29c1.5.82 3.21 1.28 5.09 1.28 5.9 0 10.69-4.79 10.69-10.69S21.9 5.33 16 5.33Zm0 19.44c-1.69 0-3.26-.48-4.6-1.31l-.33-.2-3.31.77.9-3.22-.21-.34c-.85-1.36-1.35-2.96-1.35-4.7 0-4.79 3.9-8.69 8.69-8.69s8.69 3.9 8.69 8.69-3.9 8.69-8.69 8.69Z"
                                            />
                                        </svg>
                                    </span>
                                    {vsWebsite.agentMobile}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="section-purple-strong py-24 gsap-zoom-in">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="badge">{services.badge}</span>
                            <h2 className="font-display mt-4 text-3xl font-semibold text-white md:text-4xl">
                                {services.title}
                            </h2>
                        </div>
                        <p className="max-w-xl text-white/70">
                            {services.description}
                        </p>
                    </div>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {services.items.map((item) => {
                            const FeatureIcon = iconMap[item.icon] ?? PlugZap;
                            return (
                            <div key={item.title} className="feature-tile reveal">
                                <div className="tile-icon">
                                    <FeatureIcon size={18} strokeWidth={2} />
                                </div>
                                <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                                <p className="mt-3 text-sm text-white/70">{item.detail}</p>
                                <div
                                    className={`tile-visual tile-${item.type}`}
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                            </div>
                            );
                        })}
                    </div>
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
                        <button className="btn-ghost">{portfolio.buttonLabel}</button>
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
                                        Kunjungi Website
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
                                        <p className="mt-2 text-sm text-slate-500">Include:</p>
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
