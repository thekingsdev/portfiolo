import Image from 'next/image';
import { Project } from '@/types';
import { ArrowUpRight } from 'lucide-react';

export type CardVariant = 'overlay' | 'minimal' | 'magazine';

interface ProjectCardProps {
    project: Project;
    variant?: CardVariant;
    onClick?: () => void;
}

export default function ProjectCard({ project, variant = 'overlay', onClick }: ProjectCardProps) {
    // VARIANT 1: OVERLAY (Classic Portfolio)
    // Full image with gradient overlay and text reveal on hover.
    if (variant === 'overlay') {
        return (
            <div
                className="group cursor-pointer overflow-hidden bg-muted rounded-2xl aspect-[4/3] relative hover-lift"
                onClick={onClick}
            >
                <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-start justify-end p-8">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wider text-black bg-white rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        PROJECT
                    </span>
                    <h3 className="text-white text-3xl font-bold tracking-tight mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {project.title}
                    </h3>
                    {project.description && (
                        <p className="text-white/80 text-sm line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                            {project.description}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // VARIANT 2: MINIMAL (Clean/Agency)
    // Image on top, clean typography below with plenty of whitespace.
    if (variant === 'minimal') {
        return (
            <div
                className="group cursor-pointer flex flex-col gap-4"
                onClick={onClick}
            >
                <div className="overflow-hidden bg-muted rounded-xl aspect-[3/2] relative hover-lift border border-border/10">
                    <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Hover Button */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-purple-400 transition-colors">
                        {project.title}
                    </h3>
                    {project.description && (
                        <p className="text-foreground/50 text-sm line-clamp-1">
                            {project.description}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // VARIANT 3: MAGAZINE (Editorial/Bold)
    // Image with dark filter, bold text centered or largely placed.
    if (variant === 'magazine') {
        return (
            <div
                className="group cursor-pointer relative overflow-hidden bg-muted rounded-none aspect-square hover-lift border-b-4 border-transparent hover:border-purple-500 transition-all"
                onClick={onClick}
            >
                <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-60 grayscale-[20%] group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Permanent Overlay for Text Contrast */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                    <h3 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tighter opacity-90 group-hover:scale-110 transition-transform duration-500 mix-blend-overlay">
                        {project.title}
                    </h3>
                    <div className="w-0 group-hover:w-16 h-1 bg-purple-500 mt-4 transition-all duration-500" />
                    <p className="mt-4 text-white/80 font-medium tracking-widest text-xs uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        View Case Study
                    </p>
                </div>
            </div>
        );
    }

    return null;
}
