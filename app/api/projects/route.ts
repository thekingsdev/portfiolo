import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        if (!file || !title || !description) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Upload image to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('portfolio-assets')
            .upload(filePath, file, {
                contentType: file.type,
                upsert: false,
            });

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return NextResponse.json(
                { error: 'Failed to upload image' },
                { status: 500 }
            );
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('portfolio-assets')
            .getPublicUrl(filePath);

        // Insert project into database
        const { data: project, error: dbError } = await supabase
            .from('projects')
            .insert({
                title,
                description,
                image_url: publicUrl,
                display_order: 0,
            })
            .select()
            .single();

        if (dbError) {
            console.error('Database error:', dbError);
            return NextResponse.json(
                { error: 'Failed to create project' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, project });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Project ID is required' },
                { status: 400 }
            );
        }

        // Get project to find image URL
        const { data: project } = await supabase
            .from('projects')
            .select('image_url')
            .eq('id', id)
            .single();

        // Delete from database
        const { error: dbError } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (dbError) {
            console.error('Database error:', dbError);
            return NextResponse.json(
                { error: 'Failed to delete project' },
                { status: 500 }
            );
        }

        // Delete image from storage
        if (project?.image_url) {
            const path = project.image_url.split('/').slice(-2).join('/');
            await supabase.storage.from('portfolio-assets').remove([path]);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
