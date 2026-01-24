'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Project } from '@/types';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    useEffect(() => {
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        // Handle escape key
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-muted transition-colors z-10"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Image */}
                <div className="relative w-full aspect-[16/10] bg-muted">
                    <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                        {project.title}
                    </h2>
                    {project.description && (
                        <p className="text-lg text-foreground/70 leading-relaxed">
                            {project.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
