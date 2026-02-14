import React from 'react';
import PageShell from '../components/PageShell';

const pricing = [
    {
        name: 'Paket Dasar',
        price: 'Rp 3.500.000',
        highlight: false,
        summary: 'Website siap pakai tanpa tambahan fitur ekstra.',
        items: [
            'Website siap pakai',
            'Desain standar',
            'Optimasi SEO dasar',
            'Permintaan fitur',
            'Dukungan multi bahasa',
            'Optimasi UI/UX',
            'Optimasi kecepatan',
            'Bonus paket bisnis',
        ],
    },
    {
        name: 'Paket Unggulan',
        price: 'Rp 6.XXX.000',
        highlight: true,
        summary: 'Paket terpopuler dengan visual lebih baik dan fitur lebih lengkap.',
        items: [
            'Website siap pakai',
            'Desain modern',
            'Optimasi SEO dasar',
            'Permintaan fitur',
            'Dukungan multi bahasa',
            'Optimasi UI/UX',
            'Optimasi kecepatan',
            'Bonus paket bisnis',
        ],
    },
    {
        name: 'Paket Eksklusif',
        price: 'Rp 10.XXX.000',
        highlight: false,
        summary: 'Direkomendasikan untuk perusahaan profesional dengan bonus tambahan.',
        items: [
            'Website siap pakai',
            'Desain unik / permintaan kustom',
            'Optimasi SEO lanjutan',
            'Permintaan fitur',
            'Dukungan multi bahasa',
            'Optimasi UI/UX',
            'Optimasi kecepatan',
            'Bonus paket bisnis (+logo)',
        ],
    },
];

function Pricing() {
    return (
        <PageShell
            title="Harga Pembuatan Website - Surabaya"
            description="Ringkasan layanan pembuatan website kami di Surabaya. Paket kustom tersedia sesuai kebutuhan Anda."
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
                                    Tertarik dengan paket website ini?
                                </div>
                                <button className="btn-primary mt-3 w-full">Pilih Paket Ini</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageShell>
    );
}

export default Pricing;
