'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import ProjectCard, { CardVariant } from './project-card';
import { ScaleIn } from './animations';

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

    // Function to determine variant based on index for a varied grid layout
    const getVariant = (index: number): CardVariant => {
        const pattern = ['minimal', 'overlay', 'magazine', 'overlay', 'minimal', 'magazine'];
        return pattern[index % pattern.length] as CardVariant;
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ScaleIn key={project.id} delay={index * 0.1}>
                        <ProjectCard
                            project={project}
                            variant={getVariant(index)}
                            onClick={() => setSelectedProject(project)}
                        />
                    </ScaleIn>
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
