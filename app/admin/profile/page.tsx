import { supabase } from '@/lib/supabase/client';
import ProfileForm from '@/components/admin/profile-form';
import { Profile } from '@/types';

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

export default async function ProfilePage() {
    const profile = await getProfile();

    if (!profile) {
        return (
            <div className="max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight mb-8">Edit Profile</h1>
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                    Error loading profile. Please check your database connection.
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight mb-8">Edit Profile</h1>
            <ProfileForm profile={profile} />
        </div>
    );
}

export const revalidate = 0; // Disable caching for admin pages
