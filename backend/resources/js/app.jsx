
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = ['Services', 'Solutions', 'Work', 'Pricing', 'FAQ', 'Contact'];

const stats = [
    { value: '240+', label: 'Products shipped' },
    { value: '98%', label: 'Retention rate' },
    { value: '12', label: 'Global awards' },
];

const featureCards = [
    {
        title: 'Neural Experience',
        detail: 'Immersive interfaces powered by motion-first storytelling.',
    },
    {
        title: 'Automation Core',
        detail: 'Workflow orchestration to reduce manual ops by 60%.',
    },
    {
        title: 'Precision Delivery',
        detail: 'Sprint discipline that keeps scope clean and releases calm.',
    },
    {
        title: 'Growth Intelligence',
        detail: 'Realtime insights and conversion testing baked in.',
    },
];

const serviceCards = [
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

const solutions = [
    {
        title: 'Discovery Sprint',
        detail: 'Two-week intensive with strategy, UX, and roadmap.',
        icon: '01',
    },
    {
        title: 'Prototype Studio',
        detail: 'Clickable product prototypes and rapid usability tests.',
        icon: '02',
    },
    {
        title: 'Launch System',
        detail: 'Full build, analytics, and rollout planning.',
        icon: '03',
    },
];

const workCards = [
    {
        title: 'Nubien AI',
        tag: 'AI Studio',
        metric: '+71% conversions',
        image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f...q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: 'Skyline Commerce',
        tag: 'Retail',
        metric: '2.8x revenue',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8...q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: 'Nova Health',
        tag: 'Healthcare',
        metric: '-44% ops time',
        image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb...q=80&w=1000&auto=format&fit=crop',
    },
];

const processSteps = [
    {
        title: 'Align',
        detail: 'Goals, KPIs, and brand guardrails defined.',
    },
    {
        title: 'Design',
        detail: 'Systems, UI, and motion built in parallel.',
    },
    {
        title: 'Build',
        detail: 'Agile engineering with QA and deployment loops.',
    },
    {
        title: 'Scale',
        detail: 'Optimization, growth, and new product lanes.',
    },
];

const pricing = [
    {
        name: 'Foundation',
        price: '$4,800',
        highlight: false,
        items: ['Product strategy', 'One squad', 'Weekly delivery'],
    },
    {
        name: 'Momentum',
        price: '$8,900',
        highlight: true,
        items: ['Dual squad', 'Automation', 'Growth experiments'],
    },
    {
        name: 'Enterprise',
        price: '$14,500',
        highlight: false,
        items: ['Multi-product', 'Dedicated PMO', 'Global support'],
    },
];

const testimonials = [
    {
        quote:
            'Velno delivered a brand and product experience that feels cinematic. The launch blew past our targets.',
        name: 'Clara Jensen',
        role: 'Founder, Nubien AI',
    },
    {
        quote: 'Every sprint landed. We finally have a digital team that feels in-house.',
        name: 'Ravi Prasetyo',
        role: 'COO, Skyline Commerce',
    },
    {
        quote: 'They brought clarity and confidence to a complex platform rewrite.',
        name: 'Mei Zhang',
        role: 'Head of Product, Nova Health',
    },
];

const faqs = [
    {
        q: 'What does the engagement model look like...',
        a: 'We run on monthly retainers with flexible squad sizing and transparent milestones.',
    },
    {
        q: 'How fast can we start...',
        a: 'Discovery can kick off in 7-10 days once scope is locked.',
    },
    {
        q: 'Do you support existing teams...',
        a: 'Yes. We embed with internal squads and co-own delivery.',
    },
    {
        q: 'What tech stacks do you prefer...',
        a: 'Laravel, React, Tailwind, and modern cloud tooling.',
    },
    {
        q: 'Can you handle long-term growth...',
        a: 'We stay on as product partners for roadmap and experiments.',
    },
    {
        q: 'Do you help with branding...',
        a: 'Yes. Visual identity, tone of voice, and motion systems.',
    },
];

const blogPosts = [
    {
        title: 'Designing AI products that humans trust',
        date: 'Oct 12, 2025',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085...q=80&w=800&auto=format&fit=crop',
    },
    {
        title: 'How we cut onboarding time in half',
        date: 'Nov 04, 2025',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c...q=80&w=800&auto=format&fit=crop',
    },
    {
        title: 'The playbook for AI-driven growth',
        date: 'Dec 18, 2025',
        image: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572...q=80&w=800&auto=format&fit=crop',
    },
];

const logos = ['Nubien', 'Atlas', 'Kinetic', 'Pulse', 'Lumos', 'Stride'];

function App() {
    useEffect(() => {
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

        gsap.to('.orbit-ring', {
            rotation: 360,
            duration: 90,
            repeat: -1,
            ease: 'none',
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
    }, []);

    return (
        <div className="bg-velno text-white">
            <header className="relative overflow-hidden">
                <div className="glow glow-primary" />
                <div className="glow glow-secondary" />
                <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
                    <div className="flex items-center gap-3 text-lg font-semibold">
                        <span className="h-10 w-10 rounded-xl bg-white/10 text-center text-2xl font-bold leading-10 text-white">
                            V
                        </span>
                        Velno Softwarehouse
                    </div>
                    <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
                        {navLinks.map((link) => (
                            <a key={link} className="hover:text-white" href={`#${link.toLowerCase()}`}>
                                {link}
                            </a>
                        ))}
                    </div>
                    <button className="btn-primary">Book a Call</button>
                </nav>
                <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-8 text-center">
                    <span className="badge">Velno AI Studio</span>
                    <h1 className="font-display mt-6 text-4xl font-semibold leading-tight md:text-6xl">
                        A premium AI agency shaping bold digital experiences.
                    </h1>
                    <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
                        We partner with ambitious founders and enterprise teams to design, build, and scale
                        products that feel cinematic and perform at speed.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button className="btn-primary">Start a Project</button>
                        <button className="btn-ghost">View Case Studies</button>
                    </div>
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.3em] text-white/40">
                        <span>Laravel</span>
                        <span>React</span>
                        <span>Tailwind</span>
                        <span>GSAP</span>
                        <span>AI Automation</span>
                    </div>
                    <div className="mt-12 grid w-full gap-6 md:grid-cols-3">
                        {stats.map((stat) => (
                            <div key={stat.label} className="panel reveal text-center">
                                <p className="text-3xl font-semibold">{stat.value}</p>
                                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </header>

            <section id="services" className="py-24">
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
                        {serviceCards.map((service) => (
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

            <section id="solutions" className="relative overflow-hidden py-24">
                <div className="glow glow-secondary" />
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="badge">Solutions</span>
                            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                                A modular system for AI-first growth.
                            </h2>
                        </div>
                        <p className="max-w-xl text-white/70">
                            Plug into a repeatable delivery engine that scales from prototype to global rollout.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                        <div className="grid gap-6">
                            {solutions.map((solution) => (
                                <div key={solution.title} className="panel panel-hover reveal">
                                    <div className="flex items-center justify-between">
                                        <span className="chip">{solution.icon}</span>
                                        <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                                            Phase
                                        </span>
                                    </div>
                                    <h3 className="mt-5 text-lg font-semibold">{solution.title}</h3>
                                    <p className="mt-3 text-sm text-white/70">{solution.detail}</p>
                                </div>
                            ))}
                        </div>
                        <div className="panel reveal flex flex-col justify-between gap-6">
                            <div>
                                <span className="badge">Velno Stack</span>
                                <h3 className="font-display mt-4 text-2xl font-semibold">
                                    A digital cockpit for your entire business.
                                </h3>
                                <p className="mt-3 text-sm text-white/70">
                                    We integrate AI, analytics, and automation in a single interface.
                                </p>
                            </div>
                            <div className="grid gap-4">
                                {featureCards.map((card) => (
                                    <div key={card.title} className="float-card glass">
                                        <h4 className="text-sm font-semibold">{card.title}</h4>
                                        <p className="mt-2 text-xs text-white/60">{card.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="work" className="py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="badge">Case Studies</span>
                            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                                Proof in the pixels.
                            </h2>
                        </div>
                        <button className="btn-ghost">Explore Work</button>
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {workCards.map((item) => (
                            <article key={item.title} className="panel panel-hover reveal overflow-hidden">
                                <div
                                    className="h-48 rounded-2xl bg-cover bg-center"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                                <div className="mt-5 space-y-2">
                                    <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                                        {item.tag}
                                    </span>
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-sm text-violet-300">{item.metric}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-24">
                <div className="glow glow-primary" />
                <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.05fr_0.95fr]">
                    <div className="reveal space-y-6">
                        <span className="badge">Process</span>
                        <h2 className="font-display text-3xl font-semibold md:text-4xl">
                            Our AI product workflow.
                        </h2>
                        <p className="text-white/70">
                            Each phase compounds insights, keeping your team aligned and confident.
                        </p>
                        <div className="grid gap-4">
                            {processSteps.map((step, index) => (
                                <div key={step.title} className="glass reveal">
                                    <div className="flex items-center justify-between">
                                        <span className="chip">{`0${index + 1}`}</span>
                                        <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                                            Step
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                                    <p className="mt-2 text-sm text-white/70">{step.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="panel reveal flex flex-col justify-between gap-6">
                        <div>
                            <span className="badge">Live Ops</span>
                            <h3 className="font-display mt-4 text-2xl font-semibold">
                                A dashboard built for leadership clarity.
                            </h3>
                            <p className="mt-3 text-sm text-white/70">
                                KPI tracking, experiment logs, and AI models in one view.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
                                <span>Weekly Pulse</span>
                                <span>95% velocity</span>
                            </div>
                            <div className="mt-6 space-y-4 text-sm">
                                <div className="flex items-center justify-between">
                                    <span>AI onboarding flow</span>
                                    <span className="text-violet-300">Done</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Growth experiments</span>
                                    <span className="text-violet-300">Running</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Performance tuning</span>
                                    <span className="text-violet-300">Queued</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="pricing" className="py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="badge">Plans</span>
                            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                                Flexible engagements for every phase.
                            </h2>
                        </div>
                        <p className="max-w-xl text-white/70">
                            Choose a focus area and scale the squad as you grow. All plans include product
                            management and QA.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {pricing.map((plan) => (
                            <div
                                key={plan.name}
                                className={`panel reveal ${plan.highlight ? 'panel-highlight' : ''}`}
                            >
                                <h3 className="text-lg font-semibold">{plan.name}</h3>
                                <p className="mt-2 text-sm text-white/60">Starting at</p>
                                <p className="mt-3 text-3xl font-semibold">{plan.price}</p>
                                <ul className="mt-6 space-y-3 text-sm text-white/70">
                                    {plan.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                                <button className="btn-primary mt-8 w-full">
                                    Choose {plan.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="faq" className="relative overflow-hidden py-24">
                <div className="glow glow-tertiary" />
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="badge">FAQ</span>
                            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                                Answers before you ask.
                            </h2>
                        </div>
                        <p className="max-w-xl text-white/70">
                            Quick clarity on how we work, what we deliver, and where we thrive.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-2">
                        {faqs.map((faq) => (
                            <div key={faq.q} className="panel reveal">
                                <h3 className="text-base font-semibold">{faq.q}</h3>
                                <p className="mt-3 text-sm text-white/70">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="badge">Testimonials</span>
                            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                                Teams stay with Velno for the long run.
                            </h2>
                        </div>
                        <button className="btn-ghost">See all reviews</button>
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {testimonials.map((item) => (
                            <div key={item.name} className="panel reveal">
                                <p className="text-sm text-white/80">"{item.quote}"</p>
                                <div className="mt-4 text-xs uppercase tracking-[0.3em] text-white/50">
                                    {item.name} - {item.role}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-24">
                <div className="glow glow-primary" />
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="badge">Insights</span>
                            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                                The latest from our studio.
                            </h2>
                        </div>
                        <button className="btn-ghost">View all posts</button>
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {blogPosts.map((post) => (
                            <article key={post.title} className="panel panel-hover reveal overflow-hidden">
                                <div
                                    className="h-44 rounded-2xl bg-cover bg-center"
                                    style={{ backgroundImage: `url(${post.image})` }}
                                />
                                <div className="mt-5 space-y-2">
                                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                                        {post.date}
                                    </p>
                                    <h3 className="text-lg font-semibold">{post.title}</h3>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="panel reveal flex flex-col gap-8 text-center md:px-16 md:py-16">
                        <div>
                            <span className="badge">Let's Talk</span>
                            <h2 className="font-display mt-5 text-3xl font-semibold md:text-4xl">
                                Ready to ship a standout digital experience...
                            </h2>
                            <p className="mt-4 text-white/70">
                                Share your goals and we will craft the right team, timeline, and roadmap for
                                you.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="btn-primary">Contact Velno</button>
                            <button className="btn-ghost">Download Deck</button>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-[0.3em] text-white/40">
                            {logos.map((logo) => (
                                <span key={logo}>{logo}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/10 py-12">
                <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.4fr_1fr_1fr]">
                    <div className="space-y-4 text-sm text-white/60">
                        <div className="flex items-center gap-3 text-lg font-semibold text-white">
                            <span className="h-10 w-10 rounded-xl bg-white/10 text-center text-2xl font-bold leading-10 text-white">
                                V
                            </span>
                            Velno Softwarehouse
                        </div>
                        <p>
                            A premium AI agency focused on digital products, brand systems, and automation.
                        </p>
                        <p>hello@velno.studio</p>
                    </div>
                    <div className="text-sm text-white/60">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Studio</p>
                        <div className="mt-4 space-y-2">
                            <p>Jakarta - Singapore - Remote</p>
                            <p>+62 811 234 567</p>
                            <p>Mon - Fri, 09.00 - 18.00</p>
                        </div>
                    </div>
                    <div className="text-sm text-white/60">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Links</p>
                        <div className="mt-4 space-y-2">
                            {navLinks.map((link) => (
                                <a key={link} className="block hover:text-white" href={`#${link.toLowerCase()}`}>
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-10 max-w-6xl px-6 text-xs uppercase tracking-[0.3em] text-white/30">
                    (c) 2026 Velno Softwarehouse. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
