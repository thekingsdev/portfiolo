import { supabase } from '@/lib/supabase/client';
import ProjectGrid from '@/components/project-grid';
import AboutSection from '@/components/about-section';
import { Project, Profile } from '@/types';

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
        .order('display_order', { ascending: false })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return data || [];
}

async function getProfile(): Promise<Profile | null> {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!supabaseUrl) {
        // Use mock data
        const { mockProfile } = await import('@/lib/mock-data');
        return await mockProfile.get();
    }

    const { data, error } = await supabase
        .from('profile')
        .select('*')
        .single();

    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }

    return data;
}

export default async function HomePage() {
    const [projects, profile] = await Promise.all([
        getProjects(),
        getProfile(),
    ]);

    return (
        <>
            {/* Hero Section */}
            <section id="work" className="pt-32 pb-16">
                <div className="container-custom">
                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
                            Creative Work
                        </h1>
                        <p className="text-xl text-foreground/70 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            A collection of selected graphic design projects
                        </p>
                    </div>

                    {/* Project Grid */}
                    <ProjectGrid projects={projects} />
                </div>
            </section>

            {/* About Section */}
            {profile && <AboutSection profile={profile} />}
        </>
    );
}

// Revalidate every 60 seconds
export const revalidate = 60;
