import React from 'react';
import PageShell from '../components/PageShell';

function Contact() {
    return (
        <PageShell
            title="Let's build something remarkable."
            description="Tell us about your product goals and we will craft the right squad, timeline, and roadmap."
        >
            <section className="section-purple pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                        <div className="panel reveal space-y-4">
                            <h3 className="text-xl font-semibold">Start a Project</h3>
                            <p className="text-sm text-white/70">
                                Share a quick brief and we will respond within 48 hours.
                            </p>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-white/50">Email</p>
                                    <p>hello@velno.studio</p>
                                </div>
                                <div>
                                    <p className="text-white/50">Phone</p>
                                    <p>+62 811 234 567</p>
                                </div>
                                <div>
                                    <p className="text-white/50">Office</p>
                                    <p>Jakarta - Singapore - Remote</p>
                                </div>
                            </div>
                            <button className="btn-primary">Book a Call</button>
                        </div>
                        <div className="panel reveal space-y-4">
                            <h3 className="text-xl font-semibold">Project Checklist</h3>
                            <ul className="space-y-3 text-sm text-white/70">
                                <li>Product scope and goals</li>
                                <li>Timeline and budget</li>
                                <li>Target users and regions</li>
                                <li>Integrations and data sources</li>
                            </ul>
                            <button className="btn-ghost">Download Brief Template</button>
                        </div>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}

export default Contact;
