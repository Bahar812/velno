import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const defaultSteps = [
    {
        step: '01',
        title: 'Pahami Visi',
        description: 'Kami menggali tujuan Anda agar arah proyek jelas sejak awal.',
    },
    {
        step: '02',
        title: 'Rancang Strategi',
        description: 'Kami menetapkan milestone dan teknologi untuk delivery yang mulus.',
    },
    {
        step: '03',
        title: 'Bangun & Rilis',
        description: 'Kami eksekusi, uji, dan rilis dengan hasil terukur.',
    },
    {
        step: '04',
        title: 'Optimalkan',
        description: 'Kami iterasi untuk performa, retensi, dan pertumbuhan.',
    },
];

function HowWeWork({ content }) {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const steps = content?.steps ?? defaultSteps;
    const label = content?.label ?? '(PROSES)';
    const title = content?.title ?? 'CARA KAMI BEKERJA';

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const section = sectionRef.current;
        const track = trackRef.current;

        if (!section || !track) {
            return undefined;
        }

        const ctx = gsap.context(() => {
            const media = gsap.matchMedia();

            const getDistance = () => {
                const wrapper = track.parentElement;
                if (!wrapper) {
                    return { distance: 0, extra: 0 };
                }
                const distance = track.scrollWidth - wrapper.clientWidth;
                const extra = Math.min(wrapper.clientWidth * 0.3, 320);
                return { distance, extra };
            };

            media.add('(min-width: 901px)', () => {
                gsap.to(track, {
                    x: () => {
                        const { distance, extra } = getDistance();
                        return -Math.max(distance + extra, 0);
                    },
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => {
                            const { distance, extra } = getDistance();
                            return `+=${Math.max(distance + extra, 0)}`;
                        },
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });
            });

            media.add('(max-width: 900px)', () => {
                gsap.set(track, { x: 0 });
            });

            return () => media.revert();
        }, section);

        ScrollTrigger.refresh();
        return () => ctx.revert();
    }, []);

    return (
        <section id="how-we-work" className="work-section" ref={sectionRef}>
            <div className="work-inner">
                <div className="work-heading">
                    <span className="work-label">{label}</span>
                    <h2 className="work-title">{title}</h2>
                </div>
                <div className="work-track" ref={trackRef}>
                    {steps.map((item) => (
                        <article key={item.step} className="work-card-horizontal">
                            <span className="work-step-top">TAHAP {item.step}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowWeWork;
