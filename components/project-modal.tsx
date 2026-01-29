'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl bg-background rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] border border-border/50"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
                >
                    <X size={20} />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-2/3 relative h-64 md:min-h-[400px] md:h-auto bg-muted/50">
                    <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 66vw"
                        priority
                    />
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/3 p-6 md:p-8 overflow-y-auto flex flex-col bg-card">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">{project.title}</h2>
                    <div className="w-12 h-1 bg-primary mb-6 rounded-full" />

                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground mb-8">
                        {project.description ? (
                            <p>{project.description}</p>
                        ) : (
                            <p className="italic opacity-50">No description available.</p>
                        )}
                    </div>

                    <div className="mt-auto pt-6 border-t border-border/50 text-sm text-muted-foreground flex items-center justify-between">
                        <span>Created</span>
                        <time dateTime={project.created_at}>
                            {new Date(project.created_at).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
