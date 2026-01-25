import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function PUT(request: NextRequest) {
    try {
        const formData = await request.formData();
        const bio = formData.get('bio') as string;
        const avatarFile = formData.get('avatar') as File | null;
        const cvFile = formData.get('cv') as File | null;

        if (!bio) {
            return NextResponse.json(
                { error: 'Bio is required' },
                { status: 400 }
            );
        }

        // Check if Supabase is configured
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const useMock = !supabaseUrl;

        if (useMock) {
            // Use mock data
            const { mockProfile, fileToBase64 } = await import('@/lib/mock-data');
            const updateData: any = { bio };

            if (avatarFile) {
                updateData.avatar_url = await fileToBase64(avatarFile);
            }

            if (cvFile) {
                updateData.cv_url = await fileToBase64(cvFile);
            }

            const profile = await mockProfile.update(updateData);
            return NextResponse.json({ success: true, profile });
        }

        const updateData: any = { bio };

        // Handle avatar upload
        if (avatarFile) {
            const fileExt = avatarFile.name.split('.').pop();
            const fileName = `avatar-${Date.now()}.${fileExt}`;
            const filePath = `profile/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-assets')
                .upload(filePath, avatarFile, {
                    contentType: avatarFile.type,
                    upsert: true,
                });

            if (uploadError) {
                console.error('Avatar upload error:', uploadError);
            } else {
                const { data: { publicUrl } } = supabase.storage
                    .from('portfolio-assets')
                    .getPublicUrl(filePath);

                updateData.avatar_url = publicUrl;
            }
        }

        // Handle CV upload
        if (cvFile) {
            const fileName = `cv-${Date.now()}.pdf`;
            const filePath = `profile/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-assets')
                .upload(filePath, cvFile, {
                    contentType: cvFile.type,
                    upsert: true,
                });

            if (uploadError) {
                console.error('CV upload error:', uploadError);
            } else {
                const { data: { publicUrl } } = supabase.storage
                    .from('portfolio-assets')
                    .getPublicUrl(filePath);

                updateData.cv_url = publicUrl;
            }
        }

        // Update profile in database
        const { data: profile, error: dbError } = await supabase
            .from('profile')
            .update(updateData)
            .eq('id', await getProfileId())
            .select()
            .single();

        if (dbError) {
            console.error('Database error:', dbError);
            return NextResponse.json(
                { error: 'Failed to update profile' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, profile });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Helper function to get the profile ID (assuming single profile)
async function getProfileId() {
    const { data } = await supabase.from('profile').select('id').single();
    return data?.id;
}
