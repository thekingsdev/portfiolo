'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Trash2, Loader2 } from 'lucide-react';
import { Project } from '@/types';
import { mockProjects } from '@/lib/mock-data';

interface ProjectListProps {
    projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async (project: Project) => {
        if (!confirm(`Are you sure you want to delete "${project.title}"?`)) {
            return;
        }

        setDeletingId(project.id);

        try {
            const isMock = !process.env.NEXT_PUBLIC_SUPABASE_URL;

            if (isMock) {
                // Client-side mock delete
                await mockProjects.delete(project.id);
                router.refresh();
                // Force reload to sync grid
                setTimeout(() => window.location.reload(), 100);
            } else {
                const response = await fetch(`/api/projects?id=${project.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete project');
                }

                router.refresh();
            }
        } catch (error) {
            alert('Error deleting project');
        } finally {
            setDeletingId(null);
        }
    };

    if (projects.length === 0) {
        return (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center text-white/50">
                No projects yet. Upload your first project!
            </div>
        );
    }

    return (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-colors"
                >
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-black/50">
                        <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate text-white">{project.title}</h3>
                        <p className="text-sm text-white/60 truncate">
                            {project.description}
                        </p>
                    </div>

                    <button
                        onClick={() => handleDelete(project)}
                        disabled={deletingId === project.id}
                        className="flex-shrink-0 p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                        aria-label="Delete project"
                    >
                        {deletingId === project.id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Trash2 className="w-5 h-5" />
                        )}
                    </button>
                </div>
            ))}
        </div>
    );
}
