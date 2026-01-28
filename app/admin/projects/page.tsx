import { supabase } from '@/lib/supabase/client';
import ProjectUploadForm from '@/components/admin/project-upload-form';
import ProjectList from '@/components/admin/project-list';
import { Project } from '@/types';

async function getProjects(): Promise<Project[]> {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!supabaseUrl) {
        // Use mock data
        const { mockProjects } = await import('@/lib/mock-data');
        return await mockProjects.getAll();
    }

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return data || [];
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="max-w-6xl">
            <h1 className="text-4xl font-bold tracking-tight mb-8 text-white">Manage Projects</h1>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Upload Form */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-white">Upload New Project</h2>
                    <ProjectUploadForm />
                </div>

                {/* Project List */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-white">All Projects</h2>
                    <ProjectList projects={projects} />
                </div>
            </div>
        </div>
    );
}

export const revalidate = 0; // Disable caching for admin pages
