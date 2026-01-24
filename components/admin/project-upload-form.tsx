'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Upload } from 'lucide-react';

const projectSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    image: z.any().refine((files) => files?.length > 0, 'Image is required'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function ProjectUploadForm() {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
    });

    const onSubmit = async (data: ProjectFormData) => {
        setUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', data.image[0]);
            formData.append('title', data.title);
            formData.append('description', data.description);

            const response = await fetch('/api/projects', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to upload project');
            }

            reset();
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg p-6 border border-border">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                        Project Title *
                    </label>
                    <input
                        id="title"
                        type="text"
                        {...register('title')}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground"
                        placeholder="My Awesome Project"
                    />
                    {errors.title && (
                        <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                        Description *
                    </label>
                    <textarea
                        id="description"
                        {...register('description')}
                        rows={4}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground"
                        placeholder="Tell us about this project..."
                    />
                    {errors.description && (
                        <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium mb-2">
                        Project Image *
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        {...register('image')}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-muted file:font-medium hover:file:bg-border"
                    />
                    {errors.image && (
                        <p className="text-red-600 text-sm mt-1">{errors.image.message as string}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-foreground text-background py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {uploading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        <>
                            <Upload className="w-5 h-5" />
                            Upload Project
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
