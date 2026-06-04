import React from 'react';
import { motion } from 'motion/react';

export function TestimonialsColumn({ className = '', testimonials = [], duration = 16 }) {
    const repeatedTestimonials = [...testimonials, ...testimonials];

    return (
        <div className={`testimonials-column ${className}`}>
            <motion.div
                animate={{ translateY: '-50%' }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatType: 'loop',
                }}
                className="testimonials-column-track"
            >
                {repeatedTestimonials.map(({ text, image, name, role }, index) => (
                    <article className="testimonial-card" key={`${name}-${index}`}>
                        <p>{text}</p>
                        <div className="testimonial-author">
                            <img src={image} alt={name} width="40" height="40" loading="lazy" />
                            <div>
                                <strong>{name}</strong>
                                <span>{role}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </motion.div>
        </div>
    );
}

export default TestimonialsColumn;
