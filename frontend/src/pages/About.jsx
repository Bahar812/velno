import React from 'react';
import PageShell from '../components/PageShell';

const team = [
    {
        name: 'Nadia Prasetyo',
        role: 'Founder & Creative Director',
    },
    {
        name: 'Arif Wibowo',
        role: 'Head of Engineering',
    },
    {
        name: 'Mei Zhang',
        role: 'Product Strategist',
    },
];

function About() {
    return (
        <PageShell
            title="A software house built for momentum."
            description="Velno is a compact, senior team delivering AI-powered digital products and brand systems for ambitious companies worldwide."
        >
            <section className="section-purple pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
                    <div className="panel reveal">
                        <h3 className="text-xl font-semibold">Our Story</h3>
                        <p className="mt-4 text-sm text-white/70">
                            We started as a product design studio and evolved into a full software house. Today we
                            help founders and enterprise teams ship launches, rebuild platforms, and scale digital
                            operations with confidence.
                        </p>
                        <p className="mt-4 text-sm text-white/70">
                            Our work blends strategy, UI craft, and engineering excellence. Every sprint is guided
                            by clarity, velocity, and measurable outcomes.
                        </p>
                    </div>
                    <div className="panel reveal">
                        <h3 className="text-xl font-semibold">What We Value</h3>
                        <ul className="mt-4 space-y-3 text-sm text-white/70">
                            <li>Product thinking over pixel pushing.</li>
                            <li>Transparent collaboration with your core team.</li>
                            <li>Automation and AI where it creates leverage.</li>
                            <li>Measurable impact across growth and retention.</li>
                        </ul>
                    </div>
                    </div>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {team.map((member) => (
                            <div key={member.name} className="panel reveal">
                                <p className="text-lg font-semibold">{member.name}</p>
                                <p className="mt-2 text-sm text-white/60">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageShell>
    );
}

export default About;
