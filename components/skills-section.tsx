'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import CurvedLoop from './CurvedLoop';

const skills = [
    {
        name: 'Graphic Design',
        svg: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="10" y="10" width="35" height="35" fill="currentColor" opacity="0.3" rx="4" />
                <rect x="55" y="10" width="35" height="35" fill="currentColor" opacity="0.6" rx="4" />
                <rect x="10" y="55" width="35" height="35" fill="currentColor" opacity="0.8" rx="4" />
                <circle cx="72.5" cy="72.5" r="17.5" fill="currentColor" />
            </svg>
        )
    },
    {
        name: 'Branding',
        svg: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="currentColor" opacity="0.3" />
                <circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.6" />
                <circle cx="50" cy="50" r="10" fill="currentColor" />
            </svg>
        )
    },
    {
        name: 'Typography',
        svg: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <text x="10" y="40" fontSize="48" fontWeight="bold" fill="currentColor" opacity="0.3">A</text>
                <text x="35" y="70" fontSize="36" fontWeight="normal" fill="currentColor" opacity="0.6">a</text>
                <text x="60" y="85" fontSize="28" fontStyle="italic" fill="currentColor">α</text>
            </svg>
        )
    },
    {
        name: 'Illustration',
        svg: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M20 80 Q30 20 50 50 T80 80" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.5" />
                <circle cx="30" cy="35" r="8" fill="currentColor" opacity="0.7" />
                <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.8" />
                <circle cx="70" cy="65" r="10" fill="currentColor" />
            </svg>
        )
    },
    {
        name: 'Layout Design',
        svg: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="15" y="15" width="70" height="20" fill="currentColor" opacity="0.3" rx="2" />
                <rect x="15" y="45" width="30" height="40" fill="currentColor" opacity="0.5" rx="2" />
                <rect x="55" y="45" width="30" height="40" fill="currentColor" opacity="0.7" rx="2" />
            </svg>
        )
    },
    {
        name: 'Creative Direction',
        svg: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,20 80,40 70,70 30,70 20,40" fill="currentColor" opacity="0.3" />
                <polygon points="50,35 65,50 55,75 45,75 35,50" fill="currentColor" opacity="0.6" />
                <circle cx="50" cy="55" r="8" fill="currentColor" />
            </svg>
        )
    },
];

const tools = [
    'Adobe Photoshop',
    'Adobe Illustrator',
    'Figma',
    'InDesign',
    'After Effects',
    'Canva',
];

export default function SkillsSection() {
    const { elementRef, isVisible } = useScrollReveal();

    return (
        <section className="py-24 bg-muted overflow-hidden relative">
            {/* Animated Curved Loop */}
            <div className="absolute top-0 w-full opacity-10 pointer-events-none">
                <CurvedLoop
                    marqueeText="✦ graphic design ✦ Creative ✦ typography ✦ print design  ✦ color theory ✦"
                    speed={2}
                    curveAmount={100}
                    direction="right"
                    interactive
                />
            </div>

            <div
                ref={elementRef}
                className={`container-custom transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
            >
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-bold mb-6">
                            Expert <span className="gradient-text">Skills</span>
                        </h2>
                        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                            Specializing in visual storytelling through design and creative solutions
                        </p>
                    </div>

                    {/* Skills Grid - More Creative Layout */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-20">
                        {skills.map((skill, index) => (
                            <div
                                key={skill.name}
                                className="group relative"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`
                                }}
                            >
                                {/* Card with gradient border effect */}
                                <div className="relative p-8 rounded-2xl bg-background border-2 border-foreground/10 hover:border-foreground/30 transition-all duration-500 hover:scale-105 overflow-hidden">
                                    {/* Animated background gradient on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Creative SVG Icon */}
                                    <div className="relative w-20 h-20 mb-6 text-foreground group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        {skill.svg}
                                    </div>

                                    {/* Skill Name */}
                                    <h3 className="relative text-lg font-semibold text-foreground">
                                        {skill.name}
                                    </h3>

                                    {/* Decorative corner accent */}
                                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-foreground/20 group-hover:bg-foreground group-hover:scale-150 transition-all duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tools Section - Redesigned */}
                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-10 text-foreground">
                            Tools & Software
                        </h3>
                        <div className="flex flex-wrap gap-6 justify-center">
                            {tools.map((tool, index) => (
                                <div
                                    key={tool}
                                    className="group relative px-8 py-4 rounded-full bg-background border-2 border-foreground/20 hover:border-foreground hover:shadow-xl transition-all duration-300 hover:scale-110 overflow-hidden"
                                    style={{
                                        animationDelay: `${index * 0.05}s`,
                                        opacity: isVisible ? 1 : 0,
                                        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + index * 0.05}s`
                                    }}
                                >
                                    {/* Sliding background effect */}
                                    <div className="absolute inset-0 bg-foreground transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

                                    {/* Tool name */}
                                    <span className="relative font-medium text-foreground group-hover:text-background transition-colors duration-500 z-10">
                                        {tool}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Curved Loop */}
            <div className="absolute bottom-0 w-full opacity-10 pointer-events-none">
                <CurvedLoop
                    marqueeText="✦ TYPOGRAPHY ✦ ILLUSTRATION ✦ LAYOUT ✦ COLOR THEORY ✦ PRINT DESIGN ✦"
                    speed={2}
                    curveAmount={100}
                    interactive
                />
            </div>
        </section>
    );
}
