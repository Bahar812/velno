import React, { useEffect, useRef } from 'react';
import {
    ArrowUpRight,
    BarChart3,
    Cable,
    CheckCircle2,
    Code2,
    Globe2,
    MessageCircle,
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

const normalizeWhatsappNumber = (value) => `${value ?? ''}`.replace(/\D/g, '');
const buildWhatsappLink = (value) => {
    const normalized = normalizeWhatsappNumber(value);
    return normalized ? `https://wa.me/${normalized}` : '';
};
const formatProjectNumber = (index) => String(index + 1).padStart(2, '0');
const getProjectImages = (images = []) => {
    const validImages = images.filter(Boolean);
    const fallback =
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop';

    return [
        validImages[0] ?? fallback,
        validImages[1] ?? validImages[0] ?? fallback,
        validImages[2] ?? validImages[1] ?? validImages[0] ?? fallback,
    ];
};
const repeatMarqueeItems = (items) => [...items, ...items, ...items];

const instagramUrl = 'https://www.instagram.com/velno_tech/';
const instagramPosts = [
    {
        variant: 'instagram-post--website',
        postUrl: 'https://www.instagram.com/p/DZXZPb1pv_i/',
        imageUrl: '/instagram/velno-post-1.jpg',
        title: 'Bawa bisnis kamu naik level dengan sistem digital',
    },
    {
        variant: 'instagram-post--tips',
        postUrl: 'https://www.instagram.com/p/DZXWb4mp0rs/',
        imageUrl: '/instagram/velno-post-2.jpg',
        title: 'Maksimalkan digital marketing untuk UMKM',
    },
    {
        variant: 'instagram-post--case',
        postUrl: 'https://www.instagram.com/p/DZXWHLipfnP/',
        imageUrl: '/instagram/velno-post-3.jpg',
        title: 'UMKM terkendala sistem manual',
    },
    {
        variant: 'instagram-post--system',
        postUrl: 'https://www.instagram.com/p/DZXnb2gppbo/',
        imageUrl: '/instagram/velno-post-4.jpg',
        title: 'Biarkan website bekerja 24/7',
    },
    {
        variant: 'instagram-post--brand',
        postUrl: 'https://www.instagram.com/p/DZXnwRlJVNv/',
        imageUrl: '/instagram/velno-post-5.jpg',
        title: 'Bisnis serius mulai dari digital',
    },
    {
        variant: 'instagram-post--support',
        postUrl: 'https://www.instagram.com/p/DZXn-KPpZWU/',
        imageUrl: '/instagram/velno-post-6.jpg',
        title: 'Punya bisnis saatnya go digital',
    },
];

function Home() {
    const { language } = useUi();
    const marqueeSectionRef = useRef(null);
    const marqueeRowOneRef = useRef(null);
    const marqueeRowTwoRef = useRef(null);
    const content = useLocalizedLandingContent();
    const {
        hero,
        about,
        vsWebsite,
        services,
        solutions,
        howWeWork,
        portfolio,
        pricing: pricingContent,
        testimonials,
        contact,
        marquee,
    } = content;
    const heroImages = hero?.collageImages?.filter(Boolean) ?? [];
    const heroPreviewImage =
        heroImages[0] ??
        'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop';
    const heroSecondaryImage = heroImages[1] ?? heroPreviewImage;
    const heroTertiaryImage = heroImages[2] ?? heroPreviewImage;
    const heroStats = hero?.floats ?? [];
    const serviceItems = services?.items?.filter(Boolean) ?? [];
    const testimonialItems = testimonials?.items?.filter(Boolean) ?? [];
    const marqueeItems = marquee?.items?.filter((item) => item?.image) ?? [];
    const marqueeSplitIndex = Math.max(1, Math.ceil(marqueeItems.length / 2));
    const firstMarqueeItems = marqueeItems.slice(0, marqueeSplitIndex);
    const secondMarqueeItems = marqueeItems.slice(marqueeSplitIndex);
    const bottomMarqueeItems = secondMarqueeItems.length ? secondMarqueeItems : firstMarqueeItems;
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
                instagramEyebrow: 'Instagram',
                instagramTitle: 'Temukan kami juga di Instagram',
                instagramDescription:
                    'Ikuti update layanan Velno Tech, tips website, portfolio terbaru, dan insight digital yang bisa bantu bisnis tampil lebih profesional.',
                instagramButton: 'Follow @velno_tech',
                instagramAria: 'Kunjungi Instagram Velno Tech',
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
                instagramEyebrow: 'Instagram',
                instagramTitle: 'Find fresh posts and updates on our Instagram',
                instagramDescription:
                    'Follow Velno Tech for service updates, website tips, new portfolio work, and digital insights for a stronger online presence.',
                instagramButton: 'Follow @velno_tech',
                instagramAria: 'Visit Velno Tech Instagram',
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

    useEffect(() => {
        const section = marqueeSectionRef.current;
        const rowOne = marqueeRowOneRef.current;
        const rowTwo = marqueeRowTwoRef.current;

        if (!section || !rowOne || !rowTwo) {
            return undefined;
        }

        let frameId = 0;
        const updateRows = () => {
            frameId = 0;
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            const translate = offset - 200;

            rowOne.style.transform = `translate3d(${translate}px, 0, 0)`;
            rowTwo.style.transform = `translate3d(${-translate}px, 0, 0)`;
        };
        const requestUpdate = () => {
            if (frameId) {
                return;
            }
            frameId = window.requestAnimationFrame(updateRows);
        };

        updateRows();
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate);

        return () => {
            window.removeEventListener('scroll', requestUpdate);
            window.removeEventListener('resize', requestUpdate);
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }
        };
    }, [marqueeItems.length]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tweens = gsap.utils
            .toArray('.velno-project-card-frame')
            .map((frame) => {
                const card = frame.querySelector('.velno-project-card');
                const targetScale = Number(card?.dataset.projectTargetScale) || 1;

                if (!card || targetScale >= 1) {
                    return null;
                }

                return gsap.to(card, {
                    scale: targetScale,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: frame,
                        start: 'top top+=96',
                        end: 'bottom top+=96',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                });
            })
            .filter(Boolean);

        ScrollTrigger.refresh();

        return () => {
            tweens.forEach((tween) => {
                tween.scrollTrigger?.kill();
                tween.kill();
            });
        };
    }, [portfolio.projects.length]);

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

            {marqueeItems.length ? (
                <section
                    ref={marqueeSectionRef}
                    className="velno-marquee-section"
                    aria-label={marquee?.ariaLabel ?? 'Preview visual proyek Velno'}
                >
                    <div className="velno-marquee-row" ref={marqueeRowOneRef}>
                        {repeatMarqueeItems(firstMarqueeItems).map((item, index) => (
                            <img
                                key={`marquee-top-${item.image}-${index}`}
                                className="velno-marquee-tile"
                                src={item.image}
                                alt={item.alt ?? ''}
                                loading="lazy"
                            />
                        ))}
                    </div>
                    <div className="velno-marquee-row" ref={marqueeRowTwoRef}>
                        {repeatMarqueeItems(bottomMarqueeItems).map((item, index) => (
                            <img
                                key={`marquee-bottom-${item.image}-${index}`}
                                className="velno-marquee-tile"
                                src={item.image}
                                alt={item.alt ?? ''}
                                loading="lazy"
                            />
                        ))}
                    </div>
                </section>
            ) : null}

            <section id="about" className="section-white py-20 gsap-zoom-in">
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <span className="badge">{about.badge}</span>
                    <p className="intro-words mt-6 text-2xl font-semibold leading-snug md:text-4xl">
                        {about.sentence.split(' ').map((word, index, words) => (
                            <span key={`${word}-${index}`}>
                                {word}
                                {index < words.length - 1 ? ' ' : ''}
                            </span>
                        ))}
                    </p>
                    <div className="mt-8">
                        <a className="btn-primary" href="#contact">
                            {about.buttonLabel}
                        </a>
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

            <section id="services" className="velno-services-section">
                <div className="velno-services-inner">
                    <div className="velno-services-heading reveal">
                        <span className="velno-services-kicker">{services.badge}</span>
                        <h2>Services</h2>
                        <p>{services.description}</p>
                    </div>

                    {serviceItems.length ? (
                        <div className="velno-services-list" aria-label={services.title}>
                            {serviceItems.map((item, index) => (
                                <article
                                    key={item.title}
                                    className="velno-service-item reveal"
                                >
                                    <span className="velno-service-number">
                                        {formatProjectNumber(index)}
                                    </span>
                                    <div className="velno-service-copy">
                                        <h3>{item.title}</h3>
                                        <p>{item.detail}</p>
                                    </div>
                                </article>
                            ))}
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

            <section id="portfolio" className="velno-projects-section">
                <div className="velno-projects-inner">
                    <div className="velno-projects-heading reveal">
                        <span className="velno-projects-eyebrow">{portfolio.badge}</span>
                        <h2 className="velno-projects-title">Project</h2>
                        <div className="velno-projects-copy">
                            <p className="velno-projects-lead">{portfolio.title}</p>
                            <p>{portfolio.description}</p>
                        </div>
                    </div>

                    <div className="velno-projects-stack">
                        {portfolio.projects.map((project, index) => {
                            const projectImages = getProjectImages(project.images);
                            const tags = project.tags?.filter(Boolean) ?? [];
                            const bullets = project.bullets?.filter(Boolean) ?? [];
                            const category = tags[0] ?? portfolio.badge;
                            const totalCards = portfolio.projects.length;
                            const targetScale = 1 - (totalCards - 1 - index) * 0.03;

                            return (
                                <div
                                    key={project.name}
                                    className="velno-project-card-frame"
                                    style={{
                                        '--project-offset': `${index * 28}px`,
                                        '--project-z': index + 1,
                                    }}
                                >
                                    <article
                                        className="velno-project-card"
                                        data-project-target-scale={targetScale}
                                    >
                                        <div className="velno-project-card-top">
                                            <span className="velno-project-number">
                                                {formatProjectNumber(index)}
                                            </span>
                                            <div className="velno-project-card-copy">
                                                <p className="velno-project-category">{category}</p>
                                                <h3>{project.name}</h3>
                                                {bullets.length ? (
                                                    <div className="velno-project-bullets">
                                                        {bullets.slice(0, 4).map((item) => (
                                                            <span key={item}>{item}</span>
                                                        ))}
                                                    </div>
                                                ) : null}
                                            </div>
                                            {project.link ? (
                                                <a
                                                    className="velno-project-live"
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <span>{homeText.visitWebsite}</span>
                                                    <ArrowUpRight size={16} strokeWidth={2.4} />
                                                </a>
                                            ) : null}
                                        </div>

                                        <div className="velno-project-media-grid">
                                            <div className="velno-project-media-column">
                                                <img
                                                    className="velno-project-image velno-project-image--short"
                                                    src={projectImages[0]}
                                                    alt={`${project.name} preview 1`}
                                                    loading="lazy"
                                                />
                                                <img
                                                    className="velno-project-image velno-project-image--medium"
                                                    src={projectImages[1]}
                                                    alt={`${project.name} preview 2`}
                                                    loading="lazy"
                                                />
                                            </div>
                                            <img
                                                className="velno-project-image velno-project-image--tall"
                                                src={projectImages[2]}
                                                alt={`${project.name} preview 3`}
                                                loading="lazy"
                                            />
                                        </div>
                                    </article>
                                </div>
                            );
                        })}
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

            <section id="instagram" className="instagram-section py-24">
                <div className="instagram-layout mx-auto max-w-6xl px-6">
                    <div className="instagram-copy reveal">
                        <span className="instagram-eyebrow">{homeText.instagramEyebrow}</span>
                        <h2 className="font-display instagram-title">
                            {homeText.instagramTitle}
                        </h2>
                        <p>{homeText.instagramDescription}</p>
                        <a
                            className="instagram-link"
                            href={instagramUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={homeText.instagramAria}
                        >
                            <span>{homeText.instagramButton}</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </div>
                    <div className="instagram-mosaic reveal" aria-label="Preview Instagram Velno Tech">
                        {instagramPosts.map((post) => (
                            <a
                                key={post.variant}
                                className={`instagram-post ${post.variant}`}
                                href={post.postUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={{ backgroundImage: `url(${post.imageUrl})` }}
                                aria-label={`${homeText.instagramButton}: ${post.title}`}
                            >
                            </a>
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
