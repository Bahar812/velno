import React from 'react';
import PageShell from '../components/PageShell';

const team = [
    {
        name: 'Nadia Prasetyo',
        role: 'Pendiri & Direktur Kreatif',
    },
    {
        name: 'Arif Wibowo',
        role: 'Kepala Engineering',
    },
    {
        name: 'Mei Zhang',
        role: 'Strategis Produk',
    },
];

function About() {
    return (
        <PageShell
            title="Software house yang dibangun untuk pertumbuhan."
            description="Velno adalah tim senior yang ringkas untuk menghadirkan produk digital berbasis AI dan sistem merek bagi perusahaan ambisius."
        >
            <section className="section-purple pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
                    <div className="panel reveal">
                        <h3 className="text-xl font-semibold">Cerita Kami</h3>
                        <p className="mt-4 text-sm text-white/70">
                            Kami memulai sebagai studio desain produk lalu berkembang menjadi perusahaan pengembang perangkat lunak
                            penuh. Saat ini kami membantu pendiri dan tim enterprise meluncurkan produk,
                            membangun ulang platform, dan menskalakan operasi digital dengan percaya diri.
                        </p>
                        <p className="mt-4 text-sm text-white/70">
                            Pekerjaan kami memadukan strategi, kualitas UI, dan keunggulan rekayasa. Setiap
                            sprint dipandu oleh kejelasan, kecepatan, dan hasil yang terukur.
                        </p>
                    </div>
                    <div className="panel reveal">
                        <h3 className="text-xl font-semibold">Nilai yang Kami Pegang</h3>
                        <ul className="mt-4 space-y-3 text-sm text-white/70">
                            <li>Pemikiran produk di atas sekadar mempercantik tampilan.</li>
                            <li>Kolaborasi transparan dengan tim inti Anda.</li>
                            <li>Otomatisasi dan AI saat benar-benar memberi dampak.</li>
                            <li>Dampak terukur untuk pertumbuhan dan retensi.</li>
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
