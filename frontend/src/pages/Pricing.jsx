import React from 'react';
import PageShell from '../components/PageShell';

const pricing = [
    {
        name: 'Lite Package',
        price: 'Rp 3.500.000',
        highlight: false,
        summary: 'Ready-to-use website only, without additional add-ons.',
        items: [
            'Ready-to-use website',
            'Standard design',
            'Basic SEO optimization',
            'Feature requests',
            'Multi-language support',
            'UI/UX optimization',
            'Speed optimization',
            'Business kit bonus',
        ],
    },
    {
        name: 'Premium Package',
        price: 'Rp 6.XXX.000',
        highlight: true,
        summary: 'Most popular package with better visuals and more features.',
        items: [
            'Ready-to-use website',
            'Modern design',
            'Basic SEO optimization',
            'Feature requests',
            'Multi-language support',
            'UI/UX optimization',
            'Speed optimization',
            'Business kit bonus',
        ],
    },
    {
        name: 'Luxury Package',
        price: 'Rp 10.XXX.000',
        highlight: false,
        summary: 'Recommended for professional companies with extra bonuses.',
        items: [
            'Ready-to-use website',
            'Unique design / custom requests',
            'Advanced SEO optimization',
            'Feature requests',
            'Multi-language support',
            'UI/UX optimization',
            'Speed optimization',
            'Business kit bonus (+logo)',
        ],
    },
];

function Pricing() {
    return (
        <PageShell
            title="Website Development Pricing - Surabaya"
            description="A quick overview of our website services in Surabaya. Custom packages are available to match your exact needs."
        >
            <section className="section-purple pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        {pricing.map((plan) => (
                            <div
                                key={plan.name}
                                className={`panel reveal ${plan.highlight ? 'panel-highlight' : ''}`}
                            >
                                <h3 className="text-lg font-semibold">{plan.name}</h3>
                                <p className="mt-2 text-2xl font-semibold">{plan.price}</p>
                                <p className="mt-3 text-sm text-white/70">{plan.summary}</p>
                                <ul className="mt-6 space-y-3 text-sm text-white/70">
                                    {plan.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                                <div className="mt-8 text-sm text-white/70">
                                    Interested in this website package?
                                </div>
                                <button className="btn-primary mt-3 w-full">Choose This Package</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageShell>
    );
}

export default Pricing;
