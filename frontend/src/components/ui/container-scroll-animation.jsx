import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function ContainerScroll({ titleComponent, children, footerComponent, className = '' }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.74, 0.92] : [1.06, 1]);
    const translate = useTransform(scrollYProgress, [0, 1], [0, -110]);

    return (
        <div ref={containerRef} className={`container-scroll ${className}`}>
            <div className="container-scroll-stage">
                <motion.div
                    style={{ translateY: translate }}
                    className="container-scroll-header"
                >
                    {titleComponent}
                </motion.div>
                <motion.div
                    style={{
                        rotateX: rotate,
                        scale,
                        boxShadow:
                            '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
                    }}
                    className="container-scroll-card"
                >
                    <div className="container-scroll-card-inner">{children}</div>
                </motion.div>
                {footerComponent ? (
                    <div className="container-scroll-footer">
                        {footerComponent}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default ContainerScroll;
