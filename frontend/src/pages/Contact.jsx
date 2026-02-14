import React from 'react';
import PageShell from '../components/PageShell';

function Contact() {
    return (
        <PageShell
            title="Mari bangun sesuatu yang luar biasa."
            description="Ceritakan tujuan produk Anda, dan kami akan menyiapkan tim, jadwal, serta peta jalan yang tepat."
        >
            <section className="section-purple pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                        <div className="panel reveal space-y-4">
                            <h3 className="text-xl font-semibold">Mulai Proyek</h3>
                            <p className="text-sm text-white/70">
                                Kirim ringkasan singkat dan kami akan merespons dalam 48 jam.
                            </p>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-white/50">Email</p>
                                    <p>hello@velno.studio</p>
                                </div>
                                <div>
                                    <p className="text-white/50">Telepon</p>
                                    <p>+62 811 234 567</p>
                                </div>
                                <div>
                                    <p className="text-white/50">Kantor</p>
                                    <p>Jakarta - Singapore - Jarak Jauh</p>
                                </div>
                            </div>
                            <button className="btn-primary">Jadwalkan Panggilan</button>
                        </div>
                        <div className="panel reveal space-y-4">
                            <h3 className="text-xl font-semibold">Daftar Cek Proyek</h3>
                            <ul className="space-y-3 text-sm text-white/70">
                                <li>Cakupan dan tujuan produk</li>
                                <li>Jadwal dan anggaran</li>
                                <li>Target pengguna dan wilayah</li>
                                <li>Integrasi dan sumber data</li>
                            </ul>
                            <button className="btn-ghost">Unduh Contoh Ringkasan</button>
                        </div>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}

export default Contact;
