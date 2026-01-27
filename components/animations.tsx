'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface RevealTextProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export function RevealText({ children, delay = 0, className = '' }: RevealTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.16, 1, 0.3, 1], // Custom easing
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface ScaleInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export function ScaleIn({ children, delay = 0, className = '' }: ScaleInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
                duration: 1,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface StaggerChildrenProps {
    children: React.ReactNode;
    className?: string;
}

export function StaggerChildren({ children, className = '' }: StaggerChildrenProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.15,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};
