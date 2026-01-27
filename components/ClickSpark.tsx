'use client';

import { useEffect, useRef } from 'react';

interface ClickSparkProps {
    children: React.ReactNode;
    sparkColor?: string;
    sparkSize?: number;
    sparkRadius?: number;
    sparkCount?: number;
    duration?: number;
}

export default function ClickSpark({
    children,
    sparkColor = '#fff',
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
}: ClickSparkProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleClick = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create sparks
            for (let i = 0; i < sparkCount; i++) {
                const spark = document.createElement('div');
                const angle = (Math.PI * 2 * i) / sparkCount;
                const velocity = sparkRadius;

                spark.style.position = 'absolute';
                spark.style.left = `${x}px`;
                spark.style.top = `${y}px`;
                spark.style.width = `${sparkSize}px`;
                spark.style.height = `${sparkSize}px`;
                spark.style.borderRadius = '50%';
                spark.style.backgroundColor = sparkColor;
                spark.style.pointerEvents = 'none';
                spark.style.zIndex = '9999';

                container.appendChild(spark);

                // Animate spark
                const animation = spark.animate(
                    [
                        {
                            transform: `translate(0, 0) scale(1)`,
                            opacity: 1,
                        },
                        {
                            transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                            opacity: 0,
                        },
                    ],
                    {
                        duration,
                        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    }
                );

                animation.onfinish = () => {
                    spark.remove();
                };
            }
        };

        container.addEventListener('click', handleClick);

        return () => {
            container.removeEventListener('click', handleClick);
        };
    }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

    return (
        <div ref={containerRef} style={{ position: 'relative' }}>
            {children}
        </div>
    );
}
