import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageShell from '../components/PageShell';

const services = [
    {
        title: 'Product Strategy',
        detail: 'Research, positioning, and MVP planning with laser focus.',
    },
    {
        title: 'Brand & Identity',
        detail: 'From naming to motion system, we craft a cohesive aura.',
    },
    {
        title: 'Web Experiences',
        detail: 'High-performance marketing sites and product portals.',
    },
    {
        title: 'AI & Automation',
        detail: 'Custom agents, workflows, and data intelligence layers.',
    },
    {
        title: 'App Engineering',
        detail: 'Full-stack delivery with Laravel, React, and cloud ops.',
    },
    {
        title: 'Growth Retainers',
        detail: 'Conversion, SEO, and performance tuning on repeat.',
    },
];

const featureGrid = [
    {
        title: 'Seamless API Integrations',
        detail: 'We connect your product with the right third-party services fast.',
        type: 'integrations',
    },
    {
        title: 'Trusted Authentication',
        detail: 'Secure sign-in flows with modern, scalable identity stacks.',
        type: 'auth',
    },
    {
        title: 'AI-Speech Recognition',
        detail: 'Voice-first experiences for smarter, faster user journeys.',
        type: 'voice',
    },
];

const capabilityHighlights = [
    {
        title: 'Real-Time Data',
        detail: 'Instant insights for faster decision-making.',
    },
    {
        title: 'Vision Capabilities',
        detail: 'AI-powered image and video recognition.',
    },
    {
        title: 'Optimized UX/UI',
        detail: 'Smart design that enhances user experience.',
    },
    {
        title: 'Predictive Analytics',
        detail: 'Make data-driven decisions with AI insights.',
    },
];

function Services() {
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
        <PageShell
            title="Services that move products from concept to scale."
            description="Velno blends strategy, design, and engineering to ship software that is fast, stable, and built for growth."
        >
            <section className="section-purple pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="badge">Services</span>
                        <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                            End-to-end product teams for modern brands.
                        </h2>
                    </div>
                    <p className="max-w-xl text-white/70">
                        Small, senior squads that move fast and stay aligned through weekly sprints.
                    </p>
                    </div>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {services.map((service) => (
                            <div key={service.title} className="panel panel-hover reveal">
                                <h3 className="text-lg font-semibold">{service.title}</h3>
                                <p className="mt-3 text-sm text-white/70">{service.detail}</p>
                                <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                                    Learn more
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 pb-24">
                <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="badge">Features</span>
                        <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                            Seamless systems for modern software teams.
                        </h2>
                    </div>
                    <p className="max-w-xl text-white/70">
                        Crafted integrations, security, and AI layers that power ambitious products.
                    </p>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {featureGrid.map((item) => (
                        <div key={item.title} className="feature-tile reveal">
                            <div className="tile-icon" />
                            <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                            <p className="mt-3 text-sm text-white/70">{item.detail}</p>
                            <div className={`tile-visual tile-${item.type}`} />
                        </div>
                    ))}
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-4">
                    {capabilityHighlights.map((item) => (
                        <div key={item.title} className="reveal">
                            <p className="text-sm font-semibold">{item.title}</p>
                            <p className="mt-2 text-xs text-white/60">{item.detail}</p>
                        </div>
                    ))}
                </div>
            </section>
        </PageShell>
    );
}

export default Services;
