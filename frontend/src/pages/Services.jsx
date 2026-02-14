import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageShell from '../components/PageShell';

const services = [
    {
        title: 'Strategi Produk',
        detail: 'Riset, positioning, dan perencanaan MVP dengan fokus tajam.',
    },
    {
        title: 'Merek & Identitas',
        detail: 'Dari penamaan hingga sistem gerak, kami membangun identitas yang konsisten.',
    },
    {
        title: 'Pengalaman Web',
        detail: 'Situs pemasaran dan portal produk dengan performa tinggi.',
    },
    {
        title: 'AI & Otomatisasi',
        detail: 'Agen kustom, alur kerja otomatis, dan lapisan intelijen data.',
    },
    {
        title: 'Rekayasa Aplikasi',
        detail: 'Pengembangan full-stack dengan Laravel, React, dan operasional cloud.',
    },
    {
        title: 'Pendampingan Pertumbuhan',
        detail: 'Optimasi konversi, SEO, dan performa secara berkelanjutan.',
    },
];

const featureGrid = [
    {
        title: 'Integrasi API Mulus',
        detail: 'Kami menghubungkan produk Anda dengan layanan pihak ketiga yang tepat secara cepat.',
        type: 'integrations',
    },
    {
        title: 'Autentikasi Terpercaya',
        detail: 'Alur masuk aman dengan sistem identitas modern yang skalabel.',
        type: 'auth',
    },
    {
        title: 'Pengenalan Suara AI',
        detail: 'Pengalaman berbasis suara untuk alur pengguna yang lebih cerdas dan cepat.',
        type: 'voice',
    },
];

const capabilityHighlights = [
    {
        title: 'Data Waktu Nyata',
        detail: 'Insight instan untuk pengambilan keputusan yang lebih cepat.',
    },
    {
        title: 'Kapabilitas Visi',
        detail: 'Pengenalan gambar dan video berbasis AI.',
    },
    {
        title: 'UX/UI Teroptimasi',
        detail: 'Desain cerdas yang meningkatkan pengalaman pengguna.',
    },
    {
        title: 'Analitik Prediktif',
        detail: 'Ambil keputusan berbasis data dengan insight AI.',
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
            title="Layanan yang membawa produk dari konsep hingga skala."
            description="Velno memadukan strategi, desain, dan rekayasa untuk menghadirkan perangkat lunak yang cepat, stabil, dan siap tumbuh."
        >
            <section className="section-purple pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="badge">Layanan</span>
                        <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                            Tim produk menyeluruh untuk merek modern.
                        </h2>
                    </div>
                    <p className="max-w-xl text-white/70">
                        Tim kecil berpengalaman yang bergerak cepat dan selaras lewat sprint mingguan.
                    </p>
                    </div>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {services.map((service) => (
                            <div key={service.title} className="panel panel-hover reveal">
                                <h3 className="text-lg font-semibold">{service.title}</h3>
                                <p className="mt-3 text-sm text-white/70">{service.detail}</p>
                                <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                                    Pelajari lebih lanjut
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 pb-24">
                <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="badge">Fitur</span>
                        <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                            Sistem yang mulus untuk tim perangkat lunak modern.
                        </h2>
                    </div>
                    <p className="max-w-xl text-white/70">
                        Integrasi, keamanan, dan lapisan AI yang dirancang matang untuk produk ambisius.
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
