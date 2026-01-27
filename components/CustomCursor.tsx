'use client';

import { useEffect, useState } from 'react';

export function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return mousePosition;
}

export default function CustomCursor() {
    const { x, y } = useMousePosition();
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        return () => document.removeEventListener('mouseover', handleMouseOver);
    }, []);

    return (
        <>
            <div
                className="custom-cursor"
                style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    width: isHovering ? '60px' : '40px',
                    height: isHovering ? '60px' : '40px',
                }}
            />
            <style jsx>{`
                .custom-cursor {
                    position: fixed;
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                    transition: width 0.3s ease, height 0.3s ease;
                    mix-blend-mode: difference;
                }
                
                * {
                    cursor: none !important;
                }
            `}</style>
        </>
    );
}
