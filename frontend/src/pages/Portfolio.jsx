import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const portfolioProjects = [
    {
        year: '2024',
        name: 'Lemonide Tech',
        bullets: ['AI Integration', 'Responsive Design', 'Custom Layouts', 'Fast Loading'],
        tags: ['E-Commerce', 'Portfolio'],
        images: [
            'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
        ],
    },
    {
        year: '2025',
        name: 'Viper Studio',
        bullets: ['Modern Typography', 'User Friendly', 'Flexible CMS', 'SEO Optimized'],
        tags: ['Branding', 'Studio'],
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop',
        ],
    },
];

function Portfolio() {
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
    }, []);

    return (
        <div>
            <section className="portfolio-hero">
                <div className="mx-auto max-w-6xl px-6 pb-20 pt-8">
                    <div className="grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
                        <div className="reveal">
                            <span className="portfolio-hero-kicker">Explore the Work</span>
                            <h1 className="font-display mt-5 text-4xl font-semibold leading-tight md:text-6xl">
                                Discover standout digital builds for modern brands
                            </h1>
                            <p className="portfolio-hero-subtitle mt-5 max-w-xl text-base md:text-lg">
                                From strategy to launch, we craft premium websites and products that convert
                                attention into momentum.
                            </p>
                            <div className="portfolio-hero-form mt-8">
                                <div className="portfolio-hero-field">
                                    <span className="portfolio-hero-field-icon">BR</span>
                                    <div>
                                        <p className="portfolio-hero-field-title">Brand Focus</p>
                                        <p className="portfolio-hero-field-sub">Fintech, SaaS, Retail</p>
                                    </div>
                                </div>
                                <div className="portfolio-hero-field">
                                    <span className="portfolio-hero-field-icon">TL</span>
                                    <div>
                                        <p className="portfolio-hero-field-title">Timeline</p>
                                        <p className="portfolio-hero-field-sub">4-8 weeks</p>
                                    </div>
                                </div>
                                <div className="portfolio-hero-field">
                                    <span className="portfolio-hero-field-icon">BD</span>
                                    <div>
                                        <p className="portfolio-hero-field-title">Budget Range</p>
                                        <p className="portfolio-hero-field-sub">Rp 10-50 jt</p>
                                    </div>
                                </div>
                                <button className="portfolio-hero-cta">Get Started</button>
                            </div>
                        </div>
                        <div className="reveal">
                            <div className="portfolio-hero-collage">
                                <div className="portfolio-hero-float portfolio-hero-float--top">
                                    <strong>120+ Launches</strong>
                                    Successful digital releases
                                </div>
                                <div className="portfolio-hero-float portfolio-hero-float--right">
                                    <strong>98% Delight</strong>
                                    Client satisfaction score
                                </div>
                                <div
                                    className="portfolio-hero-card portfolio-hero-card--tall"
                                    style={{
                                        backgroundImage:
                                            'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=900&auto=format&fit=crop)',
                                    }}
                                />
                                <div
                                    className="portfolio-hero-card"
                                    style={{
                                        backgroundImage:
                                            'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=900&auto=format&fit=crop)',
                                    }}
                                />
                                <div
                                    className="portfolio-hero-card"
                                    style={{
                                        backgroundImage:
                                            'url(https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=900&auto=format&fit=crop)',
                                    }}
                                />
                                <div
                                    className="portfolio-hero-card portfolio-hero-card--wide"
                                    style={{
                                        backgroundImage:
                                            'url(https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=900&auto=format&fit=crop)',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="portfolio-list" className="section-purple pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="badge">Portfolio</span>
                            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                                Projects that prove velocity and craft.
                            </h2>
                        </div>
                        <button className="btn-ghost">View More Works</button>
                    </div>
                    <div className="mt-12 space-y-10">
                        {portfolioProjects.map((project) => (
                            <div key={project.name} className="grid gap-6 md:grid-cols-[1.1fr_1.9fr]">
                                <div className="order-2 panel reveal flex flex-col gap-5 md:order-1">
                                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
                                        <span className="chip">{project.year}</span>
                                        <span>{project.name}</span>
                                    </div>
                                    <div className="space-y-3 text-sm text-white/70">
                                        {project.bullets.filter(Boolean).map((item) => (
                                            <div key={item} className="flex items-center gap-3">
                                                <span className="h-2 w-2 rounded-full bg-violet-400" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-auto flex flex-wrap gap-3">
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
        </div>
    );
}

export default Portfolio;
