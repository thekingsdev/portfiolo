'use client';

interface MarqueeTextProps {
    text: string;
    speed?: number;
    className?: string;
}

export default function MarqueeText({ text, speed = 30, className = '' }: MarqueeTextProps) {
    return (
        <div className={`relative overflow-hidden whitespace-nowrap ${className}`}>
            <div
                className="inline-block animate-marquee"
                style={{
                    animationDuration: `${speed}s`,
                }}
            >
                {text} • {text} • {text} • {text} •
            </div>
        </div>
    );
}
