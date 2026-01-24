'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import ProjectModal from './project-modal';

interface ProjectGridProps {
    projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    if (projects.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-muted-foreground">No projects to display yet.</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="group cursor-pointer overflow-hidden bg-muted rounded-lg aspect-[4/3] relative animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => setSelectedProject(project)}
                    >
                        <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <h3 className="text-white text-xl font-semibold tracking-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                {project.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </>
    );
}
